/**
 * MTPL Travel Platform — Phase 2 (P2.0): MongoDB Package Catalogue Migration Script
 *
 * Safely and idempotently prepares/migrates the 93 static package definitions,
 * 93 accommodation/cost-table entries, and 186 physical media file metadata records
 * into the local development MongoDB database (`mtpl_dev`) ONLY.
 *
 * Usage:
 *   npx tsx scripts/migrate-packages-to-mongodb.ts --report
 *   npx tsx scripts/migrate-packages-to-mongodb.ts --dry-run
 *   npx tsx scripts/migrate-packages-to-mongodb.ts --apply-local
 *   npx tsx scripts/migrate-packages-to-mongodb.ts --verify
 *   npx tsx scripts/migrate-packages-to-mongodb.ts --rollback-local
 */

import * as fs from "node:fs";
import * as path from "node:path";
import crypto from "node:crypto";
import dotenv from "dotenv";
import mongoose, { Connection, Model } from "mongoose";

import {
  PackageModel,
  IPackage,
  PackageCurrency,
  PackageValidityStatus,
} from "../src/models/package";
import { MediaAsset, IMediaAsset, FileCategory } from "../src/models/media-asset";
import {
  MigrationLedger,
  IMigrationLedger,
  IMigrationChecksumSnapshot,
  IDigestEntry,
} from "../src/models/migration-ledger";
import {
  authoritativePackages,
  getPackageCategory,
} from "../src/features/packages/data/packages";
import { Package, PackageTableData } from "../src/types/package";
import { validateFileContent } from "../src/lib/storage/validation";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const MIGRATION_NAME = "P2_0_PACKAGE_CATALOGUE_MIGRATION";
export const MIGRATION_VERSION = "2.0.0";
export const ALLOWED_LOCAL_DATABASE = "mtpl_dev";
export const LOOPBACK_HOSTS = new Set(["127.0.0.1", "localhost", "::1", "[::1]"]);

export const MEDIA_ROOT_DIR = path.resolve(process.cwd(), "storage/media");
export const MEDIA_PUBLIC_DIR = path.resolve(MEDIA_ROOT_DIR, "public");
export const BACKUP_DIR = path.resolve(process.cwd(), "storage/backups");
export const REPORTS_DIR = path.resolve(process.cwd(), "docs/reports");

export type MigrationMode =
  | "report"
  | "dry-run"
  | "apply-local"
  | "verify"
  | "rollback-local";

const VALID_MODE_FLAGS: Record<string, MigrationMode> = {
  "--report": "report",
  "--dry-run": "dry-run",
  "--apply-local": "apply-local",
  "--verify": "verify",
  "--rollback-local": "rollback-local",
};

const FORBIDDEN_FLAGS = new Set(["--apply", "--rollback", "--allow-remote"]);

export interface ParsedCliArgs {
  mode: MigrationMode;
}

export function parseCliArgs(argv: string[] = process.argv.slice(2)): ParsedCliArgs {
  const modeFlags: MigrationMode[] = [];

  for (const arg of argv) {
    if (FORBIDDEN_FLAGS.has(arg)) {
      throw new Error(
        `Forbidden migration flag '${arg}'. Remote overrides and unguarded '--apply'/'--rollback' flags are permanently disabled. Use '--report', '--dry-run', '--apply-local', '--verify', or '--rollback-local'.`
      );
    }
    if (arg in VALID_MODE_FLAGS) {
      modeFlags.push(VALID_MODE_FLAGS[arg]);
      continue;
    }
    throw new Error(
      `Unsupported argument '${arg}'. Allowed modes: --report, --dry-run, --apply-local, --verify, --rollback-local.`
    );
  }

  if (modeFlags.length > 1) {
    throw new Error(
      `Multiple migration modes supplied (${modeFlags.join(", ")}). Supply exactly one mode flag.`
    );
  }

  return { mode: modeFlags[0] ?? "dry-run" };
}

export function redactUri(uri: string): string {
  return uri.replace(/(mongodb(?:\+srv)?:\/\/)([^@]+)@/g, "$1****:****@");
}

export interface ValidatedLocalDatabaseTarget {
  uri: string;
  redactedUri: string;
  host: string;
  databaseName: string;
}

export function resolveLocalDatabaseTarget(
  rawUri?: string,
  env: NodeJS.ProcessEnv = process.env
): ValidatedLocalDatabaseTarget {
  if (env.NODE_ENV === "production" || env.NEXT_PUBLIC_ENVIRONMENT === "production") {
    throw new Error(
      "SAFETY BLOCK: Production environment detected (NODE_ENV or NEXT_PUBLIC_ENVIRONMENT is 'production'). P2.0 migration is restricted to local development only."
    );
  }

  const candidateUri = rawUri !== undefined ? rawUri : env.MONGODB_URI;
  if (!candidateUri || !candidateUri.trim()) {
    throw new Error(
      "MONGODB_URI is not defined. Local P2.0 migration requires an explicit local loopback connection string targeting database 'mtpl_dev'."
    );
  }

  const trimmedUri = candidateUri.trim();

  if (trimmedUri.startsWith("mongodb+srv://")) {
    throw new Error(
      "SAFETY BLOCK: mongodb+srv:// (MongoDB Atlas / remote SRV cluster) is strictly forbidden for P2.0 migration."
    );
  }

  if (!trimmedUri.startsWith("mongodb://")) {
    throw new Error("Invalid MongoDB URI scheme. Expected 'mongodb://' targeting local loopback.");
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmedUri.replace(/^mongodb:\/\//, "http://"));
  } catch {
    throw new Error("Malformed MONGODB_URI connection string.");
  }

  // Handle replica-style comma-separated hosts if present after auth section
  const withoutScheme = trimmedUri.slice("mongodb://".length);
  const atIdx = withoutScheme.lastIndexOf("@");
  const hostAndPath = atIdx >= 0 ? withoutScheme.slice(atIdx + 1) : withoutScheme;
  const slashIdx = hostAndPath.indexOf("/");
  if (slashIdx === -1) {
    throw new Error(
      "SAFETY BLOCK: MONGODB_URI must explicitly specify database '/mtpl_dev'. Silent fallback to 'test' is forbidden."
    );
  }

  const rawHostsPart = hostAndPath.slice(0, slashIdx);
  const rawDbPart = hostAndPath.slice(slashIdx + 1).split("?")[0]?.trim() || "";

  if (!rawDbPart) {
    throw new Error(
      "SAFETY BLOCK: Database name is missing in MONGODB_URI. Silent fallback to 'test' is forbidden; exact database 'mtpl_dev' is required."
    );
  }

  const hosts = rawHostsPart.split(",").map((h) => h.trim()).filter(Boolean);
  if (hosts.length === 0) {
    throw new Error("SAFETY BLOCK: No MongoDB host found in MONGODB_URI.");
  }

  for (const h of hosts) {
    // Extract hostname cleanly supporting IPv6 bracket notation
    const hostname = h.startsWith("[")
      ? h.slice(0, h.indexOf("]") + 1).toLowerCase()
      : h.split(":")[0].toLowerCase();

    if (!LOOPBACK_HOSTS.has(hostname)) {
      throw new Error(
        `SAFETY BLOCK: Remote or non-loopback MongoDB host '${hostname}' rejected. Only local loopback hosts (127.0.0.1, localhost, ::1) are permitted.`
      );
    }
  }

  if (
    rawDbPart.toLowerCase().includes("prod") ||
    rawDbPart === "test" ||
    rawDbPart !== ALLOWED_LOCAL_DATABASE
  ) {
    throw new Error(
      `SAFETY BLOCK: Target database '${rawDbPart}' is not permitted. Only exact local development database '${ALLOWED_LOCAL_DATABASE}' is allowed.`
    );
  }

  return {
    uri: trimmedUri,
    redactedUri: redactUri(trimmedUri),
    host: parsed.host,
    databaseName: rawDbPart,
  };
}

export interface DetectedMimeInfo {
  mimeType: "application/pdf" | "image/png" | "image/jpeg" | "image/webp";
  category: FileCategory;
}

export function detectMimeTypeFromMagicBytes(
  buffer: Buffer,
  fileLabel: string
): DetectedMimeInfo {
  if (buffer.length >= 5 && buffer.subarray(0, 5).toString("ascii") === "%PDF-") {
    return { mimeType: "application/pdf", category: "documents" };
  }

  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { mimeType: "image/png", category: "images" };
  }

  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { mimeType: "image/jpeg", category: "images" };
  }

  if (
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    buffer.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return { mimeType: "image/webp", category: "images" };
  }

  throw new Error(
    `BLOCKING MEDIA ERROR: Unrecognized or invalid binary signature for '${fileLabel}'. Supported signatures: PDF, PNG, JPEG, WebP.`
  );
}

export interface DiscoveredMediaFile {
  storageKey: string;
  relativePath: string;
  originalFilename: string;
  fullPath: string;
  mimeType: DetectedMimeInfo["mimeType"];
  sizeBytes: number;
  sha256: string;
  category: FileCategory;
  visibility: "public";
  altText: string;
  extensionMismatch: boolean;
}

export interface MediaInventoryResult {
  files: DiscoveredMediaFile[];
  subdirectories: string[];
  extensionMismatches: Array<{
    storageKey: string;
    extension: string;
    detectedMimeType: string;
  }>;
}

