export const siteConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "MTPL",
  publicBrandName: "MTPL",
  companyName: "MISHRIKOTKAR TRAVELS PVT LTD",
  established: 2006,
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  domains: {
    booking: "mtpl.online",
    corporate: "mishrikotkartravels.com",
  },
  seo: {
    defaultTitle: "Mishrikotkar Travels | Premium Travel Services",
    titleTemplate: "%s | Mishrikotkar Travels",
    defaultDescription: "Experience premium, personalized travel support and end-to-end assistance with Mishrikotkar Travels Pvt. Ltd. (MTPL).",
    canonicalUrl: "https://www.mishrikotkartravels.com",
  },
  contact: {
    primaryContact: "Tushar Mishrikotkar",
    designation: "Director",
    directors: ["Tushar Mishrikotkar", "Puja Mishrikotkar"],
    email: "support@mishrikotkartravels.com",
    phones: {
      primary: "+91 9325006600",
      alternate: "+91 7741006600",
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
