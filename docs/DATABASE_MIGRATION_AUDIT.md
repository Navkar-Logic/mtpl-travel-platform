# MTPL Travel Platform — Database Migration & Architecture Audit

**Project:** Mishrikotkar Travels Pvt. Ltd. (MTPL) Travel Platform  
**Audit Date:** 2026-10-15  
**Auditor:** Antigravity AI Engine  
**Authoritative Target Database:** MongoDB with Mongoose  

---

## 1. Executive Summary

This audit assesses the state of application persistence, data models, and database connectivity across the MTPL Travel Platform codebase.

### Key Audit Findings:
1. **Authoritative Runtime Database:** **MongoDB with Mongoose (`mongoose@^9.11.0`)** is the sole active database technology implemented in the codebase.
2. **PostgreSQL / Prisma Status:** **Zero active runtime usage.** There are no Prisma schema files (`schema.prisma`), no Prisma migrations, no PostgreSQL database drivers (`pg`, `postgres`), and no Prisma dependencies in `package.json` or `package-lock.json`. 
3. **Source of PostgreSQL / Prisma Mentions:** Mentions of Prisma and PostgreSQL were exclusively found in three static documentation files (`PROJECT_ARCHITECTURE.txt`, `COMPLETE_PROJECT_ARCHITECTURE.txt`, and the generation script `scripts/generate_architecture_doc.py`), where a generic template string was unintentionally used.
4. **Persistent Entities Identified in Code:**
   - **`Enquiry`** (`src/models/enquiry.ts`): Active in production. Persists lead generation forms, package quote requests, and contact inquiries.
   - **`MediaAsset`** (`src/models/media-asset.ts`): Active in production. Persists metadata for uploaded media files and documents in `src/lib/storage/service.ts`.
5. **Static Authoritative Data:**
   - Packages (77 verified packages) and Destinations are currently rendered from typed, authoritative client-verified datasets (`src/features/packages/data/packages.ts`, `src/features/destinations/data/`). These are slated for future Phase 2 dynamic management in MongoDB.

---

## 2. Exhaustive Database Inventory

| Component / File Path | Database Tech | Current Usage | Affected Features | Recommended Action |
|:---|:---|:---|:---|:---|
| `package.json` | Mongoose (`^9.11.0`) | Primary database ODM dependency | Application persistence | **Retain & Standardize** |
| `package-lock.json` | Mongoose & mongodb driver | Lockfile for mongoose and bson | Dependency resolution | **Retain & Standardize** |
| `docker-compose.yml` | MongoDB 8 (`mongo:8`) | Local containerized dev database | Local development environment | **Retain & Enhance** (Add healthcheck & network docs) |
| `.env.example` | MongoDB (`MONGODB_URI`) | Environment variable template | Database connection string | **Retain & Enhance** (Clarify localhost vs container host) |
| `src/lib/db/mongoose.ts` | Mongoose | Central connection manager | API routes, Storage service | **Refactor** (Make lazy, add `'server-only'`, timeout safety) |
| `src/config/database.ts` | Mongoose | Default schema options (`timestamps: true`) | All Mongoose schemas | **Retain & Standardize** |
| `src/models/enquiry.ts` | Mongoose | Schema & model for customer enquiries | Enquiry form, Contact page, API | **Retain & Enhance** (Sync types, enhance field validation) |
| `src/models/media-asset.ts` | Mongoose | Schema & model for media metadata | File storage service | **Retain & Standardize** |
| `src/app/api/enquiries/route.ts` | Mongoose / MongoDB | API route for submitting enquiries | Public contact & enquiry forms | **Retain & Enhance** (Sanitize error handling, safe responses) |
| `src/app/api/enquiry/route.ts` | *(New)* | Route alias to `/api/enquiries` | Cross-compatibility | **Create** (Route alias delegating to enquiries handler) |
| `src/app/api/health/db/route.ts` | Mongoose / MongoDB | Database health check endpoint | System monitoring, DevOps | **Retain & Standardize** |
| `src/lib/storage/service.ts` | Mongoose / MongoDB | Metadata persistence for uploads | Media storage subsystem | **Retain & Standardize** |
| `src/types/enquiry.ts` | TypeScript interfaces | Data types for frontend & backend | Enquiry validation & forms | **Refactor** (Synchronize TravelType union with model) |
| `docs/DATABASE_ARCHITECTURE.md` | Documentation | Engineering source of truth | Technical governance | **Update** (Reflect current verified implementation) |
| `scripts/generate_architecture_doc.py` | Documentation Script | Stale template mentioning Prisma/Postgres | Architecture generator | **Correct** (Remove Prisma/Postgres references) |
| `PROJECT_ARCHITECTURE.txt` | Text Document | Stale text mentioning Prisma/Postgres | Architecture documentation | **Regenerate** (Standardize on MongoDB) |
| `COMPLETE_PROJECT_ARCHITECTURE.txt` | Text Document | Stale text mentioning Prisma/Postgres | Architecture documentation | **Regenerate** (Standardize on MongoDB) |