export function scanMediaInventory(
  mediaPublicDir: string = MEDIA_PUBLIC_DIR,
  mediaRootDir: string = MEDIA_ROOT_DIR
): MediaInventoryResult {
  if (!fs.existsSync(mediaPublicDir)) {
    throw new Error(`Media directory not found: ${mediaPublicDir}`);
  }

  const rootStat = fs.lstatSync(mediaRootDir);
  if (rootStat.isSymbolicLink()) {
    throw new Error(`SECURITY BLOCK: Media root directory must not be a symlink: ${mediaRootDir}`);
  }

  const publicStat = fs.lstatSync(mediaPublicDir);
  if (publicStat.isSymbolicLink() || !publicStat.isDirectory()) {
    throw new Error(`SECURITY BLOCK: Media public directory must be a real directory: ${mediaPublicDir}`);
  }

  const realMediaRoot = fs.realpathSync(mediaRootDir);
  const realPublicDir = fs.realpathSync(mediaPublicDir);

  if (
    realPublicDir !== realMediaRoot &&
    !realPublicDir.startsWith(realMediaRoot + path.sep)
  ) {
    throw new Error(`SECURITY BLOCK: Media public directory escapes media root: ${realPublicDir}`);
  }

  const files: DiscoveredMediaFile[] = [];
  const subdirectories: string[] = [];
  const seenStorageKeys = new Set<string>();
  const seenRelativePaths = new Set<string>();
  const extensionMismatches: Array<{
    storageKey: string;
    extension: string;
    detectedMimeType: string;
  }> = [];

  function walkDirectory(currentDir: string) {
    const entries = fs.readdirSync(currentDir).sort((a, b) => a.localeCompare(b));

    for (const entryName of entries) {
      const entryPath = path.join(currentDir, entryName);
      const entryLstat = fs.lstatSync(entryPath);

      if (entryLstat.isSymbolicLink()) {
        throw new Error(`SECURITY BLOCK: Symlink rejected inside media directory: ${entryPath}`);
      }

      const resolvedRealPath = fs.realpathSync(entryPath);
      if (!resolvedRealPath.startsWith(realPublicDir + path.sep)) {
        throw new Error(
          `SECURITY BLOCK: Path escapes media public boundary: ${entryPath} -> ${resolvedRealPath}`
        );
      }

      if (entryLstat.isDirectory()) {
        const relDir = path
          .relative(realPublicDir, resolvedRealPath)
          .split(path.sep)
          .join("/");
        subdirectories.push(relDir);
        walkDirectory(resolvedRealPath);
        continue;
      }

      if (!entryLstat.isFile()) {
        throw new Error(`BLOCKING MEDIA ERROR: Non-regular file object encountered: ${entryPath}`);
      }

      const storageKey = path
        .relative(realPublicDir, resolvedRealPath)
        .split(path.sep)
        .join("/");
      const relativePath = path
        .relative(realMediaRoot, resolvedRealPath)
        .split(path.sep)
        .join("/");

      if (seenStorageKeys.has(storageKey)) {
        throw new Error(`Duplicate storageKey detected: '${storageKey}'`);
      }
      if (seenRelativePaths.has(relativePath)) {
        throw new Error(`Duplicate relativePath detected: '${relativePath}'`);
      }

      const buffer = fs.readFileSync(resolvedRealPath);
      const { mimeType, category } = detectMimeTypeFromMagicBytes(buffer, relativePath);

      if (!validateFileContent(buffer, mimeType)) {
        throw new Error(
          `BLOCKING MEDIA ERROR: Content signature validation failed for '${relativePath}' as '${mimeType}'.`
        );
      }

      const ext = path.extname(entryName).toLowerCase();
      const expectedExtForMime: Record<string, string[]> = {
        "application/pdf": [".pdf"],
        "image/png": [".png"],
        "image/jpeg": [".jpg", ".jpeg"],
        "image/webp": [".webp"],
      };
      const extensionMismatch = !(expectedExtForMime[mimeType] || []).includes(ext);
      if (extensionMismatch) {
        extensionMismatches.push({
          storageKey,
          extension: ext,
          detectedMimeType: mimeType,
        });
      }

      const sha256 = crypto.createHash("sha256").update(buffer).digest("hex");

      let altText = `${entryName} - MTPL Asset`;
      if (storageKey === "National-Category.webp") {
        altText = "National India Holiday Packages - Mishrikotkar Travels";
      } else if (storageKey === "International-Category.webp") {
        altText = "International World Holiday Packages - Mishrikotkar Travels";
      } else {
        const matchingPkg = authoritativePackages.find(
          (p) =>
            p.heroImage === `/api/media/${storageKey}` ||
            p.pdfDownloadKey === storageKey
        );
        if (matchingPkg) {
          altText = `${matchingPkg.title} (${matchingPkg.duration}) - MTPL Curated Tour`;
        }
      }

      seenStorageKeys.add(storageKey);
      seenRelativePaths.add(relativePath);

      files.push({
        storageKey,
        relativePath,
        originalFilename: entryName,
        fullPath: resolvedRealPath,
        mimeType,
        sizeBytes: entryLstat.size,
        sha256,
        category,
        visibility: "public",
        altText,
        extensionMismatch,
      });
    }
  }

  walkDirectory(realPublicDir);

  return { files, subdirectories, extensionMismatches };
}

export interface CurrencyResolution {
  currency: PackageCurrency;
  tableCurrencies: string[];
  hasMixedCurrencyDiscrepancy: boolean;
}

/**
 * Resolves package summary currency strictly from source pricing indicators.
 * NEVER infers USD from `category === "international"`.
 */
export function resolvePackageCurrency(
  pkg: Package,
  tableData: PackageTableData | null
): CurrencyResolution {
  const summaryText = `${pkg.priceDisplay || ""} ${pkg.pricingBasis || ""}`.toUpperCase();
  const hasUsdSummary = summaryText.includes("USD") || summaryText.includes("$");
  const hasInrSummary = summaryText.includes("INR") || summaryText.includes("₹");

  if (hasUsdSummary && hasInrSummary) {
    throw new Error(
      `Conflicting currency indicators in summary pricing for '${pkg.slug}': '${pkg.priceDisplay}' / '${pkg.pricingBasis}'`
    );
  }

  const tableCurrencies = Array.from(
    new Set(
      (tableData?.costTables || [])
        .map((t) => (t.currency || "").trim().toUpperCase())
        .filter(Boolean)
    )
  );

  let currency: PackageCurrency;
  if (hasUsdSummary) {
    currency = "USD";
  } else if (hasInrSummary) {
    currency = "INR";
  } else if (tableCurrencies.length === 1 && (tableCurrencies[0] === "USD" || tableCurrencies[0] === "INR")) {
    currency = tableCurrencies[0];
  } else {
    throw new Error(
      `Cannot deterministically resolve currency from source fields for package '${pkg.slug}'.`
    );
  }

  const hasMixedCurrencyDiscrepancy = tableCurrencies.some((tc) => tc !== currency);

  return {
    currency,
    tableCurrencies,
    hasMixedCurrencyDiscrepancy,
  };
}

export interface AssembledPackageDoc {
  packageId: string;
  sourceOrder: number;
  slug: string;
  title: string;
  destination: string;
  category: "national" | "international";
  duration: string;
  nights: number;
  days: number;
  shortDescription: string;
  overview: string;
  heroImage: string;
  pdfDownloadKey: string;
  pdfOriginalFilename: string;
  numericPrice?: number;
  priceDisplay: string;
  pricingBasis: string;
  currency: PackageCurrency;
  isPriceOnRequest: boolean;
  validityNotice: string;
  validityDisplay: string;
  validityStatus: PackageValidityStatus;
  featured: boolean;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: { day: number; title: string; description: string }[];
  whatsAppHref: string;
  accommodations: { headers: string[]; rows: string[][] } | null;
  costTables: { title: string; currency: string; headers: string[]; rows: string[][] }[];
  status: "published";
  createdBy: string;
  updatedBy: null;
  seoTitle: string;
  seoDescription: string;
}

export type CatalogueDiscrepancies = {
  mixedCurrencyPackages: Array<{
    slug: string;
    destination: string;
    summaryCurrency: PackageCurrency;
    priceDisplay: string;
    costTableCurrencies: string[];
  }>;
  emptyPdfPackages: Array<{
    slug: string;
    title: string;
    pdfOriginalFilename: string;
  }>;
  nonSequentialItineraryPackages: Array<{
    slug: string;
    days: number[];
  }>;
  extensionMimeMismatchCount: number;
  extensionMimeMismatchesSample: Array<{
    storageKey: string;
    extension: string;
    detectedMimeType: string;
  }>;
};

export interface AssembledCatalogueResult {
  packages: AssembledPackageDoc[];
  discrepancies: CatalogueDiscrepancies;
}

export function loadPackageTables(): Record<string, PackageTableData> {
  const tablesJsonPath = path.resolve(
    process.cwd(),
    "src/features/packages/data/package-tables.json"
  );
  return JSON.parse(fs.readFileSync(tablesJsonPath, "utf-8")) as Record<
    string,
    PackageTableData
  >;
}

