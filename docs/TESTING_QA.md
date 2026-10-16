# MTPL Travel Platform — Testing and QA

## Testing Levels

1. Type checking
2. Linting
3. Unit tests where logic warrants them
4. Integration/API tests
5. Component testing where valuable
6. Browser/E2E testing for critical flows
7. Responsive testing
8. Accessibility checks
9. Security checks
10. Production smoke testing

## Minimum Development Checks

Before merging a feature:

```text
npm run lint
npm run build
```

Run type checking through the project's configured TypeScript/build workflow.

Add automated tests as the codebase introduces test infrastructure.

## Page QA

Every page must be checked for:

- correct content
- correct links
- responsive behavior
- loading states
- error states
- empty states
- images
- metadata
- console errors
- accessibility
- performance

## Form QA

Test:

- valid submission
- missing required fields
- invalid email
- invalid phone
- excessive text
- duplicate submission
- network failure
- server failure
- mobile keyboard behavior

## Responsive Breakpoints

Test at minimum:

- small mobile
- large mobile
- tablet
- laptop
- desktop
- wide desktop

Do not rely only on one browser window size.

## Critical Phase 1 Flows

### Navigation

Home → every primary route → back to Home.

### Holiday

Holiday list → package detail → enquiry.

### Destination

Destination list → destination detail → related package/enquiry.

### Contact

Contact → submit → database persistence → success.

### Travel Enquiry

Homepage enquiry → validation → persistence → success.

## Visual QA

Compare implementation against the approved MTPL design system, not merely the reference screenshot.

Check:

- spacing
- typography
- alignment
- card dimensions
- image crops
- CTA consistency
- mobile layout

## Release Gates

Do not deploy if:

- production build fails
- critical forms fail
- broken navigation exists
- secrets are exposed
- major responsive issues exist
- critical accessibility issues remain
- database writes are unsafe
- required client approval is missing

## Phase 2 QA

Add scenarios for:

- fare changes
- payment success + booking failure
- booking timeout
- duplicate booking prevention
- PNR retrieval
- ticket retrieval
- hotel revalidation
- cancellation
- refund status
- provider errors
