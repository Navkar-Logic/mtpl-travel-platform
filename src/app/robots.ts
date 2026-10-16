import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/about',
        '/services',
        '/packages',
        '/destinations',
        '/offers',
        '/reviews',
        '/testimonials',
        '/contact',
      ],
      disallow: [
        '/api/',
        '/admin/',
        '/_next/',
      ],
    },
    sitemap: `${siteConfig.seo.canonicalUrl}/sitemap.xml`,
  };
}
