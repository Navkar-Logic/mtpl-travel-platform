# MTPL Travel Platform — SEO Specification

## Goals

Build a technically strong foundation for search visibility without making unsupported SEO claims.

## Required

### Metadata

Every indexable page should have:

- title
- description
- canonical URL
- Open Graph metadata
- Twitter/X metadata where applicable

### Titles

Use a consistent format, for example:

```text
Page Name | MTPL
```

Do not blindly use the same title everywhere.

### Structured Data

Use structured data only when the content is accurate and supported.

Potential schemas:

- Organization
- LocalBusiness where appropriate
- BreadcrumbList
- Article where appropriate
- TouristDestination where justified
- Product/Offer only when the package data actually meets the requirements

Do not fabricate ratings/reviews in structured data.

## Sitemap

Generate a sitemap containing valid public URLs.

Dynamic package/destination URLs must be included when active/indexable.

## Robots

Use `robots.txt` to prevent indexing of:

- internal/admin routes
- development-only endpoints
- private APIs

Do not accidentally block public pages.

## Canonicals

Dynamic pages must have stable canonical URLs.

## Images

Use:

- descriptive filenames where possible
- meaningful alt text
- responsive image sizing
- Next.js image optimization

## Heading Structure

One clear primary page heading.

Use logical H2/H3 hierarchy.

Do not use heading tags only for visual sizing.

## Internal Linking

Link related:

- destinations → packages
- packages → destinations
- services → enquiry
- blog/resource content if introduced later

## Performance

SEO implementation must consider:

- Core Web Vitals
- image size
- font loading
- JavaScript volume
- layout shift
- server rendering where beneficial

## Local SEO

Use the actual approved MTPL business name, address, phone, and other public business information consistently.

Never invent multiple business locations.
