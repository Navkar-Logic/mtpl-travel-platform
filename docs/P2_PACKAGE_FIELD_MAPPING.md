# MTPL Travel Platform — Phase 2: Package Field Mapping Document

**Document:** `P2_PACKAGE_FIELD_MAPPING.md`  
**Milestone:** Phase 2 — P2.0 (MongoDB Package Catalogue Foundation)  
**Status:** Authoritative  
**Source Datasets:**  
1. `src/features/packages/data/packages.ts` (93 Package objects in `authoritativePackages`)  
2. `src/features/packages/data/package-tables.json` (93 Accommodations & Cost Table mappings)  
3. `storage/media/public/` (186 Physical Media Files + 1 Directory)  
**Target Mongoose Model:** `src/models/package.ts` (`Package` collection in MongoDB)

---

## 1. Overview & Mapping Strategy

The purpose of this document is to define the exact 1:1 schema mapping from static TypeScript objects and JSON datasets to the production Mongoose `Package` model. 

### Key Principles
1. **Zero Data Loss:** Every single property in `packages.ts` and `package-tables.json` is preserved without truncation or normalization away of meaningful detail.
2. **Deterministic Typing:** Strict type constraints, enums, and validations are applied in Mongoose without breaking legacy records.
3. **Preservation of Table Order & Content:** Both header arrays and multi-dimensional row arrays in accommodation tables and tariff matrices are preserved verbatim.
4. **Clean Decoupling:** Optional fields (such as Dubai PDFs which do not exist) remain strictly optional, preventing migration aborts or dummy value injections.

---

## 2. Complete Field Mapping Table

| Source Property (`packages.ts` / JSON) | Source Type | Target MongoDB Field (`src/models/package.ts`) | Target Mongoose Type | Required | Default / Transformation Logic | Notes |
|---|---|---|---|:---:|---|---|
| `id` | `string` | `packageId` | `String` | No | Preserved verbatim (e.g., `"pkg-andaman-001"`). Indexed. | Legacy catalogue identifier. |
| `slug` | `string` | `slug` | `String` | **Yes** | Trimmed, lowercased, Unique index. | Primary public route key (`/packages/[slug]`). |
| `title` | `string` | `title` | `String` | **Yes** | Trimmed. | Package display heading. |
| `destination` | `string` | `destination` | `String` | **Yes** | Trimmed. Indexed. | Primary destination (e.g. `"Andaman"`, `"Jordan"`). |
| `category` | `string` (`'national' \| 'international' \| undefined`) | `category` | `String` (enum: `['national', 'international']`) | **Yes** | If present: preserved. If absent: computed via `getPackageCategory(pkg)` (checks `INTERNATIONAL_DESTINATIONS`). Indexed. | 67 National, 26 International. |
| `duration` | `string` | `duration` | `String` | **Yes** | Trimmed (e.g., `"04 Nights / 05 Days"`). | Canonical duration display string. |
| `nights` | `number` | `nights` | `Number` | **Yes** | Min: `0`. | Numeric count of nights. |
| `days` | `number` | `days` | `Number` | **Yes** | Min: `1`. | Numeric count of days. |
| `shortDescription` | `string` | `shortDescription` | `String` | **Yes** | Trimmed. | Used in package cards and meta descriptions. |
| `overview` | `string \| undefined` | `overview` | `String` | No | Trimmed. Default `""`. | Full package introduction text on detail page. |
| `heroImage` | `string` | `heroImage` | `String` | **Yes** | Trimmed (e.g., `"/api/media/mtpl-amazing-andaman-4n-5d.webp"`). | Relative media endpoint URL. |
| `pdfDownloadKey` | `string \| undefined` | `pdfDownloadKey` | `String` | No | Trimmed. Default `""`. | Key in `storage/media/public/` (e.g. `mtpl-amazing-andaman-4n-5d.pdf`). Optional for packages without PDFs. |
| `pdfOriginalFilename` | `string \| undefined` | `pdfOriginalFilename` | `String` | No | Trimmed. Default `""`. | Source client filename (e.g. `MTPL_Amazing_Andaman_4N_5D.pdf`). |
| `numericPrice` | `number \| undefined` | `numericPrice` | `Number` | **Yes** | Min: `0`. Preserved verbatim from source. | Numeric base price for filtering and sorting. |
| `priceDisplay` | `string` | `priceDisplay` | `String` | **Yes** | Trimmed (e.g. `"₹33,127"`, `"$475 USD"`). | Formatted currency display string. |
| `pricingBasis` | `string \| undefined` | `pricingBasis` | `String` | No | Trimmed. | Pricing explanation subtext (e.g., `"Per person on 2 Pax sharing"`). |
| `isPriceOnRequest` | `boolean` | `isPriceOnRequest` | `Boolean` | **Yes** | Default: `false`. | Flag for bespoke, quotation-only tours. |
| `currency` | Derived | `currency` | `String` (enum: `['INR', 'USD']`) | **Yes** | If `priceDisplay` or `pricingBasis` contains `USD` or `$`, or `category === 'international'`: `"USD"`. Otherwise: `"INR"`. | Explicit ISO-4217 currency tracking. |
| `validityNotice` | `string \| undefined` | `validityNotice` | `String` | No | Trimmed. | Legal seasonal validity disclaimer. |
| `validityDisplay` | `string \| undefined` | `validityDisplay` | `String` | No | Trimmed (e.g. `"31 March 2027"`). | Formatted validity date label. |
| `validityStatus` | `'verified' \| 'confirmation_required'` | `validityStatus` | `String` (enum: `['verified', 'confirmation_required']`) | **Yes** | Default: `"verified"`. | Badge indicator status. |
| `featured` | `boolean \| undefined` | `featured` | `Boolean` | **Yes** | Default: `false`. Indexed. | Curated homepage package selector. |
| `highlights` | `string[] \| undefined` | `highlights` | `[String]` | **Yes** | Default: `[]`. | Sightseeing highlights array. |
| `inclusions` | `string[] \| undefined` | `inclusions` | `[String]` | **Yes** | Default: `[]`. | "What's Included" bullet points. |
| `exclusions` | `string[] \| undefined` | `exclusions` | `[String]` | **Yes** | Default: `[]`. | "What's Not Included" bullet points. |
| `itinerary` | `ItineraryDay[]` | `itinerary` | `[ItineraryDaySchema]` | **Yes** | Array of `{ day: Number, title: String, description: String }`. | Preserves exact day numbers, titles, and text without reordering. |
| `whatsAppHref` | `string` | `whatsAppHref` | `String` | No | Trimmed. | Pre-calculated WhatsApp inquiry link. |
| `package-tables.json` -> `accommodations` | `AccommodationData \| null` | `accommodations` | `AccommodationSchema` | No | Subdocument: `{ headers: [String], rows: [[String]] }`. | Matrix of hotel options across categories and cities. |
| `package-tables.json` -> `costTables` | `PackageCostTable[]` | `costTables` | `[CostTableSchema]` | **Yes** | Array of `{ title: String, currency: String, headers: [String], rows: [[String]] }`. Default: `[]`. | Multi-tier price breakdown matrices. |
| *New Administrative* | N/A | `status` | `String` (enum: `['published', 'draft', 'archived']`) | **Yes** | Default: `"published"`. Indexed. | Publication workflow state for Phase 2 CMS. |
| *New Administrative* | N/A | `createdBy` | `String` | No | Default: `"system-migration"`. | Author audit trail. |
| *New Administrative* | N/A | `updatedBy` | `String` | No | Default: `null`. | Editor audit trail. |
| *New SEO* | N/A | `seoTitle` | `String` | No | Trimmed. Default: `""`. | Optional custom SEO page title. |
| *New SEO* | N/A | `seoDescription` | `String` | No | Trimmed. Default: `""`. | Optional custom SEO meta description. |
| *Timestamps* | N/A | `createdAt`, `updatedAt` | `Date` | **Yes** | Managed by Mongoose `{ timestamps: true }`. | Document creation and update timestamps. |

