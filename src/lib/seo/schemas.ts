import { siteConfig } from "@/config/site";
import { getMediaUrl } from "@/lib/media";
import type { Package, PackageCategory } from "@/types/package";
import type { PackagePriceDetails } from "@/features/packages/utils/package-pricing";
import {
  DEFAULT_OG_IMAGE_PATH,
  PRIMARY_SITE_URL,
  buildCanonicalUrl,
  resolvePrimaryAssetUrl,
} from "./site-seo";

export interface BreadcrumbItemInput {
  name: string;
  path: string;
}

const ORG_ID = `${PRIMARY_SITE_URL}/#organization`;
const AGENCY_ID = `${PRIMARY_SITE_URL}/#travel-agency`;
const WEBSITE_ID = `${PRIMARY_SITE_URL}/#website`;

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "101, Shri Ganesh Apartments, Dharampeth",
  addressLocality: "Nagpur",
  addressRegion: "Maharashtra",
  postalCode: "440010",
  addressCountry: "IN",
};

const SAME_AS_LINKS = [
  siteConfig.social.instagram,
  siteConfig.social.facebook,
];

/**
 * Global Organization + TravelAgency + WebSite JSON-LD graph rendered cleanly once in root layout.
 * Uses strictly verified MTPL corporate facts from siteConfig.
 */
export function buildOrganizationAndAgencyGraph(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "Mishrikotkar Travels Pvt. Ltd.",
        legalName: "MISHRIKOTKAR TRAVELS PVT LTD",
        alternateName: ["MTPL", "Mishrikotkar Travels"],
        url: buildCanonicalUrl("/"),
        logo: {
          "@type": "ImageObject",
          url: resolvePrimaryAssetUrl("/assets/mtpl-logo.png"),
        },
        image: resolvePrimaryAssetUrl(DEFAULT_OG_IMAGE_PATH),
        foundingDate: siteConfig.established.toString(),
        founder: siteConfig.contact.directors.map((name) => ({
          "@type": "Person",
          name,
        })),
        taxID: siteConfig.credentials.gst,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phones.primary,
        address: POSTAL_ADDRESS,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: siteConfig.contact.phones.primary,
            contactType: "customer service",
            email: siteConfig.contact.email,
            areaServed: "IN",
            availableLanguage: ["en", "hi", "mr"],
          },
          {
            "@type": "ContactPoint",
            telephone: siteConfig.contact.phones.alternate,
            contactType: "reservations",
            areaServed: "IN",
            availableLanguage: ["en", "hi", "mr"],
          },
          {
            "@type": "ContactPoint",
            telephone: siteConfig.contact.phones.customerEnquiry[1],
            contactType: "customer support",
            areaServed: "IN",
            availableLanguage: ["en", "hi", "mr"],
          },
        ],
        memberOf: [
          {
            "@type": "Organization",
            name: "International Air Transport Association (IATA)",
            identifier: siteConfig.credentials.iataNumber,
          },
          {
            "@type": "Organization",
            name: "Travel Agents Association of India (TAAI)",
          },
        ],
        sameAs: SAME_AS_LINKS,
      },
      {
        "@type": "TravelAgency",
        "@id": AGENCY_ID,
        name: "Mishrikotkar Travels Pvt. Ltd. (MTPL)",
        url: buildCanonicalUrl("/"),
        image: resolvePrimaryAssetUrl(DEFAULT_OG_IMAGE_PATH),
        logo: resolvePrimaryAssetUrl("/assets/mtpl-logo.png"),
        description:
          "IATA-accredited travel agency in Dharampeth, Nagpur since 2006 offering domestic and international holiday packages, corporate air ticketing, hotels, cruises, visas, forex, and travel insurance.",
        telephone: siteConfig.contact.phones.primary,
        email: siteConfig.contact.email,
        address: POSTAL_ADDRESS,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "10:00",
            closes: "20:00",
          },
        ],
        parentOrganization: {
          "@id": ORG_ID,
        },
        sameAs: SAME_AS_LINKS,
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: "Mishrikotkar Travels Pvt. Ltd. (MTPL)",
        url: buildCanonicalUrl("/"),
        publisher: {
          "@id": ORG_ID,
        },
        inLanguage: "en-IN",
      },
    ],
  };
}

