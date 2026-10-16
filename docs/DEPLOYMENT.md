# MTPL Travel Platform — Deployment Specification

## Environments

### Local Development

```text
Windows developer machine
Next.js
Docker Desktop
MongoDB
```

### Staging

Production-like environment used for UAT.

Use a separate database and credentials.

### Production

Recommended architecture:

```text
Internet
   ↓
Cloudflare
   ↓
Nginx
   ↓
Next.js Docker container
   ↓
MongoDB
```

## Host

Initial production infrastructure is planned on a Hostinger VPS.

The infrastructure should remain client-owned.

## Docker

Production services should be containerized where appropriate.

Do not use development configuration in production.

## MongoDB

MongoDB should not be exposed directly to the public internet.

Bind it to an internal/private interface/network.

Use strong credentials.

## Nginx

Responsibilities:

- reverse proxy
- HTTPS termination
- security headers where appropriate
- domain routing
- static/cache behavior where appropriate

## Domains

Phase 1:

`www.mishrikotkartravels.com`

Phase 2:

`www.mtpl.online`

Admin:

`admin.mtpl.online`

## SSL

Use valid HTTPS certificates.

Do not launch production on plain HTTP.

## Backups

Recommended baseline:

- daily database backup
- off-server backup where possible
- 7 daily retention
- 4 weekly retention
- 3 monthly retention
- periodic restore testing

The backup strategy must not depend solely on the same VPS that contains production.

## Deployment Process

```text
Local
 ↓
GitHub
 ↓
Staging
 ↓
UAT
 ↓
Approval
 ↓
Production
```

## Rollback

Every production deployment must have a rollback strategy.

At minimum:

- known previous application version
- database backup before risky migrations
- ability to redeploy previous image/commit

## Monitoring

Track:

- application health
- server resource usage
- disk
- MongoDB availability
- application errors
- SSL status
- backup success

## Important

Do not promise that a specific VPS plan is sufficient forever.

Infrastructure should be reviewed as:

- traffic grows
- booking volume grows
- database grows
- API usage grows
- backup requirements grow
