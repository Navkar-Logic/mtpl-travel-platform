# MTPL Travel Platform — Content and Data Model

## Principle

The public website must be data-driven wherever content is expected to change.

Do not hardcode business-managed content into page components.

## Content Domains

### Packages

Suggested fields:

- title
- slug
- destination
- shortDescription
- description
- duration
- heroImage
- gallery
- itinerary
- inclusions
- exclusions
- importantNotes
- price
- priceLabel
- tags
- featured
- active
- sortOrder
- seo
- createdAt
- updatedAt

Any field not approved/supplied by MTPL must remain empty/TBD.

### Destinations

Suggested fields:

- name
- slug
- country
- region
- shortDescription
- description
- heroImage
- gallery
- highlights
- featured
- active
- sortOrder
- seo
- createdAt
- updatedAt

### Offers

Suggested fields:

- title
- slug
- shortDescription
- description
- image
- validFrom
- validUntil
- active
- CTA
- seo
- createdAt
- updatedAt

### Testimonials

Suggested fields:

- quote
- customerName
- location
- rating
- avatar
- approved
- active
- sortOrder
- createdAt
- updatedAt

### Gallery

Suggested fields:

- title
- image
- alt
- category
- active
- sortOrder
- createdAt
- updatedAt

### Services

Suggested fields:

- title
- slug
- shortDescription
- description
- icon
- image
- active
- sortOrder
- createdAt
- updatedAt

### Website Settings

Centralize:

- company name
- phone numbers
- email
- address
- business hours
- WhatsApp number
- social links
- logo references
- default SEO
- legal page references

## Data Lifecycle

Phase 1:

```text
Seed/import/admin-like developer process
        ↓
MongoDB
        ↓
Website
```

Phase 2:

```text
Admin Panel
        ↓
Validation
        ↓
Service Layer
        ↓
MongoDB
        ↓
Website
```

## Content Safety

Never invent missing content.

Use:

- `TBD`
- empty state
- hidden section

rather than fake information.

## Image Strategy

Images should be stored/referenced through a proper storage abstraction.

Do not couple the whole application to one provider.

Recommended conceptual structure:

```text
StorageService
├── upload
├── delete
├── getUrl
└── metadata
```

The actual storage provider can be selected later.

## Slugs

Slugs must be:

- lowercase
- URL-safe
- stable
- unique

Do not generate unstable URLs from display titles on every request.