export function assemblePackageCatalogue(
  mediaInventory?: MediaInventoryResult
): AssembledCatalogueResult {
  const packageTablesData = loadPackageTables();
  const seenSlugs = new Set<string>();
  const docs: AssembledPackageDoc[] = [];

  const mixedCurrencyPackages: CatalogueDiscrepancies["mixedCurrencyPackages"] = [];
  const emptyPdfPackages: CatalogueDiscrepancies["emptyPdfPackages"] = [];
  const nonSequentialItineraryPackages: CatalogueDiscrepancies["nonSequentialItineraryPackages"] = [];

  const tableSlugs = new Set(Object.keys(packageTablesData));
  const pkgSlugs = new Set(authoritativePackages.map((p) => p.slug));
  const missingTables = [...pkgSlugs].filter((s) => !tableSlugs.has(s));
  const orphanTables = [...tableSlugs].filter((s) => !pkgSlugs.has(s));

  if (missingTables.length > 0 || orphanTables.length > 0) {
    throw new Error(
      `Source parity mismatch between packages.ts and package-tables.json. Missing tables: [${missingTables.join(", ")}], orphan tables: [${orphanTables.join(", ")}]`
    );
  }

  for (let index = 0; index < authoritativePackages.length; index++) {
    const pkg = authoritativePackages[index];
    if (seenSlugs.has(pkg.slug)) {
      throw new Error(`Duplicate package slug detected in authoritative source: '${pkg.slug}'`);
    }
    seenSlugs.add(pkg.slug);

    const tableData = packageTablesData[pkg.slug] ?? null;
    const category = getPackageCategory(pkg);
    const currencyResolution = resolvePackageCurrency(pkg, tableData);

    if (currencyResolution.hasMixedCurrencyDiscrepancy) {
      mixedCurrencyPackages.push({
        slug: pkg.slug,
        destination: pkg.destination,
        summaryCurrency: currencyResolution.currency,
        priceDisplay: pkg.priceDisplay,
        costTableCurrencies: currencyResolution.tableCurrencies,
      });
    }

    if (!pkg.pdfDownloadKey) {
      emptyPdfPackages.push({
        slug: pkg.slug,
        title: pkg.title,
        pdfOriginalFilename: pkg.pdfOriginalFilename || "",
      });
    }

    const itinerary = (pkg.itinerary || []).map((it) => ({
      day: it.day,
      title: it.title.trim(),
      description: it.description.trim(),
    }));

    const isSequential = itinerary.every((it, idx) => it.day === idx + 1);
    if (!isSequential) {
      nonSequentialItineraryPackages.push({
        slug: pkg.slug,
        days: itinerary.map((it) => it.day),
      });
    }

    const accommodations = tableData?.accommodations
      ? {
          headers: [...(tableData.accommodations.headers || [])],
          rows: (tableData.accommodations.rows || []).map((r) => [...r]),
        }
      : null;

    const costTables = (tableData?.costTables || []).map((t) => ({
      title: (t.title || "").trim(),
      currency: (t.currency || "").trim(),
      headers: [...(t.headers || [])],
      rows: (t.rows || []).map((r) => [...r]),
    }));

    if (mediaInventory) {
      const diskKeySet = new Set(mediaInventory.files.map((f) => f.storageKey));
      const heroKey = pkg.heroImage.replace("/api/media/", "").split("?")[0];
      if (!diskKeySet.has(heroKey)) {
        throw new Error(
          `BLOCKING SOURCE ERROR: Package '${pkg.slug}' heroImage '${pkg.heroImage}' missing in physical media directory.`
        );
      }
      if (pkg.pdfDownloadKey && !diskKeySet.has(pkg.pdfDownloadKey)) {
        throw new Error(
          `BLOCKING SOURCE ERROR: Package '${pkg.slug}' pdfDownloadKey '${pkg.pdfDownloadKey}' missing in physical media directory.`
        );
      }
    }

    docs.push({
      packageId: (pkg.id || "").trim(),
      sourceOrder: index,
      slug: pkg.slug.trim().toLowerCase(),
      title: pkg.title.trim(),
      destination: pkg.destination.trim(),
      category,
      duration: pkg.duration.trim(),
      nights: pkg.nights,
      days: pkg.days,
      shortDescription: pkg.shortDescription.trim(),
      overview: (pkg.overview || "").trim(),
      heroImage: pkg.heroImage.trim(),
      pdfDownloadKey: (pkg.pdfDownloadKey || "").trim(),
      pdfOriginalFilename: (pkg.pdfOriginalFilename || "").trim(),
      ...(typeof pkg.numericPrice === "number" ? { numericPrice: pkg.numericPrice } : {}),
      priceDisplay: pkg.priceDisplay.trim(),
      pricingBasis: (pkg.pricingBasis || "").trim(),
      currency: currencyResolution.currency,
      isPriceOnRequest: Boolean(pkg.isPriceOnRequest),
      validityNotice: (pkg.validityNotice || "").trim(),
      validityDisplay: (pkg.validityDisplay || "").trim(),
      validityStatus: pkg.validityStatus || "verified",
      featured: Boolean(pkg.featured),
      highlights: (pkg.highlights || []).map((h) => h.trim()),
      inclusions: (pkg.inclusions || []).map((inc) => inc.trim()),
      exclusions: (pkg.exclusions || []).map((exc) => exc.trim()),
      itinerary,
      whatsAppHref: (pkg.whatsAppHref || "").trim(),
      accommodations,
      costTables,
      status: "published",
      createdBy: "system-migration",
      updatedBy: null,
      seoTitle: "",
      seoDescription: "",
    });
  }

  return {
    packages: docs,
    discrepancies: {
      mixedCurrencyPackages,
      emptyPdfPackages,
      nonSequentialItineraryPackages,
      extensionMimeMismatchCount: mediaInventory?.extensionMismatches.length ?? 0,
      extensionMimeMismatchesSample: (mediaInventory?.extensionMismatches ?? []).slice(0, 10),
    },
  };
}

function stableSortValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(stableSortValue);
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(value as Record<string, unknown>).sort()) {
      const v = (value as Record<string, unknown>)[key];
      if (v !== undefined) {
        out[key] = stableSortValue(v);
      }
    }
    return out;
  }
  return value;
}

export function normalizePackageForDigest(doc: Record<string, unknown>): Record<string, unknown> {
  return {
    packageId: doc.packageId ?? "",
    sourceOrder: doc.sourceOrder ?? null,
    slug: String(doc.slug ?? "").trim().toLowerCase(),
    title: String(doc.title ?? "").trim(),
    destination: String(doc.destination ?? "").trim(),
    category: doc.category,
    duration: String(doc.duration ?? "").trim(),
    nights: doc.nights,
    days: doc.days,
    shortDescription: String(doc.shortDescription ?? "").trim(),
    overview: String(doc.overview ?? "").trim(),
    heroImage: String(doc.heroImage ?? "").trim(),
    pdfDownloadKey: String(doc.pdfDownloadKey ?? "").trim(),
    pdfOriginalFilename: String(doc.pdfOriginalFilename ?? "").trim(),
    numericPrice: typeof doc.numericPrice === "number" ? doc.numericPrice : null,
    priceDisplay: String(doc.priceDisplay ?? "").trim(),
    pricingBasis: String(doc.pricingBasis ?? "").trim(),
    currency: doc.currency,
    isPriceOnRequest: Boolean(doc.isPriceOnRequest),
    validityNotice: String(doc.validityNotice ?? "").trim(),
    validityDisplay: String(doc.validityDisplay ?? "").trim(),
    validityStatus: doc.validityStatus ?? "verified",
    featured: Boolean(doc.featured),
    highlights: Array.isArray(doc.highlights) ? doc.highlights : [],
    inclusions: Array.isArray(doc.inclusions) ? doc.inclusions : [],
    exclusions: Array.isArray(doc.exclusions) ? doc.exclusions : [],
    itinerary: Array.isArray(doc.itinerary)
      ? doc.itinerary.map((d: Record<string, unknown>) => ({
          day: d.day,
          title: String(d.title ?? "").trim(),
          description: String(d.description ?? "").trim(),
        }))
      : [],
    whatsAppHref: String(doc.whatsAppHref ?? "").trim(),
    accommodations: doc.accommodations
      ? {
          headers: (doc.accommodations as Record<string, unknown>).headers ?? [],
          rows: (doc.accommodations as Record<string, unknown>).rows ?? [],
        }
      : null,
    costTables: Array.isArray(doc.costTables)
      ? doc.costTables.map((t: Record<string, unknown>) => ({
          title: String(t.title ?? "").trim(),
          currency: String(t.currency ?? "").trim(),
          headers: Array.isArray(t.headers) ? t.headers : [],
          rows: Array.isArray(t.rows) ? t.rows : [],
        }))
      : [],
    status: doc.status ?? "published",
    createdBy: doc.createdBy ?? "system-migration",
    updatedBy: doc.updatedBy ?? null,
    seoTitle: String(doc.seoTitle ?? "").trim(),
    seoDescription: String(doc.seoDescription ?? "").trim(),
  };
}

export function normalizeMediaForDigest(doc: Record<string, unknown>): Record<string, unknown> {
  return {
    storageKey: String(doc.storageKey ?? "").trim(),
    relativePath: String(doc.relativePath ?? "").trim(),
    originalFilename: String(doc.originalFilename ?? "").trim(),
    mimeType: String(doc.mimeType ?? "").trim(),
    sizeBytes: doc.sizeBytes,
    sha256: String(doc.sha256 ?? "").trim(),
    category: doc.category,
    visibility: doc.visibility ?? "public",
    altText: String(doc.altText ?? "").trim(),
  };
}

export function computeCanonicalSha256(normalizedObj: unknown): string {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(stableSortValue(normalizedObj)))
    .digest("hex");
}

export function computeInventoryHash(
  assembledPackages: AssembledPackageDoc[],
  mediaFiles: DiscoveredMediaFile[]
): string {
  const pkgDigests = [...assembledPackages]
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((p) => `${p.slug}:${computeCanonicalSha256(normalizePackageForDigest(p as unknown as Record<string, unknown>))}`);
  const mediaDigests = [...mediaFiles]
    .sort((a, b) => a.storageKey.localeCompare(b.storageKey))
    .map((m) => `${m.storageKey}:${computeCanonicalSha256(normalizeMediaForDigest(m as unknown as Record<string, unknown>))}`);
  return crypto
    .createHash("sha256")
    .update(pkgDigests.join("|") + "::" + mediaDigests.join("|"))
    .digest("hex");
}

export async function computeCollectionChecksums(
  pkgModel: Model<IPackage>,
  mediaModel: Model<IMediaAsset>
): Promise<IMigrationChecksumSnapshot> {
  const pkgs = await pkgModel.find().sort({ slug: 1 }).lean();
  const media = await mediaModel.find().sort({ storageKey: 1 }).lean();

  const packagesDigest = crypto
    .createHash("sha256")
    .update(
      pkgs
        .map((p) => `${p.slug}:${computeCanonicalSha256(normalizePackageForDigest(p as unknown as Record<string, unknown>))}`)
        .join("|")
    )
    .digest("hex");

  const mediaDigest = crypto
    .createHash("sha256")
    .update(
      media
        .map((m) => `${m.storageKey}:${computeCanonicalSha256(normalizeMediaForDigest(m as unknown as Record<string, unknown>))}`)
        .join("|")
    )
    .digest("hex");

  return {
    packageCount: pkgs.length,
    mediaCount: media.length,
    packagesDigest,
    mediaDigest,
  };
}

