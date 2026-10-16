# MTPL Media Storage Architecture

## Overview
A provider-independent storage interface supporting local filesystem storage with future migration capability to object storage. Ensures environment-safe file management without leaking paths.

## Local Setup
For local development, the filesystem provider is used. Ensure the following environment variables are present in `.env.local`:
```env
MEDIA_STORAGE_PROVIDER=local
MEDIA_STORAGE_ROOT=./storage/media
MEDIA_MAX_IMAGE_SIZE_MB=10
MEDIA_MAX_PDF_SIZE_MB=20
```
This stores files safely inside `storage/media` (which is git-ignored).

## Directory Structure
```
storage/media/
├── public/
│   └── [auto-generated-keys].[ext]
└── private/
    └── [auto-generated-keys].[ext]
```

## Validations
- Supported types: JPEG, PNG, WebP, PDF.
- SVG uploads are NOT supported to prevent cross-site scripting (XSS) vectors.
- Enforces strict magic-byte validation on uploads to reject spoofed files.
- Rejects files over configured limits.

## MongoDB Metadata
Schema defined at `src/models/media-asset.ts`.
Stores the file reference (`storageKey`, original name, size, type, etc.) but not binary data.

## Public / Private Rules
- `public`: Image assets, public PDFs. Accessible via `/api/media/[key]`.
- `private`: Documents that must not be accessible via URL.
No unauthenticated public API exists for fetching private files.

## Production Setup (Hostinger VPS)
- Create a persistent volume or absolute directory, e.g., `/srv/mtpl/media`.
- Set `MEDIA_STORAGE_ROOT=/srv/mtpl/media` in the production environment.
- This directory must exist outside the application source and deployment bundle so it survives rebuilds.
- Ensure the production Node/Docker user has read/write ownership of the directory (do not use 777 permissions).

## Future Migration
By wrapping filesystem operations in `src/lib/storage/providers/local-filesystem.ts` and the `StorageProvider` interface, migrating to S3 or Cloudflare R2 only requires implementing a new provider and setting `MEDIA_STORAGE_PROVIDER=s3`.

## Backups and Restoration
Since media files are stored locally in the VPS filesystem and metadata in MongoDB, both must be backed up concurrently. If restoring, ensure the `storage/media` snapshot corresponds to the MongoDB snapshot to avoid orphaned DB records or orphaned files.

## Limitations
- Upload route is NOT exposed publicly, as an admin authentication system is currently unbuilt. Upload must be performed server-side or via a secure admin interface in the future.
