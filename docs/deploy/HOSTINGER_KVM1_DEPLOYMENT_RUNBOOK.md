# MTPL Travel Platform — Hostinger VPS KVM 1 Deployment Runbook (Ubuntu + Docker Compose)

**Scope:** Phase 1 Production Deployment (`mtpl.online`, `www.mtpl.online`, `mishrikotkartravels.com`, `www.mishrikotkartravels.com`)  
**Target Host:** Hostinger VPS KVM 1 (Ubuntu 24.04 LTS, 1 vCPU, 4 GB RAM, 50 GB NVMe SSD)  
**Architecture:** `Internet -> Hostinger VPS (UFW) -> Host Nginx (HTTPS) -> Next.js Docker (127.0.0.1:3000) -> MongoDB 8 (Private Docker Network)`

---

## 1. Initial VPS Setup & 4 GB RAM Safeguards

Connect to the freshly provisioned Ubuntu VPS as root (or sudo user):

```bash
apt update && apt upgrade -y
apt install -y curl git rsync nginx certbot python3-certbot-nginx ufw fail2ban
```

### Configure 4 GB Linux Swap (Required Before Building Next.js on KVM 1)

```bash
fallocate -l 4G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
sysctl vm.swappiness=10
echo 'vm.swappiness=10' >> /etc/sysctl.d/99-mtpl.conf
free -h
```

### Configure UFW Firewall (Never Expose MongoDB 27017 or Next.js 3000)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 'Nginx Full'   # Ports 80 & 443 only
ufw enable
ufw status verbose
```

---

## 2. Install Docker Engine & Docker Compose Plugin

```bash
curl -fsSL https://get.docker.com | sh
systemctl enable --now docker
docker --version
docker compose version
```

---

## 3. Clone Repository & Create External Persistent Directories

Keep persistent media and backups **outside** the application code directory so deployments never risk deleting files.

```bash
mkdir -p /opt/mtpl /srv/mtpl/media/public /srv/mtpl/media/private /srv/mtpl/backups/db /srv/mtpl/backups/media
cd /opt/mtpl
git clone <YOUR_REPOSITORY_URL> mtpl-travel-platform
cd /opt/mtpl/mtpl-travel-platform
```

---

## 4. Safe Media Transfer & Byte-Level Verification (`186` Files / `341.92 MB`)

Do **not** rename, re-encode, or convert any media binary. Notice 88 of the 95 `.webp` files in `storage/media/public/` contain PNG headers with `.webp` filenames and must be preserved byte-for-byte.

### On Your Windows Development Machine (Generate Checksum Manifest & Sync via `rsync` or `scp`)

From the repository root in Git Bash / WSL / PowerShell (`ssh`/`scp`):

```bash
# Step A: Generate SHA-256 manifest locally inside storage/media/public
cd storage/media/public
sha256sum * > /tmp/mtpl_media_manifest.sha256

# Step B: Upload manifest & transfer public media safely via rsync/scp
scp /tmp/mtpl_media_manifest.sha256 root@<VPS_IP>:/tmp/mtpl_media_manifest.sha256
rsync -avz --progress ./ root@<VPS_IP>:/srv/mtpl/media/public/
```

*(Note: If deploying from the same cloned repository on the VPS where `storage/media/public/` is tracked in Git, copy with `cp -a /opt/mtpl/mtpl-travel-platform/storage/media/public/. /srv/mtpl/media/public/` and verify checksums against the source directory.)*

### On the Ubuntu VPS: Set Ownership (UID/GID `1001` for `nextjs` Container User) & Verify

```bash
chown -R 1001:1001 /srv/mtpl/media
chmod 755 /srv/mtpl/media /srv/mtpl/media/public
chmod 750 /srv/mtpl/media/private

