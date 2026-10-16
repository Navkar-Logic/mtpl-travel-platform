# MTPL Travel Platform — Enquiry System

## Purpose

Phase 1 is enquiry-driven.

The enquiry system is the bridge between the public website and MTPL's future booking platform.

## Enquiry Types

- general contact
- plan your trip
- holiday package enquiry
- destination enquiry
- service enquiry

## Suggested Fields

```text
fullName
companyName (optional)
email
phone
travelType
destination
travelDate
returnDate
travellers
budget (optional)
message
sourcePage
packageId (optional)
destinationId (optional)
createdAt
updatedAt
status
```

## Status

```text
NEW
CONTACTED
IN_PROGRESS
CONVERTED
CLOSED
SPAM
```

## Flow

```text
User
 ↓
Form
 ↓
Client validation
 ↓
Server validation
 ↓
API/Server action
 ↓
Database
 ↓
Success response
```

## Security

- server-side validation
- rate limiting where appropriate
- length limits
- email validation
- phone validation
- safe logging
- no secrets in browser
- no raw database errors returned to users

## UX

On submit:

1. Disable repeated submission.
2. Show progress.
3. Validate.
4. Submit.
5. Show success confirmation.
6. Preserve useful form state on recoverable errors.
7. Show a clear failure message without exposing internal details.

## Success Message

Use concise language such as:

> Thank you. Our travel team will get in touch with you shortly.

Do not promise a response time unless MTPL has approved one.

## WhatsApp

WhatsApp should be a secondary conversion path.

Do not place private enquiry information into a prefilled WhatsApp URL unless the user explicitly initiated that action and the content is appropriate.

## Phase 2

Enquiries may become CRM/admin records and may be linked to customers/bookings.
