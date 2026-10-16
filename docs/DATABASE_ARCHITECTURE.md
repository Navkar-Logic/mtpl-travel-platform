# MTPL Travel Platform — Database Architecture

**Project:** Mishrikotkar Travels Pvt. Ltd. (MTPL) Travel Platform  
**Standardized Database:** MongoDB with Mongoose (`mongoose@^9.11.0`)  
**Architecture Status:** Production Phase 1  

---

## 1. Single Authoritative Database

The MTPL Travel Platform uses **MongoDB with Mongoose** as the single, authoritative persistence technology across the entire repository.

PostgreSQL and Prisma are **NOT** used in this project. All persistent entities, database access utilities, migrations, and docker configurations are standardized strictly on MongoDB.

---

## 2. Environments and Database Naming

| Environment | Database Name | Access Model |
|:---|:---|:---|
| **Development** | `mtpl_dev` | Local Docker (`127.0.0.1:27017`) or local MongoDB instance |
| **Staging** | `mtpl_staging` | Isolated staging VPS network; separate database credentials |
| **Production** | `mtpl_production` | Isolated internal VPS network; strictly no public internet bind |

*Rule:* Never share the same database or credentials between environments.

---

## 3. Central Connection Management (`src/lib/db/mongoose.ts`)

All application code, API route handlers, and server-side utilities connect to MongoDB via the central utility:
`src/lib/db/mongoose.ts`

### Architectural Protections:
1. **Server-Only Boundary Guard:** Marked with `import "server-only";` to prevent accidental bundling into client-side browser bundles.
2. **Global Connection Cache:** Utilizes `globalThis.mongooseCache` to cache both the connection and the in-flight connection promise. This prevents connection leaks and duplicate connections during Next.js development hot-reloads and concurrent incoming requests.
3. **Lazy Evaluation:** `MONGODB_URI` is evaluated inside `connectToDatabase()`. If missing, it throws a safe error only when a database operation is attempted, preventing static build failures on unrelated pages.
4. **Timeout Configuration:**
   - `serverSelectionTimeoutMS: 5000`: Fails fast within 5 seconds if MongoDB is unreachable, avoiding request freezes.
   - `connectTimeoutMS: 10000`: Connection establishment timeout.
   - `bufferCommands: false`: Prevents commands from queueing indefinitely when disconnected.
5. **Credential Sanitization:** If connection errors occur, credentials embedded in URIs (`mongodb://user:pass@host/`) are automatically redacted (`[REDACTED]@`) before logging or rethrowing.

```typescript
// Standard usage across server routes
import { connectToDatabase } from "@/lib/db/mongoose";

export async function POST(req: Request) {
  await connectToDatabase();
  // Perform Mongoose model operations...
}
```

---

## 4. Active Collections & Schemas

### 4.1 `enquiries` (`src/models/enquiry.ts`)
Stores tour quote requests, general travel queries, and corporate contact submissions.