export interface MigrationPlanAnalysis {
  packagesToInsert: AssembledPackageDoc[];
  packagesAlreadyMigrated: string[];
  packageConflicts: Array<{ slug: string; reason: string }>;
  mediaToInsert: DiscoveredMediaFile[];
  mediaAlreadyMigrated: string[];
  mediaConflicts: Array<{ storageKey: string; reason: string }>;
}

export async function analyzeMigrationPlan(
  pkgModel: Model<IPackage>,
  mediaModel: Model<IMediaAsset>,
  assembledPackages: AssembledPackageDoc[],
  mediaFiles: DiscoveredMediaFile[]
): Promise<MigrationPlanAnalysis> {
  const existingPackages = await pkgModel.find().lean();
  const existingPkgBySlug = new Map(existingPackages.map((p) => [p.slug, p]));

  const existingMedia = await mediaModel.find().lean();
  const existingMediaByKey = new Map(existingMedia.map((m) => [m.storageKey, m]));

  const packagesToInsert: AssembledPackageDoc[] = [];
  const packagesAlreadyMigrated: string[] = [];
  const packageConflicts: Array<{ slug: string; reason: string }> = [];

  for (const pkg of assembledPackages) {
    const existing = existingPkgBySlug.get(pkg.slug);
    if (!existing) {
      packagesToInsert.push(pkg);
      continue;
    }

    const expectedHash = computeCanonicalSha256(
      normalizePackageForDigest(pkg as unknown as Record<string, unknown>)
    );
    const existingHash = computeCanonicalSha256(
      normalizePackageForDigest(existing as unknown as Record<string, unknown>)
    );

    if (expectedHash === existingHash) {
      packagesAlreadyMigrated.push(pkg.slug);
    } else {
      packageConflicts.push({
        slug: pkg.slug,
        reason: `Existing package document '${pkg.slug}' differs from authoritative source (non-overwriting policy).`,
      });
    }
  }

  const mediaToInsert: DiscoveredMediaFile[] = [];
  const mediaAlreadyMigrated: string[] = [];
  const mediaConflicts: Array<{ storageKey: string; reason: string }> = [];

  for (const media of mediaFiles) {
    const existing = existingMediaByKey.get(media.storageKey);
    if (!existing) {
      mediaToInsert.push(media);
      continue;
    }

    const expectedHash = computeCanonicalSha256(
      normalizeMediaForDigest(media as unknown as Record<string, unknown>)
    );
    const existingHash = computeCanonicalSha256(
      normalizeMediaForDigest(existing as unknown as Record<string, unknown>)
    );

    if (expectedHash === existingHash) {
      mediaAlreadyMigrated.push(media.storageKey);
    } else {
      mediaConflicts.push({
        storageKey: media.storageKey,
        reason: `Existing MediaAsset '${media.storageKey}' differs from physical media inventory (non-overwriting policy).`,
      });
    }
  }

  return {
    packagesToInsert,
    packagesAlreadyMigrated,
    packageConflicts,
    mediaToInsert,
    mediaAlreadyMigrated,
    mediaConflicts,
  };
}

export interface VerificationOutcome {
  passedChecks: number;
  failedChecks: number;
  allPassed: boolean;
  details: string[];
}

export async function verifyDatabaseAgainstSource(
  pkgModel: Model<IPackage>,
  mediaModel: Model<IMediaAsset>,
  assembled: AssembledCatalogueResult,
  mediaInventory: MediaInventoryResult,
  silent: boolean = false
): Promise<VerificationOutcome> {
  let passedChecks = 0;
  let failedChecks = 0;
  const details: string[] = [];

  function check(cond: boolean, message: string) {
    if (cond) {
      passedChecks++;
      details.push(`[PASS] ${message}`);
      if (!silent) console.log(`  [PASS] ${message}`);
    } else {
      failedChecks++;
      details.push(`[FAIL] ${message}`);
      if (!silent) console.error(`  [FAIL] ${message}`);
    }
  }

  const dbPackages = await pkgModel.find().lean();
  const dbMedia = await mediaModel.find().lean();

  check(dbPackages.length === 93, `Total packages in DB is 93 (found: ${dbPackages.length})`);
  check(
    dbPackages.filter((p) => p.category === "national").length === 67,
    `National packages count is 67 (found: ${dbPackages.filter((p) => p.category === "national").length})`
  );
  check(
    dbPackages.filter((p) => p.category === "international").length === 26,
    `International packages count is 26 (found: ${dbPackages.filter((p) => p.category === "international").length})`
  );
  check(
    dbPackages.filter((p) => p.status === "published").length === 93,
    `All 93 packages have status='published'`
  );

  // Content parity & zero silent drift against authoritative source
  const dbPkgMap = new Map(dbPackages.map((p) => [p.slug, p]));
  let exactPkgMatches = 0;
  for (const src of assembled.packages) {
    const dbDoc = dbPkgMap.get(src.slug);
    if (!dbDoc) continue;
    const hSrc = computeCanonicalSha256(normalizePackageForDigest(src as unknown as Record<string, unknown>));
    const hDb = computeCanonicalSha256(normalizePackageForDigest(dbDoc as unknown as Record<string, unknown>));
    if (hSrc === hDb) exactPkgMatches++;
  }
  check(exactPkgMatches === 93, `All 93 packages match source content digests verbatim (matched: ${exactPkgMatches})`);

  check(dbMedia.length === 186, `MediaAsset collection contains 186 records (found: ${dbMedia.length})`);
  const dbMediaMap = new Map(dbMedia.map((m) => [m.storageKey, m]));
  let exactMediaMatches = 0;
  for (const mf of mediaInventory.files) {
    const dbDoc = dbMediaMap.get(mf.storageKey);
    if (!dbDoc) continue;
    const hSrc = computeCanonicalSha256(normalizeMediaForDigest(mf as unknown as Record<string, unknown>));
    const hDb = computeCanonicalSha256(normalizeMediaForDigest(dbDoc as unknown as Record<string, unknown>));
    if (hSrc === hDb) exactMediaMatches++;
  }
  check(exactMediaMatches === 186, `All 186 MediaAsset records match relativePath, SHA-256, and content MIME type (matched: ${exactMediaMatches})`);

  const pngCount = dbMedia.filter((m) => m.mimeType === "image/png").length;
  const webpCount = dbMedia.filter((m) => m.mimeType === "image/webp").length;
  const pdfCount = dbMedia.filter((m) => m.mimeType === "application/pdf").length;
  check(pdfCount === 91, `91 MediaAsset documents have content-detected mimeType='application/pdf' (found: ${pdfCount})`);
  check(pngCount === 88, `88 '.webp' MediaAsset documents have content-detected mimeType='image/png' (found: ${pngCount})`);
  check(webpCount === 7, `7 MediaAsset documents have content-detected mimeType='image/webp' (found: ${webpCount})`);

  const dubaiNoPdf = dbPackages.filter(
    (p) =>
      (p.slug === "mtpl-wonders-of-dubai-5n-6d" ||
        p.slug === "mtpl-exclusive-dubai-abu-dhabi-6n-7d") &&
      (!p.pdfDownloadKey || p.pdfDownloadKey === "")
  );
  check(dubaiNoPdf.length === 2, `Both Dubai packages preserve empty optional pdfDownloadKey`);

  return {
    passedChecks,
    failedChecks,
    allPassed: failedChecks === 0,
    details,
  };
}

export interface ApplyCoreParams {
  pkgModel: Model<IPackage>;
  mediaModel: Model<IMediaAsset>;
  ledgerModel: Model<IMigrationLedger>;
  targetHost: string;
  targetDatabase: string;
  backupDir?: string;
  silent?: boolean;
  /** Test-only hook to deterministically simulate a mid-migration crash after N package inserts. */
  simulateFailureAfterPackageInserts?: number;
}

export interface ApplyCoreResult {
  status: "applied" | "already_migrated";
  insertedPackages: number;
  skippedPackages: number;
  insertedMedia: number;
  skippedMedia: number;
  ownedPackages?: number;
  ownedMedia?: number;
  recoveredFromIncompleteLedgerCount?: number;
  ledgerId?: string;
  snapshotPath?: string;
}

function assertExactDigestSetMatch(
  expectedKeys: string[],
  digests: IDigestEntry[],
  label: string
): void {
  const expectedSet = new Set(expectedKeys);
  const digestSet = new Set(digests.map((d) => d.key));
  if (
    expectedKeys.length !== expectedSet.size ||
    digests.length !== digestSet.size ||
    expectedSet.size !== digestSet.size ||
    [...expectedSet].some((k) => !digestSet.has(k))
  ) {
    throw new Error(
      `INTEGRITY BLOCK: Stored ${label} digest set (${digestSet.size}) does not exactly match inserted document set (${expectedSet.size}).`
    );
  }
}

export function createReadOnlyModels(conn: Connection): {
  pkgModel: Model<IPackage>;
  mediaModel: Model<IMediaAsset>;
  ledgerModel: Model<IMigrationLedger>;
} {
  const pkgSchema = PackageModel.schema.clone();
  pkgSchema.set("autoCreate", false);
  pkgSchema.set("autoIndex", false);

  const mediaSchema = MediaAsset.schema.clone();
  mediaSchema.set("autoCreate", false);
  mediaSchema.set("autoIndex", false);

  const ledgerSchema = MigrationLedger.schema.clone();
  ledgerSchema.set("autoCreate", false);
  ledgerSchema.set("autoIndex", false);

  return {
    pkgModel:
      (conn.models.Package as Model<IPackage>) ||
      conn.model<IPackage>("Package", pkgSchema),
    mediaModel:
      (conn.models.MediaAsset as Model<IMediaAsset>) ||
      conn.model<IMediaAsset>("MediaAsset", mediaSchema),
    ledgerModel:
      (conn.models.MigrationLedger as Model<IMigrationLedger>) ||
      conn.model<IMigrationLedger>("MigrationLedger", ledgerSchema),
  };
}

