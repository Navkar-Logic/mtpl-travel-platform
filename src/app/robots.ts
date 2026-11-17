import type { MetadataRoute } from "next";
import { PRIMARY_SITE_URL } from "@/lib/seo/site-seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/api/media/",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/email-previews/",
        ],
      },
    ],
    sitemap: `${PRIMARY_SITE_URL}/sitemap.xml`,
    host: PRIMARY_SITE_URL,
  };
}
