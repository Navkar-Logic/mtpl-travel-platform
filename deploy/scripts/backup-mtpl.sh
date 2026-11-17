#!/usr/bin/env bash
# ==============================================================================
# MTPL Production Backup Script (MongoDB + Media + App Storage Ledgers)
# Hostinger VPS KVM 1 (Ubuntu)
# ==============================================================================
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/mtpl/mtpl-travel-platform}"
ENV_FILE="${ENV_FILE:-${APP_DIR}/.env.production}"
BACKUP_ROOT="${BACKUP_ROOT:-/srv/mtpl/backups}"
MEDIA_ROOT="${MEDIA_ROOT:-/srv/mtpl/media}"
MONGO_CONTAINER="${MONGO_CONTAINER:-mtpl-mongodb-prod}"
WEB_CONTAINER="${WEB_CONTAINER:-mtpl-web-prod}"
STORAGE_VOLUME="${STORAGE_VOLUME:-mtpl_prod_app_storage}"
RETENTION_DAYS="${RETENTION_DAYS:-7}"

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "ERROR: Environment file not found: ${ENV_FILE}" >&2
  exit 1
fi

set -a
# shellcheck disable=SC1090
source "${ENV_FILE}"
set +a

DB_NAME="${MONGO_DATABASE:-mtpl_production}"
TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
DB_BACKUP_DIR="${BACKUP_ROOT}/db"
MEDIA_BACKUP_DIR="${BACKUP_ROOT}/media"
STORAGE_BACKUP_DIR="${BACKUP_ROOT}/storage"

mkdir -p "${DB_BACKUP_DIR}" "${MEDIA_BACKUP_DIR}" "${STORAGE_BACKUP_DIR}"
chmod 700 "${BACKUP_ROOT}" "${DB_BACKUP_DIR}" "${MEDIA_BACKUP_DIR}" "${STORAGE_BACKUP_DIR}"

DB_ARCHIVE="${DB_BACKUP_DIR}/${DB_NAME}_${TIMESTAMP}.archive.gz"
MEDIA_ARCHIVE="${MEDIA_BACKUP_DIR}/mtpl_media_${TIMESTAMP}.tar.gz"
STORAGE_ARCHIVE="${STORAGE_BACKUP_DIR}/mtpl_storage_${TIMESTAMP}.tar.gz"

echo "[$(date -Is)] Starting MTPL MongoDB backup for database: ${DB_NAME}..."
docker exec -i "${MONGO_CONTAINER}" mongodump \
  --username "${MONGO_ROOT_USER}" \
  --password "${MONGO_ROOT_PASSWORD}" \
  --authenticationDatabase admin \
  --db "${DB_NAME}" \
  --archive \
  --gzip > "${DB_ARCHIVE}"

chmod 600 "${DB_ARCHIVE}"
sha256sum "${DB_ARCHIVE}" > "${DB_ARCHIVE}.sha256"
echo "[$(date -Is)] Database backup saved: ${DB_ARCHIVE} ($(du -h "${DB_ARCHIVE}" | cut -f1))"

echo "[$(date -Is)] Archiving persistent media from ${MEDIA_ROOT}..."
tar -C "${MEDIA_ROOT}" -czf "${MEDIA_ARCHIVE}" public private
chmod 600 "${MEDIA_ARCHIVE}"
sha256sum "${MEDIA_ARCHIVE}" > "${MEDIA_ARCHIVE}.sha256"
echo "[$(date -Is)] Media archive saved: ${MEDIA_ARCHIVE} ($(du -h "${MEDIA_ARCHIVE}" | cut -f1))"

echo "[$(date -Is)] Archiving application storage (/app/storage fallback ledgers)..."
if docker ps --format '{{.Names}}' | grep -q "^${WEB_CONTAINER}$"; then
  docker exec -i "${WEB_CONTAINER}" tar -czf - -C /app storage > "${STORAGE_ARCHIVE}"
else
  docker run --rm -v "${STORAGE_VOLUME}:/app/storage:ro" mongo:8 tar -czf - -C /app storage > "${STORAGE_ARCHIVE}"
fi
chmod 600 "${STORAGE_ARCHIVE}"
sha256sum "${STORAGE_ARCHIVE}" > "${STORAGE_ARCHIVE}.sha256"
echo "[$(date -Is)] Storage archive saved: ${STORAGE_ARCHIVE} ($(du -h "${STORAGE_ARCHIVE}" | cut -f1))"

# Local retention pruning (keep daily backups for RETENTION_DAYS)
find "${DB_BACKUP_DIR}" -type f \( -name "*.archive.gz" -o -name "*.sha256" \) -mtime "+${RETENTION_DAYS}" -delete
find "${MEDIA_BACKUP_DIR}" -type f \( -name "*.tar.gz" -o -name "*.sha256" \) -mtime "+${RETENTION_DAYS}" -delete
find "${STORAGE_BACKUP_DIR}" -type f \( -name "*.tar.gz" -o -name "*.sha256" \) -mtime "+${RETENTION_DAYS}" -delete

# Off-server backup sync (configurable placeholder via BACKUP_REMOTE_DEST in .env.production)
if [[ -n "${BACKUP_REMOTE_DEST:-}" ]]; then
  if command -v rclone >/dev/null 2>&1; then
    echo "[$(date -Is)] Syncing backups off-server to configured remote destination..."
    rclone copy "${BACKUP_ROOT}" "${BACKUP_REMOTE_DEST}" --transfers 2 --checkers 4
    echo "[$(date -Is)] Off-server backup sync completed."
  else
    echo "WARNING: BACKUP_REMOTE_DEST is set, but 'rclone' is not installed on host." >&2
  fi
else
  echo "[$(date -Is)] NOTICE: BACKUP_REMOTE_DEST is empty. Configure off-server storage before go-live."
fi

echo "[$(date -Is)] MTPL backup finished successfully."
