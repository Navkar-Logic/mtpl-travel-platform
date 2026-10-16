# MTPL Travel Platform — Security Specification

## Core Principle

Security-sensitive operations must happen on the server.

## Environment Variables

Never expose:

- database credentials
- API provider credentials
- payment gateway secrets
- session secrets
- signing keys

Use environment variables.

Never commit `.env.local` or production secrets.

## Database

- server-side access only
- validate all inputs
- restrict query shapes
- avoid arbitrary operators from request bodies
- use least-privilege credentials where possible

## API Routes

Every write endpoint must:

- validate input
- limit payload size where appropriate
- handle errors safely
- prevent duplicate submissions where relevant
- log operationally useful information without secrets

## Authentication

Phase 1 has no general customer authentication requirement.

Phase 2 admin authentication must include:

- secure sessions
- strong password handling if passwords are used
- role-based access control
- session expiry
- secure cookies
- CSRF protections appropriate to the chosen architecture
- audit logging for sensitive operations

## Payment

CCAvenue integration must be server-verified.

Never trust a browser-only payment success message.

Verify payment status before considering a booking paid.

## TBO

TBO credentials must remain backend-only.

Never expose TBO credentials to the browser.

## Booking Idempotency

Phase 2 booking operations must prevent accidental duplicate bookings when a user retries after a timeout.

## Logging

Do not log:

- passwords
- API secrets
- payment secrets
- full card data
- unnecessary passenger sensitive data

Log:

- request correlation/reference
- operation
- status
- safe provider reference
- timestamp
- error classification

## Headers

Use appropriate security headers in production.

Examples may include:

- Content-Security-Policy where compatible
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- frame protections

## Dependencies

Regularly review:

- `npm audit`
- dependency updates
- Next.js security advisories
- package compatibility

## Production

Do not:

- edit application files directly on production
- commit production secrets
- expose MongoDB publicly
- expose internal admin endpoints unnecessarily
- use development credentials in production