- **Mongoose Model:** `Enquiry`
- **Fields:**
  - `fullName`: `String` (Required, trim, max 100)
  - `companyName`: `String` (Optional, trim, max 100)
  - `email`: `String` (Required, trim, lowercase, max 100)
  - `phone`: `String` (Required, trim, max 20)
  - `travelType`: `String` (Enum: `["domestic", "international", "corporate", "holidays-visas", "group-custom", "other"]`)
  - `destination`: `String` (Optional, trim, max 100)
  - `travelDate`: `String` (Optional)
  - `returnDate`: `String` (Optional)
  - `travellers`: `Number` (Min: 1, Max: 999)
  - `budget`: `String` (Optional, trim, max 50)
  - `message`: `String` (Required, trim, min 10, max 2000)
  - `source`: `String` (Required, enum: `["general", "package", "destination", "offer", "service"]`)
  - `packageSlug`: `String` (Optional, trim, max 100)
  - `destinationSlug`: `String` (Optional, trim, max 100)
  - `offerSlug`: `String` (Optional, trim, max 100)
  - `serviceId`: `String` (Optional, trim, max 100)
  - `consentAccepted`: `Boolean` (Required, explicitly true; no default value)
  - `consentDetails`: `Object` (Required for new records; persists 5 mandatory customer declarations and server audit metadata)
    - `accuracyConfirmed`: `Boolean` (Required: true — confirms submitted information is accurate and complete)
    - `communicationConsent`: `Boolean` (Required: true — consents to contact via phone, email, WhatsApp)
    - `privacyAcknowledged`: `Boolean` (Required: true — acknowledges reading Privacy Policy)
    - `bookingDisclaimerAcknowledged`: `Boolean` (Required: true — acknowledges enquiry does not confirm booking)
    - `termsAcknowledged`: `Boolean` (Required: true — acknowledges Terms & Conditions and Disclaimer)
    - `acceptedAt`: `Date` (Required — authoritative server timestamp of consent acceptance)
    - `policyVersion`: `String` (Required — server-validated policy version identifier, e.g. `"2026.1"`)
  - `status`: `String` (Required, enum: `["NEW", "CONTACTED", "IN_PROGRESS", "CONVERTED", "CLOSED", "SPAM"]`, default: `"NEW"`)
  - `createdAt`: `Date` (Automated via timestamps)
  - `updatedAt`: `Date` (Automated via timestamps)
- **Indexes:**
  - `{ createdAt: -1 }`: Sort descending for recent leads.
  - `{ status: 1 }`: Filter by lead lifecycle status.
  - `{ email: 1 }`: Customer history lookups.
  - `{ phone: 1 }`: Customer phone lookups.

### 4.2 `mediaassets` (`src/models/media-asset.ts`)
Stores metadata references for files stored by `src/lib/storage/service.ts`. Binary files remain on the persistent filesystem outside the ephemeral application build.

- **Mongoose Model:** `MediaAsset`
- **Fields:**
  - `storageKey`: `String` (Required, unique, indexed)
  - `originalFilename`: `String` (Required)
  - `mimeType`: `String` (Required)
  - `sizeBytes`: `Number` (Required, min 0)
  - `category`: `String` (Enum: `['images', 'documents', 'other']`)
  - `visibility`: `String` (Enum: `['public', 'private']`)
  - `altText`: `String` (Optional, max 300)
  - `createdAt`, `updatedAt`: `Date` (Automated timestamps)
- **Indexes:**
  - `{ storageKey: 1 }`: Unique index on storage key.

---

## 5. Local Setup & Docker Development

### Running MongoDB with Docker Compose
A pre-configured MongoDB 8 container is defined in `docker-compose.yml`:

```bash
docker compose up -d
```

- **Image:** `mongo:8`
- **Binding:** `127.0.0.1:27017:27017` (Strictly bound to localhost)
- **Volume:** `mtpl-travel-platform_mtpl_mongodb_data` mounted to `/data/db` for data persistence
- **Healthcheck:** Evaluates `mongosh --eval "db.adminCommand('ping')"` every 10s

### Stopping the Database
```bash
docker compose stop
```

---

## 6. Backup & Restoration Procedures

> [!IMPORTANT]
> **Backup Storage Isolation**
> Never save backup archives inside MongoDB's active data directory (`/data/db` in Docker or `/var/lib/mongodb` on Linux). Doing so risks storage engine corruption, pollutes active database files, inflates persistent volume storage, and invalidates disaster recovery. Backups must always be directed to a dedicated host/VPS backup directory (e.g., `./backups` or `/srv/mtpl/backups/`).

### 6.1 Creating a Database Backup (`mongodump`)
Use environment variables or interactive prompts for authentication credentials. Never hardcode credentials into scripts or commit them to version control.