---

## 3. Persistent Data Entities Audit

### 3.1 `Enquiry` Entity
- **Collection Name:** `enquiries`
- **Mongoose Model:** `Enquiry` (`src/models/enquiry.ts`)
- **Validation Schema:** `enquirySchema` (`src/lib/validations/enquiry.ts`)
- **TypeScript Type:** `Enquiry` / `IEnquiry` (`src/types/enquiry.ts` & `src/models/enquiry.ts`)
- **Implemented Fields:**
  - `fullName`: `String` (Required, trim, max 100)
  - `companyName`: `String` (Optional, trim, max 100)
  - `email`: `String` (Required, trim, lowercase, max 100)
  - `phone`: `String` (Required, trim, max 20)
  - `travelType`: `String` (Enum: `["domestic", "international", "corporate", "holidays-visas", "group-custom", "other"]`)
  - `destination`: `String` (Optional, trim, max 100)
  - `travelDate`: `String` (Optional, ISO/string)
  - `returnDate`: `String` (Optional, ISO/string)
  - `travellers`: `Number` (Optional, min 1, max 999)
  - `budget`: `String` (Optional, trim, max 50)
  - `message`: `String` (Required, trim, min 10, max 2000)
  - `source`: `String` (Required, enum: `["general", "package", "destination", "offer", "service"]`)
  - `packageSlug`: `String` (Optional, trim, max 100)
  - `destinationSlug`: `String` (Optional, trim, max 100)
  - `offerSlug`: `String` (Optional, trim, max 100)
  - `consentAccepted`: `Boolean` (Required, explicitly true; NO model default)
  - `consentDetails`: `Object` (Required for new enquiries; persists 5 declarations, acceptedAt timestamp, and policyVersion)
  - `status`: `String` (Required, enum: `["NEW", "CONTACTED", "IN_PROGRESS", "CONVERTED", "CLOSED", "SPAM"]`, default: `"NEW"`)
  - `createdAt`: `Date` (Automated via timestamps)
  - `updatedAt`: `Date` (Automated via timestamps)
- **Database Indexes:**
  - `{ createdAt: -1 }` (Descending timestamp for admin dashboards & reporting)
  - `{ status: 1 }` (Status filtering for CRM workflow)
  - `{ email: 1 }` (Lead lookup by customer email)
  - `{ phone: 1 }` (Lead lookup by customer phone)

### 3.2 `MediaAsset` Entity
- **Collection Name:** `mediaassets`
- **Mongoose Model:** `MediaAsset` (`src/models/media-asset.ts`)
- **Implemented Fields:**
  - `storageKey`: `String` (Required, unique, indexed)
  - `originalFilename`: `String` (Required)
  - `mimeType`: `String` (Required)
  - `sizeBytes`: `Number` (Required, min 0)
  - `category`: `String` (Required, enum: `['images', 'documents', 'other']`)
  - `visibility`: `String` (Required, enum: `['public', 'private']`)
  - `altText`: `String` (Optional)
  - `createdAt`: `Date` (Automated via timestamps)
  - `updatedAt`: `Date` (Automated via timestamps)
- **Database Indexes:**
  - `{ storageKey: 1 }` (Unique lookup key)

---

## 4. Connection Layer Evaluation & Action Plan

### Current Issues in `src/lib/db/mongoose.ts`:
1. **Module-Evaluation Failure Risk:** `if (!MONGODB_URI) throw new Error(...)` was executing at the top level of the module. If imported during static generation or in environments where `MONGODB_URI` was unpopulated, the entire build could fail.
2. **Missing Client Boundary Guard:** Needs `'server-only'` to guarantee it cannot be bundled into client-side chunks.
3. **Connection Hang Risk:** Lacked explicit `serverSelectionTimeoutMS` (defaulting to 30,000ms), which could freeze serverless functions if MongoDB is unavailable.

### Remediation Plan:
- Refactor `src/lib/db/mongoose.ts` to lazily evaluate `process.env.MONGODB_URI` inside `connectToDatabase()`.
- Add `'server-only'` directive.
- Configure `serverSelectionTimeoutMS: 5000` and `connectTimeoutMS: 10000` with `bufferCommands: false`.
- Prevent hot-reload duplicate connections using `globalThis.mongooseCache`.
- Sanitize error messages to avoid leaking credentials.

---

## 5. PostgreSQL / Prisma Decommissioning Verification

- **Prisma Schema Files:** Verified none present in workspace.
- **Prisma Migrations:** Verified none present in workspace.
- **PostgreSQL Services:** Verified `docker-compose.yml` only runs `mongo:8`.
- **Dependencies:** Verified `package.json` contains no `@prisma/client`, `prisma`, `pg`, or relational database dependencies.
- **Conclusion:** No data migration from PostgreSQL to MongoDB is necessary because PostgreSQL was never deployed or used. Stale documentation references will be corrected to reflect MongoDB as the authoritative database.
