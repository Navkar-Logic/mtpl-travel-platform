/**
 * Media URL helper for cache busting and fallback resolution.
 */
export function getMediaUrl(url: string | undefined | null, fallback = "/assets/package-fallback.webp"): string {
  if (!url) return fallback;
  // If it's a media API route without a version query param, append v=2 to bust legacy immutable browser cache
  if (url.startsWith("/api/media/") && !url.includes("?")) {
    return `${url}?v=2`;
  }
  return url;
}
