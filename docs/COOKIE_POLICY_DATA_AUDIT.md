# MTPL Travel Platform — Cookie and Browser Storage Technical Audit (Phase 1)

**Document Reference:** `docs/COOKIE_POLICY_DATA_AUDIT.md`  
**Company:** Mishrikotkar Travels Pvt. Ltd. (MTPL)  
**Website:** `https://www.mishrikotkartravels.com`  
**Audit Date:** October 2026  
**Auditor:** Engineering / Antigravity Implementation Team  
**Scope:** Phase 1 Next.js App Router codebase (`mtpl-travel-platform`)

---

## 1. Purpose & Audit Scope

This document records the exhaustive technical audit of cookies, local browser storage, third-party scripts, and tracking technologies across the active Phase 1 codebase of the MTPL website. 

The findings below serve as the factual baseline for the public **Cookie Policy** published at `/cookie-policy`. All statements distinguish verified repository facts from unverified hosting-level or third-party platform behavior.

---

## 2. Technical Findings by Category

### A. First-Party Application Cookies
* **Code Search:** Inspected all source code for `document.cookie`, Next.js `cookies()` (`next/headers`), and HTTP `Set-Cookie` response headers.
* **Result:** **No first-party application cookies are set by the MTPL codebase.**
* **Analysis:** The Phase 1 website is a content-driven and inquiry-driven informational site. Neither the client components nor the API routes (`/api/enquiries`, `/api/health/db`, `/api/packages/[slug]/download`, `/api/media/[key]`) issue `Set-Cookie` directives.

### B. Client-Side Browser Storage (`localStorage`, `sessionStorage`, `IndexedDB`)
* **Code Search:** Scanned for `window.localStorage`, `window.sessionStorage`, and `indexedDB`.
* **Result:** **Zero usage identified.**
* **Analysis:** Form inputs in `src/components/enquiries/enquiry-form.tsx` are managed strictly in component memory (`React.useState`) during the user's active session. No user inputs, preferences, or session markers are serialized to persistent browser storage.

### C. Authentication & Session Management
* **Code Search:** Scanned for session cookies, JWT storage, or auth providers.
* **Result:** **No authentication system is implemented in Phase 1.**
* **Analysis:** There are no customer account portals, user logins, or administrative login sessions in the Phase 1 public release. Consequently, no session or authentication cookies exist.

### D. Analytics, Marketing Tags, & Tracking Pixels
* **Code Search:** Inspected `src/app/layout.tsx`, `package.json`, and all page components for tracking tools (Google Tag Manager, Google Analytics / GA4, Meta/Facebook Pixel, Microsoft Clarity, Hotjar, etc.).
* **Result:** **Zero third-party tracking scripts or advertising pixels are present.**
* **Analysis:** `package.json` contains only core web framework packages (`next`, `react`, `react-dom`, `framer-motion`, `lucide-react`, `mongoose`, `zod`, `sharp`). No tracking libraries are installed. The root layout loads only an inline `application/ld+json` Schema.org script for structured business metadata.

### E. Fonts & Static Asset Loading
* **Code Search:** Reviewed font configuration in `src/app/layout.tsx`.
* **Result:** Google Fonts (`Space_Grotesk`, `DM_Sans`, `JetBrains_Mono`) are managed through Next.js built-in `next/font/google`.
* **Analysis:** In Next.js, `next/font/google` automatically downloads font files at build time and self-hosts them locally with the static assets. **No requests are made to Google font servers** when a visitor accesses the website, and no third-party cookies are set.

### F. External Links vs. Embedded Content
* **Code Search:** Verified all external touchpoints (`whatsapp`, `maps.google.com`, `instagram.com`, `facebook.com`).
* **Result:** **All external integrations are implemented as standard outbound hyperlinks (`<a>` tags).**
  * WhatsApp buttons link directly to `https://wa.me/919325006600` with `target="_blank"`.
  * Office address links navigate to `https://www.google.com/maps/search/?api=1&query=...` with `target="_blank"`.
  * Social links navigate to Instagram and Facebook in new browser tabs.
* **Analysis:** There are **no embedded iframes, no embedded Google Maps widgets, no embedded YouTube players, and no third-party live-chat SDKs**. Outbound links do not execute third-party JavaScript or set third-party cookies on MTPL's domain. Once a user clicks an outbound link, they leave MTPL's website and enter the external platform, which operates under its own privacy and cookie policies.

