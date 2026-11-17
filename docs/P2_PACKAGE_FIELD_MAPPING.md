# MTPL P2.0 — Package & Media Field Mapping Specification

**Milestone:** Phase 2 — P2.0 (MongoDB Package Catalogue Foundation & Migration Preparation)  
**Target Models:** [`PackageModel`](file:///f:/Navkar%20Logic%20Client%20Projects/mtpl-travel-platform/src/models/package.ts) (`packages`), [`MediaAsset`](file:///f:/Navkar%20Logic%20Client%20Projects/mtpl-travel-platform/src/models/media-asset.ts) (`mediaassets`), [`MigrationLedger`](file:///f:/Navkar%20Logic%20Client%20Projects/mtpl-travel-platform/src/models/migration-ledger.ts) (`migrationledgers`)  
**Migration Script:** [`scripts/migrate-packages-to-mongodb.ts`](file:///f:/Navkar%20Logic%20Client%20Projects/mtpl-travel-platform/scripts/migrate-packages-to-mongodb.ts)

---

## 1. Authoritative Source Inventory

All catalogue data is sourced strictly from three authoritative sources:

1. **Package Metadata & Itineraries:** [`src/features/packages/data/packages.ts`](file:///f:/Navkar%20Logic%20Client%20Projects/mtpl-travel-platform/src/features/packages/data/packages.ts) (`authoritativePackages` array + `getPackageCategory(pkg.destination)`) — **93 packages** (`67` national, `26` international across `24` destinations).
2. **Accommodation & Cost Tables:** [`src/features/packages/data/package-tables.json`](file:///f:/Navkar%20Logic%20Client%20Projects/mtpl-travel-platform/src/features/packages/data/package-tables.json) — **93 keyed entries**, `93/93` with populated `accommodations.rows` and `costTables`, matching `1:1` with every package slug.
3. **Physical Media Binaries:** Recursive scan of `storage/media/public/` — **186 physical files**:
   - **91 PDF files** (`application/pdf`, `category: "documents"`)
   - **95 image files** (`category: "images"`): **93 package hero images** + **2 category banners** (`National-Category.webp`, `International-Category.webp`), consisting of **88 `.webp`-named files with PNG bytes (`image/png`)** and **7 native WebP files (`image/webp`)**.

> [!IMPORTANT]
> `scripts/extracted_package_prices.json` is historical extraction data only and is **not** used as an authoritative source.

---

## 2. Package Collection (`PackageModel`) Field Mapping

| Source Location | Source Field | MongoDB Field | Type | Required | Transformation / Preservation Rules |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `packages.ts` | `id` | `packageId` | `String` (sparse index) | No | Preserved trimmed string |
| `packages.ts` (index) | Array index `0..92` | `sourceOrder` | `Number` (indexed) | No | Preserves original static display ordering for future DB queries |
| `packages.ts` | `slug` | `slug` | `String` (`unique: true`, lowercase) | **Yes** | Normalized trimmed lowercase; canonical lookup key |
| `packages.ts` | `title` | `title` | `String` | **Yes** | Preserved trimmed verbatim |
| `packages.ts` | `destination` | `destination` | `String` (indexed) | **Yes** | Preserved trimmed verbatim |
| `packages.ts` helper | `getPackageCategory(destination)` | `category` | `"national" \| "international"` (indexed) | **Yes** | Validated via explicit helper matching existing site routing |
| `packages.ts` | `duration` | `duration` | `String` | **Yes** | Preserved trimmed string (e.g., `"5 Nights / 6 Days"`) |
| `packages.ts` | `nights` | `nights` | `Number` (`min: 0`) | **Yes** | Integer nights count |
| `packages.ts` | `days` | `days` | `Number` (`min: 1`) | **Yes** | Integer days count |
| `packages.ts` | `shortDescription` | `shortDescription` | `String` | **Yes** | Preserved trimmed verbatim |
| `packages.ts` | `overview` | `overview` | `String` | No | Preserved trimmed string; defaults to `""` |
| `packages.ts` | `heroImage` | `heroImage` | `String` | **Yes** | Preserved path (e.g., `/api/media/<filename>.webp`); existence verified against physical media scan |
| `packages.ts` | `pdfDownloadKey` | `pdfDownloadKey` | `String` | No | Preserved storage key (or `""` when package has no PDF); verified on disk when non-empty |
| `packages.ts` | `pdfOriginalFilename` | `pdfOriginalFilename` | `String` | No | Preserved verbatim (including `.png` placeholder filenames on Dubai records) |
| `packages.ts` | `numericPrice` | `numericPrice` | `Number` (`min: 0`) | No | Optional field (omitted when `undefined`, never coerced to `0`) |
| `packages.ts` | `priceDisplay` | `priceDisplay` | `String` | **Yes** | Exact UI pricing badge text preserved verbatim (no currency conversion) |
| `packages.ts` | `pricingBasis` | `pricingBasis` | `String` | No | Preserved trimmed pricing basis text; defaults to `""` |
| Derived (`resolvePackageCurrency`) | `priceDisplay`, `pricingBasis`, `costTables[].currency` | `currency` | `"INR" \| "USD"` (no default) | **Yes** | Strictly required with **no default** (`default: "INR"` removed). Resolved from summary indicators (`$`/`USD` vs `₹`/`INR`), falling back to unique table currency only when summary has none. Missing or ambiguous values block migration. **Never** inferred from `category`. |
| `packages.ts` | `isPriceOnRequest` | `isPriceOnRequest` | `Boolean` | No | Defaults to `false`; all 93 source packages are `false` |
| `packages.ts` | `validityNotice` | `validityNotice` | `String` | No | Preserved trimmed notice; defaults to `""` |
| `packages.ts` | `validityDisplay` | `validityDisplay` | `String` | No | Preserved trimmed `validityDisplay`; defaults to `""` |
| `packages.ts` | `validityStatus` | `validityStatus` | `"verified" \| "confirmation_required"` | No | Preserved source `validityStatus`; defaults to `"verified"` |
| `packages.ts` | `featured` | `featured` | `Boolean` (indexed) | No | Preserved boolean; defaults to `false` |
| `packages.ts` | `highlights` | `highlights` | `String[]` | No | Preserved trimmed string array in original order |
| `packages.ts` | `inclusions` | `inclusions` | `String[]` | No | Preserved trimmed string array in original order |
| `packages.ts` | `exclusions` | `exclusions` | `String[]` | No | Preserved trimmed string array in original order |
| `packages.ts` | `itinerary` | `itinerary` | `[{ day, title, description }]` | **Yes** | Must contain ≥ 1 entry. Stored in **exact source array order** with original `day` values (no sorting or renumbering). |
| `packages.ts` | `whatsAppHref` | `whatsAppHref` | `String` | No | Preserved pre-filled WhatsApp deep link verbatim |
| `package-tables.json` | `[slug].accommodations` | `accommodations` | `{ headers: string[], rows: string[][] } \| null` | No | Copied verbatim from `package-tables.json` |
| `package-tables.json` | `[slug].costTables` | `costTables` | `[{ title, currency, headers, rows }]` | No | Copied verbatim from `package-tables.json` (preserving each table's declared `currency`) |
| Migration lifecycle | — | `status` | `"published" \| "draft" \| "archived"` (indexed) | No | Set to `"published"` on initial migration |
| Migration audit | — | `createdBy` / `updatedBy` | `String` / `String \| null` | No | `"system-migration"` / `null` |
| Future CMS SEO | — | `seoTitle`, `seoDescription` | `String` | No | Initialized to `""` during P2.0 migration |
| Mongoose timestamps | — | `createdAt`, `updatedAt` | `Date` | Auto | Managed automatically by Mongoose `timestamps: true` |

---

## 3. MediaAsset Collection (`MediaAsset`) Field Mapping

Backfilled from physical binary inspection inside `storage/media/public/` without modifying, renaming, moving, or re-encoding any file on disk.

| Source | MongoDB Field | Type | Required | Rule |
| :--- | :--- | :--- | :--- | :--- |
| Path relative to `storage/media/public` (POSIX `/`) | `storageKey` | `String` (`unique: true`) | **Yes** | Canonical key matching `/api/media/<storageKey>` |
| Path relative to `storage/media` (POSIX `/`) | `relativePath` | `String` (indexed) | No | e.g. `public/<storageKey>` |
| Basename on disk | `originalFilename` | `String` | **Yes** | Exact physical filename preserved (e.g. `.webp`) |
| Binary magic bytes (`detectMimeTypeFromMagicBytes` + `validateFileContent`) | `mimeType` | `String` | **Yes** | True content MIME (`application/pdf`, `image/png`, `image/webp`, `image/jpeg`); unknown signatures **block** scan |
| `buffer.length` / `stat.size` | `sizeBytes` | `Number` (`min: 0`) | **Yes** | Exact byte length |
| SHA-256 of file bytes | `sha256` | `String` | No | Hex digest used for media verification and integrity tracking |
| Content-derived category | `category` | `"images" \| "documents" \| "other"` | **Yes** | `"documents"` for PDFs, `"images"` for verified image binaries |
| Public media directory | `visibility` | `"public" \| "private"` | **Yes** | `"public"` |
| Matching package / banner lookup | `altText` | `String` (max `300`) | No | Human-readable alt text for hero images, category banners, or assets |

---

## 4. Documented Source Data Anomalies Preserved As-Is

1. **Bhutan & Nepal Mixed Currencies (6 packages):**
   All `3` Bhutan packages (`mtpl-bhutan-tour-via-bagdogra-4n-5d`, `mtpl-bhutan-tour-via-bagdogra-6n-7d`, `mtpl-bhutan-tour-via-bagdogra-8n-9d`) and all `3` Nepal packages (`mtpl-best-of-nepal-5n-6d`, `mtpl-glimpse-of-nepal-5n-6d`, `mtpl-wonders-of-nepal-7n-8d`) carry `USD` (`$`) summary pricing (`priceDisplay` / `pricingBasis`) while their `costTables` in `package-tables.json` declare `currency: "INR"`. Both are preserved verbatim without currency conversion and flagged in the migration audit report and ledger.
2. **Dubai Optional PDF References (2 packages):**
   `mtpl-wonders-of-dubai-5n-6d` (`pdfOriginalFilename: "Wonders Of Dubai.png"`) and `mtpl-exclusive-dubai-abu-dhabi-6n-7d` (`pdfOriginalFilename: "Dubai + Abu Dhabi.png"`) intentionally have `pdfDownloadKey: ""` and no `.pdf` file on disk. Preserved cleanly without fabricating synthetic PDFs.
3. **Non-Sequential Legacy Itinerary Day Numbers (5 packages):**
   `mtpl-3-sisters-of-the-north-east-11n-12d`, `mtpl-best-of-himachal-5n-6d`, `mtpl-best-of-himachal-9n-10d`, `mtpl-amazing-kashmir-with-katra-7n-8d`, and `mtpl-wonders-of-nepal-7n-8d` have legacy non-sequential `day` numbers (e.g., duplicates/gaps/out-of-order entries). The migration preserves both array index order and original `day` values verbatim.
4. **88 `.webp`-Named Image Files with PNG Magic Bytes:**
   `88` `.webp` image files physically begin with PNG magic bytes (`image/png`), while `7` begin with native RIFF/WEBP bytes (`image/webp`). No file is renamed, moved, or converted; `MediaAsset.mimeType` records the true content-detected MIME type.
