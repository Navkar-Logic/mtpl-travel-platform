# MTPL Travel Platform — Phase 2 Architecture

## Objective

Transform the Phase 1 enquiry-driven website into a real travel booking platform without rebuilding the public foundation.

## Domains

```text
mishrikotkartravels.com
    ↓
Corporate/public website

mtpl.online
    ↓
Customer booking platform

admin.mtpl.online
    ↓
Operations/admin platform
```

## Providers

### TBO / Tek Travels

Client-supplied documentation:

- Flight: `https://apidoc.tektravels.com/flight/`
- Hotel: `https://apidoc.tektravels.com//hotelnew`

The implementation must follow the provider's current certified API behavior and credentials.

### Payment

CCAvenue.

Payment configuration and merchant account belong to MTPL/client.

## Flight Flow

```text
Search
 ↓
TBO Search
 ↓
Results
 ↓
Filters/sorting
 ↓
Select
 ↓
Fare Rules
 ↓
Fare Quote / Revalidation
 ↓
SSR where supported
 ↓
Passenger details
 ↓
Review
 ↓
CCAvenue
 ↓
Payment verification
 ↓
TBO Book/Ticket according to provider flow
 ↓
PNR/Ticket
 ↓
GetBookingDetails when required
 ↓
Store booking
 ↓
Confirmation
```

Do not blindly retry ticketing after uncertain timeouts.

Retrieve booking status where the provider supports it.

## Hotel Flow

```text
Search
 ↓
TBO Hotel Search
 ↓
Filters
 ↓
Hotel details
 ↓
Room selection
 ↓
Revalidation
 ↓
Guest details
 ↓
Review
 ↓
CCAvenue
 ↓
TBO Booking
 ↓
Voucher
 ↓
Store booking
 ↓
Confirmation
```

## Booking Storage

Own MTPL database is the operational source for the website/admin application.

Store:

- internal booking reference
- provider
- provider booking ID
- TraceId where applicable
- PNR
- ticket number
- passenger/contact data required for operations
- itinerary
- payment status
- booking status
- ticket/voucher file reference
- timestamps

## Customer Retrieval

Prefer:

- booking reference + verified contact
- PNR + last name/appropriate verification
- OTP/contact verification where appropriate

Do not make PNR alone the only security boundary.

## Payment Failure Scenarios

Must handle:

1. payment failed
2. payment cancelled
3. payment succeeded but booking failed
4. booking succeeded but response timed out
5. duplicate callback
6. duplicate customer submission
7. provider unavailable
8. fare changed after search

## Admin Modules

Initial modules:

- dashboard
- flight bookings
- hotel bookings
- customers
- passengers
- payments
- enquiries
- packages
- destinations
- offers
- website content
- cancellations
- change/reissue where supported
- reports
- users/roles
- notifications
- API transaction/error logs

## Roles

Final roles should be confirmed with MTPL before implementation.

The system should support role-based permissions rather than hardcoded user checks.

## API Architecture

Do not call TBO directly from browser code.

Use:

```text
Browser
 ↓
MTPL server
 ↓
TBO
```

Secrets remain server-side.

## Certification

TBO certification/testing must be completed before production live booking.

Timeline depends on:

- credentials
- sandbox availability
- provider certification
- client approvals
- payment configuration
