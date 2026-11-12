# MTPL Travel Platform — Package Migration Audit Report

**Generated:** 2026-10-30T15:26:35.139Z  
**Migration Code:** `P2_0_PACKAGE_CATALOGUE_MIGRATION` (v1.0.0)  

---

## 1. Executive Catalogue Summary

| Metric | Source Inventory Count | Target Migration Expectation | Parity State |
|---|:---:|:---:|:---:|
| **Total Packages** | **93** | **93** | 100% Match |
| **National Packages (India)** | **67** | **67** | 100% Match |
| **International Packages** | **26** | **26** | 100% Match |
| **Tariff & Hotel Table Mappings** | **93** | **93** | 100% Match |
| **Physical Media Files** | **186** | **186** | 100% Match |
| **PDF Brochures** | **91** | **91** | 100% Match |
| **WebP Images** | **95** | **95** | 100% Match |
| **Subdirectories in Media Root** | **1 (`img`)** | Ignored | Reconciled |

---

## 2. Reconciled Discrepancy Note
- **Reported 187 Items vs 186 Files:**  
  The filesystem directory `storage/media/public/` contains **1 directory (`img`)** and **186 physical files**.  
  186 Files = 91 PDF documents + 95 WebP images (93 package hero covers + 2 category headers: `National-Category.webp`, `International-Category.webp`).
- **Missing Optional PDFs:**  
  Only 2 packages (`mtpl-wonders-of-dubai-5n-6d` and `mtpl-exclusive-dubai-abu-dhabi-6n-7d`) have empty PDF download keys. Both are valid tours without client brochures.

---

## 3. Destination Breakdown

- **Karnataka:** 9 packages
- **Cambodia:** 8 packages
- **Rajasthan:** 7 packages
- **Gujarat:** 6 packages
- **Kashmir:** 5 packages
- **Kerala:** 5 packages
- **Jordan:** 5 packages
- **Himachal Pradesh:** 4 packages
- **Maharashtra:** 4 packages
- **Madhya Pradesh:** 4 packages
- **North East:** 4 packages
- **Sri Lanka:** 4 packages
- **Tamil Nadu:** 4 packages
- **Andaman:** 3 packages
- **Assam:** 3 packages
- **Bhutan:** 3 packages
- **Nepal:** 3 packages
- **Uttar Pradesh:** 3 packages
- **Odisha:** 2 packages
- **Rajasthan & Gujarat:** 2 packages
- **Dubai:** 2 packages
- **Telangana:** 1 package
- **West Bengal:** 1 package
- **Japan:** 1 package

---

## 4. Reports Generated
- Machine-readable JSON: `F:\Navkar Logic Client Projects\mtpl-travel-platform\docs\reports\migration-report.json`
- Human-readable Markdown: `F:\Navkar Logic Client Projects\mtpl-travel-platform\docs\reports\MIGRATION_REPORT.md`
