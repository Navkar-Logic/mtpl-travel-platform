import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.seo.canonicalUrl;

  // Static public routes
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/packages',
    '/reviews',
    '/testimonials',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [
    ...staticRoutes,
  ];
}
