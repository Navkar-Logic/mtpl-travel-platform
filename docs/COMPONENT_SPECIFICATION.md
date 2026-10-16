# MTPL Travel Platform — Component Specification

## Component Principles

Components should be:

- reusable
- focused
- typed
- accessible
- responsive
- composable
- independent of database access unless explicitly designed as a server/data component

Do not create giant components containing multiple unrelated responsibilities.

## Layout Components

### Header

Responsibilities:

- logo
- desktop navigation
- contact/phone CTA
- enquire CTA
- mobile menu
- active route indication

Must remain responsive.

### MobileNavigation

Responsibilities:

- mobile route navigation
- clear close behavior
- keyboard accessibility
- focus management

### Footer

Sections:

- brand summary
- quick links
- services
- destinations
- support/legal
- contact
- social links
- copyright

## Shared Components

- Button
- IconButton
- Card
- Badge
- Container
- Section
- SectionHeading
- Breadcrumbs
- PageHero
- EmptyState
- ErrorState
- LoadingState
- Modal
- Dialog
- Tabs
- Select
- Input
- Textarea
- PhoneInput if required

## Travel Components

### Hero

Props/data should support:

- eyebrow
- heading
- description
- primary CTA
- secondary CTA
- image
- optional trust points

### TravelEnquiryPanel

Phase 1 only:

- destination
- travel dates
- travellers
- travel type
- contact details where appropriate
- submit enquiry

It must not imply live availability.

### DestinationCard

Data:

- name
- slug
- image
- short description
- optional category
- href

### PackageCard

Data:

- title
- slug
- destination
- duration
- image
- short summary
- price only if approved
- tags
- href

### ServiceCard

Data:

- title
- description
- icon
- href

### TestimonialCard

Data:

- approved quote
- approved customer name
- optional location
- optional avatar
- rating only if supplied/approved

### OfferCard

Data:

- title
- image
- description
- validity only if supplied
- CTA

### GalleryCard

Data:

- image
- alt
- title/caption if approved

## Form Components

All forms require:

- client-side UX validation
- server-side validation
- accessible labels
- error messages
- loading state
- success state
- failure state
- duplicate-submission protection

Never trust client-side validation alone.

## Component Data Rule

Presentational components should receive data.

They should not contain hardcoded business content such as package prices or testimonials.
