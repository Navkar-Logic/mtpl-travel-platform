import type { MetadataRoute } from "next";
import { getAllPackages } from "@/features/packages/data/packages";
import { buildCanonicalUrl } from "@/lib/seo/site-seo";

interface StaticSitemapRoute {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}

const INDEXABLE_STATIC_ROUTES: StaticSitemapRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/packages", changeFrequency: "daily", priority: 0.9 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/reviews", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.4 },
  { path: "/booking-policy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/holiday-package-terms", changeFrequency: "yearly", priority: 0.4 },
  { path: "/disclaimer", changeFrequency: "yearly", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = INDEXABLE_STATIC_ROUTES.map((route) => ({
    url: buildCanonicalUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const packageEntries: MetadataRoute.Sitemap = getAllPackages().map((pkg) => ({
    url: buildCanonicalUrl(`/packages/${pkg.slug}`),
    changeFrequency: "weekly",
    priority: pkg.featured ? 0.85 : 0.75,
  }));

  return [...staticEntries, ...packageEntries];
}
