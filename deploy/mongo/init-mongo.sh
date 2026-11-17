#!/usr/bin/env bash
set -Eeuo pipefail

# ==============================================================================
# MTPL Production MongoDB Initialization
# Creates a dedicated application user restricted to the production database.
# ==============================================================================

DB_TARGET="${MONGO_INITDB_DATABASE:-mtpl_production}"
APP_USER="${MONGO_APP_USER:-mtpl_app}"
APP_PASS="${MONGO_APP_PASSWORD:-}"
ROOT_USER="${MONGO_INITDB_ROOT_USERNAME:-}"
ROOT_PASS="${MONGO_INITDB_ROOT_PASSWORD:-}"

if [[ -z "$DB_TARGET" || -z "$APP_USER" || -z "$APP_PASS" || -z "$ROOT_USER" || -z "$ROOT_PASS" ]]; then
  echo "[MTPL Init] ERROR: Required MongoDB initialization variables are missing."
  exit 1
fi

echo "[MTPL Init] Configuring application user '${APP_USER}' on '${DB_TARGET}'..."

export MTPL_DB_TARGET="$DB_TARGET"
export MTPL_APP_USER="$APP_USER"
export MTPL_APP_PASS="$APP_PASS"
export MTPL_ROOT_USER="$ROOT_USER"
export MTPL_ROOT_PASS="$ROOT_PASS"

mongosh \
  --quiet \
  --username "$MTPL_ROOT_USER" \
  --password "$MTPL_ROOT_PASS" \
  --authenticationDatabase admin \
  --eval '
    const dbTarget = db.getSiblingDB(process.env.MTPL_DB_TARGET);
    const appUser = process.env.MTPL_APP_USER;
    const appPass = process.env.MTPL_APP_PASS;

    const existing = dbTarget.getUser(appUser);

    if (!existing) {
      dbTarget.createUser({
        user: appUser,
        pwd: appPass,
        roles: [{ role: "readWrite", db: process.env.MTPL_DB_TARGET }]
      });
      print("[MTPL Init] Application user created.");
    } else {
      dbTarget.updateUser(appUser, {
        pwd: appPass,
        roles: [{ role: "readWrite", db: process.env.MTPL_DB_TARGET }]
      });
      print("[MTPL Init] Application user updated.");
    }
  '

unset MTPL_DB_TARGET MTPL_APP_USER MTPL_APP_PASS MTPL_ROOT_USER MTPL_ROOT_PASS

echo "[MTPL Init] Application user initialization completed."
