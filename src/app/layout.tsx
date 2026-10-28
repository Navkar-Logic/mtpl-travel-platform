import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

// Unique, upscale geometric display font for high-impact titles & headings
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Premium, highly legible modern sans for body text, cards, and UI
const dmSans = DM_Sans({
  variable: "--font-sans-family",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Distinctive, technical monospaced font for badges, pricing, and codes
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.canonicalUrl),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.defaultDescription,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.seo.canonicalUrl,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    siteName: siteConfig.companyName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-foreground bg-background">
        {children}
        <script
          id="schema-travel-agency"
          key="schema-travel-agency"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: siteConfig.companyName,
              alternateName: siteConfig.publicBrandName,
              url: siteConfig.seo.canonicalUrl,
              logo: `${siteConfig.seo.canonicalUrl}/assets/mtpl-logo.png`,
              foundingDate: siteConfig.established.toString(),
              description: "Mishrikotkar Travels Pvt. Ltd. (MTPL) is a Nagpur-based travel management company providing end-to-end travel assistance.",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: siteConfig.contact.phones.primary,
                  contactType: "customer service",
                  email: siteConfig.contact.email,
                },
                {
                  "@type": "ContactPoint",
                  telephone: siteConfig.contact.phones.alternate,
                  contactType: "customer service",
                }
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "101, Shri Ganesh Apartments, Dharampeth",
                addressLocality: "Nagpur",
                postalCode: "440010",
                addressRegion: "Maharashtra",
                addressCountry: "IN",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
