export type Offer = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description?: string;
  category: string;
  heroImagePlaceholder: string;
  ctaLabel?: string;
  validity?: string;
  highlights?: string[];
  termsAndNotes?: string[];
  isFeatured?: boolean;
  isActive?: boolean;
  relatedPackageSlugs?: string[];
  relatedDestinationSlugs?: string[];
};