chmod +x /opt/mtpl/mtpl-travel-platform/deploy/scripts/*.sh
/opt/mtpl/mtpl-travel-platform/deploy/scripts/verify-media-transfer.sh /srv/mtpl/media/public /tmp/mtpl_media_manifest.sha256
```

Expected output: `186` total files (`91` PDFs, `95` WebPs), `sha256sum` 100% `OK`.

---

## 5. Production Environment Configuration

```bash
cd /opt/mtpl/mtpl-travel-platform
cp .env.production.example .env.production
chmod 600 .env.production
nano .env.production
```

Ensure all placeholders are replaced:
- `MTPL_IMAGE`: exact published container image and release tag/commit SHA (e.g. `ghcr.io/navkar-logic/mtpl-travel-platform:<COMMIT_SHA>`).
- `MONGO_ROOT_USER` and `MONGO_ROOT_PASSWORD`: strong random alphanumeric/underscore password for administrative operations.
- `MONGO_APP_USER` and `MONGO_APP_PASSWORD`: dedicated least-privilege credentials for the web application.
- `MONGODB_URI`: `mongodb://mtpl_app:<MONGO_APP_PASSWORD>@mongodb:27017/mtpl_production?authSource=mtpl_production`
- `MEDIA_STORAGE_ROOT=/srv/mtpl/media`
- `NEXT_PUBLIC_SITE_URL=https://mishrikotkartravels.com`
- `NEXT_PUBLIC_APP_URL=https://mishrikotkartravels.com`
- `SMTP_*`: Google Workspace business mailbox credentials (`support@mishrikotkartravels.com`):
  - **Option 1 (`smtp.gmail.com`):** Standard Google Workspace SMTP on port 465 (`SMTP_SECURE=true`) or port 587 (`SMTP_SECURE=false`). Requires 2-Step Verification and a 16-character Google App Password. *(Important: App Passwords are only available when permitted by the Google Workspace administrator security policy; they are not universally available across all Workspace tenants).*
  - **Option 2 (`smtp-relay.gmail.com`):** Google Workspace SMTP Relay service configured by a Workspace administrator in the Google Admin Console (`Apps > Google Workspace > Gmail > Routing > SMTP relay service`) using VPS IP allowlisting and/or SMTP authentication. Supports port 465 (implicit TLS) or port 587 (STARTTLS).
  - `SMTP_USER` must be the authentic sending Google Workspace address (`support@mishrikotkartravels.com`).
  - Verify that DNS TXT records on `mishrikotkartravels.com` include Google SPF (`v=spf1 include:_spf.google.com ~all`), Google DKIM, and DMARC.

---

## 6. Pull Container Image & Launch Production Stack

The 1-vCPU VPS does **not** compile the Next.js production build. The image is pre-built on a CI/CD runner or developer machine and pulled from GitHub Container Registry (GHCR).

### Step 6.1: External Image Build & Push (CI / External Build Machine)

```bash
# 1. Build and tag the production container image
COMMIT_SHA=$(git rev-parse --short HEAD)
docker build -t ghcr.io/navkar-logic/mtpl-travel-platform:${COMMIT_SHA} .

# 2. Authenticate to GHCR (requires a GitHub Personal Access Token with write:packages scope)
echo $GITHUB_CR_TOKEN | docker login ghcr.io -u <GITHUB_USERNAME> --password-stdin

# 3. Push to registry
docker push ghcr.io/navkar-logic/mtpl-travel-platform:${COMMIT_SHA}
```

### Step 6.2: Launch on Hostinger VPS (Zero Compilation Overhead)

```bash
cd /opt/mtpl/mtpl-travel-platform

# 1. Authenticate on VPS if the GHCR repository/package is private
#    (Requires a GitHub PAT with read:packages scope)
echo $GHCR_READ_TOKEN | docker login ghcr.io -u <GITHUB_USERNAME> --password-stdin

# 2. Validate Compose configuration with .env.production
docker compose --env-file .env.production -f docker-compose.prod.yml config --quiet

# 3. Pull published image from registry
docker compose --env-file .env.production -f docker-compose.prod.yml pull

# 4. Start production stack without building on VPS
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --no-build
```

Verify both containers become `healthy`:

```bash
docker compose -f docker-compose.prod.yml ps
curl -sS http://127.0.0.1:3000/api/health/db
curl -I http://127.0.0.1:3000/api/media/mtpl-amazing-andaman-4n-5d.webp
```

Verify MongoDB is **not** exposed on `0.0.0.0:27017`:

```bash
ss -tulnp | grep -E '3000|27017'
# Expected: ONLY 127.0.0.1:3000 listening; 27017 must NOT appear on host interfaces.
```

---

## 7. Nginx & SSL Setup

Proceed to [`docs/deploy/NGINX_SSL_RUNBOOK.md`](./NGINX_SSL_RUNBOOK.md) **after** DNS A records for all 4 hostnames resolve to your VPS IP.

---

## 8. Daily Automated Backups & Restore Verification

1. Configure `rclone` for off-server storage (`rclone config`) and set `BACKUP_REMOTE_DEST` in `.env.production` (for example `s3:mtpl-prod-backups`).
2. Test a manual backup & isolated restore dry-check:
   ```bash
   /opt/mtpl/mtpl-travel-platform/deploy/scripts/backup-mtpl.sh
   /opt/mtpl/mtpl-travel-platform/deploy/scripts/restore-mtpl.sh --verify-only /srv/mtpl/backups/db/<latest-archive>.gz
   ```
3. Schedule daily cron at 02:30 AM IST (`crontab -e`):
   ```cron
   30 2 * * * /opt/mtpl/mtpl-travel-platform/deploy/scripts/backup-mtpl.sh >> /var/log/mtpl-backup.log 2>&1
   ```

