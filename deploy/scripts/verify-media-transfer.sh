#!/usr/bin/env bash
# ==============================================================================
# MTPL Persistent Media Transfer Verification Script
# Verifies transferred media files at /srv/mtpl/media/public match expected
# counts, filenames, and SHA-256 manifest without altering binary bytes.
#
# Usage:
#   On source/staging or after transfer:
#     ./verify-media-transfer.sh /srv/mtpl/media/public [manifest.sha256]
# ==============================================================================
set -euo pipefail

TARGET_DIR="${1:-/srv/mtpl/media/public}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEFAULT_MANIFEST="${SCRIPT_DIR}/../media-manifest.sha256"
MANIFEST_FILE="${2:-}"

if [[ -z "${MANIFEST_FILE}" && -f "${DEFAULT_MANIFEST}" ]]; then
  MANIFEST_FILE="${DEFAULT_MANIFEST}"
fi

if [[ ! -d "${TARGET_DIR}" ]]; then
  echo "ERROR: Media public directory not found: ${TARGET_DIR}" >&2
  exit 1
fi

FILE_COUNT="$(find "${TARGET_DIR}" -maxdepth 1 -type f | wc -l | tr -d ' ')"
PDF_COUNT="$(find "${TARGET_DIR}" -maxdepth 1 -type f -name '*.pdf' | wc -l | tr -d ' ')"
WEBP_COUNT="$(find "${TARGET_DIR}" -maxdepth 1 -type f -name '*.webp' | wc -l | tr -d ' ')"
TOTAL_BYTES="$(du -sb "${TARGET_DIR}" | awk '{print $1}')"

echo "Media directory: ${TARGET_DIR}"
echo "Total files    : ${FILE_COUNT} (expected: 186)"
echo "PDF brochures  : ${PDF_COUNT} (expected: 91)"
echo "WebP images    : ${WEBP_COUNT} (expected: 95)"
echo "Directory bytes: ${TOTAL_BYTES}"

if [[ "${FILE_COUNT}" -ne 186 || "${PDF_COUNT}" -ne 91 || "${WEBP_COUNT}" -ne 95 ]]; then
  echo "ERROR: File count mismatch in ${TARGET_DIR}!" >&2
  exit 1
fi

if [[ -n "${MANIFEST_FILE}" ]]; then
  if [[ ! -f "${MANIFEST_FILE}" ]]; then
    echo "ERROR: Manifest file not found: ${MANIFEST_FILE}" >&2
    exit 1
  fi
  echo "Verifying SHA-256 checksums from ${MANIFEST_FILE}..."
  (cd "${TARGET_DIR}" && sha256sum -c "${MANIFEST_FILE}")
fi

echo "OK: Persistent media verification passed."

