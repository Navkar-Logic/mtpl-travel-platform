# MTPL Travel Platform — Privacy Policy Data Audit (Phase 1)

**Document Reference:** `docs/PRIVACY_POLICY_DATA_AUDIT.md`  
**Company:** Mishrikotkar Travels Pvt. Ltd. (MTPL)  
**Website:** `https://www.mishrikotkartravels.com`  
**Date of Technical Audit:** October 2026  
**Auditor:** Engineering / Antigravity Implementation Team  
**Scope:** Phase 1 Next.js App Router codebase (`mtpl-travel-platform`)

---

## 1. Executive Summary

This document records the internal technical audit of data collection, processing, storage, and security mechanisms across the MTPL Phase 1 website. It provides the factual foundation for the authoritative Privacy Policy published at `/privacy-policy`.

All findings below are derived from inspecting active source code (`src/app`, `src/components`, `src/models`, `src/lib`, `package.json`, and database schemas). Verified implementation facts are strictly separated from operational assumptions and matters requiring MTPL management confirmation.

---

## 2. Inventory of Data Collected

### A. Customer Travel & Enquiry Form (`src/components/enquiries/enquiry-form.tsx`)
Submitted via HTTP `POST` to `/api/enquiries` and validated server-side using Zod (`src/lib/validations/enquiry.ts`).

| Field Name | Type | UI Visibility | Validation / Constraints | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `fullName` | String | **Visible (Mandatory)** | Min 2, max 100 characters; whitespace trimmed | Customer identification for personal travel consultation |
| `email` | String | **Visible (Mandatory)** | Valid email regex format, max 100 chars, converted to lowercase | Communication of quotations, itineraries, and responses |
| `phone` | String | **Visible (Mandatory)** | Min 8 digits, max 20 characters | Voice consultation and follow-up regarding travel requirements |
| `travelType` | Enum | **Visible (Optional)** | `domestic`, `international`, `corporate`, `other` | Categorizing inquiry for specialist travel consultant routing |
| `message` | String | **Visible (Mandatory)** | Min 10, max 2000 characters | Specific travel plans, destination preferences, dates, passenger notes |
| `source` | Enum | **Hidden (Contextual)** | `general`, `package`, `destination`, `offer`, `service` | Attribution of the referring page/trigger |
| `packageSlug` | String | **Hidden (Contextual)** | Max 100 chars (e.g. `kashmir-paradise-on-earth`) | Identifying specific curated tour package of interest |
| `destinationSlug` | String | **Hidden (Contextual)** | Max 100 chars (e.g. `dubai-emirates`) | Identifying destination page of origin |
| `offerSlug` | String | **Hidden (Contextual)** | Max 100 chars | Identifying promotional campaign of origin |
| `serviceId` | String | **Hidden (Contextual)** | Max 100 chars (e.g. `corporate-mice`) | Identifying specific corporate/travel service of origin |
| `honeypot` | String | **Hidden (Anti-Spam)** | Max length 0 (must remain empty for human submission) | Silent discard of automated bot submissions |

*Note on Schema Extensions:* The Mongoose model (`src/models/enquiry.ts`) includes optional schema definitions for `companyName`, `travelDate`, `returnDate`, `travellers`, and `budget`. These fields exist in the data model for future or programmatic use but are **not currently rendered** as standalone inputs on the public Phase 1 web form.

### B. What is NOT Collected by the Phase 1 Website
The following data categories are **expressly not collected** anywhere on the Phase 1 public website:
* **No Account Credentials:** No user registration, password creation, or customer login portal is implemented.
* **No Payment Information:** No credit card, debit card, CVV, Net Banking, or UPI credentials are collected or processed on this website. (No payment gateway integration exists in Phase 1).
* **No Government Identity Documents:** No passport numbers, Aadhaar cards, PAN numbers, or visa document scans are requested or uploaded through the website form.
* **No Careers / Résumé Uploads:** No employment application form or file upload interface is present on the Phase 1 website.
* **No Biometrics or Sensitive Personal Data:** No health metrics, biometrics, or religious affiliations are collected via public forms.

### C. Technical & Browser Data
* **Server-Level Metadata:** IP addresses, browser user-agent strings, HTTP request timestamps, and referrers are processed transiently in memory by Node.js/Next.js and hosting edge proxies to route requests and protect against volumetric attacks.
* **Self-Hosted Typography:** Google Fonts are loaded via `next/font/google` (`Space_Grotesk`, `DM_Sans`, `JetBrains_Mono`), which downloads and serves fonts locally from the application build. **No visitor IP is transmitted to Google font servers** during browsing.
* **Cookies:** Only technical, session-management, and routing markers are set. No cross-site tracking cookies, no third-party marketing tags, and no ad trackers are loaded.

---

## 3. Data Collection Channels

