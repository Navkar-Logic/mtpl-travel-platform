# MTPL Travel Platform

Official web application for **Mishrikotkar Travels Pvt. Ltd. (MTPL)**, an established IATA-accredited travel agency based in Dharampeth, Nagpur, Maharashtra, India.

---

## Technology Stack

- **Framework**: [Next.js 15+ (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5+](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database & ODM**: [MongoDB 8](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Validation**: [Zod](https://zod.dev/)

---

## Database Architecture

The MTPL Travel Platform standardizes on **MongoDB with Mongoose** as its single authoritative persistence layer.

- **Primary Connection Utility**: `src/lib/db/mongoose.ts` (singleton cached connection for Next.js hot-reloads)
- **Database Name Convention**:
  - Development: `mtpl_dev`
  - Staging: `mtpl_staging`
  - Production: `mtpl_production`
- **Active Collections**:
  - `enquiries`: Customer tour enquiries, holiday quote requests, and contact submissions.
  - `mediaassets`: File storage metadata for uploaded PDFs and image media.
- **Static Verified Catalog**:
  - The 77 authoritative packages and regional destinations are verified client inventory loaded from `src/features/packages/data/packages.ts`.

---

## Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [Docker Desktop](https://www.docker.com/) (for running local MongoDB) or a local MongoDB 8 instance

### 2. Environment Configuration

Copy the example environment file for Next.js and Docker Compose:

```bash
# Next.js development environment:
cp .env.example .env.local

# Docker Compose environment (Compose reads .env by default):
cp .env.example .env
```

> [!NOTE]
> **Environment File Resolution:**
> - Next.js automatically loads `.env.local` for web application runtime secrets.
> - Docker Compose reads `.env` from the repository root by default. Alternatively, run Compose with: `docker compose --env-file .env.local up -d`.
> - **MongoDB Credential Lifecycle:** `MONGO_ROOT_USER`, `MONGO_ROOT_PASSWORD`, and `MONGO_DATABASE` are consumed by the Mongo container entrypoint **only upon initial volume creation**. For an existing initialized volume, MongoDB retains its configured credentials and ignores initialization variables.

Default local development connection string in `.env.local`:
```env
MONGODB_URI=mongodb://mtpl_admin:mtpl_dev_password@127.0.0.1:27017/mtpl_dev?authSource=admin
```

### 3. Start Local MongoDB

Start the containerized MongoDB 8 instance using Docker Compose:

```bash
docker compose up -d
```

This attaches to the persistent volume (`mtpl-travel-platform_mtpl_mongodb_data`) bound strictly to `127.0.0.1:27017`.

### 4. Run Next.js Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

To verify database connectivity, access the database health endpoint:
[http://localhost:3000/api/health/db](http://localhost:3000/api/health/db)

---

## Available Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Builds the production bundle.
- `npm run start`: Starts the Next.js production server.
- `npm run lint`: Runs ESLint across the codebase.
- `npx tsc --noEmit`: Type-checks the entire TypeScript codebase.
- `npx tsx scripts/test-database-standardization.ts`: Runs 21 offline verification checks (schema, Zod validation, sanitization). Completely safe; zero database connections or mutations.
- `npx tsx scripts/test-database-standardization.ts --integration`: Opt-in live database persistence and lifecycle tests (requires running local MongoDB).

---

## Documentation Index

Detailed engineering documentation is located in `docs/`:

- [`docs/DATABASE_ARCHITECTURE.md`](docs/DATABASE_ARCHITECTURE.md): Complete MongoDB/Mongoose specifications, indexes, and backup commands.
- [`docs/DATABASE_MIGRATION_AUDIT.md`](docs/DATABASE_MIGRATION_AUDIT.md): Inventory of database technologies and entities.
- [`docs/ENQUIRY_SYSTEM.md`](docs/ENQUIRY_SYSTEM.md): Lead capture, validation, and inquiry status workflows.
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md): Production VPS, Docker, and Nginx deployment guidelines.
- [`docs/MEDIA_STORAGE.md`](docs/MEDIA_STORAGE.md): Local filesystem and metadata storage architecture.
