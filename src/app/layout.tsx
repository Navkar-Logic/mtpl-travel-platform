import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { siteConfig } from "@/config/site";
import {
  DEFAULT_OG_IMAGE_PATH,
  JsonLd,
  PRIMARY_SITE_URL,
  buildCanonicalUrl,
  buildOrganizationAndAgencyGraph,
  resolvePrimaryAssetUrl,
} from "@/lib/seo";
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

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
const defaultOgImageUrl = resolvePrimaryAssetUrl(DEFAULT_OG_IMAGE_PATH);

export const metadata: Metadata = {
  metadataBase: new URL(PRIMARY_SITE_URL),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.defaultDescription,
  alternates: {
    canonical: buildCanonicalUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: buildCanonicalUrl("/"),
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    siteName: "Mishrikotkar Travels Pvt. Ltd. (MTPL)",
    images: [
      {
        url: defaultOgImageUrl,
        width: 1200,
        height: 630,
        alt: "Mishrikotkar Travels Pvt. Ltd. (MTPL) — Travel, Taken Care Of.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [defaultOgImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
        <JsonLd
          id="schema-mtpl-organization-agency"
          data={buildOrganizationAndAgencyGraph()}
        />
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', ${JSON.stringify(gaMeasurementId)});`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
