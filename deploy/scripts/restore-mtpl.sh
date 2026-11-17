#!/usr/bin/env bash
# ==============================================================================
# MTPL Production Restore Script (MongoDB + Media + Storage)
# Hostinger VPS KVM 1 (Ubuntu)
#
# Usage:
#   ./restore-mtpl.sh --verify-only <db-archive.gz> [media-archive.tar.gz] [storage-archive.tar.gz]
#   ./restore-mtpl.sh --restore-live <db-archive.gz> [media-archive.tar.gz] [storage-archive.tar.gz]
# ==============================================================================
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/mtpl/mtpl-travel-platform}"
ENV_FILE="${ENV_FILE:-${APP_DIR}/.env.production}"
MONGO_CONTAINER="${MONGO_CONTAINER:-mtpl-mongodb-prod}"
WEB_CONTAINER="${WEB_CONTAINER:-mtpl-web-prod}"
MEDIA_ROOT="${MEDIA_ROOT:-/srv/mtpl/media}"
STORAGE_VOLUME="${STORAGE_VOLUME:-mtpl_prod_app_storage}"

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 [--verify-only | --restore-live] <db-archive.gz> [media-archive.tar.gz] [storage-archive.tar.gz]" >&2
  exit 1
fi

MODE="$1"
DB_ARCHIVE="$2"
MEDIA_ARCHIVE="${3:-}"
STORAGE_ARCHIVE="${4:-}"

# Check DB archive existence
if [[ ! -f "${DB_ARCHIVE}" ]]; then
  echo "ERROR: Database backup archive not found: ${DB_ARCHIVE}" >&2
  exit 1
fi

# Optional media archive check
if [[ -n "${MEDIA_ARCHIVE}" && ! -f "${MEDIA_ARCHIVE}" ]]; then
  echo "ERROR: Media backup archive specified but not found: ${MEDIA_ARCHIVE}" >&2
  exit 1
fi

# Optional storage archive check
if [[ -n "${STORAGE_ARCHIVE}" && ! -f "${STORAGE_ARCHIVE}" ]]; then
  echo "ERROR: Storage backup archive specified but not found: ${STORAGE_ARCHIVE}" >&2
  exit 1
fi

# Verify checksums if present
verify_checksum() {
  local file="$1"
  if [[ -f "${file}.sha256" ]]; then
    echo "Verifying SHA-256 for ${file}..."
    sha256sum -c "${file}.sha256"
  else
    echo "NOTICE: Checksum file not found for ${file}, skipping sha256 verification."
  fi
}

verify_checksum "${DB_ARCHIVE}"
if [[ -n "${MEDIA_ARCHIVE}" ]]; then
  verify_checksum "${MEDIA_ARCHIVE}"
fi
if [[ -n "${STORAGE_ARCHIVE}" ]]; then
  verify_checksum "${STORAGE_ARCHIVE}"
fi

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "ERROR: Environment file not found: ${ENV_FILE}" >&2
  exit 1
fi

set -a
# shellcheck disable=SC1090
source "${ENV_FILE}"
set +a

DB_NAME="${MONGO_DATABASE:-mtpl_production}"