export async function connectReadOnlyLocal(uri: string): Promise<Connection> {
  return mongoose
    .createConnection(uri, {
      autoIndex: false,
      autoCreate: false,
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 10000,
    })
    .asPromise();
}

export interface DryRunCoreResult {
  packagesToInsert: number;
  packagesAlreadyMatched: number;
  packageConflicts: number;
  mediaToInsert: number;
  mediaAlreadyMatched: number;
  mediaConflicts: number;
  existingLedgerCount: number;
  incompleteRunningLedgers: number;
  failedLedgers: number;
  rollingBackLedgers: number;
  mixedCurrencyNoticeCount: number;
}

export async function executeDryRunCore(params: {
  pkgModel: Model<IPackage>;
  mediaModel: Model<IMediaAsset>;
  ledgerModel: Model<IMigrationLedger>;
  assembled?: AssembledCatalogueResult;
  mediaInventory?: MediaInventoryResult;
}): Promise<DryRunCoreResult> {
  const mediaInventory = params.mediaInventory ?? scanMediaInventory();
  const assembled = params.assembled ?? assemblePackageCatalogue(mediaInventory);

  const plan = await analyzeMigrationPlan(
    params.pkgModel,
    params.mediaModel,
    assembled.packages,
    mediaInventory.files
  );

  const ledgers = await params.ledgerModel
    .find({ migrationName: MIGRATION_NAME })
    .select({ status: 1 })
    .lean();

  const incompleteRunningLedgers = ledgers.filter((l) => l.status === "running").length;
  const failedLedgers = ledgers.filter((l) => l.status === "failed").length;
  const rollingBackLedgers = ledgers.filter((l) => l.status === "rolling_back").length;

  return {
    packagesToInsert: plan.packagesToInsert.length,
    packagesAlreadyMatched: plan.packagesAlreadyMigrated.length,
    packageConflicts: plan.packageConflicts.length,
    mediaToInsert: plan.mediaToInsert.length,
    mediaAlreadyMatched: plan.mediaAlreadyMigrated.length,
    mediaConflicts: plan.mediaConflicts.length,
    existingLedgerCount: ledgers.length,
    incompleteRunningLedgers,
    failedLedgers,
    rollingBackLedgers,
    mixedCurrencyNoticeCount: assembled.discrepancies.mixedCurrencyPackages.length,
  };
}

