export type Destination = {
  id: string;
  slug: string;
  name: string;
  country?: string;
  region?: string;
  shortDescription: string;
  longDescription?: string;
  heroImagePlaceholder: string;
  highlights?: string[];
  bestFor?: string[];
  relatedPackageSlugs?: string[];
  isFeatured?: boolean;
};
