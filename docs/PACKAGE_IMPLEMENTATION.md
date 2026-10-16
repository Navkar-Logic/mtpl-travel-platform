# MTPL — Holiday Package Implementation & Integration Guide

**Date:** October 12, 2026  
**Status:** Completed & Validated  
**Target Routes:** `/packages`, `/packages/[slug]`, `/api/packages/[slug]/download`, `/api/media/[key]`  

---

## 1. Architecture & Source of Truth

The holiday catalogue is sourced strictly from client-provided package documents (audited in `docs/PACKAGE_PDF_AUDIT.md` and `docs/PACKAGE_CATALOGUE_MANIFEST.json`).

### 1.1 Deduplication & Authoritative Records
- **Total Audited PDFs:** 82 PDFs across 19 destinations.
- **Approved Deduplications:** 5 redundant records from `Packages/Rajasthan.zip` (which were byte/text-identical duplicates of files in `Packages/Rajasthan and Gujrat.zip`) were unified to single authoritative records.
- **Active Website Catalogue:** **77 Authoritative Package Records**.
- **Data Store:** `src/features/packages/data/packages.ts` exporting:
  - `authoritativePackages: Package[]`
  - `getAllPackages(): Package[]`
  - `getFeaturedPackages(limit?: number): Package[]`
  - `getPackageBySlug(slug: string): Package | undefined`
  - `getPackagesByDestination(destination: string): Package[]`

### 1.2 Type Schema (`src/types/package.ts`)
```typescript
export type Package = {
  id: string;
  slug: string;
  title: string;
  destination: string;
  duration: string;
  nights: number;
  days: number;
  shortDescription: string;
  heroImage: string;
  pdfDownloadKey: string;
  pdfOriginalFilename: string;
  priceDisplay: string;
  pricingBasis?: string;
  validityNotice?: string;
  isPriceOnRequest: boolean;
  featured?: boolean;
  overview?: string;
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  itinerary?: { day: number; title: string; description: string }[];
  whatsAppHref: string;
};
```

---

## 2. Media & Cover Photograph Extraction

### 2.1 Cover Photo Extraction
- Every client PDF contains an embedded cover photo on page 1.
- Extracted and optimized to WebP format (`q=85`) stored under `storage/media/public/`.
- Served via the platform's secure media stream endpoint: `/api/media/[key]`.
- **Extraction Result:** 77 out of 77 packages successfully extracted and mapped to authentic cover photos.
- **Neutral Fallback:** `/assets/package-fallback.webp` created in `public/assets/` as a safe fallback.

---

## 3. PDF Downloads & Protected Streaming

- **Endpoint:** `/api/packages/[slug]/download`
- **Features:**
  - Validates `slug` and ensures no path traversal characters (`/`, `\`, `..`).
  - Resolves package storage key through `storage.exists()` and `storage.getStream()`.
  - Sets `Content-Disposition: attachment; filename="[safe-slug].pdf"`.
  - Sends appropriate MIME types (`application/pdf`) and size headers.

---

## 4. WhatsApp & Enquiry Integration

- **WhatsApp Action:** Prefilled message encoded with verified title and duration:
  `Hello MTPL, I am interested in [Package Title] ([Duration]). Please share the latest rates, availability and booking details.`
  Uses client enquiry number `+91 8381006600` configured in `src/config/site.ts`.
- **Enquiry Form Link:** Points to `/contact?package=[slug]`, automatically selecting package source and displaying the package name in the existing enquiry form.

---

## 5. Pricing & Commercial Safeguards

- Andaman packages marked as **"Price on Request"** due to historical date notes requiring 2026–2027 season reconfirmation.
- Rann of Kutch packages marked as **"Price on Request"** (seasonal winter operations).
- Other packages with verified rate tables show **"From ₹XX,XXX"** with clear footnotes indicating twin-sharing basis.

---

## 6. Build & Quality Assurance Status

- `npm run build`: **Passed** (95/95 static and SSG routes generated with zero errors).
- `npm run lint`: **Passed** (0 errors).
- Asset Verification: 77/77 images and 77/77 PDFs verified on local disk.
