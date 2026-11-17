/**
 * MTPL Travel Platform — Phase 2 (P2.0): Package Migration & Data Integrity Automated Test Suite
 *
 * Tests authoritative source invariants, currency preservation without category inference,
 * recursive media scanning & binary signature detection, CLI flag guards, database safety
 * target validation, isolated disposable-DB migration apply, conflict blocking,
 * idempotent re-execution, and guarded rollback protection against post-migration edits.
 *
 * Strictly NEVER writes to real local database 'mtpl_dev'.
 *
 * Usage:
 *   npx tsx scripts/test-package-migration.ts
 */

import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { PackageModel, IPackage } from "../src/models/package";
import { MediaAsset, IMediaAsset } from "../src/models/media-asset";
import { MigrationLedger, IMigrationLedger } from "../src/models/migration-ledger";
import { authoritativePackages, getPackageCategory } from "../src/features/packages/data/packages";
import {
  ALLOWED_LOCAL_DATABASE,
  assemblePackageCatalogue,
  connectReadOnlyLocal,
  createReadOnlyModels,
  detectMimeTypeFromMagicBytes,
  executeApplyCore,
  executeDryRunCore,
  executeRollbackCore,
  loadPackageTables,
  parseCliArgs,
  resolveLocalDatabaseTarget,
  resolvePackageCurrency,
  scanMediaInventory,
  verifyDatabaseAgainstSource,
} from "./migrate-packages-to-mongodb";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, details?: string) {
  if (condition) {
    console.log(`  ✅ [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ [FAIL] ${testName}`);
    if (details) console.error(`            Details: ${details}`);
    failed++;
  }
}

