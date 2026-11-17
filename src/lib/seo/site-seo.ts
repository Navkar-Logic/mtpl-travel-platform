export const PRIMARY_SITE_URL = normalizeSiteOrigin(
  process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://mishrikotkartravels.com"
);

export const SECONDARY_SITE_URL = normalizeSiteOrigin(
  process.env.NEXT_PUBLIC_SECONDARY_SITE_URL || "https://mtpl.online"
);

export const ALLOWED_SITE_HOSTS = [
  "mishrikotkartravels.com",
  "www.mishrikotkartravels.com",
  "mtpl.online",
  "www.mtpl.online",
] as const;

export const DEFAULT_OG_IMAGE_PATH = "/assets/headers/header-home.jpg";

export const TRACKING_QUERY_PARAMS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "gclsrc",
  "dclid",
  "fbclid",
  "msclkid",
  "mc_cid",
  "mc_eid",
  "_hsenc",
  "_hsmi",
  "igshid",
  "ref",
]);

function normalizeSiteOrigin(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  try {
    const parsed = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    return parsed.origin;
  } catch {
    return "https://mishrikotkartravels.com";
  }
}

/**
 * Normalizes a route pathname:
 * - ensures leading slash
 * - collapses duplicate slashes
 * - removes trailing slash for non-root paths
 */
export function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  let path = pathname.trim();

  // Strip full origin if caller accidentally passes an absolute URL
  if (path.startsWith("http://") || path.startsWith("https://")) {
    try {
      path = new URL(path).pathname;
    } catch {
      path = "/";
    }
  }

  // Drop query/hash before normalization unless handled separately
  const queryIndex = path.indexOf("?");
  if (queryIndex !== -1) {
    path = path.slice(0, queryIndex);
  }
  const hashIndex = path.indexOf("#");
  if (hashIndex !== -1) {
    path = path.slice(0, hashIndex);
  }

  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  path = path.replace(/\/{2,}/g, "/");

  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  return path;
}

/**
 * Strips known tracking query parameters from a URLSearchParams object.
 */
export function stripTrackingParams(params: URLSearchParams): URLSearchParams {
  const cleaned = new URLSearchParams();
  for (const [key, value] of params.entries()) {
    const lower = key.toLowerCase();
    if (lower.startsWith("utm_") || TRACKING_QUERY_PARAMS.has(lower)) {
      continue;
    }
    cleaned.append(key, value);
  }
  return cleaned;
}

/**
 * Builds an authoritative canonical URL strictly on PRIMARY_SITE_URL (never using untrusted Host headers).
 */
export function buildCanonicalUrl(
  pathOrPathname: string,
  allowedQueryParams?: Record<string, string | undefined>
): string {
  const normalizedPath = normalizePathname(pathOrPathname);
  const url = new URL(normalizedPath, PRIMARY_SITE_URL);

  if (allowedQueryParams) {
    const rawParams = new URLSearchParams();
    for (const [k, v] of Object.entries(allowedQueryParams)) {
      if (v && v.trim().length > 0) {
        rawParams.set(k, v.trim());
      }
    }
    const cleanParams = stripTrackingParams(rawParams);
    const qs = cleanParams.toString();
    if (qs) {
      url.search = qs;
    }
  }

  return url.toString();
}

/**
 * Resolves a relative asset/route path against PRIMARY_SITE_URL.
 */
export function resolvePrimaryAssetUrl(assetPath: string): string {
  if (!assetPath) {
    return `${PRIMARY_SITE_URL}${DEFAULT_OG_IMAGE_PATH}`;
  }
  if (assetPath.startsWith("http://") || assetPath.startsWith("https://")) {
    return assetPath;
  }
  const normalized = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  return `${PRIMARY_SITE_URL}${normalized}`;
}

/**
 * Validates whether a hostname belongs to one of MTPL's configured production domains.
 */
export function isAllowedProductionHost(hostHeader: string | null | undefined): boolean {
  if (!hostHeader) return false;
  const hostname = hostHeader.split(":")[0].trim().toLowerCase();
  return (ALLOWED_SITE_HOSTS as readonly string[]).includes(hostname);
}

