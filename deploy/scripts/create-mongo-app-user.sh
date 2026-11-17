#!/usr/bin/env bash
# ==============================================================================
# MTPL Production MongoDB Application User Setup & Recovery
# Hostinger VPS KVM 1 (Ubuntu)
#
# Use this script to create or update the dedicated application user on an
# existing MongoDB deployment without losing data.
#
# Usage:
#   ./create-mongo-app-user.sh [path-to-.env.production]
# ==============================================================================
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/mtpl/mtpl-travel-platform}"
ENV_FILE="${1:-${APP_DIR}/.env.production}"
MONGO_CONTAINER="${MONGO_CONTAINER:-mtpl-mongodb-prod}"

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "ERROR: Environment file not found: ${ENV_FILE}" >&2
  exit 1
fi

set -a
# shellcheck disable=SC1090
source "${ENV_FILE}"
set +a

DB_TARGET="${MONGO_DATABASE:-mtpl_production}"
APP_USER="${MONGO_APP_USER:-mtpl_app}"
APP_PASS="${MONGO_APP_PASSWORD:-}"

if [[ -z "${APP_PASS}" ]]; then
  echo "ERROR: MONGO_APP_PASSWORD is not set in ${ENV_FILE}." >&2
  exit 1
fi

if [[ -z "${MONGO_ROOT_USER:-}" || -z "${MONGO_ROOT_PASSWORD:-}" ]]; then
  echo "ERROR: Root credentials (MONGO_ROOT_USER, MONGO_ROOT_PASSWORD) missing in ${ENV_FILE}." >&2
  exit 1
fi

echo "[$(date -Is)] Ensuring dedicated application user '${APP_USER}' on database '${DB_TARGET}' in container '${MONGO_CONTAINER}'..."

docker exec -i "${MONGO_CONTAINER}" mongosh \
  -u "${MONGO_ROOT_USER}" \
  -p "${MONGO_ROOT_PASSWORD}" \
  --authenticationDatabase admin \
  --quiet <<EOF
const dbTarget = db.getSiblingDB('${DB_TARGET}');
const existing = dbTarget.getUser('${APP_USER}');
if (!existing) {
  dbTarget.createUser({
    user: '${APP_USER}',
    pwd: '${APP_PASS}',
    roles: [
      { role: 'readWrite', db: '${DB_TARGET}' }
    ]
  });
  print('[OK] Created dedicated application user "${APP_USER}" on "${DB_TARGET}".');
} else {
  dbTarget.updateUser('${APP_USER}', {
    pwd: '${APP_PASS}',
    roles: [
      { role: 'readWrite', db: '${DB_TARGET}' }
    ]
  });
  print('[OK] Updated credentials for application user "${APP_USER}" on "${DB_TARGET}".');
}
EOF

echo "[$(date -Is)] Verification: checking application user privileges..."
docker exec -i "${MONGO_CONTAINER}" mongosh \
  -u "${APP_USER}" \
  -p "${APP_PASS}" \
  --authenticationDatabase "${DB_TARGET}" \
  --quiet \
  --eval "db.getSiblingDB('${DB_TARGET}').runCommand({ connectionStatus: 1 }).authInfo.authenticatedUsers"

echo "[$(date -Is)] MongoDB dedicated application user is active and restricted to ${DB_TARGET}."