/**
 * Generates a Schema.org BreadcrumbList node strictly on the primary canonical domain.
 */
export function buildBreadcrumbSchema(
  items: BreadcrumbItemInput[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: buildCanonicalUrl(entry.path),
    })),
  };
}

/**
 * Generates WebPage / AboutPage / ContactPage / CollectionPage structured data.
 */
export function buildPageSchema({
  type = "WebPage",
  title,
  description,
  path,
}: {
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  title: string;
  description: string;
  path: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    description,
    url: buildCanonicalUrl(path),
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    about: {
      "@id": AGENCY_ID,
    },
    inLanguage: "en-IN",
  };
}

/**
 * Attempts to convert a human-readable date string like "31 March 2027" into ISO YYYY-MM-DD.
 * Returns null if ambiguous so structured data never emits invalid dates.
 */
function toIsoDateIfValid(raw?: string): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  const match = /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/.exec(trimmed);
  if (!match) return null;

  const months: Record<string, string> = {
    january: "01",
    february: "02",
    march: "03",
    april: "04",
    may: "05",
    june: "06",
    july: "07",
    august: "08",
    september: "09",
    october: "10",
    november: "11",
    december: "12",
  };

  const month = months[match[2].toLowerCase()];
  if (!month) return null;
  const day = match[1].padStart(2, "0");
  return `${match[3]}-${month}-${day}`;
}

/**
 * Generates TouristTrip + Product structured data + BreadcrumbList for a holiday package page.
 * Does NOT fabricate aggregateRating, reviews, or unverified availability fields.
 */
export function buildPackageDetailJsonLd(
  pkg: Package,
  category: PackageCategory,
  priceDetails: PackagePriceDetails
): Record<string, unknown> {
  const packageUrl = buildCanonicalUrl(`/packages/${pkg.slug}`);
  const imageUrl = resolvePrimaryAssetUrl(getMediaUrl(pkg.heroImage));

  const tripNode: Record<string, unknown> = {
    "@type": "TouristTrip",
    "@id": `${packageUrl}#trip`,
    name: pkg.title,
    description: pkg.shortDescription || pkg.overview,
    url: packageUrl,
    image: imageUrl,
    touristType:
      category === "international"
        ? "International Leisure Travellers"
        : "Domestic India Travellers",
    provider: {
      "@id": AGENCY_ID,
    },
    ...(pkg.itinerary && pkg.itinerary.length > 0
      ? {
          itinerary: {
            "@type": "ItemList",
            numberOfItems: pkg.itinerary.length,
            itemListElement: pkg.itinerary.map((day) => ({
              "@type": "ListItem",
              position: day.day,
              name: `Day ${day.day}: ${day.title}`,
              description: day.description,
            })),
          },
        }
      : {}),
  };

  const validIsoDate =
    pkg.validityStatus === "verified" ? toIsoDateIfValid(pkg.validityDisplay) : null;

  const productNode: Record<string, unknown> = {
    "@type": "Product",
    "@id": `${packageUrl}#product`,
    name: `${pkg.title} (${pkg.duration})`,
    description: pkg.shortDescription || pkg.overview,
    image: [imageUrl],
    sku: pkg.id,
    brand: {
      "@type": "Brand",
      name: "Mishrikotkar Travels (MTPL)",
    },
    category:
      category === "international"
        ? "International Holiday Packages"
        : "Domestic India Holiday Packages",
    url: packageUrl,
  };

  if (
    priceDetails.hasPrice &&
    typeof priceDetails.startingPrice === "number" &&
    priceDetails.startingPrice > 0 &&
    (priceDetails.currency === "INR" || priceDetails.currency === "USD")
  ) {
    productNode.offers = {
      "@type": "Offer",
      url: packageUrl,
      priceCurrency: priceDetails.currency,
      price: priceDetails.startingPrice,
      ...(validIsoDate ? { priceValidUntil: validIsoDate } : {}),
      seller: {
        "@id": AGENCY_ID,
      },
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: buildCanonicalUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Holiday Packages",
            item: buildCanonicalUrl("/packages"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: pkg.title,
            item: packageUrl,
          },
        ],
      },
      tripNode,
      productNode,
    ],
  };
}