```bash
# Option A: Stream directly from Docker container to host backup directory (Recommended)
# Make host backup directory:
mkdir -p ./backups

# Dump database archive via stdout:
docker exec -i mtpl-mongodb mongodump \
  --username "${MONGO_ROOT_USER:-mtpl_admin}" \
  --password "${MONGO_ROOT_PASSWORD}" \
  --authenticationDatabase admin \
  --db mtpl_dev \
  --archive --gzip > ./backups/mtpl_dev_$(date +%Y%m%d_%H%M%S).gz

# Option B: Dedicated container temp location with immediate host transfer
docker exec mtpl-mongodb mongodump \
  --username "${MONGO_ROOT_USER:-mtpl_admin}" \
  --password "${MONGO_ROOT_PASSWORD}" \
  --authenticationDatabase admin \
  --db mtpl_dev \
  --archive=/tmp/mtpl_backup.gz --gzip

docker cp mtpl-mongodb:/tmp/mtpl_backup.gz ./backups/mtpl_dev_$(date +%Y%m%d_%H%M%S).gz
docker exec mtpl-mongodb rm /tmp/mtpl_backup.gz

# Option C: Production / VPS Backup
mongodump \
  --uri="${MONGODB_URI}" \
  --archive="/srv/mtpl/backups/mtpl_production_$(date +%Y%m%d_%H%M%S).gz" \
  --gzip
```

### 6.2 Pre-Restoration Verification & Safe Restoration Workflow

> [!WARNING]
> **CRITICAL: `--drop` Deletes Existing Collections**
> Supplying `--drop` to `mongorestore` drops (deletes) existing collections in the restore scope before restoring from the archive. Never run `--drop` on a production database without an explicit, independently verified pre-restoration snapshot.

#### Step 1: Verify the Backup in an Isolated Test Database
Always test restoration into a separate scratch/test database (`mtpl_restore_test`) to verify archive integrity, collection counts, and documents before performing any recovery on the active database:

```bash
# Verify restore into isolated test database without touching active database:
docker exec -i mtpl-mongodb mongorestore \
  --username "${MONGO_ROOT_USER:-mtpl_admin}" \
  --password "${MONGO_ROOT_PASSWORD}" \
  --authenticationDatabase admin \
  --nsFrom="mtpl_dev.*" \
  --nsTo="mtpl_restore_test.*" \
  --archive < ./backups/mtpl_dev_YYYYMMDD_HHMMSS.gz --gzip

# Inspect restored collection counts in mongosh:
docker exec -it mtpl-mongodb mongosh -u "${MONGO_ROOT_USER:-mtpl_admin}" -p "${MONGO_ROOT_PASSWORD}" --authenticationDatabase admin --eval "
  db.getSiblingDB('mtpl_restore_test').getCollectionNames().forEach(c => {
    print(c + ': ' + db.getSiblingDB('mtpl_restore_test')[c].countDocuments());
  });
"

# Clean up test database after verification:
docker exec -it mtpl-mongodb mongosh -u "${MONGO_ROOT_USER:-mtpl_admin}" -p "${MONGO_ROOT_PASSWORD}" --authenticationDatabase admin --eval "
  db.getSiblingDB('mtpl_restore_test').dropDatabase();
"
```

#### Step 2: Live Database Restoration (Only When Explicitly Authorized)
```bash
# Development restore from verified archive:
docker exec -i mtpl-mongodb mongorestore \
  --username "${MONGO_ROOT_USER:-mtpl_admin}" \
  --password "${MONGO_ROOT_PASSWORD}" \
  --authenticationDatabase admin \
  --nsInclude="mtpl_dev.*" \
  --archive < ./backups/mtpl_dev_verified.gz --gzip

# Production restore:
mongorestore \
  --uri="${MONGODB_URI}" \
  --archive="/srv/mtpl/backups/mtpl_production_verified.gz" \
  --gzip
```

---

## 7. Production Security Requirements

1. **Network Isolation:** MongoDB must **never** be bound to `0.0.0.0` on the public internet. It must bind exclusively to `127.0.0.1` or an isolated Docker private network bridge.
2. **Access Control:** MongoDB authentication must always be enabled (`authSource=admin`).
3. **Environment Security:** `MONGODB_URI` must be provided through `.env.local` or container environment injection and excluded from Git commits.
4. **Data Sanitization:** All incoming user input is validated using Zod before reaching Mongoose to prevent NoSQL query operator injection.