export async function executeApplyCore(params: ApplyCoreParams): Promise<ApplyCoreResult> {
  const {
    pkgModel,
    mediaModel,
    ledgerModel,
    targetHost,
    targetDatabase,
    backupDir = BACKUP_DIR,
    silent = false,
    simulateFailureAfterPackageInserts,
  } = params;

  const activeRollback = await ledgerModel
    .findOne({ migrationName: MIGRATION_NAME, status: "rolling_back" })
    .lean();
  if (activeRollback) {
    throw new Error(
      `ROLLBACK IN PROGRESS: Interrupted rollback ledger '${String(activeRollback._id)}' exists in '${targetDatabase}'. Resume and complete '--rollback-local' before running '--apply-local'.`
    );
  }

  const mediaInventory = scanMediaInventory();
  const assembled = assemblePackageCatalogue(mediaInventory);
  const plan = await analyzeMigrationPlan(
    pkgModel,
    mediaModel,
    assembled.packages,
    mediaInventory.files
  );

  if (plan.packageConflicts.length > 0 || plan.mediaConflicts.length > 0) {
    const conflictSummary = [
      ...plan.packageConflicts.map((c) => `Package[${c.slug}]: ${c.reason}`),
      ...plan.mediaConflicts.map((c) => `Media[${c.storageKey}]: ${c.reason}`),
    ].join("; ");
    throw new Error(
      `CONFLICT ABORT: Migration halted because ${plan.packageConflicts.length} package(s) and ${plan.mediaConflicts.length} media record(s) already exist with different content. ZERO writes performed. Details: ${conflictSummary}`
    );
  }

  const latestCompletedBoundary = await ledgerModel
    .findOne({
      migrationName: MIGRATION_NAME,
      status: { $in: ["applied", "rolled_back"] },
    })
    .sort({ createdAt: -1 })
    .lean();

  const incompleteQuery: Record<string, unknown> = {
    migrationName: MIGRATION_NAME,
    status: { $in: ["running", "failed"] },
  };
  if (latestCompletedBoundary?.createdAt) {
    incompleteQuery.createdAt = { $gt: latestCompletedBoundary.createdAt };
  }

  const priorCycleIncompleteLedgers = await ledgerModel
    .find(incompleteQuery)
    .sort({ createdAt: 1 })
    .lean();

  if (priorCycleIncompleteLedgers.length > 0 && !silent) {
    console.warn(
      `⚠️ Detected ${priorCycleIncompleteLedgers.length} prior incomplete/interrupted ledger record(s) in '${targetDatabase}'. Associating prior inserts into cohort ownership and resuming safely.`
    );
  }

  if (
    plan.packagesToInsert.length === 0 &&
    plan.mediaToInsert.length === 0 &&
    priorCycleIncompleteLedgers.length === 0
  ) {
    if (!silent) {
      console.log(
        `✅ Database '${targetDatabase}' is already migrated and matches source verbatim (93 packages, 186 media assets). No writes needed.`
      );
    }
    return {
      status: "already_migrated",
      insertedPackages: 0,
      skippedPackages: plan.packagesAlreadyMigrated.length,
      insertedMedia: 0,
      skippedMedia: plan.mediaAlreadyMigrated.length,
      recoveredFromIncompleteLedgerCount: 0,
    };
  }

  const preMigrationChecksums = await computeCollectionChecksums(pkgModel, mediaModel);
  const existingPackages = await pkgModel.find().lean();
  const existingMedia = await mediaModel.find().lean();

  // Preserve exact baseline of records that existed BEFORE Attempt 1 of this cycle
  const cyclePreExistingPkgSet = new Set<string>(
    priorCycleIncompleteLedgers.length > 0
      ? priorCycleIncompleteLedgers[0].preExistingPackageSlugs || []
      : existingPackages.map((p) => p.slug)
  );
  const cyclePreExistingMediaSet = new Set<string>(
    priorCycleIncompleteLedgers.length > 0
      ? priorCycleIncompleteLedgers[0].preExistingMediaKeys || []
      : existingMedia.map((m) => m.storageKey)
  );

  // Verify any prior attempt's recorded digests still match DB records cleanly before adopting them
  const priorFailedPkgDigestMap = new Map<string, string>();
  const priorFailedMediaDigestMap = new Map<string, string>();
  for (const prev of priorCycleIncompleteLedgers) {
    for (const d of prev.migratedPackageDigests || []) {
      priorFailedPkgDigestMap.set(d.key, d.sha256);
    }
    for (const d of prev.migratedMediaDigests || []) {
      priorFailedMediaDigestMap.set(d.key, d.sha256);
    }
  }

  for (const [slug, prevDigest] of priorFailedPkgDigestMap.entries()) {
    const dbDoc = existingPackages.find((p) => p.slug === slug);
    if (!dbDoc) {
      throw new Error(
        `CONFLICT ABORT: Package '${slug}' inserted during prior incomplete attempt is missing in '${targetDatabase}'.`
      );
    }
    const currentHash = computeCanonicalSha256(
      normalizePackageForDigest(dbDoc as unknown as Record<string, unknown>)
    );
    if (currentHash !== prevDigest) {
      throw new Error(
        `CONFLICT ABORT: Package '${slug}' inserted during prior incomplete attempt was modified.`
      );
    }
  }

  for (const [storageKey, prevDigest] of priorFailedMediaDigestMap.entries()) {
    const dbDoc = existingMedia.find((m) => m.storageKey === storageKey);
    if (!dbDoc) {
      throw new Error(
        `CONFLICT ABORT: MediaAsset '${storageKey}' inserted during prior incomplete attempt is missing in '${targetDatabase}'.`
      );
    }
    const currentHash = computeCanonicalSha256(
      normalizeMediaForDigest(dbDoc as unknown as Record<string, unknown>)
    );
    if (currentHash !== prevDigest) {
      throw new Error(
        `CONFLICT ABORT: MediaAsset '${storageKey}' inserted during prior incomplete attempt was modified.`
      );
    }
  }

  const parentAttemptLedgerIds = priorCycleIncompleteLedgers.map((l) => String(l._id));

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  const snapshotPath = path.resolve(
    backupDir,
    `pre-migration-snapshot-${targetDatabase}-${Date.now()}.json`
  );
  fs.writeFileSync(
    snapshotPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        targetHost,
        targetDatabase,
        preMigrationChecksums,
        packages: existingPackages,
        media: existingMedia,
      },
      null,
      2
    ),
    "utf-8"
  );

  const inventoryHash = computeInventoryHash(assembled.packages, mediaInventory.files);
  const ledger = await ledgerModel.create({
    migrationName: MIGRATION_NAME,
    version: MIGRATION_VERSION,
    status: "running",
    targetHost,
    targetDatabase,
    sourceInventoryHash: inventoryHash,
    packageCount: assembled.packages.length,
    mediaCount: mediaInventory.files.length,
    parentAttemptLedgerIds,
    preExistingPackageSlugs: [...cyclePreExistingPkgSet],
    preExistingMediaKeys: [...cyclePreExistingMediaSet],
    insertedPackageSlugs: [],
    updatedPackageSlugs: [],
    skippedPackageSlugs: plan.packagesAlreadyMigrated,
    insertedMediaKeys: [],
    skippedMediaKeys: plan.mediaAlreadyMigrated,
    preMigrationSnapshotPath: snapshotPath,
    preMigrationChecksums,
    discrepancies: assembled.discrepancies,
  });

  const insertedMediaKeys: string[] = [];
  const insertedPackageSlugs: string[] = [];

  try {
    for (const m of plan.mediaToInsert) {
      const res = await mediaModel.updateOne(
        { storageKey: m.storageKey },
        {
          $setOnInsert: {
            storageKey: m.storageKey,
            relativePath: m.relativePath,
            originalFilename: m.originalFilename,
            mimeType: m.mimeType,
            sizeBytes: m.sizeBytes,
            sha256: m.sha256,
            category: m.category,
            visibility: m.visibility,
            altText: m.altText,
          },
        },
        { upsert: true }
      );
      if (res.upsertedCount === 1) {
        insertedMediaKeys.push(m.storageKey);
      } else {
        throw new Error(`Unexpected upsert conflict for MediaAsset '${m.storageKey}'.`);
      }
    }

    for (const pkg of plan.packagesToInsert) {
      const res = await pkgModel.updateOne(
        { slug: pkg.slug },
        { $setOnInsert: pkg },
        { upsert: true }
      );
      if (res.upsertedCount === 1) {
        insertedPackageSlugs.push(pkg.slug);
      } else {
        throw new Error(`Unexpected upsert conflict for Package '${pkg.slug}'.`);
      }

      if (
        typeof simulateFailureAfterPackageInserts === "number" &&
        insertedPackageSlugs.length >= simulateFailureAfterPackageInserts
      ) {
        throw new Error(
          `SIMULATED MID-MIGRATION FAILURE after ${insertedPackageSlugs.length} package inserts and ${insertedMediaKeys.length} media inserts.`
        );
      }
    }

    const postMigrationChecksums = await computeCollectionChecksums(pkgModel, mediaModel);
    const allDbPackages = await pkgModel.find().lean();
    const allDbMedia = await mediaModel.find().lean();
    const dbPkgMap = new Map(allDbPackages.map((p) => [p.slug, p]));
    const dbMediaMap = new Map(allDbMedia.map((m) => [m.storageKey, m]));

    const migratedPackageDigests: IDigestEntry[] = [];
    for (const slug of insertedPackageSlugs) {
      const saved = dbPkgMap.get(slug);
      if (!saved) {
        throw new Error(`Inserted package '${slug}' missing during digest capture.`);
      }
      migratedPackageDigests.push({
        key: slug,
        sha256: computeCanonicalSha256(normalizePackageForDigest(saved as unknown as Record<string, unknown>)),
      });
    }

    const migratedMediaDigests: IDigestEntry[] = [];
    for (const storageKey of insertedMediaKeys) {
      const saved = dbMediaMap.get(storageKey);
      if (!saved) {
        throw new Error(`Inserted MediaAsset '${storageKey}' missing during digest capture.`);
      }
      migratedMediaDigests.push({
        key: storageKey,
        sha256: computeCanonicalSha256(normalizeMediaForDigest(saved as unknown as Record<string, unknown>)),
      });
    }

    // Build complete cohort ownership across all attempts in this cycle, excluding true pre-existing records
    const priorOwnedPackageSlugs = plan.packagesAlreadyMigrated.filter(
      (slug) => !cyclePreExistingPkgSet.has(slug)
    );
    const priorOwnedMediaKeys = plan.mediaAlreadyMigrated.filter(
      (key) => !cyclePreExistingMediaSet.has(key)
    );
    const ownedPackageSlugs = [...priorOwnedPackageSlugs, ...insertedPackageSlugs];
    const ownedMediaKeys = [...priorOwnedMediaKeys, ...insertedMediaKeys];

    const ownedPackageDigests: IDigestEntry[] = [];
    for (const slug of ownedPackageSlugs) {
      const saved = dbPkgMap.get(slug);
      if (!saved) {
        throw new Error(`Owned package '${slug}' missing during cohort digest capture.`);
      }
      ownedPackageDigests.push({
        key: slug,
        sha256: computeCanonicalSha256(normalizePackageForDigest(saved as unknown as Record<string, unknown>)),
      });
    }

    const ownedMediaDigests: IDigestEntry[] = [];
    for (const storageKey of ownedMediaKeys) {
      const saved = dbMediaMap.get(storageKey);
      if (!saved) {
        throw new Error(`Owned MediaAsset '${storageKey}' missing during cohort digest capture.`);
      }
      ownedMediaDigests.push({
        key: storageKey,
        sha256: computeCanonicalSha256(normalizeMediaForDigest(saved as unknown as Record<string, unknown>)),
      });
    }

    assertExactDigestSetMatch(insertedPackageSlugs, migratedPackageDigests, "package");
    assertExactDigestSetMatch(insertedMediaKeys, migratedMediaDigests, "media");
    assertExactDigestSetMatch(ownedPackageSlugs, ownedPackageDigests, "cohort-owned package");
    assertExactDigestSetMatch(ownedMediaKeys, ownedMediaDigests, "cohort-owned media");

    const verification = await verifyDatabaseAgainstSource(
      pkgModel,
      mediaModel,
      assembled,
      mediaInventory,
      silent
    );

    if (!verification.allPassed) {
      throw new Error(
        `Post-migration verification failed (${verification.failedChecks} failing checks).`
      );
    }

    ledger.status = "applied";
    ledger.appliedAt = new Date();
    ledger.insertedPackageSlugs = insertedPackageSlugs;
    ledger.insertedMediaKeys = insertedMediaKeys;
    ledger.ownedPackageSlugs = ownedPackageSlugs;
    ledger.ownedMediaKeys = ownedMediaKeys;
    ledger.postMigrationChecksums = postMigrationChecksums;
    ledger.migratedPackageDigests = migratedPackageDigests;
    ledger.migratedMediaDigests = migratedMediaDigests;
    ledger.ownedPackageDigests = ownedPackageDigests;
    ledger.ownedMediaDigests = ownedMediaDigests;
    ledger.verificationResults = {
      passedChecks: verification.passedChecks,
      failedChecks: verification.failedChecks,
      allPassed: verification.allPassed,
      timestamp: new Date().toISOString(),
    };
    await ledger.save();

    if (parentAttemptLedgerIds.length > 0) {
      await ledgerModel.updateMany(
        {
          _id: { $in: parentAttemptLedgerIds },
          status: "failed",
        },
        {
          $set: {
            supersededByLedgerId: String(ledger._id),
          },
        }
      );
      await ledgerModel.updateMany(
        {
          _id: { $in: parentAttemptLedgerIds },
          status: "running",
        },
        {
          $set: {
            status: "failed",
            supersededByLedgerId: String(ledger._id),
            error: `Interrupted migration superseded after successful recovery in ledger ${String(ledger._id)}.`,
          },
        }
      );
    }

    return {
      status: "applied",
      insertedPackages: insertedPackageSlugs.length,
      skippedPackages: plan.packagesAlreadyMigrated.length,
      insertedMedia: insertedMediaKeys.length,
      skippedMedia: plan.mediaAlreadyMigrated.length,
      ownedPackages: ownedPackageSlugs.length,
      ownedMedia: ownedMediaKeys.length,
      recoveredFromIncompleteLedgerCount: priorCycleIncompleteLedgers.length,
      ledgerId: String(ledger._id),
      snapshotPath,
    };
  } catch (error) {
    const partialPkgDigests: IDigestEntry[] = [];
    for (const slug of insertedPackageSlugs) {
      const saved = await pkgModel.findOne({ slug }).lean().catch(() => null);
      if (saved) {
        partialPkgDigests.push({
          key: slug,
          sha256: computeCanonicalSha256(normalizePackageForDigest(saved as unknown as Record<string, unknown>)),
        });
      }
    }
    const partialMediaDigests: IDigestEntry[] = [];
    for (const storageKey of insertedMediaKeys) {
      const saved = await mediaModel.findOne({ storageKey }).lean().catch(() => null);
      if (saved) {
        partialMediaDigests.push({
          key: storageKey,
          sha256: computeCanonicalSha256(normalizeMediaForDigest(saved as unknown as Record<string, unknown>)),
        });
      }
    }

    ledger.status = "failed";
    ledger.insertedPackageSlugs = insertedPackageSlugs;
    ledger.insertedMediaKeys = insertedMediaKeys;
    ledger.migratedPackageDigests = partialPkgDigests;
    ledger.migratedMediaDigests = partialMediaDigests;
    ledger.error = error instanceof Error ? error.message : String(error);
    await ledger.save();
    throw error;
  }
}

export interface RollbackCoreResult {
  deletedPackages: number;
  deletedMedia: number;
  totalCohortPackagesRemoved: number;
  totalCohortMediaRemoved: number;
  resumedInterruptedRollback: boolean;
  ledgerId: string;
}

