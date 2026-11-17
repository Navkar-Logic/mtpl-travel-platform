const primarySiteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://mishrikotkartravels.com"
).replace(/\/+$/, "");

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "MTPL",
  publicBrandName: "MTPL",
  companyName: "MISHRIKOTKAR TRAVELS PVT LTD",
  established: 2006,
  url: primarySiteUrl,
  domains: {
    booking: "mtpl.online",
    corporate: "mishrikotkartravels.com",
  },
  seo: {
    defaultTitle: "Mishrikotkar Travels (MTPL) | IATA Travel Agency & Holiday Planners in Nagpur",
    titleTemplate: "%s | Mishrikotkar Travels",
    defaultDescription:
      "Mishrikotkar Travels Pvt. Ltd. (MTPL) is an IATA-accredited travel agency in Nagpur offering domestic and international holiday packages, flight ticketing, hotels, visas, forex, and end-to-end travel assistance since 2006.",
    canonicalUrl: primarySiteUrl,
  },
  contact: {
    primaryContact: "Tushar Mishrikotkar",
    designation: "Director",
    directors: ["Tushar Mishrikotkar", "Puja Mishrikotkar"],
    email: "support@mishrikotkartravels.com",
    phones: {
      primary: "+91 7741006600",
      alternate: "+91 8381006600",
      customerEnquiry: ["+91 8381006600", "+91 7776006600"],
    },
    address: "101, Shri Ganesh Apartments, Dharampeth, Nagpur – 440010, Maharashtra, India",
    businessHours: "10:00 AM – 8:00 PM",
  },
  social: {
    instagram: "https://www.instagram.com/mishrikotkart",
    facebook: "https://www.facebook.com/share/19NFQ57uGs/",
  },
  credentials: {
    gst: "27AAJCM1228J1ZE",
    iataNumber: "14344864",
    accreditations: ["IATA Certified", "TAAI Accredited"],
  }
} as const;

export type SiteConfig = typeof siteConfig;
