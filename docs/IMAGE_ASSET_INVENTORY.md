# MTPL Image Asset Inventory

This document records the visual audit, subject classification, and optimization pipeline for official photographs extracted from the supplied client archives (`MTPL OFFICE PHOTOS.zip` and `OFFICE PHOTOS.zip`) for use on the **Mishrikotkar Travels Pvt. Ltd. (MTPL)** travel platform.

---

## 1. Archives Summary & Audit Findings

| Archive Name | Source File Count | File Types | Content Analysis | Duplicate / Quality Observations |
| :--- | :--- | :--- | :--- | :--- |
| **`MTPL OFFICE PHOTOS.zip`** | 22 images | JPEG | High-resolution awards, airline plaque presentations, expo stall, team celebrations, office floor. | Includes several camera bursts/angles of the same award ceremony. Highest resolution shot is 4096×3072 px (IndiGo award). Filtered out low-light and blurred angles. |
| **`OFFICE PHOTOS.zip`** | 32 images | JPEG | Day-to-day operations, consultation sessions, director cabins, exterior building facade, street signage. | Multiple shots of outdoor signboards and identical consultation sequences. Selected the sharpest horizontal compositions with best lighting and framing. |

*Note: All macOS metadata directories (`__MACOSX/`, `.DS_Store`, and `._*`) were systematically excluded.*

---

## 2. Curated & Optimized Production Asset Manifest

All approved photographs have been optimized into lightweight, modern **WebP** formats with responsive dimensions and stored in `public/assets/office/` while preserving raw source images in `assets/Photos/office_originals/`.

