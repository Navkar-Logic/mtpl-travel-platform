# MTPL — Nginx & HTTPS Certificate Runbook (`mtpl.online` & `mishrikotkartravels.com`)

**Important:** Do **not** issue SSL certificates until public DNS for all four hostnames points directly to the Hostinger VPS public IP address.

---

## 1. Required DNS Records (Both Domains Pointing to VPS)

Configure `A` (and `AAAA` if IPv6 is enabled on your VPS) records at your DNS registrar:

| Hostname | Type | Value |
|---|---|---|
| `mishrikotkartravels.com` | `A` | `<HOSTINGER_VPS_IPV4>` |
| `www.mishrikotkartravels.com` | `A` | `<HOSTINGER_VPS_IPV4>` |
| `mtpl.online` | `A` | `<HOSTINGER_VPS_IPV4>` |
| `www.mtpl.online` | `A` | `<HOSTINGER_VPS_IPV4>` |

Verify DNS propagation before running Certbot:

```bash
for host in mishrikotkartravels.com www.mishrikotkartravels.com mtpl.online www.mtpl.online; do
  echo -n "$host -> "
  dig +short A "$host"
done
```

Wait until all four hostnames return `<HOSTINGER_VPS_IPV4>`.

---

## 2. Bootstrap HTTP Nginx Config for Certbot Validation

Because `deploy/nginx/mtpl.conf` references certificate files in `/etc/letsencrypt/live/...` that do not exist yet, initialize Nginx with an HTTP-only bootstrap block first:

```bash
mkdir -p /var/www/certbot
cp /opt/mtpl/mtpl-travel-platform/deploy/nginx/mtpl-proxy.conf /etc/nginx/snippets/mtpl-proxy.conf

cat << 'EOF' > /etc/nginx/sites-available/mtpl.conf
server {
    listen 80;
    listen [::]:80;
    server_name mishrikotkartravels.com www.mishrikotkartravels.com mtpl.online www.mtpl.online;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
        allow all;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/mtpl.conf /etc/nginx/sites-enabled/mtpl.conf
nginx -t && systemctl reload nginx
```

---

## 3. Issue Independent Let's Encrypt Certificates (One Per Domain)

Issuing one certificate per apex+www pair avoids mixed-domain renewals if registrar changes occur independently:

```bash
# Domain 1: mishrikotkartravels.com + www
certbot certonly --webroot -w /var/www/certbot \
  -d mishrikotkartravels.com -d www.mishrikotkartravels.com \
  --email support@mishrikotkartravels.com --agree-tos --no-eff-email

# Domain 2: mtpl.online + www
certbot certonly --webroot -w /var/www/certbot \
  -d mtpl.online -d www.mtpl.online \
  --email support@mishrikotkartravels.com --agree-tos --no-eff-email
```

*(Ensure `/etc/letsencrypt/options-ssl-nginx.conf` and `/etc/letsencrypt/ssl-dhparams.pem` exist; if `certbot --nginx` has not generated them yet, run `certbot install --nginx --cert-name mishrikotkartravels.com` or generate dhparams via `openssl dhparam -out /etc/letsencrypt/ssl-dhparams.pem 2048` and install standard Certbot options.)*

---

## 4. Enable Full Production HTTPS Nginx Configuration

Now install the prepared production config containing both HTTPS blocks and HTTP-to-HTTPS same-host upgrades (preserving HTTP 200 independently on both domains with no cross-domain redirect):

```bash
cp /opt/mtpl/mtpl-travel-platform/deploy/nginx/mtpl.conf /etc/nginx/sites-available/mtpl.conf
nginx -t && systemctl reload nginx
```

---

## 5. Verify Auto-Renewal & Both Domains Live

```bash
# Test automatic renewal dry-run
certbot renew --dry-run

# Verify HTTP -> HTTPS upgrade preserves each hostname (no cross-domain redirect)
for host in mishrikotkartravels.com www.mishrikotkartravels.com mtpl.online www.mtpl.online; do
  echo "=== $host ==="
  curl -sI "http://$host/" | grep -E "HTTP/|Location:"
  curl -sI "https://$host/" | grep -E "HTTP/"
done

# Verify health, media image, PDF download, and no-cache headers on API routes
curl -sI "https://mtpl.online/api/health/db" | grep -E "HTTP/|Cache-Control:"
curl -sI "https://www.mishrikotkartravels.com/api/media/mtpl-amazing-andaman-4n-5d.webp" | grep -E "HTTP/|Content-Type:"
curl -sI "https://mtpl.online/api/packages/mtpl-amazing-andaman-4n-5d/download" | grep -E "HTTP/|Content-Disposition:"
```

