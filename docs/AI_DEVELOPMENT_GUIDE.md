# MTPL Travel Platform — AI Development Guide

## Purpose

This document is the operating contract for any AI coding agent working on this repository.

The AI must treat the `/docs` directory as project-specific requirements and architecture documentation.

## First Rule

Before implementing a feature, read the documentation relevant to that feature.

At minimum:

- `PROJECT_CONTEXT.md`
- `PRODUCT_REQUIREMENTS.md`
- `DESIGN_SYSTEM.md`
- `DEVELOPMENT_WORKFLOW.md`

Then read any domain-specific document needed.

## Do Not Guess

The AI must not invent:

- client facts
- awards
- testimonials
- package prices
- package inclusions
- customer statistics
- legal claims
- guarantees
- supplier relationships
- live booking functionality

If required information is missing, use `TBD` or ask for the source.

## Scope Protection

Phase 1 does not include:

- TBO live APIs
- CCAvenue
- online payment
- booking
- ticketing
- admin panel
- customer login/dashboard

Do not implement these merely because the UI reference contains a search/booking interface.

## Architecture Protection

Do not:

- create unnecessary duplicate services
- create multiple database connection implementations
- put database logic directly in reusable UI components
- call third-party provider APIs from the browser
- expose secrets
- create hardcoded content that should be data-driven
- rewrite the whole project for a small feature
- introduce libraries without a clear reason

## UI Rules

Follow `DESIGN_SYSTEM.md`.

The reference screenshot is visual inspiration.

Do not clone the reference site.

Use MTPL's:

`#07A25E`

as the primary brand color.

## Data Rules

Business-managed content must be represented through models/data structures.

Examples:

- packages
- destinations
- offers
- testimonials
- gallery
- services
- website settings

## Form Rules

All forms require:

- client UX validation
- server validation
- loading state
- success state
- error state
- duplicate-submission protection

## Security Rules

Never expose:

- MongoDB credentials
- TBO credentials
- CCAvenue secrets
- session secrets
- private API keys

Never return raw internal errors to users.

## Responsive Rules

Every UI feature must be checked at:

- mobile
- tablet
- desktop
- wide desktop

Do not finish a feature only because desktop looks correct.

## Accessibility Rules

Every feature must support:

- keyboard navigation
- visible focus
- semantic HTML
- labels
- accessible error messages
- sufficient contrast
- reduced motion where applicable

## Performance Rules

Prefer:

- Server Components where appropriate
- optimized images
- limited client JavaScript
- lazy loading for non-critical content
- stable layouts to reduce CLS

Do not make the whole application a Client Component unnecessarily.

## Implementation Process

```text
1. Read docs
2. Inspect existing code
3. Define change
4. Implement
5. Run checks
6. Review affected files
7. Update docs if architecture changed
8. Report completion
```

## Before Changing Architecture

Explain:

- current architecture
- problem
- proposed change
- affected areas
- migration risk

Do not silently replace foundational technology.

## Error Handling

Every user-facing operation should have a deliberate failure state.

Do not use:

```text
catch (error) {
  console.log(error)
}
```

as the only error handling.

## Loading/Empty States

Dynamic content needs:

- loading behavior where applicable
- empty state
- error state

Do not show a blank page when a database query returns no records.

## Code Quality

Prefer:

- small functions
- meaningful names
- explicit types
- reusable abstractions
- clear module boundaries

Avoid:

- giant files
- deeply nested conditionals
- duplicated constants
- `any` unless justified
- magic strings
- magic numbers

## Documentation

If an implementation changes:

- architecture
- database model
- deployment
- API contract
- security behavior
- major design-system rules

update the relevant `.md` document.

## Final Response After Coding

An AI agent should report:

1. What was implemented.
2. Files/modules changed.
3. Checks run.
4. Any remaining issue.
5. Any manual action required.

Do not claim something works if it was not tested.
