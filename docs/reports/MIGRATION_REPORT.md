# MTPL Travel Platform — Package Migration Audit Report

**Generated:** 2026-11-12T16:16:02.817Z  
**Migration Code:** `P2_0_PACKAGE_CATALOGUE_MIGRATION` (v2.0.0)  
**Authoritative Target Database:** `mtpl_dev` (local loopback only)  
**Source Inventory SHA-256:** `a73f32fc00c521b27483d496252b4536e49b210b35622ad115c314e08488bb16`

---

## 1. Authoritative Source Inventory Summary

| Metric | Source Count | Expected Count | Status |
|---|---:|---:|---|
| Total Packages (`packages.ts`) | 93 | 93 | Match |
| National Packages | 67 | 67 | Match |
| International Packages | 26 | 26 | Match |
| Table Entries (`package-tables.json`) | 93 | 93 | Match |
| Physical Media Files (`storage/media/public/`) | 186 | 186 | Match |
| PDF Documents (`application/pdf`) | 91 | 91 | Match |
| Image Files (93 Hero + 2 Banners) | 95 | 95 | Match |
| Subdirectories Traversed | 1 (`img`) | 1 (`img`, empty) | Reconciled |

---

## 2. Content-Detected MIME Verification

- **`application/pdf`:** 91 files (verified via `%PDF-` header)
- **`image/png`:** 88 files (all stored with `.webp` filenames; filenames and bytes preserved, true MIME `image/png` recorded in `MediaAsset`)
- **`image/webp`:** 7 files (verified via `RIFF....WEBP` header)
- **`image/jpeg`:** 0 files

---

## 3. Preserved Source Discrepancies (No Silent Conversion)

### 3.1 Bhutan & Nepal Mixed Currency (6 Packages — For Manual Business Confirmation)
Summary pricing is denominated in **USD**, while embedded tariff tables in `package-tables.json` declare **INR**:
- `mtpl-bhutan-tour-via-bagdogra-4n-5d` (Bhutan): summary `$475 USD` (`USD`) vs cost table currency `INR`
- `mtpl-bhutan-tour-via-bagdogra-6n-7d` (Bhutan): summary `$655 USD` (`USD`) vs cost table currency `INR`
- `mtpl-bhutan-tour-via-bagdogra-8n-9d` (Bhutan): summary `$880 USD` (`USD`) vs cost table currency `INR`
- `mtpl-best-of-nepal-5n-6d` (Nepal): summary `$385 USD` (`USD`) vs cost table currency `INR`
- `mtpl-glimpse-of-nepal-5n-6d` (Nepal): summary `$320 USD` (`USD`) vs cost table currency `INR`
- `mtpl-wonders-of-nepal-7n-8d` (Nepal): summary `$495 USD` (`USD`) vs cost table currency `INR`

### 3.2 Dubai Optional Empty PDF References (2 Packages)
Preserved with empty `pdfDownloadKey: ""` (no synthetic PDF keys generated):
- `mtpl-wonders-of-dubai-5n-6d` (Wonders of Dubai): `pdfOriginalFilename` = `Wonders Of Dubai.png`
- `mtpl-exclusive-dubai-abu-dhabi-6n-7d` (Exclusive Dubai & Abu Dhabi): `pdfOriginalFilename` = `Dubai + Abu Dhabi.png`

### 3.3 Legacy Two-Column Non-Sequential Itinerary Days (5 Packages)
Preserved verbatim without renumbering or reordering:
- `mtpl-3-sisters-of-the-north-east-11n-12d`: `[1, 3, 5, 7, 9, 11, 2, 4, 6, 8, 10, 12]`
- `mtpl-best-of-himachal-5n-6d`: `[1, 2, 3, 4, 6, 5]`
- `mtpl-best-of-himachal-9n-10d`: `[1, 3, 5, 7, 9, 2, 4, 6, 8, 10]`
- `mtpl-amazing-kashmir-with-katra-7n-8d`: `[1, 3, 5, 7, 2, 4, 6, 8]`
- `mtpl-wonders-of-nepal-7n-8d`: `[1, 3, 5, 7, 2, 4, 6, 8]`

---

## 4. Destination Breakdown

- **Karnataka:** 9 packages
- **Cambodia:** 8 packages
- **Rajasthan:** 7 packages
- **Gujarat:** 6 packages
- **Jordan:** 5 packages
- **Kashmir:** 5 packages
- **Kerala:** 5 packages
- **Himachal Pradesh:** 4 packages
- **Madhya Pradesh:** 4 packages
- **Maharashtra:** 4 packages
- **North East:** 4 packages
- **Sri Lanka:** 4 packages
- **Tamil Nadu:** 4 packages
- **Andaman:** 3 packages
- **Assam:** 3 packages
- **Bhutan:** 3 packages
- **Nepal:** 3 packages
- **Uttar Pradesh:** 3 packages
- **Dubai:** 2 packages
- **Odisha:** 2 packages
- **Rajasthan & Gujarat:** 2 packages
- **Japan:** 1 package
- **Telangana:** 1 package
- **West Bengal:** 1 package
