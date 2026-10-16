# MTPL Testimonials — Content Audit & Asset Manifest Report (Phase 1)

Date: October 12, 2026  
Source Archive: `assets/pdf/Test.zip`  
Extracted Asset Root: `public/assets/testimonials/`  
Manifest File: [`src/features/testimonials/data/testimonials.json`](file:///f:/Navkar%20Logic%20Client%20Projects/mtpl-travel-platform/src/features/testimonials/data/testimonials.json)  

---

## 1. Executive Summary

- **Total Images Found & Inspected:** 29 of 29 original customer feedback screenshots.
- **Extraction & Organization:** Extracted into `public/assets/testimonials/` using standardized naming (`testimonial-001.png` to `testimonial-029.jpg`).
- **Data Manifest:** Structured into [`testimonials.json`](file:///f:/Navkar%20Logic%20Client%20Projects/mtpl-travel-platform/src/features/testimonials/data/testimonials.json) preserving verbatim wording, speaker sequence, platform types, verified dates, dimensions, and privacy considerations.
- **Verified Star Ratings:** **1 record** (`testimonial-021.jpg` – Google Review: 5 stars).
- **No Rating Present:** **28 records** (direct WhatsApp, SMS, BBM, and email conversations do not possess native star ratings; no synthetic star ratings were fabricated).
- **Unclear / Ambiguous Ratings:** **0 records**.
- **Privacy Review Flags:** **29 records** (100% of images flagged for PII / privacy review).
- **Publication Status:** Every record is marked `needs_review` by default.

---

## 2. Source Image Audit Table (All 29 Testimonials)

| ID | Final Image | Original File (`Test.zip`) | Dimensions | Platform / Type | Customer Name | Rating | Privacy Flags / Discrepancies |
| :--- | :--- | :--- | :---: | :--- | :--- | :---: | :--- |
| `testimonial-001` | `testimonial-001.png` | `Deven Chauahan Testimonial.png` | 1405×538 | Email | Deven Chauhan (Chitra, Deven, Shaurya) | `null` (not present) | Full family names visible; internal staff email addresses visible |
| `testimonial-002` | `testimonial-002.png` | `IMG_20150518_114400.png` | 720×720 | WhatsApp | Dr Tapre (Akola) | `null` (not present) | Customer portrait photo visible; location and name visible |
| `testimonial-003` | `testimonial-003.png` | `IMG_20150530_052657.png` | 720×720 | BBM | Aniket Thakur | `null` (not present) | Customer contact title visible (`Aniket Thakur (Work)`) |
| `testimonial-004` | `testimonial-004.png` | `IMG_20150616_074822.png` | 720×720 | BBM | Kumawat | `null` (not present) | Contact tag visible (`KUMAWAT (Mobile)`) |
| `testimonial-005` | `testimonial-005.png` | `IMG_20160102_120545.png` | 720×720 | BBM | Dr Rahul Pingle | `null` (not present) | Customer contact title visible (`Dr Rahul Pingle (Work)`) |
| `testimonial-006` | `testimonial-006.png` | `IMG_20160816_203448.png` | 720×720 | BBM | Shomit Bagchi | `null` (not present) | Customer contact title visible (`Shomit Bagchi (Work)`) |
| `testimonial-007` | `testimonial-007.png` | `Loya.png` | 720×1280 | WhatsApp | Dr sanjay Loya | `null` (not present) | Customer portrait photo visible; full name; staff name (`Prachi`); visa details |
| `testimonial-008` | `testimonial-008.png` | `Screenshot_2015-06-04-10-31-41(1).png` | 720×1280 | WhatsApp | Shirish Chaware | `null` (not present) | Customer avatar visible; detailed private flight/dates visible in chat |
| `testimonial-009` | `testimonial-009.png` | `Screenshot_2015-08-12-23-33-19.png` | 720×1280 | SMS | Vishnu Tambi | `null` (not present) | **Direct customer phone number exposed (`093 72 118234`)**; full name |
| `testimonial-010` | `testimonial-010.png` | `Screenshot_20160813-075504.png` | 1080×1920 | SMS | Shailesh Jain | `null` (not present) | **Direct customer phone number exposed (`098222 98342`)**; full name |
| `testimonial-011` | `testimonial-011.png` | `Screenshot_20160813-075510.png` | 1080×1920 | SMS | Prasad Pujari | `null` (not present) | **Direct customer phone number exposed (`98222 26205`)**; full name |
| `testimonial-012` | `testimonial-012.png` | `Screenshot_20161207-232918.png` | 1080×1920 | WhatsApp | Iyer Subhash | `null` (not present) | Customer family photo visible as avatar; full contact name |
| `testimonial-013` | `testimonial-013.png` | `Screenshot_20161216-092432.png` | 1080×1920 | WhatsApp | Anuj Mudholkar | `null` (not present) | Customer full name visible |
| `testimonial-014` | `testimonial-014.png` | `Screenshot_20170521-173033.png` | 720×1280 | WhatsApp | Dr Sonkuwar | `null` (not present) | Customer portrait photo; personal holiday photo thumbnail in chat |
| `testimonial-015` | `testimonial-015.png` | `Screenshot_20170704-115234.png` | 1080×1920 | WhatsApp | Sunil B Banubakode | `null` (not present) | Customer portrait photo; personal holiday photo thumbnail in chat |
| `testimonial-016` | `testimonial-016.png` | `Screenshot_20170706-184852.png` | 1080×1920 | WhatsApp | Darshan Rathi | `null` (not present) | Customer couple photo visible; **duplicate content of testimonial-022** |
| `testimonial-017` | `testimonial-017.jpg` | `Screenshot_20171221-121913.jpg` | 1080×1920 | SMS | M h Patel | `null` (not present) | **Direct customer phone number exposed (`9881245457`)**; full name |
| `testimonial-018` | `testimonial-018.jpg` | `Screenshot_20171231-140616.jpg` | 1080×1920 | WhatsApp | Milind Bandhao | `null` (not present) | Customer couple photo visible; full name |
| `testimonial-019` | `testimonial-019.jpg` | `Screenshot_20180129-094212.jpg` | 1080×1920 | WhatsApp | Shridhar Dhanagare | `null` (not present) | Customer photo visible; extensive 7-trip personal holiday history enumerated |
| `testimonial-020` | `testimonial-020.png` | `Shantanu Mahcyo Testimonial.png` | 1171×359 | Email | Santanu Bhattacharya | `null` (not present) | **Customer mobile exposed (`9775579203`)**; employer & job title (`MAHYCO, Kolkata`) |
| `testimonial-021` | `testimonial-021.jpg` | `WhatsApp Image 2020-02-03...jpeg` | 1080×1054 | Google Review | Amit Jain | **5.0** (verified) | Customer full name & Google avatar visible |
| `testimonial-022` | `testimonial-022.jpg` | `darshan rathi testimonial.jpg` | 720×1280 | WhatsApp | Darshan Rathi | `null` (not present) | **Duplicate content of testimonial-016** (downscaled JPEG version) |
| `testimonial-023` | `testimonial-023.png` | `fursule.png` | 1080×1920 | WhatsApp | Sunil Farsule | `null` (not present) | Customer portrait photo visible; full name (`Farsule Sunil`) |
| `testimonial-024` | `testimonial-024.jpg` | `gaurav wa.jpg` | 1080×2280 | WhatsApp | Gaurav Jain | `null` (not present) | Group photo visible; flight schedule and foreign currency details |
| `testimonial-025` | `testimonial-025.png` | `khandelwal testimonial.png` | 1080×1920 | WhatsApp Group | Dr Anita Khandelwal | `null` (not present) | Customer title & surname; internal group participant names visible |
| `testimonial-026` | `testimonial-026.png` | `likhite testimonial.png` | 1080×1920 | WhatsApp | Samir Likhite | `null` (not present) | Customer full name and profile avatar visible |
| `testimonial-027` | `testimonial-027.png` | `mantri testimonial.PNG` | 750×1334 | WhatsApp | Pankaj Mantri | `null` (not present) | Customer couple photo visible; personal holiday photo thumbnail in chat |
| `testimonial-028` | `testimonial-028.jpg` | `rajesh sethi testimonial.jpg` | 720×1280 | WhatsApp | Rajesh Sethi | `null` (not present) | Customer full name visible; branch manager phone numbers visible in chat |
| `testimonial-029` | `testimonial-029.jpg` | `suraj jain.jpg` | 1080×2340 | WhatsApp Group | Nitin Jinturkar & Suraj Jain | `null` (not present) | **Multiple customer phone numbers exposed (`+91 94222 06791`, `+91 96043 84564`)** |

---

## 3. Key Findings & Privacy Considerations

1. **High-Risk Phone Number Exposure (6 Images):**
   - `testimonial-009.png` (`093 72 118234` - Vishnu Tambi)
   - `testimonial-010.png` (`098222 98342` - Shailesh Jain)
   - `testimonial-011.png` (`98222 26205` - Prasad Pujari)
   - `testimonial-017.jpg` (`9881245457` - M h Patel)
   - `testimonial-020.png` (`9775579203` - Santanu Bhattacharya)
   - `testimonial-029.jpg` (`+91 94222 06791`, `+91 96043 84564` - Nitin Jinturkar & Suraj Jain)
   - **Recommendation:** These screenshots must **never** be served raw on the public website. They should either be redacted via a reviewed derivative image or rendered purely as styled text testimonial cards.

2. **Duplicate Screenshots (1 Pair):**
   - `testimonial-016.png` (`Screenshot_20170706-184852.png`, 1080×1920 PNG) and `testimonial-022.jpg` (`darshan rathi testimonial.jpg`, 720×1280 JPEG) capture the identical WhatsApp conversation with Darshan Rathi regarding the anniversary cake.
   - **Recommendation:** Retain both in the raw manifest for full source fidelity, but select only one (preferably the higher-resolution `testimonial-016.png` with sensitive info redacted) for web presentation.

3. **Ratings Distribution:**
   - **Verified Ratings:** 1 of 29 (`testimonial-021.jpg` = 5/5 stars).
   - **Not Present:** 28 of 29 (conversational messages).
   - **Synthetic Ratings:** Zero ratings fabricated.

4. **Platform Breakdown:**
   - WhatsApp (1-on-1): 16
   - BlackBerry Messenger (BBM): 4
   - SMS: 4
   - Email: 2
   - WhatsApp Group: 2
   - Platform Review (Google): 1

---

## 4. Validation Results

Validation script [`scripts/validate_testimonials.ts`](file:///f:/Navkar%20Logic%20Client%20Projects/mtpl-travel-platform/scripts/validate_testimonials.ts) executed with the following results:
- **JSON Syntax:** Passed.
- **Unique IDs:** 29 / 29 verified.
- **Image Paths on Disk:** 29 / 29 confirmed existing under `public/assets/testimonials/`.
- **Rating Consistency:** 29 / 29 records strictly match their source classification.
- **Publication Guard:** All 29 records hold `publicationStatus: "needs_review"`.
