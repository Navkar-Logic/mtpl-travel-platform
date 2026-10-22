export type PackageHighlight = string;

export type ItineraryDay = {
  day: number;
  title: string;
  description: string;
};

export type PackageCategory = 'national' | 'international';

export type Package = {
  id: string;
  slug: string;
  title: string;
  destination: string;
  category?: PackageCategory;
  duration: string;
  nights: number;
  days: number;
  shortDescription: string;
  heroImage: string;
  pdfDownloadKey: string;
  pdfOriginalFilename: string;
  priceDisplay: string;
  pricingBasis?: string;
  validityNotice?: string;
  validityDisplay?: string;
  validityStatus?: "verified" | "confirmation_required";
  isPriceOnRequest: boolean;
  numericPrice?: number;
  featured?: boolean;
  overview?: string;
  highlights?: PackageHighlight[];
  inclusions?: string[];
  exclusions?: string[];
  itinerary?: ItineraryDay[];
  whatsAppHref: string;
};

export type AccommodationData = {
  headers: string[];
  rows: string[][];
};

export type PackageCostTable = {
  title?: string;
  currency?: string;
  headers: string[];
  rows: string[][];
};

export type PackageTableData = {
  accommodations: AccommodationData | null;
  costTables: PackageCostTable[];
};