| Final Production Asset Path | Source Archive & File | Subject / Description | Category | Dimensions | File Size | Intended Page & Component Placement |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/assets/office/exterior/mtpl-building-signboard.webp` | `OFFICE PHOTOS.zip` / `31.jpeg` | MTPL headquarters building facade with primary IATA & services signboard | Exterior | 1280×720 | 192.6 KB | **Contact Page** (Visit Our Office card) & **About Page** (HQ infrastructure) |
| `/assets/office/exterior/mtpl-indigo-street-board.webp` | `OFFICE PHOTOS.zip` / `25.jpeg` | Official street-facing partnership signboard highlighting phone numbers and verified services | Exterior | 1280×720 | 135.2 KB | **About Page** / Physical Presence & Street Accessibility |
| `/assets/office/operations/mtpl-consultants-operations-desk.webp` | `OFFICE PHOTOS.zip` / `19.jpeg` | Travel planners actively working at desktop terminals in front of the branded backdrop | Operations | 1280×720 | 112.4 KB | **Home Page** (Credibility / Trust section) & **Services Page** (Dedicated Travel Desk) |
| `/assets/office/operations/mtpl-ticketing-operations.webp` | `OFFICE PHOTOS.zip` / `18.jpeg` | Ticketing desk and documentation executives handling passenger files and visa requests | Operations | 1280×720 | 107.2 KB | **Services Page** (Flight Ticketing & Visa Documentation section) |
| `/assets/office/operations/mtpl-operations-floor-wide.webp` | `MTPL OFFICE PHOTOS.zip` / `WhatsApp Image 2026-09-30 at 18.08.21.jpeg` | Wide-angle view of MTPL central consultation floor and certified partner accreditation wall | Operations | 1600×898 | 226.0 KB | **About Page** (Workplace Infrastructure & Operational Excellence) |
| `/assets/office/consultation/mtpl-client-consultation-session.webp` | `OFFICE PHOTOS.zip` / `14.jpeg` | Travel specialists reviewing custom holiday itineraries with clients across the meeting table | Consultation | 1280×720 | 141.8 KB | **Home Page** (Tailored Consultation Feature) |
| `/assets/office/consultation/mtpl-itinerary-planning-session.webp` | `OFFICE PHOTOS.zip` / `11.jpeg` | Collaborative itinerary building session ensuring optimal routing and verified stays | Consultation | 1280×720 | 154.8 KB | **Packages / Holidays Page** (Curated Planning Assurance banner) |
| `/assets/office/consultation/mtpl-director-consultation-cabin.webp` | `OFFICE PHOTOS.zip` / `3.jpeg` | Executive consultation cabin with lounge seating and client discussion table | Consultation | 1280×720 | 88.2 KB | **About Page** (Executive Leadership & Bespoke Advisory) |
| `/assets/office/awards/mtpl-airline-recognition-indigo.webp` | `MTPL OFFICE PHOTOS.zip` / `WhatsApp Image 2026-09-30 at 18.08.16.jpeg` | Director Pooja Mishrikotkar and team receiving prestigious IndiGo airline partner award plaque | Awards | 1920×1440 | 289.5 KB | **Home Page & About Page** (Official Airline Recognition & Industry Accreditations) |
| `/assets/office/awards/mtpl-directors-airline-certificate.webp` | `MTPL OFFICE PHOTOS.zip` / `WhatsApp Image 2026-09-30 at 13.41.47.jpeg` | Directors Tushar & Pooja Mishrikotkar receiving airline excellence certification at the executive desk | Awards | 1280×960 | 125.0 KB | **About Page** (Leadership Overview supporting visual) |
| `/assets/office/awards/mtpl-team-award-reception.webp` | `MTPL OFFICE PHOTOS.zip` / `WhatsApp Image 2026-09-30 at 18.08.20 (2).jpeg` | Team holding official airline award plaque at MTPL entrance portal | Awards | 1600×1200 | 204.6 KB | **Reviews Page** (Verified Credibility & Recognition card) |
| `/assets/office/events/mtpl-travel-expo-stall.webp` | `MTPL OFFICE PHOTOS.zip` / `WhatsApp Image 2026-09-30 at 13.41.48 (2).jpeg` | MTPL exhibition booth at official travel expo showcasing handcrafted holidays and jungle safaris | Events | 1600×993 | 224.7 KB | **Services Page** (Corporate Travel, Group Tours & B2B Expo presence) |
| `/assets/office/team-culture/mtpl-team-reception-desk.webp` | `MTPL OFFICE PHOTOS.zip` / `WhatsApp Image 2026-09-30 at 18.08.23.jpeg` | Frontline customer service executives standing at MTPL front desk wearing official brand badges | Team Culture | 1152×864 | 154.1 KB | **Contact Page** (Dedicated Travel Advisors support banner) |
| `/assets/office/team-culture/mtpl-team-festive-celebration.webp` | `MTPL OFFICE PHOTOS.zip` / `WhatsApp Image 2026-09-30 at 18.08.18 (1).jpeg` | Team celebratory gathering at MTPL office portal in traditional attire | Team Culture | 1600×1200 | 151.0 KB | **About Page** (Team Culture & Work Environment gallery) |
| `/assets/office/team-culture/mtpl-team-milestone-celebration.webp` | `MTPL OFFICE PHOTOS.zip` / `1.jpeg` | MTPL team celebrating milestone achievements with cake and certificates inside the office | Team Culture | 1600×1200 | 274.9 KB | **About Page** (Life at MTPL / Collaborative Culture) |

---

## 3. Excluded Assets & Rationale

- **Duplicates / Redundant Bursts**:
  - `zip2/1.jpeg`, `zip2/17.jpeg`: Redundant lower-light angles of ticketing desk; superseded by `zip2/18.jpeg`.
  - `zip2/4.jpeg`, `zip2/5.jpeg`, `zip2/7.jpeg`: Similar burst frames of director cabin; superseded by `zip2/3.jpeg`.
  - `zip2/13.jpeg`, `zip2/15.jpeg`: Slightly blurry consultation frames; superseded by `zip2/14.jpeg`.
  - `zip2/21.jpeg`, `zip2/23.jpeg`, `zip2/26.jpeg`, `zip2/28.jpeg`: Partial crops and obstructed street angles of the signboard; superseded by `zip2/25.jpeg` and `zip2/31.jpeg`.
  - `zip2/24.jpeg`, `zip2/29.jpeg`: Vertical crop signboards with telephone poles obstructing text.
  - `zip1/WhatsApp Image 2026-09-30 at 13.41.48.jpeg`: Lower resolution re-take of the IndiGo plaque presentation.
- **Portraits vs Office Environment**:
  - `zip2/6.jpeg`, `zip2/8.jpeg`, `zip2/9.jpeg`, `zip2/10.jpeg`: Individual candid laptop shots of Director Pooja; director portraits are already authoritatively handled in `public/assets/team/`.
- **Low Light / Social Selfies**:
  - `zip1/WhatsApp Image 2026-09-30 at 18.08.17.jpeg`, `18.08.21 (2).jpeg`, `18.08.22 (2).jpeg`: Informal front-camera selfies unsuited for editorial brand presentation.

---

## 4. Preservation & Integrity Safeguards

1. **Original Archives**: Both `MTPL OFFICE PHOTOS.zip` and `OFFICE PHOTOS.zip` remain completely untouched in the repository root.
2. **Existing Brand Assets**: `public/assets/mtpl-logo.png`, `public/assets/mtpl-footer-logo.png`, `public/assets/MTPL Favicon.png`, director portraits in `public/assets/team/`, and 28 testimonial screenshots in `public/assets/testimonials/` were **never overwritten**.
3. **Package Media**: All 77 verified PDF package cover photographs in `/api/media/` remain intact and are not replaced with office imagery.