# ==============================================================================
# MODE: --verify-only (Non-destructive verification in isolated sandbox)
# ==============================================================================
if [[ "${MODE}" == "--verify-only" ]]; then
  TEST_DB="mtpl_restore_verify_$(date +%s)"
  echo "Restoring database archive into isolated test database: ${TEST_DB}..."
  docker exec -i "${MONGO_CONTAINER}" mongorestore \
    --username "${MONGO_ROOT_USER}" \
    --password "${MONGO_ROOT_PASSWORD}" \
    --authenticationDatabase admin \
    --nsFrom="${DB_NAME}.*" \
    --nsTo="${TEST_DB}.*" \
    --archive \
    --gzip < "${DB_ARCHIVE}"

  echo "Inspecting restored collection counts in ${TEST_DB}:"
  docker exec -i "${MONGO_CONTAINER}" mongosh --quiet \
    -u "${MONGO_ROOT_USER}" \
    -p "${MONGO_ROOT_PASSWORD}" \
    --authenticationDatabase admin \
    --eval "const d = db.getSiblingDB('${TEST_DB}'); d.getCollectionNames().forEach(c => print('  ' + c + ': ' + d[c].countDocuments() + ' docs'));"

  echo "Cleaning up isolated test database ${TEST_DB}..."
  docker exec -i "${MONGO_CONTAINER}" mongosh --quiet \
    -u "${MONGO_ROOT_USER}" \
    -p "${MONGO_ROOT_PASSWORD}" \
    --authenticationDatabase admin \
    --eval "db.getSiblingDB('${TEST_DB}').dropDatabase();"

  if [[ -n "${MEDIA_ARCHIVE}" ]]; then
    echo "Verifying media tar archive integrity..."
    tar -tzf "${MEDIA_ARCHIVE}" > /dev/null
    media_file_count=$(tar -tzf "${MEDIA_ARCHIVE}" | grep -v '/$' | wc -l | tr -d ' ')
    echo "  Media archive contains ${media_file_count} files (tar integrity OK)."
  fi

  if [[ -n "${STORAGE_ARCHIVE}" ]]; then
    echo "Verifying storage tar archive integrity..."
    tar -tzf "${STORAGE_ARCHIVE}" > /dev/null
    echo "  Storage archive contents:"
    tar -tzf "${STORAGE_ARCHIVE}" | sed 's/^/    /'
  fi

  echo "Verification completed successfully. No live data was modified."
  exit 0
fi

# ==============================================================================
# MODE: --restore-live (Strict typed confirmation required)
# ==============================================================================
if [[ "${MODE}" == "--restore-live" ]]; then
  echo "=================================================================="
  echo "CRITICAL WARNING: This will overwrite live data in database '${DB_NAME}'"
  if [[ -n "${MEDIA_ARCHIVE}" ]]; then
    echo "                  and persistent media at '${MEDIA_ROOT}'"
  fi
  if [[ -n "${STORAGE_ARCHIVE}" ]]; then
    echo "                  and application storage volume '${STORAGE_VOLUME}'"
  fi
  echo "=================================================================="
  read -r -p "Type RESTORE_${DB_NAME} to confirm live restoration: " CONFIRM
  if [[ "${CONFIRM}" != "RESTORE_${DB_NAME}" ]]; then
    echo "Restore aborted by user. Nothing changed."
    exit 1
  fi

  echo "Restoring database '${DB_NAME}'..."
  docker exec -i "${MONGO_CONTAINER}" mongorestore \
    --username "${MONGO_ROOT_USER}" \
    --password "${MONGO_ROOT_PASSWORD}" \
    --authenticationDatabase admin \
    --nsInclude="${DB_NAME}.*" \
    --archive \
    --gzip < "${DB_ARCHIVE}"
  echo "Database restoration completed."

  if [[ -n "${MEDIA_ARCHIVE}" ]]; then
    echo "Restoring media to ${MEDIA_ROOT}..."
    tar -C "${MEDIA_ROOT}" -xzf "${MEDIA_ARCHIVE}"
    echo "Media restoration completed."
  fi

  if [[ -n "${STORAGE_ARCHIVE}" ]]; then
    echo "Restoring application storage (/app/storage)..."
    if docker ps --format '{{.Names}}' | grep -q "^${WEB_CONTAINER}$"; then
      docker exec -i "${WEB_CONTAINER}" tar -C /app -xzf - < "${STORAGE_ARCHIVE}"
    else
      docker run --rm -i -v "${STORAGE_VOLUME}:/app/storage" mongo:8 tar -C /app/storage -xzf - --strip-components=1 < "${STORAGE_ARCHIVE}"
    fi
    echo "Storage restoration completed."
  fi

  echo "Live restore finished successfully."
  exit 0
fi

echo "ERROR: Unknown mode '${MODE}'. Use --verify-only or --restore-live." >&2
exit 1
