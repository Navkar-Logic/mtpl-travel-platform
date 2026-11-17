# syntax=docker/dockerfile:1

# ==============================================================================
# MTPL Travel Platform — Production Dockerfile (Next.js Standalone Output)
# Target runtime: Node 20.19.0 (glibc / Debian Bookworm slim for sharp support)
# ==============================================================================

FROM node:20.19.0-bookworm-slim AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# ------------------------------------------------------------------------------
# Stage 2: Production Build (Next.js Standalone)
# ------------------------------------------------------------------------------
FROM node:20.19.0-bookworm-slim AS builder
WORKDIR /app

ARG NEXT_PUBLIC_ENVIRONMENT=production
ARG NEXT_PUBLIC_APP_NAME=MTPL
ARG NEXT_PUBLIC_SITE_URL=https://mishrikotkartravels.com
ARG NEXT_PUBLIC_APP_URL=https://mishrikotkartravels.com
ARG NEXT_PUBLIC_SECONDARY_SITE_URL=https://mtpl.online
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID=

ENV NEXT_PUBLIC_ENVIRONMENT=${NEXT_PUBLIC_ENVIRONMENT}
ENV NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME}
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
ENV NEXT_PUBLIC_SECONDARY_SITE_URL=${NEXT_PUBLIC_SECONDARY_SITE_URL}
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=${NEXT_PUBLIC_GA_MEASUREMENT_ID}
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ------------------------------------------------------------------------------
# Stage 3: Minimal Production Runtime
# ------------------------------------------------------------------------------
FROM node:20.19.0-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs --home-dir /app --no-create-home nextjs

# Standalone output omits public/ and .next/static/ by default — copy both explicitly
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Prepare runtime directories (external media mount + API fallback storage)
RUN mkdir -p /app/storage /srv/mtpl/media/public /srv/mtpl/media/private \
  && chown -R nextjs:nodejs /app/storage /srv/mtpl/media

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:3000/api/health/db').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]

CMD ["node", "server.js"]

