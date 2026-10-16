# MTPL Travel Platform — Client Content Readiness Report & Checklist

This document tracks information that must be supplied or approved by MTPL before the website can fully replace its development placeholders and empty states. 

A clear boundary is maintained between standard brand assets and dynamically uploaded content.

### Content Manifest
- **Source-Controlled Assets (`public/assets/`)**: Used strictly for developer-controlled, permanent brand files (e.g., final company logos, SVG icons, structural placeholders, favicon).
- **Uploaded Media (`storage/media/`)**: Used for all client-managed or volatile content (e.g., package photos, destination photos, offers banners, staff portraits, PDFs, brochures). These should map to `MediaAsset` records via the storage API.

**Manifest Tracking Recommendations:**
- *Logos*: Store standard variants as `public/assets/mtpl-logo.png`
- *Dynamic images (packages/destinations)*: Upload through the system so they resolve via `/api/media/[key]`
- *Brochures*: Upload as `private` or `public` PDFs via the storage system depending on access rules.

---

## Content Checklist

### REQUIRED Content
The following items are strictly required to launch a fully representative version of the website:

- [x] **Approved logo files**: Final logo in SVG/PNG, including light/dark variants and favicon.
- [x] **Confirmed contact information and social links**: Primary phone, enquiry phones, email, WhatsApp number, address, business hours, Google Maps location, and social media URLs (Facebook, Instagram, etc.). *(Note: Social media URLs were omitted as none are currently confirmed)*.
- [ ] **Company and travel photography**: Authentic hero images, gallery items, and neutral brand imagery (no fake representations of experiences).
- [ ] **Approved privacy policy and terms**: Including standard Terms & Conditions, Disclaimer, and Holiday Terms.
- [ ] **Confirmed holiday packages**: Exact package title, destination, duration, itinerary, inclusions, exclusions, and approved images. (Prices are optional if enquiry-based).
- [ ] **Approved destinations and descriptions**: Exact names, countries, descriptions, highlights, and approved imagery for every promoted destination.

### OPTIONAL Content
The website is designed to handle the absence of the following content gracefully (by hiding the relevant sections or showing clean empty states). Do not block the launch if these are unavailable:

- [ ] **Director and staff names, designations, and photographs**: For the About/Team sections.
- [ ] **Active offers and terms, if any**: Only publish when MTPL provides full details (title, description, validity, terms, image, CTA). 
- [ ] **Genuine testimonials and publication permission**: Requires exact approved text, customer name, and permission to publish. Fabricated reviews are strictly prohibited.
- [ ] **Approved brochures/PDFs**: Downloadable itineraries or company profiles.

## Important
Until supplied or approved, use `TBD` or leave the data array empty to trigger the system's built-in empty states. Never create fake content merely to make a page look complete.