function buildIsolatedTestUri(): string {
  const baseUri = process.env.MONGODB_URI || "";
  const validatedLocal = resolveLocalDatabaseTarget(baseUri, { ...process.env, NODE_ENV: "development" });
  const testDbName = `mtpl_p2_test_${Date.now()}`;
  const parsed = new URL(validatedLocal.uri.replace(/^mongodb:\/\//, "http://"));
  parsed.pathname = `/${testDbName}`;
  return parsed.toString().replace(/^http:\/\//, "mongodb://");
}

async function runTestSuite() {
  console.log("==================================================================");
  console.log("MTPL P2.0 — Package Migration & Safety Verification Test Suite");
  console.log("==================================================================\n");

  const tablesData = loadPackageTables();

  // ---------------------------------------------------------------------------
  // 1. Authoritative Catalogue Counts & Unique Slugs
  // ---------------------------------------------------------------------------
  console.log("1. Source Inventory & Slug Uniqueness:");
  assert(
    authoritativePackages.length === 93,
    `Authoritative source contains exactly 93 packages (found: ${authoritativePackages.length})`
  );
  const slugSet = new Set(authoritativePackages.map((p) => p.slug));
  assert(slugSet.size === 93, `Exactly 93 unique package slugs (found: ${slugSet.size})`);

  const national = authoritativePackages.filter((p) => getPackageCategory(p) === "national");
  const international = authoritativePackages.filter((p) => getPackageCategory(p) === "international");
  assert(national.length === 67, `Exactly 67 national packages (found: ${national.length})`);
  assert(international.length === 26, `Exactly 26 international packages (found: ${international.length})`);

  const tableKeys = Object.keys(tablesData);
  assert(tableKeys.length === 93, `Exactly 93 accommodation/cost-table entries (found: ${tableKeys.length})`);
  const completeTables = tableKeys.filter((k) => {
    const entry = tablesData[k];
    return (
      entry?.accommodations &&
      Array.isArray(entry.accommodations.headers) &&
      entry.accommodations.headers.length > 0 &&
      Array.isArray(entry.accommodations.rows) &&
      entry.accommodations.rows.length > 0 &&
      Array.isArray(entry.costTables) &&
      entry.costTables.length > 0
    );
  });
  assert(
    completeTables.length === 93,
    `All 93 accommodation and cost-table entries populated (found: ${completeTables.length})`
  );

  // ---------------------------------------------------------------------------
  // 2. Recursive Media Inventory, Binary Signature Detection & Security Guards
  // ---------------------------------------------------------------------------
  console.log("\n2. Recursive Media Inventory & Signature Validation:");
  const inventory = scanMediaInventory();
  const pdfFiles = inventory.files.filter((f) => f.category === "documents");
  const imgFiles = inventory.files.filter((f) => f.category === "images");
  const uniqueKeys = new Set(inventory.files.map((f) => f.storageKey));
  const uniqueRelPaths = new Set(inventory.files.map((f) => f.relativePath));

  assert(inventory.files.length === 186, `Exact physical media inventory is 186 files (found: ${inventory.files.length})`);
  assert(pdfFiles.length === 91, `Exactly 91 PDF files verified (found: ${pdfFiles.length})`);
  assert(imgFiles.length === 95, `Exactly 95 image files verified (93 hero + 2 category banners; found: ${imgFiles.length})`);
  assert(uniqueKeys.size === 186 && uniqueRelPaths.size === 186, "All 186 media files have unique storageKey and relativePath");
  assert(
    inventory.files.every((f) => f.relativePath === `public/${f.storageKey}` && f.sha256.length === 64),
    "Every media asset has valid physical relativePath and SHA-256 checksum"
  );

  const pngCount = inventory.files.filter((f) => f.mimeType === "image/png").length;
  const webpCount = inventory.files.filter((f) => f.mimeType === "image/webp").length;
  const pdfMimeCount = inventory.files.filter((f) => f.mimeType === "application/pdf").length;
  assert(pdfMimeCount === 91, `91 files content-detected as application/pdf (found: ${pdfMimeCount})`);
  assert(
    pngCount === 88 && inventory.extensionMismatches.length === 88,
    `88 '.webp' files preserved without renaming/conversion and content-detected as image/png (found: ${pngCount})`
  );
  assert(webpCount === 7, `7 '.webp' files content-detected as native image/webp (found: ${webpCount})`);

  // Test unknown binary signature rejection & nested directory recursive discovery in isolated temp dir
  const tmpMediaRoot = fs.mkdtempSync(path.join(os.tmpdir(), "mtpl-media-test-"));
  try {
    const tmpPublic = path.join(tmpMediaRoot, "public");
    const tmpNested = path.join(tmpPublic, "nested");
    fs.mkdirSync(tmpNested, { recursive: true });
    // Copy one real PDF into nested subdir
    fs.copyFileSync(inventory.files[0].fullPath, path.join(tmpNested, "nested-sample.pdf"));
    const nestedScan = scanMediaInventory(tmpPublic, tmpMediaRoot);
    assert(
      nestedScan.files.length === 1 &&
        nestedScan.files[0].storageKey === "nested/nested-sample.pdf" &&
        nestedScan.files[0].relativePath === "public/nested/nested-sample.pdf",
      "Recursive scan preserves relative subpath for nested media files"
    );

    // Add unknown binary payload and verify blocking throw
    const badBinaryPath = path.join(tmpPublic, "bad-unknown.webp");
    fs.writeFileSync(badBinaryPath, Buffer.from("NOT_A_REAL_IMAGE_OR_PDF"));
    let unknownBlocked = false;
    try {
      scanMediaInventory(tmpPublic, tmpMediaRoot);
    } catch (err) {
      unknownBlocked = err instanceof Error && err.message.includes("BLOCKING MEDIA ERROR");
    }
    assert(unknownBlocked, "Unrecognized binary file content blocks media scan instead of warning");
    fs.unlinkSync(badBinaryPath);

    // Verify symlink / directory junction rejection inside media root
    const outsideDir = path.join(tmpMediaRoot, "outside-escape");
    fs.mkdirSync(outsideDir, { recursive: true });
    const symlinkDir = path.join(tmpPublic, "escape-link");
    fs.symlinkSync(outsideDir, symlinkDir, process.platform === "win32" ? "junction" : "dir");
    let symlinkBlocked = false;
    try {
      scanMediaInventory(tmpPublic, tmpMediaRoot);
    } catch (err) {
      symlinkBlocked = err instanceof Error && err.message.includes("Symlink rejected");
    }
    assert(symlinkBlocked, "Symbolic link / junction inside media directory is blocked by scanMediaInventory");

    let sigError = false;
    try {
      detectMimeTypeFromMagicBytes(Buffer.from([0x00, 0x01, 0x02]), "fake.bin");
    } catch {
      sigError = true;
    }
    assert(sigError, "detectMimeTypeFromMagicBytes throws on unknown signature");
  } finally {
    fs.rmSync(tmpMediaRoot, { recursive: true, force: true });
  }

  // ---------------------------------------------------------------------------
  // 3. Field Preservation, Itinerary Order, Currency & Discrepancies
  // ---------------------------------------------------------------------------
  console.log("\n3. Field Preservation, Currency Without Inference & Anomalies:");
  const assembled = assemblePackageCatalogue(inventory);
  assert(assembled.packages.length === 93, "Assembled catalogue contains all 93 complete Package documents");

  // Verify complete field preservation for first & last packages
  const firstSrc = authoritativePackages[0];
  const firstAsm = assembled.packages[0];
  assert(
    firstAsm.packageId === firstSrc.id &&
      firstAsm.slug === firstSrc.slug &&
      firstAsm.title === firstSrc.title &&
      firstAsm.overview === (firstSrc.overview || "") &&
      firstAsm.highlights.length === (firstSrc.highlights?.length || 0) &&
      firstAsm.inclusions.length === (firstSrc.inclusions?.length || 0) &&
      firstAsm.exclusions.length === (firstSrc.exclusions?.length || 0) &&
      firstAsm.whatsAppHref === firstSrc.whatsAppHref &&
      firstAsm.accommodations !== null &&
      firstAsm.costTables.length > 0,
    "All Package fields, tables, highlights, inclusions, exclusions, and WhatsApp links preserved"
  );

  // Itinerary order & non-sequential day preservation (exact 5 source anomalies)
  assert(
    assembled.discrepancies.nonSequentialItineraryPackages.length === 5,
    `Exactly 5 non-sequential legacy itineraries preserved verbatim (found: ${assembled.discrepancies.nonSequentialItineraryPackages.length})`
  );
  const northEastSrc = authoritativePackages.find((p) => p.slug === "mtpl-3-sisters-of-the-north-east-11n-12d")!;
  const northEastItinerary = northEastSrc.itinerary ?? [];
  const northEastAsm = assembled.packages.find((p) => p.slug === "mtpl-3-sisters-of-the-north-east-11n-12d")!;
  assert(
    northEastItinerary.length > 0 &&
      northEastAsm.itinerary.length === northEastItinerary.length &&
      northEastItinerary.some((it, idx) => it.day !== idx + 1) &&
      northEastAsm.itinerary.every(
        (it, idx) =>
          it.day === northEastItinerary[idx].day &&
          it.title === northEastItinerary[idx].title.trim() &&
          it.description === northEastItinerary[idx].description.trim()
      ),
    "Out-of-order itinerary day numbers and order preserved without renumbering or sorting"
  );

  // Two optional Dubai PDF references
  const dubaiAssembled = assembled.discrepancies.emptyPdfPackages;
  assert(
    dubaiAssembled.length === 2 &&
      dubaiAssembled.some((d) => d.slug === "mtpl-wonders-of-dubai-5n-6d") &&
      dubaiAssembled.some((d) => d.slug === "mtpl-exclusive-dubai-abu-dhabi-6n-7d"),
    "Both Dubai packages preserved with empty pdfDownloadKey and zero synthetic PDFs"
  );

  // Currency resolution WITHOUT international-category inference
  const syntheticIntlInr = resolvePackageCurrency(
    {
      ...firstSrc,
      slug: "synthetic-intl-inr",
      category: "international",
      priceDisplay: "₹45,000",
      pricingBasis: "Per person INR",
    },
    { accommodations: null, costTables: [{ currency: "INR", headers: [], rows: [] }] }
  );
  assert(
    syntheticIntlInr.currency === "INR",
    "resolvePackageCurrency does NOT infer USD solely from category='international'"
  );

  assert(
    assembled.discrepancies.mixedCurrencyPackages.length === 6,
    `All 6 Bhutan/Nepal mixed-currency discrepancies (USD summary vs INR tables) detected without conversion (found: ${assembled.discrepancies.mixedCurrencyPackages.length})`
  );
  const bhutanAsm = assembled.packages.find((p) => p.slug === "mtpl-bhutan-tour-via-bagdogra-4n-5d")!;
  assert(
    bhutanAsm.currency === "USD" && bhutanAsm.costTables[0]?.currency === "INR",
    "Bhutan package preserves source summary USD and cost table INR verbatim"
  );

  // Missing or ambiguous currency MUST fail (no default: "INR" fallback)
  const currencySchemaPath = PackageModel.schema.path("currency") as unknown as {
    isRequired?: boolean;
    defaultValue?: unknown;
  };
  assert(
    currencySchemaPath.isRequired === true && currencySchemaPath.defaultValue === undefined,
    "PackageSchema.currency is strictly required and has NO default value"
  );

  const withoutCurrency = { ...firstAsm } as Record<string, unknown>;
  delete withoutCurrency.currency;
  const missingCurrencyValidation = await new PackageModel(withoutCurrency)
    .validate()
    .then(() => null, (err: { errors?: Record<string, unknown> }) => err);
  assert(
    Boolean(missingCurrencyValidation?.errors?.currency),
    "Mongoose PackageModel rejects missing currency instead of defaulting to INR"
  );

  const invalidCurrencyValidation = await new PackageModel({
    ...firstAsm,
    currency: "EUR",
  })
    .validate()
    .then(() => null, (err: { errors?: Record<string, unknown> }) => err);
  assert(
    Boolean(invalidCurrencyValidation?.errors?.currency),
    "Mongoose PackageModel rejects unsupported currency value 'EUR'"
  );

  let missingCurrencyThrew = false;
  try {
    resolvePackageCurrency(
      {
        ...firstSrc,
        slug: "synthetic-missing-currency",
        category: "international",
        priceDisplay: "Price on Request",
        pricingBasis: "Per person",
      },
      { accommodations: null, costTables: [{ currency: "", headers: [], rows: [] }] }
    );
  } catch {
    missingCurrencyThrew = true;
  }
  assert(missingCurrencyThrew, "resolvePackageCurrency blocks when currency cannot be determined reliably");

  let ambiguousSummaryThrew = false;
  try {
    resolvePackageCurrency(
      {
        ...firstSrc,
        slug: "synthetic-ambiguous-summary",
        priceDisplay: "₹45,000 / $600 USD",
        pricingBasis: "",
      },
      { accommodations: null, costTables: [] }
    );
  } catch {
    ambiguousSummaryThrew = true;
  }
  assert(ambiguousSummaryThrew, "resolvePackageCurrency blocks ambiguous INR+USD summary pricing");

  let conflictingTablesThrew = false;
  try {
    resolvePackageCurrency(
      {
        ...firstSrc,
        slug: "synthetic-conflicting-tables",
        priceDisplay: "Custom Tariff",
        pricingBasis: "Per person",
      },
      {
        accommodations: null,
        costTables: [
          { currency: "INR", headers: [], rows: [] },
          { currency: "USD", headers: [], rows: [] },
        ],
      }
    );
  } catch {
    conflictingTablesThrew = true;
  }
  assert(conflictingTablesThrew, "resolvePackageCurrency blocks conflicting INR+USD table currencies without summary indicator");

  // ---------------------------------------------------------------------------
  // 4. CLI Flags & Database Safety Blocking Rules
  // ---------------------------------------------------------------------------
  console.log("\n4. CLI Mode Guards & Local Database Target Validation:");
  const blockedTargets: Array<[string, string | undefined, NodeJS.ProcessEnv?]> = [
    ["Missing MONGODB_URI", undefined],
    ["Atlas mongodb+srv URI", "mongodb+srv://user:pass@cluster0.mongodb.net/mtpl_dev"],
    ["Remote hostname", "mongodb://user:pass@db.example.com:27017/mtpl_dev"],
    ["Remote LAN IP", "mongodb://user:pass@192.168.1.50:27017/mtpl_dev"],
    ["Missing DB path (silent test fallback attempt)", "mongodb://user:pass@127.0.0.1:27017"],
    ["Empty DB slash (silent test fallback attempt)", "mongodb://user:pass@127.0.0.1:27017/?authSource=admin"],
    ["Explicit 'test' DB", "mongodb://user:pass@127.0.0.1:27017/test?authSource=admin"],
    ["Production DB name", "mongodb://user:pass@127.0.0.1:27017/mtpl_production?authSource=admin"],
    ["Non-mtpl_dev DB name", "mongodb://user:pass@127.0.0.1:27017/other_db?authSource=admin"],
    [
      "NODE_ENV=production rejected",
      "mongodb://user:pass@127.0.0.1:27017/mtpl_dev?authSource=admin",
      { NODE_ENV: "production" },
    ],
    [
      "NEXT_PUBLIC_ENVIRONMENT=production rejected",
      "mongodb://user:pass@127.0.0.1:27017/mtpl_dev?authSource=admin",
      { NODE_ENV: "development", NEXT_PUBLIC_ENVIRONMENT: "production" },
    ],
  ];

  for (const [label, uri, envOverride] of blockedTargets) {
    let rejected = false;
    try {
      resolveLocalDatabaseTarget(uri, envOverride || { NODE_ENV: "development" });
    } catch {
      rejected = true;
    }
    assert(rejected, `Blocked invalid target: ${label}`);
  }

  const okTarget = resolveLocalDatabaseTarget(
    "mongodb://u:p@127.0.0.1:27017/mtpl_dev?authSource=admin",
    { NODE_ENV: "development" }
  );
  assert(
    okTarget.databaseName === ALLOWED_LOCAL_DATABASE && !okTarget.redactedUri.includes(":p@"),
    "Permits explicit local loopback targeting mtpl_dev and redacts credentials"
  );

  for (const badFlag of ["--apply", "--rollback", "--allow-remote"]) {
    let rejected = false;
    try {
      parseCliArgs([badFlag]);
    } catch {
      rejected = true;
    }
    assert(rejected, `CLI rejects forbidden flag '${badFlag}'`);
  }

  // ---------------------------------------------------------------------------
  // 5. Isolated Disposable-DB Integration Tests (Read-Only Dry Run, Apply, Recovery, Rollback)
  // ---------------------------------------------------------------------------
  console.log("\n5. Isolated Disposable-DB Read-Only Dry Run, Recovery, Conflict & Rollback Tests:");
  const testUri = buildIsolatedTestUri();
  const tempBackupDir = fs.mkdtempSync(path.join(os.tmpdir(), "mtpl-backup-test-"));

  // 5A. Prove dry-run creates ZERO collections, ZERO indexes, and ZERO documents on a clean DB
  const dryRunConn = await connectReadOnlyLocal(testUri);
  try {
    const roModels = createReadOnlyModels(dryRunConn);
    const emptyDryRun = await executeDryRunCore({
      pkgModel: roModels.pkgModel,
      mediaModel: roModels.mediaModel,
      ledgerModel: roModels.ledgerModel,
      assembled,
      mediaInventory: inventory,
    });
    const collectionsAfterDryRun = await dryRunConn.db!.listCollections().toArray();
    assert(
      emptyDryRun.packagesToInsert === 93 &&
        emptyDryRun.mediaToInsert === 186 &&
        emptyDryRun.existingLedgerCount === 0 &&
        collectionsAfterDryRun.length === 0,
      "Read-only dry-run creates ZERO collections, ZERO indexes, ZERO documents, and ZERO ledger entries"
    );
  } finally {
    await dryRunConn.dropDatabase();
    await dryRunConn.close();
  }

  const testConn = await mongoose.createConnection(testUri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  }).asPromise();

  try {
    const dbName = testConn.db!.databaseName;
    assert(
      dbName !== ALLOWED_LOCAL_DATABASE && dbName.startsWith("mtpl_p2_test_"),
      `Isolated disposable database verified: '${dbName}' (never touches '${ALLOWED_LOCAL_DATABASE}')`
    );

    const TestPackage = testConn.model<IPackage>("Package", PackageModel.schema.clone());
    const TestMedia = testConn.model<IMediaAsset>("MediaAsset", MediaAsset.schema.clone());
    const TestLedger = testConn.model<IMigrationLedger>("MigrationLedger", MigrationLedger.schema.clone());
    await TestPackage.syncIndexes();
    await TestMedia.syncIndexes();

    // Seed unrelated collection to confirm rollback isolation
    await testConn.db!.collection("enquiries").insertOne({ sample: "keep-intact" });

    // 5B. First Apply on Clean Isolated DB
    const firstApply = await executeApplyCore({
      pkgModel: TestPackage,
      mediaModel: TestMedia,
      ledgerModel: TestLedger,
      targetHost: "127.0.0.1:27017",
      targetDatabase: dbName,
      backupDir: tempBackupDir,
      silent: true,
    });
    const firstLedgerDoc = await TestLedger.findById(firstApply.ledgerId).lean();
    assert(
      firstApply.status === "applied" &&
        firstApply.insertedPackages === 93 &&
        firstApply.insertedMedia === 186 &&
        firstLedgerDoc?.migratedPackageDigests?.length === 93 &&
        firstLedgerDoc?.migratedMediaDigests?.length === 186,
      "Initial apply inserted all 93 packages and 186 MediaAssets with exact 1:1 digest sets"
    );

    const verifyPass = await verifyDatabaseAgainstSource(TestPackage, TestMedia, assembled, inventory, true);
    assert(verifyPass.allPassed, `verifyDatabaseAgainstSource passes all assertions (${verifyPass.passedChecks}/${verifyPass.passedChecks + verifyPass.failedChecks})`);

    // 5C. Idempotent Re-run
    const secondApply = await executeApplyCore({
      pkgModel: TestPackage,
      mediaModel: TestMedia,
      ledgerModel: TestLedger,
      targetHost: "127.0.0.1:27017",
      targetDatabase: dbName,
      backupDir: tempBackupDir,
      silent: true,
    });
    assert(
      secondApply.status === "already_migrated" &&
        secondApply.insertedPackages === 0 &&
        secondApply.skippedPackages === 93 &&
        secondApply.insertedMedia === 0 &&
        secondApply.skippedMedia === 186,
      "Idempotent re-run performs zero writes and skips 93 packages / 186 media assets"
    );

    // 5D. Guarded Rollback Blocks Post-Migration Edits
    await TestPackage.updateOne(
      { slug: "mtpl-amazing-andaman-4n-5d" },
      { $set: { title: "CMS Edited Post-Migration Title" } }
    );
    let rollbackBlockedAfterPkgEdit = false;
    try {
      await executeRollbackCore({
        pkgModel: TestPackage,
        mediaModel: TestMedia,
        ledgerModel: TestLedger,
        targetDatabase: dbName,
        silent: true,
      });
    } catch (err) {
      rollbackBlockedAfterPkgEdit =
        err instanceof Error && err.message.includes("ROLLBACK BLOCKED");
    }
    const postEditDoc = await TestPackage.findOne({ slug: "mtpl-amazing-andaman-4n-5d" }).lean();
    assert(
      rollbackBlockedAfterPkgEdit && postEditDoc?.title === "CMS Edited Post-Migration Title",
      "Rollback refuses to delete/overwrite package modified after migration"
    );

    // 5E. Existing Conflicting Document Blocks Re-Apply Without Overwriting
    let applyConflictBlocked = false;
    try {
      await executeApplyCore({
        pkgModel: TestPackage,
        mediaModel: TestMedia,
        ledgerModel: TestLedger,
        targetHost: "127.0.0.1:27017",
        targetDatabase: dbName,
        backupDir: tempBackupDir,
        silent: true,
      });
    } catch (err) {
      applyConflictBlocked = err instanceof Error && err.message.includes("CONFLICT ABORT");
    }
    const stillEditedDoc = await TestPackage.findOne({ slug: "mtpl-amazing-andaman-4n-5d" }).lean();
    assert(
      applyConflictBlocked && stillEditedDoc?.title === "CMS Edited Post-Migration Title",
      "Existing conflicting Package document blocks migration without overwriting"
    );

    // 5F. MediaAsset Conflict Also Blocks Migration
    await TestPackage.updateOne(
      { slug: "mtpl-amazing-andaman-4n-5d" },
      { $set: { title: "Glimpse Of Andaman" } }
    );
    await TestMedia.updateOne(
      { storageKey: "National-Category.webp" },
      { $set: { altText: "Edited Alt Text" } }
    );
    let mediaConflictBlocked = false;
    try {
      await executeApplyCore({
        pkgModel: TestPackage,
        mediaModel: TestMedia,
        ledgerModel: TestLedger,
        targetHost: "127.0.0.1:27017",
        targetDatabase: dbName,
        backupDir: tempBackupDir,
        silent: true,
      });
    } catch (err) {
      mediaConflictBlocked = err instanceof Error && err.message.includes("CONFLICT ABORT");
    }
    assert(mediaConflictBlocked, "Existing conflicting MediaAsset document blocks migration without overwriting");

    // 5G. Restore MediaAsset & Verify Clean Guarded Rollback Preserves Ledger & Unrelated Collections
    await TestMedia.updateOne(
      { storageKey: "National-Category.webp" },
      { $set: { altText: "National India Holiday Packages - Mishrikotkar Travels" } }
    );
    const cleanRollback = await executeRollbackCore({
      pkgModel: TestPackage,
      mediaModel: TestMedia,
      ledgerModel: TestLedger,
      targetDatabase: dbName,
      silent: true,
    });
    const remainingPkgs = await TestPackage.countDocuments();
    const remainingMedia = await TestMedia.countDocuments();
    const enquiriesCount = await testConn.db!.collection("enquiries").countDocuments();
    const rolledBackLedger = await TestLedger.findById(cleanRollback.ledgerId).lean();
    assert(
      cleanRollback.deletedPackages === 93 &&
        cleanRollback.deletedMedia === 186 &&
        remainingPkgs === 0 &&
        remainingMedia === 0 &&
        enquiriesCount === 1 &&
        rolledBackLedger?.status === "rolled_back" &&
        Boolean(rolledBackLedger?.rolledBackAt),
      "Unmodified clean rollback removes ledger-tracked records, preserves audit ledger, and keeps unrelated collections"
    );

    // 5H. Simulated Halfway Failure -> Retry -> Cohort Ownership -> Modify Attempt-1 Block -> Interrupted Rollback Resume
    await TestLedger.deleteMany({});
    let simulatedFailureCaught = false;
    try {
      await executeApplyCore({
        pkgModel: TestPackage,
        mediaModel: TestMedia,
        ledgerModel: TestLedger,
        targetHost: "127.0.0.1:27017",
        targetDatabase: dbName,
        backupDir: tempBackupDir,
        silent: true,
        simulateFailureAfterPackageInserts: 40,
      });
    } catch (err) {
      simulatedFailureCaught =
        err instanceof Error && err.message.includes("SIMULATED MID-MIGRATION FAILURE");
    }
    const failedLedger = await TestLedger.findOne({}).lean();
    const dryRunAfterFailure = await executeDryRunCore({
      pkgModel: TestPackage,
      mediaModel: TestMedia,
      ledgerModel: TestLedger,
      assembled,
      mediaInventory: inventory,
    });
    assert(
      simulatedFailureCaught &&
        failedLedger?.status === "failed" &&
        failedLedger.insertedMediaKeys.length === 186 &&
        failedLedger.insertedPackageSlugs.length === 40 &&
        dryRunAfterFailure.failedLedgers === 1 &&
        dryRunAfterFailure.packagesAlreadyMatched === 40 &&
        dryRunAfterFailure.packagesToInsert === 53 &&
        dryRunAfterFailure.mediaAlreadyMatched === 186 &&
        dryRunAfterFailure.mediaToInsert === 0,
      "Mid-migration failure records 'failed' status (never 'applied') and is detectable via dry-run & ledger"
    );

    const recoveryApply = await executeApplyCore({
      pkgModel: TestPackage,
      mediaModel: TestMedia,
      ledgerModel: TestLedger,
      targetHost: "127.0.0.1:27017",
      targetDatabase: dbName,
      backupDir: tempBackupDir,
      silent: true,
    });
    const recoveryLedger = await TestLedger.findById(recoveryApply.ledgerId).lean();
    const updatedFailedLedger = await TestLedger.findById(failedLedger!._id).lean();
    const recoveryVerify = await verifyDatabaseAgainstSource(TestPackage, TestMedia, assembled, inventory, true);
    assert(
      recoveryApply.status === "applied" &&
        recoveryApply.recoveredFromIncompleteLedgerCount === 1 &&
        recoveryApply.insertedMedia === 0 &&
        recoveryApply.skippedMedia === 186 &&
        recoveryApply.insertedPackages === 53 &&
        recoveryApply.skippedPackages === 40 &&
        recoveryApply.ownedPackages === 93 &&
        recoveryApply.ownedMedia === 186 &&
        Boolean(recoveryLedger?.parentAttemptLedgerIds?.includes(String(failedLedger!._id))) &&
        recoveryLedger?.ownedPackageSlugs?.length === 93 &&
        recoveryLedger?.ownedPackageDigests?.length === 93 &&
        recoveryLedger?.ownedMediaKeys?.length === 186 &&
        recoveryLedger?.ownedMediaDigests?.length === 186 &&
        updatedFailedLedger?.supersededByLedgerId === String(recoveryLedger?._id) &&
        recoveryVerify.allPassed,
      "Retry adopts Attempt 1 inserts into complete cohort ownership (93 packages / 186 media) with exact digest parity"
    );

    // Modify a package that was inserted during the EARLIER failed attempt -> rollback MUST block!
    const attempt1PkgSlug = failedLedger!.insertedPackageSlugs[0];
    const originalAttempt1Pkg = await TestPackage.findOne({ slug: attempt1PkgSlug }).lean();
    await TestPackage.updateOne(
      { slug: attempt1PkgSlug },
      { $set: { title: "Modified Attempt-1 Package" } }
    );
    let attempt1EditBlockedRollback = false;
    try {
      await executeRollbackCore({
        pkgModel: TestPackage,
        mediaModel: TestMedia,
        ledgerModel: TestLedger,
        targetDatabase: dbName,
        silent: true,
      });
    } catch (err) {
      attempt1EditBlockedRollback =
        err instanceof Error && err.message.includes("ROLLBACK BLOCKED");
    }
    const postAttempt1BlockPkgCount = await TestPackage.countDocuments();
    const postAttempt1BlockMediaCount = await TestMedia.countDocuments();
    assert(
      attempt1EditBlockedRollback &&
        postAttempt1BlockPkgCount === 93 &&
        postAttempt1BlockMediaCount === 186,
      "Rollback refuses cleanly when a document from an earlier failed attempt has been modified post-migration"
    );

    // Restore Attempt-1 package title cleanly
    await TestPackage.updateOne(
      { slug: attempt1PkgSlug },
      { $set: { title: originalAttempt1Pkg!.title } }
    );

    // Simulate interrupted rollback after 25 package deletes -> then resume safely
    let midRollbackFailureCaught = false;
    try {
      await executeRollbackCore({
        pkgModel: TestPackage,
        mediaModel: TestMedia,
        ledgerModel: TestLedger,
        targetDatabase: dbName,
        silent: true,
        simulateFailureAfterPackageDeletes: 25,
      });
    } catch (err) {
      midRollbackFailureCaught =
        err instanceof Error && err.message.includes("SIMULATED MID-ROLLBACK FAILURE");
    }
    const interruptedRollbackLedger = await TestLedger.findById(recoveryLedger!._id).lean();
    assert(
      midRollbackFailureCaught &&
        interruptedRollbackLedger?.status === "rolling_back" &&
        interruptedRollbackLedger.rollbackDeletedPackageSlugs?.length === 25,
      "Interrupted rollback preserves 'rolling_back' state and checkpoints deleted keys"
    );

    const resumedRollback = await executeRollbackCore({
      pkgModel: TestPackage,
      mediaModel: TestMedia,
      ledgerModel: TestLedger,
      targetDatabase: dbName,
      silent: true,
    });
    const postRecoveryRollbackPkgs = await TestPackage.countDocuments();
    const postRecoveryRollbackMedia = await TestMedia.countDocuments();
    const retainedLedgerCount = await TestLedger.countDocuments();
    const failedLedgerAfterRollback = await TestLedger.findById(failedLedger!._id).lean();
    const appliedLedgerAfterRollback = await TestLedger.findById(recoveryLedger!._id).lean();
    const enquiriesCountAfterCohortRb = await testConn.db!.collection("enquiries").countDocuments();
    const physicalMediaAfterCohortRb = scanMediaInventory().files.length;
    assert(
      resumedRollback.resumedInterruptedRollback === true &&
        resumedRollback.totalCohortPackagesRemoved === 93 &&
        resumedRollback.totalCohortMediaRemoved === 186 &&
        postRecoveryRollbackPkgs === 0 &&
        postRecoveryRollbackMedia === 0 &&
        retainedLedgerCount === 2 &&
        failedLedgerAfterRollback?.status === "failed" &&
        failedLedgerAfterRollback?.rolledBackByLedgerId === String(recoveryLedger!._id) &&
        appliedLedgerAfterRollback?.status === "rolled_back" &&
        enquiriesCountAfterCohortRb === 1 &&
        physicalMediaAfterCohortRb === 186,
      "Resumed cohort rollback removes ALL 93 packages & 186 MediaAssets across attempts while retaining ledgers, unrelated collections, and disk files"
    );

    // 5I. Pre-Existing Matching Records Excluded From Cohort Ownership Across Partial Failure + Retry
    await TestPackage.deleteMany({});
    await TestMedia.deleteMany({});
    await TestLedger.deleteMany({});

    await TestPackage.create(firstAsm);
    const firstFile = inventory.files[0];
    await TestMedia.create({
      storageKey: firstFile.storageKey,
      relativePath: firstFile.relativePath,
      originalFilename: firstFile.originalFilename,
      mimeType: firstFile.mimeType,
      sizeBytes: firstFile.sizeBytes,
      sha256: firstFile.sha256,
      category: firstFile.category,
      visibility: firstFile.visibility,
      altText: firstFile.altText,
    });

    let seededPartialFailCaught = false;
    try {
      await executeApplyCore({
        pkgModel: TestPackage,
        mediaModel: TestMedia,
        ledgerModel: TestLedger,
        targetHost: "127.0.0.1:27017",
        targetDatabase: dbName,
        backupDir: tempBackupDir,
        silent: true,
        simulateFailureAfterPackageInserts: 40,
      });
    } catch {
      seededPartialFailCaught = true;
    }
    const seededRecoveryApply = await executeApplyCore({
      pkgModel: TestPackage,
      mediaModel: TestMedia,
      ledgerModel: TestLedger,
      targetHost: "127.0.0.1:27017",
      targetDatabase: dbName,
      backupDir: tempBackupDir,
      silent: true,
    });
    const seededRecoveryLedger = await TestLedger.findById(seededRecoveryApply.ledgerId).lean();
    assert(
      seededPartialFailCaught &&
        seededRecoveryApply.insertedPackages === 52 &&
        seededRecoveryApply.skippedPackages === 41 &&
        seededRecoveryLedger?.ownedPackageSlugs?.length === 92 &&
        seededRecoveryLedger?.ownedPackageDigests?.length === 92 &&
        !seededRecoveryLedger?.ownedPackageSlugs?.includes(firstAsm.slug) &&
        seededRecoveryLedger?.ownedMediaKeys?.length === 185 &&
        seededRecoveryLedger?.ownedMediaDigests?.length === 185 &&
        !seededRecoveryLedger?.ownedMediaKeys?.includes(firstFile.storageKey),
      "Across failure + retry, pre-existing matching records are NEVER claimed into cohort rollback ownership"
    );

    const selectiveRollback = await executeRollbackCore({
      pkgModel: TestPackage,
      mediaModel: TestMedia,
      ledgerModel: TestLedger,
      targetDatabase: dbName,
      silent: true,
    });
    const postSelectivePkgCount = await TestPackage.countDocuments();
    const postSelectiveMediaCount = await TestMedia.countDocuments();
    const preExistingPkgStillPresent = await TestPackage.findOne({ slug: firstAsm.slug }).lean();
    const preExistingMediaStillPresent = await TestMedia.findOne({ storageKey: firstFile.storageKey }).lean();
    const physicalFilesAfterRollback = scanMediaInventory().files.length;
    assert(
      selectiveRollback.totalCohortPackagesRemoved === 92 &&
        selectiveRollback.totalCohortMediaRemoved === 185 &&
        postSelectivePkgCount === 1 &&
        postSelectiveMediaCount === 1 &&
        Boolean(preExistingPkgStillPresent) &&
        Boolean(preExistingMediaStillPresent) &&
        physicalFilesAfterRollback === 186,
      "Rollback after pre-seeded partial recovery NEVER deletes pre-existing matching documents or physical media files"
    );
  } finally {
    await testConn.dropDatabase();
    await testConn.close();
    fs.rmSync(tempBackupDir, { recursive: true, force: true });
  }

  console.log(`\n==================================================================`);
  console.log(`Automated Test Suite Summary: ${passed} Passed, ${failed} Failed.`);
  console.log(`==================================================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error("❌ Test suite crashed:", err instanceof Error ? err.message : String(err));
  process.exit(1);
});
