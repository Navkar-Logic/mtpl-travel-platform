import { Offer } from "@/types/offer";

export const developmentOffers: Offer[] = [
  {
    id: "offer-sri-lanka-signature",
    slug: "sri-lanka-signature-escape",
    title: "Sri Lanka Heritage & Coastal Escape",
    category: "Signature Collection",
    shortDescription: "Exclusive handcrafted itineraries across Kandy cultural shrines, Nuwara Eliya tea hills, and Bentota golden beaches with dedicated private vehicle transfers.",
    description: "Experience the ultimate Sri Lankan holiday curated by MTPL specialists. Enjoy verified accommodations, certified chauffeurs, UNESCO World Heritage site excursions, and seamless airport reception.",
    heroImagePlaceholder: "/api/media/mtpl-explore-sri-lanka-8n-9d-revised.webp",
    ctaLabel: "Enquire for Dates",
    validity: "Valid for seasonal departures. Advance booking recommended.",
    highlights: [
      "Temple of the Tooth & Kandy Cultural Dance",
      "Scenic Train Journey through Nuwara Eliya Tea Country",
      "Bentota River Safari & Water Sports",
      "Dedicated Private Chauffeur & Verified Hotels"
    ],
    termsAndNotes: [
      "Applicable for new private FIT bookings.",
      "Custom extensions to Galle or Yala National Park available upon request.",
      "Final quotes include all transfers, verified stays, and selected meal plans."
    ],
    isFeatured: true,
    isActive: true,
    relatedPackageSlugs: [
      "mtpl-explore-sri-lanka-8n-9d-revised",
      "mtpl-scenic-srilanka-6n-7d-revised",
      "mtpl-heritage-and-beaches-of-srilanka-6n-7d-revised"
    ],
    relatedDestinationSlugs: ["sri-lanka"]
  },
  {
    id: "offer-kashmir-paradise",
    slug: "kashmir-valley-paradise",
    title: "Kashmir Charisma & Houseboat Experience",
    category: "Seasonal Special",
    shortDescription: "Immerse in pure Himalayan wonder with authentic Dal Lake luxury houseboats, Gulmarg Gondola vistas, and picturesque Pahalgam pine meadows.",
    description: "Explore the paradise of Kashmir with MTPL's verified itineraries. Featuring authentic Shikara rides, verified deluxe houseboat stays, and smooth local coordination from Srinagar airport.",
    heroImagePlaceholder: "/api/media/mtpl-amazing-kashmir-with-katra-7n-8d.webp",
    ctaLabel: "Check Availability",
    validity: "Year-round availability with seasonal snow and summer departures.",
    highlights: [
      "Traditional Shikara Ride on Dal Lake",
      "Deluxe Houseboat Stay with Authentic Kashmiri Cuisine",
      "Gulmarg Gondola Ride Phase 1 & 2 Assistance",
      "Pahalgam Betaab Valley & Aru Valley Excursions"
    ],
    termsAndNotes: [
      "Gondola tickets subject to state tourism portal booking slots.",
      "Private vehicle on point-to-point basis per verified itinerary.",
      "Heater facilities and winter assistance included for cold weather months."
    ],
    isFeatured: true,
    isActive: true,
    relatedPackageSlugs: [
      "mtpl-charismatic-kashmir-7n-8d",
      "mtpl-amazing-kashmir-with-katra-7n-8d",
      "mtpl-glimpses-of-kashmir-valley-4n-5d"
    ],
    relatedDestinationSlugs: ["kashmir"]
  },
  {
    id: "offer-andaman-tropical",
    slug: "andaman-island-escape",
    title: "Andaman White Sand & Lagoon Getaway",
    category: "Island Special",
    shortDescription: "Crystal-clear waters of Havelock, Asia's finest Radhanagar Beach sunset, and private premium catamaran ferry transfers.",
    description: "A tranquil tropical journey across Port Blair, Havelock Island, and Neil Island. Every tour includes pre-booked private ferry tickets, beach resort stays, and guided water activities.",
    heroImagePlaceholder: "/api/media/mtpl-amazing-andaman-4n-5d.webp",
    ctaLabel: "Enquire Now",
    validity: "Best season: October through May.",
    highlights: [
      "Asia's Best Radhanagar Beach Sunset Experience",
      "Elephant Beach Coral Reef Snorkelling",
      "Pre-booked Premium Catamaran Ferry Tickets (Makruzz / Nautika)",
      "Cellular Jail Historic Light & Sound Show"
    ],
    termsAndNotes: [
      "Ferry schedules subject to sea weather conditions.",
      "All transfers by private vehicle on point-to-point basis.",
      "Customizable for honeymoons with candlelight dinner setups."
    ],
    isFeatured: true,
    isActive: true,
    relatedPackageSlugs: [
      "mtpl-amazing-andaman-4n-5d",
      "mtpl-amazing-andaman-5n-6d",
      "mtpl-amazing-andaman-6n-7d"
    ],
    relatedDestinationSlugs: ["andaman"]
  }
];

export function getActiveOffers(): Offer[] {
  return developmentOffers.filter(o => o.isActive);
}

export function getFeaturedOffers(limit: number = 3): Offer[] {
  return developmentOffers.filter(o => o.isActive && o.isFeatured).slice(0, limit);
}

export function getOfferBySlug(slug: string): Offer | undefined {
  return developmentOffers.find(o => o.slug === slug);
}
