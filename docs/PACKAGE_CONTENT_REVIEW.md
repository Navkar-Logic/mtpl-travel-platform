# MTPL — Package Content Review & Client Clarifications

This document outlines specific items, discrepancies, and policy decisions requiring review and approval from the MTPL team before production integration.

---

## 1. High-Priority Discrepancies

### 1.1 Andaman Packages — Internal Validity Date Conflict
- **Files Affected:**
  - `MTPL_Amazing_Andaman_4N_5D.pdf`
  - `MTPL_Amazing_Andaman_5N_6D.pdf`
  - `MTPL_Amazing_Andaman_6N_7D.pdf`
- **Issue:**
  The documents contain contradictory validity statements:
  - Clause A (Page 4): *"Package cost will not be valid from 15th December 2026 – 15th January 2027."*
  - Clause B (Page 5): *"This package is valid from 01st October 2025 to 31st March 2026 (Except from 15th December 2025 – 15th January 2026)."*
- **Recommendation:**
  Confirm that the current rates and validity window apply to the **2026–2027 season** (October 1, 2026 to March 31, 2027), and confirm whether updated 2026–2027 PDF revisions should replace these three files.

---

### 1.2 Exact Duplicate Packages: Rajasthan vs. Rajasthan and Gujrat
- **Files Affected:**
  1. `Rajasthan/MTPL_Amazing_Udaipur_3N_4D_Revised.pdf` vs. `Rajasthan and Gujrat/MTPL_Amazing_Udaipur_3N_4D.pdf`
  2. `Rajasthan/MTPL_Forts_and_Palaces_6N_7D_Revised.pdf` vs. `Rajasthan and Gujrat/MTPL_Forts_and_Palaces_6N_7D.pdf`
  3. `Rajasthan/MTPL_Jaipur_Tour_with_Ranthambore_4N_5D_Revised.pdf` vs. `Rajasthan and Gujrat/MTPL_Jaipur_Tour_with_Ranthambore_4N_5D.pdf`
  4. `Rajasthan/MTPL_Royal_Rajasthan_8N_9D_Revised.pdf` vs. `Rajasthan and Gujrat/MTPL_Royal_Rajasthan_8N_9D.pdf`
  5. `Rajasthan/MTPL_Ultimate_Udaipur_with_Mt_Abu_4N_5D_Revised.pdf` vs. `Rajasthan and Gujrat/MTPL_Ultimate_Udaipur_with_Mt_Abu_4N_5D.pdf`
- **Issue:**
  The files in `Packages/Rajasthan.zip` are identical in itinerary and pricing to those in `Packages/Rajasthan and Gujrat.zip`. Displaying both on the website would result in identical duplicate cards.
- **Recommendation:**
  Deduplicate to a single master record per itinerary. Display under the `Rajasthan` destination tag, while maintaining Gujarat itineraries (`Statue of Unity`, `Rann of Kutch`, `Enchanting Gujarat`) under `Gujarat`.

---

### 1.3 Sri Lanka Package — Outdated 2022 Surcharge Note
- **File Affected:**
  - `SriLanka/MTPL_Heritage_and_Beaches_of_Srilanka_6N_7D_Revised.pdf`
- **Issue:**
  The document lists an outdated holiday supplement:
  *"COMPULSARY ROOM SUPPLEMENTS FOR CHRISTMAS EVE (24TH DEC 2022) & NEW YEAR EVE (31ST DEC 2022)"*, while the main validity states *01st October 2026 to 31st March 2027*.
- **Recommendation:**
  Confirm that peak holiday supplements apply to Christmas Eve 2026 / New Year's Eve 2026, or provide an updated pricing addendum.

---

### 1.4 Missing Explicit Validity Dates: Rann of Kutch Packages
- **Files Affected:**
  - `Rajasthan and Gujrat/MTPL_Rann_of_Kutch_2N_3D.pdf`
  - `Rajasthan and Gujrat/MTPL_Rann_of_Kutch_3N_4D.pdf`
- **Issue:**
  These packages detail the full Rann Utsav tent operations and sightseeing, but lack a fixed seasonal validity date range in the text.
- **Recommendation:**
  Confirm standard Rann Utsav operational season (typically November through February) for display on the website card, or display "Seasonal (November to February) — Enquire for exact dates".

---

## 2. Website Pricing Display Policy

All MTPL package PDFs contain multi-tier rate matrices (e.g., Category A/B/C hotels, for 2 Pax, 4 Pax, 6 Pax, plus extra adult/child rates).

Please select the preferred website pricing strategy:

1. **Option A: "Starting From ₹XX,XXX"**
   Display the lowest base tier (e.g., Category C or Category A per person double-sharing) with a clear footnote: *"Starting price per person on twin-sharing. Subject to seasonal validity and hotel category chosen."*
2. **Option B: "Price On Request"**
   Display *"Custom Quote on Request"*, emphasizing MTPL's personalized itinerary planning and avoiding showing rates that might be subject to seasonal revision.
3. **Option C: Hybrid (Recommended)**
   Show *"Starting from ₹XX,XXX per person"* for packages with confirmed 2026–2027 rate grids, and *"Quote on Request"* for packages under review or custom safari itineraries.

---

## 3. Package Cover Image Strategy

- **Observation:** All 82 PDFs contain genuine destination cover photos (embedded on page 1).
- **Proposed Action:** Extract these embedded photos directly, optimize them to WebP/JPEG format (approx 100–150 KB), and store them securely in `storage/media/public/packages/`.
- **Fallback:** Use an elegant neutral travel banner with the MTPL brand styling when high-resolution photography is pending from the client.
- **Action Required:** Approve extracting and serving the PDF cover photos as the initial website card images.