1. **Website Enquiry Form:** Direct JSON submission from browser to `/api/enquiries`.
2. **Visitor-Initiated Telephone Inquiries:** Direct telephone calls to MTPL phone lines (`+91 9325006600`, `+91 7741006600`).
3. **Visitor-Initiated Email:** Inquiries transmitted directly by visitors to `support@mishrikotkartravels.com`.
4. **WhatsApp Inquiries:** Links triggering WhatsApp chat sessions (`https://wa.me/919325006600`).
5. **External Map & Social Navigation:** External hyperlinks directing visitors to Google Maps (office location) and Meta/Instagram (brand social channels).

---

## 4. Storage & Processing Infrastructure

* **Primary Database:** MongoDB accessed via Mongoose (`src/lib/db/mongoose.ts`).
  * Enquiries are stored in the `enquiries` collection.
  * Schema manages timestamps automatically (`createdAt`, `updatedAt`).
  * Status field defaults to `"NEW"` and supports `"NEW"`, `"CONTACTED"`, `"IN_PROGRESS"`, `"CONVERTED"`, `"CLOSED"`, `"SPAM"`.
* **Media & Itinerary Storage:** Local filesystem storage (`src/lib/storage/providers/local-filesystem.ts`) is used strictly for storing and serving static package itinerary PDFs. No customer personal data is written to the filesystem.
* **Automated Email Transports:** No third-party transactional email API (such as SendGrid or Resend) is active in `/api/enquiries`. Submissions are stored directly in MongoDB for internal review and offline consultation follow-up by MTPL staff.

---

## 5. Third Parties & Service Providers

| Entity | Role / Service | Data Disclosed | Location / Jurisdiction |
| :--- | :--- | :--- | :--- |
| **MongoDB Host** (Atlas / VPS) | Database storage for enquiry records | Name, phone, email, trip message, timestamps | Subject to hosting region (to be verified with MTPL) |
| **Web Hosting Provider** (Node.js VPS / Cloud) | Serving application bundles, API routing, server logs | Ephemeral IP, user-agent, request path | Subject to server region (to be verified with MTPL) |
| **WhatsApp / Meta Platforms, Inc.** | External messaging (if visitor clicks WhatsApp link) | Visitor phone number and chat message inside WhatsApp | Governed by Meta Platforms privacy terms |
| **Email Service Provider** | Mail server hosting `support@mishrikotkartravels.com` | Visitor email address, email headers, body | Governed by corporate email provider |
| **Travel Suppliers** (Airlines, Hotels, DMCs) | Off-site booking fulfillment (subsequent offline stage) | Passenger names, contact, travel dates (only when booking is confirmed) | Domestic India & destination countries |
| **Advertising / Analytics Networks** | Third-party tracking | **NONE** (Zero ad trackers or third-party pixels installed) | N/A |

---

## 6. Data Retention & Deletion Behavior

* **Technical Verification:** The Mongoose schema does **not** configure a TTL (Time-To-Live) index for automated record expiration. Enquiries persist in MongoDB until manually managed by MTPL.
* **Operational Status Lifecycle:** Records are tagged with statuses (`NEW` &rarr; `CONTACTED` &rarr; `IN_PROGRESS` &rarr; `CONVERTED` / `CLOSED` / `SPAM`).
* **Open Policy Question for MTPL:** MTPL must establish formal operational retention periods (e.g., retaining booking records for statutory 5–7 year tax and accounting compliance under Indian law, while purging stale or unconverted enquiries after a defined timeframe).

---

## 7. Security Controls Observed in Code

1. **Zod Input Sanitization:** Strict schema validation rejects payloads that exceed boundary lengths or contain invalid formats before any database interaction occurs.
2. **Server-Side Environment Variables:** Database connection strings (`MONGODB_URI`) are strictly server-side and never exposed to client bundles.
3. **Safe Error Handling:** Catch blocks in `/api/enquiries` log errors server-side without leaking raw database error objects or stack traces to the public HTTP response.
4. **Path Traversal Protection:** Package PDF download endpoints rigorously check for and block illegal path sequences (`..`, `/`, `\`).
5. **Honeypot Bot Protection:** Hidden input field intercepts automated web scrapers and spambots without imposing intrusive third-party CAPTCHA cookies on legitimate travelers.
6. **Self-Hosted Assets:** Absence of third-party external scripts minimizes vulnerability to supply-chain injection attacks.

---

## 8. Matters Requiring MTPL Confirmation

Before formal public indexation and final production sign-off, MTPL management must clarify:
1. **Designation of Grievance Officer:** Under India's *Digital Personal Data Protection Act, 2023 (DPDPA)* and the *Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules*, MTPL should confirm the name, official title, and dedicated contact address of its designated Grievance / Privacy Officer.
2. **Hosting Infrastructure Location:** Confirmation of whether production servers and MongoDB databases reside physically within the Republic of India or in an overseas data center.
3. **Formal Retention Schedule:** MTPL operational policy regarding how long unconverted leads, customer inquiries, and communications should be retained before permanent purge.
4. **Offline Passenger Documentation Practices:** Clarification on how passports, identity proofs, and payment confirmations are archived once offline travel arrangements commence.