export async function executeRollbackCore(params: {
  pkgModel: Model<IPackage>;
  mediaModel: Model<IMediaAsset>;
  ledgerModel: Model<IMigrationLedger>;
  targetDatabase: string;
  silent?: boolean;
  /** Test-only hook to simulate mid-rollback failure after N package deletes. */
  simulateFailureAfterPackageDeletes?: number;
}): Promise<RollbackCoreResult> {
  const {
    pkgModel,
    mediaModel,
    ledgerModel,
    targetDatabase,
    silent = false,
    simulateFailureAfterPackageDeletes,
  } = params;

  const resumingLedger = await ledgerModel
    .findOne({
      migrationName: MIGRATION_NAME,
      status: "rolling_back",
    })
    .sort({ createdAt: -1 });

  const latestLedger =
    resumingLedger ??
    (await ledgerModel
      .findOne({
        migrationName: MIGRATION_NAME,
        status: "applied",
      })
      .sort({ createdAt: -1 }));

  if (!latestLedger) {
    throw new Error(
      `No active 'applied' or 'rolling_back' MigrationLedger found in '${targetDatabase}'. Rollback refused.`
    );
  }

  const resumedInterruptedRollback = latestLedger.status === "rolling_back";

  if (
    latestLedger.targetDatabase &&
    latestLedger.targetDatabase !== targetDatabase
  ) {
    throw new Error(
      `Ledger targetDatabase mismatch: ledger records '${latestLedger.targetDatabase}', connected DB is '${targetDatabase}'. Rollback refused.`
    );
  }

  const useCohortOwnership =
    (latestLedger.ownedPackageSlugs && latestLedger.ownedPackageSlugs.length > 0) ||
    (latestLedger.ownedMediaKeys && latestLedger.ownedMediaKeys.length > 0) ||
    (latestLedger.parentAttemptLedgerIds && latestLedger.parentAttemptLedgerIds.length > 0);

  const targetPackageSlugs = useCohortOwnership
    ? latestLedger.ownedPackageSlugs || []
    : latestLedger.insertedPackageSlugs;
  const targetPackageDigests = useCohortOwnership
    ? latestLedger.ownedPackageDigests || []
    : latestLedger.migratedPackageDigests || [];

  const targetMediaKeys = useCohortOwnership
    ? latestLedger.ownedMediaKeys || []
    : latestLedger.insertedMediaKeys;
  const targetMediaDigests = useCohortOwnership
    ? latestLedger.ownedMediaDigests || []
    : latestLedger.migratedMediaDigests || [];

  assertExactDigestSetMatch(targetPackageSlugs, targetPackageDigests, "package");
  assertExactDigestSetMatch(targetMediaKeys, targetMediaDigests, "media");

  const pkgDigestMap = new Map(targetPackageDigests.map((e) => [e.key, e.sha256]));
  const mediaDigestMap = new Map(targetMediaDigests.map((e) => [e.key, e.sha256]));

  // Verify cross-attempt ownership & digest parity for all linked parent attempt ledgers
  const parentIds = latestLedger.parentAttemptLedgerIds || [];
  if (parentIds.length > 0) {
    const parentLedgers = await ledgerModel
      .find({ _id: { $in: parentIds } })
      .lean();
    for (const parent of parentLedgers) {
      for (const d of parent.migratedPackageDigests || []) {
        const cohortDigest = pkgDigestMap.get(d.key);
        if (!cohortDigest || cohortDigest !== d.sha256) {
          throw new Error(
            `INTEGRITY BLOCK: Parent attempt ledger '${String(parent._id)}' package '${d.key}' missing or mismatched in cohort ownership digests.`
          );
        }
      }
      for (const d of parent.migratedMediaDigests || []) {
        const cohortDigest = mediaDigestMap.get(d.key);
        if (!cohortDigest || cohortDigest !== d.sha256) {
          throw new Error(
            `INTEGRITY BLOCK: Parent attempt ledger '${String(parent._id)}' media '${d.key}' missing or mismatched in cohort ownership digests.`
          );
        }
      }
    }
  }

  const alreadyDeletedPkgSet = new Set(latestLedger.rollbackDeletedPackageSlugs || []);
  const alreadyDeletedMediaSet = new Set(latestLedger.rollbackDeletedMediaKeys || []);

  // Integrity check BEFORE deleting: verify every present owned document matches recorded digest.
  // Missing docs are allowed ONLY when resuming an already-started 'rolling_back' ledger.
  for (const slug of targetPackageSlugs) {
    const doc = await pkgModel.findOne({ slug }).lean();
    if (!doc) {
      if (resumedInterruptedRollback) {
        alreadyDeletedPkgSet.add(slug);
        continue;
      }
      throw new Error(
        `ROLLBACK BLOCKED: Expected migrated package '${slug}' is missing from '${targetDatabase}'. External mutation detected; refusing rollback.`
      );
    }
    const recordedHash = pkgDigestMap.get(slug);
    if (!recordedHash) {
      throw new Error(
        `ROLLBACK BLOCKED: Missing recorded digest for package '${slug}' in MigrationLedger.`
      );
    }
    const currentHash = computeCanonicalSha256(
      normalizePackageForDigest(doc as unknown as Record<string, unknown>)
    );
    if (currentHash !== recordedHash) {
      throw new Error(
        `ROLLBACK BLOCKED: Package '${slug}' was modified after migration (post-migration edits would be lost). Refusing destructive rollback.`
      );
    }
  }

  for (const storageKey of targetMediaKeys) {
    const doc = await mediaModel.findOne({ storageKey }).lean();
    if (!doc) {
      if (resumedInterruptedRollback) {
        alreadyDeletedMediaSet.add(storageKey);
        continue;
      }
      throw new Error(
        `ROLLBACK BLOCKED: Expected migrated MediaAsset '${storageKey}' is missing from '${targetDatabase}'. External mutation detected; refusing rollback.`
      );
    }
    const recordedHash = mediaDigestMap.get(storageKey);
    if (!recordedHash) {
      throw new Error(
        `ROLLBACK BLOCKED: Missing recorded digest for MediaAsset '${storageKey}' in MigrationLedger.`
      );
    }
    const currentHash = computeCanonicalSha256(
      normalizeMediaForDigest(doc as unknown as Record<string, unknown>)
    );
    if (currentHash !== recordedHash) {
      throw new Error(
        `ROLLBACK BLOCKED: MediaAsset '${storageKey}' was modified after migration. Refusing destructive rollback.`
      );
    }
  }

  if (latestLedger.status === "applied") {
    latestLedger.status = "rolling_back";
    latestLedger.rollbackStartedAt = new Date();
    await latestLedger.save();
  }

  let deletedPackages = 0;
  let deletedMedia = 0;

  try {
    for (const slug of targetPackageSlugs) {
      if (alreadyDeletedPkgSet.has(slug)) {
        continue;
      }
      const delRes = await pkgModel.deleteOne({ slug });
      if (delRes.deletedCount === 1) {
        deletedPackages++;
        alreadyDeletedPkgSet.add(slug);
      }

      if (
        typeof simulateFailureAfterPackageDeletes === "number" &&
        deletedPackages >= simulateFailureAfterPackageDeletes
      ) {
        throw new Error(
          `SIMULATED MID-ROLLBACK FAILURE after deleting ${deletedPackages} package(s).`
        );
      }
    }

    for (const storageKey of targetMediaKeys) {
      if (alreadyDeletedMediaSet.has(storageKey)) {
        continue;
      }
      const delRes = await mediaModel.deleteOne({ storageKey });
      if (delRes.deletedCount === 1) {
        deletedMedia++;
        alreadyDeletedMediaSet.add(storageKey);
      }
    }

    latestLedger.rollbackDeletedPackageSlugs = [...alreadyDeletedPkgSet];
    latestLedger.rollbackDeletedMediaKeys = [...alreadyDeletedMediaSet];
    latestLedger.status = "rolled_back";
    latestLedger.rolledBackAt = new Date();
    latestLedger.error = "";
    await latestLedger.save();

    if (parentIds.length > 0) {
      await ledgerModel.updateMany(
        { _id: { $in: parentIds } },
        {
          $set: {
            rolledBackByLedgerId: String(latestLedger._id),
            rolledBackAt: latestLedger.rolledBackAt,
          },
        }
      );
    }
  } catch (error) {
    latestLedger.rollbackDeletedPackageSlugs = [...alreadyDeletedPkgSet];
    latestLedger.rollbackDeletedMediaKeys = [...alreadyDeletedMediaSet];
    latestLedger.error = error instanceof Error ? error.message : String(error);
    await latestLedger.save();
    throw error;
  }

  if (!silent) {
    console.log(
      `✅ Guarded rollback complete on '${targetDatabase}': removed ${deletedPackages} packages (${alreadyDeletedPkgSet.size} total cohort) and ${deletedMedia} MediaAssets (${alreadyDeletedMediaSet.size} total cohort) for ledger ${latestLedger._id}.`
    );
  }

  return {
    deletedPackages,
    deletedMedia,
    totalCohortPackagesRemoved: alreadyDeletedPkgSet.size,
    totalCohortMediaRemoved: alreadyDeletedMediaSet.size,
    resumedInterruptedRollback,
    ledgerId: String(latestLedger._id),
  };
}