### G. Media Downloads & HTTP Caching
* **Code Search:** Inspected `/api/packages/[slug]/download/route.ts`.
* **Result:** Uses standard HTTP caching headers (`Cache-Control: public, max-age=86400`).
* **Analysis:** Browser HTTP caching stores static package itinerary PDF documents in the browser's standard network cache. HTTP caching is not a cookie and does not track users.

### H. Bot Protection & Anti-Spam
* **Code Search:** Inspected `src/components/enquiries/enquiry-form.tsx` and `src/app/api/enquiries/route.ts`.
* **Result:** Anti-bot protection is achieved through a hidden **honeypot** input field (`honeypot`).
* **Analysis:** No third-party CAPTCHA services (such as Google reCAPTCHA or Cloudflare Turnstile) are loaded. Legitimate visitors are not subjected to CAPTCHA cookies or browser fingerprinting scripts.

### I. Existing Cookie Banner or Consent UI
* **Code Search:** Scanned for cookie consent banners, preference modals, or consent-management vendor SDKs (OneTrust, Cookiebot, etc.).
* **Result:** **No cookie consent banner or preference center is currently implemented in the codebase.**
* **Analysis:** Because the active codebase does not set non-essential cookies, analytics cookies, or advertising trackers, no consent banner was built in Phase 1.

---

## 3. Technology & Storage Matrix

| Technology / System | File Reference / Source | Sets Cookies / Storage? | Category / Role | Party | Status in Repository |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Next.js App Router** | `src/app/layout.tsx` | No application cookies set | Core Framework | 1st-party | Verified in code |
| **Enquiry Form** | `src/components/enquiries/enquiry-form.tsx` | No cookies; in-memory React state only | User Input | 1st-party | Verified in code |
| **Package Brochure API** | `src/app/api/packages/[slug]/download` | No cookies; standard `Cache-Control` header | Document Serving | 1st-party | Verified in code |
| **Typography** | `src/app/layout.tsx` (`next/font/google`) | None (self-hosted locally at build time) | Visual Styling | 1st-party | Verified in code |
| **Honeypot Bot Defense** | `src/lib/validations/enquiry.ts` | None (pure form field validation) | Security | 1st-party | Verified in code |
| **WhatsApp Links** | `src/app/(website)/contact/page.tsx` | None on MTPL domain (outbound link) | External Link | 3rd-party | Verified in code |
| **Google Maps Links** | `src/components/layout/footer.tsx` | None on MTPL domain (outbound link) | External Link | 3rd-party | Verified in code |
| **Social Links** | `src/components/layout/footer.tsx` | None on MTPL domain (outbound link) | External Link | 3rd-party | Verified in code |
| **Hosting / Reverse Proxy** | Deployment environment (Vercel / Cloudflare / Nginx) | **Potential** edge security or load balancing cookies | Infrastructure | 1st/3rd-party | **Requires host verification** |

---

## 4. Distinction Between Codebase Audit and Production Hosting

While the application source code sets zero cookies and uses no persistent browser storage, the production hosting infrastructure (e.g., Cloudflare, AWS CloudFront, Vercel, or custom Nginx reverse proxy) may independently inject technical headers or operational cookies outside the Next.js application layer:
1. **DDoS & Bot Mitigation:** Reverse proxies (such as Cloudflare) may set strictly necessary operational cookies (e.g. `__cf_bm`) to distinguish humans from automated attack traffic.
2. **Server Load Balancing:** Cloud infrastructure may issue ephemeral session-affinity cookies (e.g. `AWSALB`) to route requests to the same origin server.

*Policy Implication:* The Cookie Policy must not make an absolute guarantee that no cookies can ever exist on any user's device under any hosting condition. Instead, it must accurately state that MTPL's website code does not set tracking or advertising cookies, while transparently explaining potential hosting-level technical cookies and browser controls.

---

## 5. Items Requiring MTPL Confirmation

Before final production sign-off and public indexation:
1. **Production CDN / Reverse Proxy Configuration:** Confirm whether the live domain utilizes Cloudflare or another edge proxy that sets security headers or operational cookies.
2. **Future Analytics Roadmap:** If MTPL intends to integrate Google Analytics (GA4) or Meta advertising pixels in Phase 2, a compliant cookie consent banner and preference center must be designed and deployed prior to activating those tracking scripts.
3. **Consent Management Decision:** Confirm whether MTPL wishes to maintain the current cookie-free architecture or introduce an explicit informational notice.
