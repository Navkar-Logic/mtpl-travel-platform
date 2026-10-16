# MTPL Travel Platform — Page Specification

## Route Architecture

Recommended public route structure:

```text
/
├── /about
├── /services
├── /flights
├── /hotels
├── /holidays
│   └── /holidays/[slug]
├── /destinations
│   └── /destinations/[slug]
├── /sightseeing
├── /visa
├── /offers
├── /gallery
├── /testimonials
├── /contact
├── /privacy-policy
├── /terms-and-conditions
└── /disclaimer
```

## Homepage

### Required sections

1. Header
2. Hero
3. Travel planning/enquiry panel
4. Trust/credential strip
5. Popular destinations
6. Featured holiday packages
7. Services
8. Why MTPL
9. Industry recognition/experience section where approved
10. Testimonials
11. Contact/enquiry CTA
12. Footer

### Phase 1 Hero

The hero must use enquiry CTAs, not live booking claims.

Recommended CTAs:

- Plan Your Trip
- Explore Holidays
- Talk to Our Team

A visually similar travel search panel may exist, but it must submit an enquiry rather than call TBO.

## About

Should explain:

- company history
- experience
- philosophy
- service approach
- leadership/team where approved
- credentials/recognition where approved

Avoid repeating the homepage word-for-word.

## Services

Service cards should lead to useful information or dedicated service sections.

Each service page/section should communicate:

- what MTPL provides
- who it is for
- key support
- enquiry CTA

## Flights

Phase 1:

- explain domestic/international flight assistance
- show enquiry CTA
- do not show fake live search results

Phase 2:

- live TBO search and booking UI will be introduced.

## Hotels

Phase 1:

- explain hotel booking assistance
- show curated/general service information
- enquiry CTA

Phase 2:

- live TBO hotel search and booking.

## Holidays

Listing page:

- filters only where useful and supported by stored data
- package cards
- pagination/load strategy as needed
- enquiry CTA

Detail page:

- hero image
- title
- duration
- destination
- overview
- itinerary
- inclusions
- exclusions
- important notes
- gallery where available
- enquiry CTA

Do not invent prices or inclusions.

## Destinations

Listing:

- destination cards
- categories if actual data supports them

Detail:

- overview
- highlights
- gallery
- related packages
- enquiry CTA

## Offers

Only publish offers supplied/approved by MTPL.

No fake discount values or expiry dates.

## Gallery

Use approved client images only.

Images should have meaningful alt text.

## Testimonials

Use only approved customer testimonials.

## Contact

Must include:

- contact details
- address
- map
- business hours
- contact form
- WhatsApp
- phone CTA
- email CTA

## Legal Pages

Render approved client legal content without changing legal meaning.

If a legal document is not approved, label it as draft internally and do not silently present it as final legal advice.

## Global Requirements

Every public page needs:

- responsive layout
- meaningful metadata
- proper heading hierarchy
- loading/error/empty states where applicable
- CTA to contact/enquire where appropriate
- consistent header/footer