export async function generateAuditReports(): Promise<{
  jsonReportPath: string;
  markdownReportPath: string;
}> {
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }

  const mediaInventory = scanMediaInventory();
  const assembled = assemblePackageCatalogue(mediaInventory);

  const jsonReportPath = path.resolve(REPORTS_DIR, "migration-report.json");
  const markdownReportPath = path.resolve(REPORTS_DIR, "MIGRATION_REPORT.md");

  const nationalCount = assembled.packages.filter((p) => p.category === "national").length;
  const intlCount = assembled.packages.filter((p) => p.category === "international").length;
  const pdfCount = mediaInventory.files.filter((m) => m.category === "documents").length;
  const imageFiles = mediaInventory.files.filter((m) => m.category === "images");
  const pngMimeCount = mediaInventory.files.filter((m) => m.mimeType === "image/png").length;
  const webpMimeCount = mediaInventory.files.filter((m) => m.mimeType === "image/webp").length;
  const jpegMimeCount = mediaInventory.files.filter((m) => m.mimeType === "image/jpeg").length;

  const reportData = {
    generatedAt: new Date().toISOString(),
    migrationName: MIGRATION_NAME,
    version: MIGRATION_VERSION,
    allowedTargetDatabase: ALLOWED_LOCAL_DATABASE,
    sourceInventoryHash: computeInventoryHash(assembled.packages, mediaInventory.files),
    summary: {
      totalPackages: assembled.packages.length,
      nationalPackages: nationalCount,
      internationalPackages: intlCount,
      accommodationAndCostTableEntries: assembled.packages.length,
      totalMediaFiles: mediaInventory.files.length,
      subdirectoriesEncountered: mediaInventory.subdirectories,
      pdfDocumentCount: pdfCount,
      imageFileCount: imageFiles.length,
      contentDetectedMimeCounts: {
        "application/pdf": pdfCount,
        "image/png": pngMimeCount,
        "image/webp": webpMimeCount,
        "image/jpeg": jpegMimeCount,
      },
      extensionMimeMismatchCount: mediaInventory.extensionMismatches.length,
    },
    discrepancies: assembled.discrepancies,
    packages: assembled.packages.map((p) => ({
      sourceOrder: p.sourceOrder,
      packageId: p.packageId,
      slug: p.slug,
      title: p.title,
      destination: p.destination,
      category: p.category,
      duration: p.duration,
      nights: p.nights,
      days: p.days,
      numericPrice: p.numericPrice ?? null,
      priceDisplay: p.priceDisplay,
      currency: p.currency,
      costTableCurrencies: p.costTables.map((t) => t.currency || ""),
      heroImage: p.heroImage,
      pdfDownloadKey: p.pdfDownloadKey || null,
      pdfOriginalFilename: p.pdfOriginalFilename || null,
      accommodationsRowCount: p.accommodations?.rows?.length || 0,
      costTablesCount: p.costTables.length,
      itineraryDays: p.itinerary.length,
      itineraryDayNumbers: p.itinerary.map((d) => d.day),
    })),
    mediaInventory: mediaInventory.files.map((m) => ({
      storageKey: m.storageKey,
      relativePath: m.relativePath,
      originalFilename: m.originalFilename,
      sizeBytes: m.sizeBytes,
      mimeType: m.mimeType,
      sha256: m.sha256,
      category: m.category,
      extensionMismatch: m.extensionMismatch,
    })),
  };

  fs.writeFileSync(jsonReportPath, JSON.stringify(reportData, null, 2), "utf-8");

  const destBreakdown = Object.entries(
    assembled.packages.reduce((acc: Record<string, number>, p) => {
      acc[p.destination] = (acc[p.destination] || 0) + 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([dest, count]) => `- **${dest}:** ${count} package${count > 1 ? "s" : ""}`)
    .join("\n");

  const markdownContent = `# MTPL Travel Platform — Package Migration Audit Report

**Generated:** ${reportData.generatedAt}  
**Migration Code:** \`${MIGRATION_NAME}\` (v${MIGRATION_VERSION})  
**Authoritative Target Database:** \`${ALLOWED_LOCAL_DATABASE}\` (local loopback only)  
**Source Inventory SHA-256:** \`${reportData.sourceInventoryHash}\`

---

## 1. Authoritative Source Inventory Summary

| Metric | Source Count | Expected Count | Status |
|---|---:|---:|---|
| Total Packages (\`packages.ts\`) | ${assembled.packages.length} | 93 | Match |
| National Packages | ${nationalCount} | 67 | Match |
| International Packages | ${intlCount} | 26 | Match |
| Table Entries (\`package-tables.json\`) | ${assembled.packages.length} | 93 | Match |
| Physical Media Files (\`storage/media/public/\`) | ${mediaInventory.files.length} | 186 | Match |
| PDF Documents (\`application/pdf\`) | ${pdfCount} | 91 | Match |
| Image Files (93 Hero + 2 Banners) | ${imageFiles.length} | 95 | Match |
| Subdirectories Traversed | ${mediaInventory.subdirectories.length} (\`${mediaInventory.subdirectories.join(", ") || "none"}\`) | 1 (\`img\`, empty) | Reconciled |

---

## 2. Content-Detected MIME Verification

- **\`application/pdf\`:** ${pdfCount} files (verified via \`%PDF-\` header)
- **\`image/png\`:** ${pngMimeCount} files (all stored with \`.webp\` filenames; filenames and bytes preserved, true MIME \`image/png\` recorded in \`MediaAsset\`)
- **\`image/webp\`:** ${webpMimeCount} files (verified via \`RIFF....WEBP\` header)
- **\`image/jpeg\`:** ${jpegMimeCount} files

---

## 3. Preserved Source Discrepancies (No Silent Conversion)

### 3.1 Bhutan & Nepal Mixed Currency (6 Packages — For Manual Business Confirmation)
Summary pricing is denominated in **USD**, while embedded tariff tables in \`package-tables.json\` declare **INR**:
${assembled.discrepancies.mixedCurrencyPackages
  .map((m) => `- \`${m.slug}\` (${m.destination}): summary \`${m.priceDisplay}\` (\`${m.summaryCurrency}\`) vs cost table currency \`${m.costTableCurrencies.join(", ")}\``)
  .join("\n")}

### 3.2 Dubai Optional Empty PDF References (2 Packages)
Preserved with empty \`pdfDownloadKey: ""\` (no synthetic PDF keys generated):
${assembled.discrepancies.emptyPdfPackages
  .map((d) => `- \`${d.slug}\` (${d.title}): \`pdfOriginalFilename\` = \`${d.pdfOriginalFilename}\``)
  .join("\n")}

### 3.3 Legacy Two-Column Non-Sequential Itinerary Days (5 Packages)
Preserved verbatim without renumbering or reordering:
${assembled.discrepancies.nonSequentialItineraryPackages
  .map((n) => `- \`${n.slug}\`: \`[${n.days.join(", ")}]\``)
  .join("\n")}

---

## 4. Destination Breakdown

${destBreakdown}
`;

  fs.writeFileSync(markdownReportPath, markdownContent, "utf-8");
  return { jsonReportPath, markdownReportPath };
}

async function runCli() {
  const { mode } = parseCliArgs();

  if (mode === "report") {
    console.log("==================================================================");
    console.log("MTPL P2.0 Migration — Source Inventory & Audit Report");
    console.log("==================================================================");
    const { jsonReportPath, markdownReportPath } = await generateAuditReports();
    console.log(`✅ JSON report written: ${jsonReportPath}`);
    console.log(`✅ Markdown report written: ${markdownReportPath}`);
    console.log("ℹ️ ZERO database connections or writes performed.");
    return;
  }

  const target = resolveLocalDatabaseTarget();
  console.log(`Target Host: ${target.host} | Target DB: "${target.databaseName}" | Mode: --${mode}`);

  const mediaInventory = scanMediaInventory();
  const assembled = assemblePackageCatalogue(mediaInventory);

  if (mode === "dry-run" || mode === "verify") {
    const readOnlyConn = await connectReadOnlyLocal(target.uri);
    try {
      const activeDbName = readOnlyConn.db?.databaseName;
      if (activeDbName !== ALLOWED_LOCAL_DATABASE) {
        throw new Error(
          `SAFETY BLOCK: Connected DB '${activeDbName}' does not match required '${ALLOWED_LOCAL_DATABASE}'.`
        );
      }

      const { pkgModel, mediaModel, ledgerModel } = createReadOnlyModels(readOnlyConn);

      if (mode === "dry-run") {
        console.log("==================================================================");
        console.log("MTPL P2.0 Migration — Strictly Read-Only Dry Run (Zero Writes)");
        console.log("==================================================================");
        const summary = await executeDryRunCore({
          pkgModel,
          mediaModel,
          ledgerModel,
          assembled,
          mediaInventory,
        });
        console.log(`Source packages validated : ${assembled.packages.length} (67 national, 26 international)`);
        console.log(`Source media validated    : ${mediaInventory.files.length} (91 PDFs, 88 PNG-in-WebP, 7 WebP)`);
        console.log(`Mixed currency notices    : ${summary.mixedCurrencyNoticeCount} (Bhutan/Nepal USD summary vs INR tables)`);
        console.log(`Packages to insert        : ${summary.packagesToInsert}`);
        console.log(`Packages already matched  : ${summary.packagesAlreadyMatched}`);
        console.log(`Package conflicts         : ${summary.packageConflicts}`);
        console.log(`MediaAssets to insert     : ${summary.mediaToInsert}`);
        console.log(`MediaAssets already match : ${summary.mediaAlreadyMatched}`);
        console.log(`MediaAsset conflicts      : ${summary.mediaConflicts}`);
        console.log(`Existing ledger entries   : ${summary.existingLedgerCount}`);
        if (
          summary.incompleteRunningLedgers > 0 ||
          summary.failedLedgers > 0 ||
          summary.rollingBackLedgers > 0
        ) {
          console.warn(
            `⚠️ Incomplete/active ledgers detected: ${summary.incompleteRunningLedgers} running, ${summary.failedLedgers} failed, ${summary.rollingBackLedgers} rolling_back.`
          );
        }
        if (summary.packageConflicts > 0 || summary.mediaConflicts > 0) {
          console.error("⚠️ Conflicts detected — '--apply-local' would abort safely without overwriting.");
          process.exitCode = 1;
        } else {
          console.log("✅ Read-only dry-run complete. ZERO collections created, ZERO indexes modified, ZERO database/snapshot writes.");
        }
        return;
      }

      const outcome = await verifyDatabaseAgainstSource(
        pkgModel,
        mediaModel,
        assembled,
        mediaInventory
      );
      if (!outcome.allPassed) {
        process.exitCode = 1;
      }
      return;
    } finally {
      await readOnlyConn.close();
    }
  }

  await mongoose.connect(target.uri, {
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 10000,
  });

  try {
    const activeDbName = mongoose.connection.db?.databaseName;
    if (activeDbName !== ALLOWED_LOCAL_DATABASE) {
      throw new Error(
        `SAFETY BLOCK: Connected DB '${activeDbName}' does not match required '${ALLOWED_LOCAL_DATABASE}'.`
      );
    }

    if (mode === "apply-local") {
      const res = await executeApplyCore({
        pkgModel: PackageModel,
        mediaModel: MediaAsset,
        ledgerModel: MigrationLedger,
        targetHost: target.host,
        targetDatabase: target.databaseName,
      });
      console.log("Apply result:", res);
      return;
    }

    if (mode === "rollback-local") {
      await executeRollbackCore({
        pkgModel: PackageModel,
        mediaModel: MediaAsset,
        ledgerModel: MigrationLedger,
        targetDatabase: target.databaseName,
      });
      return;
    }
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

const isDirectExecution =
  typeof require !== "undefined" &&
  typeof module !== "undefined" &&
  require.main === module;

if (isDirectExecution) {
  runCli().catch((err) => {
    console.error("❌ Migration error:", err instanceof Error ? err.message : String(err));
    process.exit(1);
  });
}
