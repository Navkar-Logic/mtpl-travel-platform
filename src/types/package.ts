export type PackageHighlight = string;

export type ItineraryDay = {
  day: number;
  title: string;
  description: string;
};

export type Package = {
  id: string;
  slug: string;
  title: string;
  destination: string;
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
  featured?: boolean;
  overview?: string;
  highlights?: PackageHighlight[];
  inclusions?: string[];
  exclusions?: string[];
  itinerary?: ItineraryDay[];
  whatsAppHref: string;
};