---

## 3. Subdocument Specifications

### 3.1 Itinerary Day Subdocument (`ItineraryDaySchema`)
```typescript
{
  day: { type: Number, required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true }
}
```
*Note on Ordering:* The array order from `authoritativePackages` is strictly preserved. In particular, 5 packages with legacy source two-column itinerary layouts (`mtpl-3-sisters-of-the-north-east-11n-12d`, `mtpl-best-of-himachal-5n-6d`, `mtpl-best-of-himachal-9n-10d`, `mtpl-amazing-kashmir-with-katra-7n-8d`, `mtpl-wonders-of-nepal-7n-8d`) are ingested verbatim without automatic reordering.

### 3.2 Accommodations Subdocument (`AccommodationSchema`)
```typescript
{
  headers: [{ type: String, trim: true }],
  rows: [[{ type: String, trim: true }]]
}
```
*Note:* Accommodation headers typically span `['City', 'Nights', 'Category A', 'Category B', 'Category C', 'Meal Plan']`. Row cells contain hotel names or replacement strings. All nested arrays are preserved as arrays of strings.

### 3.3 Cost Table Subdocument (`CostTableSchema`)
```typescript
{
  title: { type: String, trim: true, default: "" },
  currency: { type: String, trim: true, default: "" },
  headers: [{ type: String, trim: true }],
  rows: [[{ type: String, trim: true }]]
}
```
*Note:* Supports both single tariff tables and multi-season tables (e.g. Sri Lanka revised tours with seasonal tariff bands).

---

## 4. Omitted Fields & Normalization Notes

1. **No Fields Omitted:** Every single field from `authoritativePackages` in `src/features/packages/data/packages.ts` and `src/features/packages/data/package-tables.json` is preserved in the target MongoDB schema.
2. **Category Defaulting:** 77 existing packages do not have an explicit `category` key in their JSON definition because category was dynamically computed at runtime via `getPackageCategory()`. During migration, `category` is resolved and saved explicitly as `"national"` or `"international"` in MongoDB so that database indexes (`{ category: 1 }`) function with maximum efficiency.
3. **Currency Ingestion:** `currency` is explicitly populated as `"INR"` or `"USD"` based on the package's display price and destination, eliminating the need for runtime string-parsing heuristics.
4. **Missing PDFs Handled Gracefully:** `mtpl-wonders-of-dubai-5n-6d` and `mtpl-exclusive-dubai-abu-dhabi-6n-7d` have `pdfDownloadKey: ""` and `pdfOriginalFilename: ""`. They are migrated with empty strings or undefined, which the Mongoose schema permits.

---

## 5. Compound Indexes

To support high-performance filtering, search, and admin queries without scan bottlenecks:
1. `{ slug: 1 }`: Unique index on package slug.
2. `{ status: 1, category: 1, destination: 1 }`: Supports catalogue listing tabs and destination dropdowns.
3. `{ status: 1, featured: 1 }`: Supports homepage `PackagesPreview` query.
4. `{ status: 1, numericPrice: 1 }`: Supports price range filters and price sorting.
5. `{ packageId: 1 }`: Sparse index for legacy ID lookups.

