import * as React from "react"
import type { Metadata } from "next"

import { Hero } from "@/components/home/hero"
import { TrustSection } from "@/components/home/trust-section"
import { IntroductionSection } from "@/components/home/introduction-section"
import { PackagesPreview } from "@/components/home/packages-preview"
import { ServicesSection } from "@/components/home/services-section"
import { WhyMtplSection } from "@/components/home/why-mtpl-section"
import { TestimonialsSection } from "@/components/testimonials/testimonials-section"
import { EnquiryCta } from "@/components/home/enquiry-cta"
import { JsonLd, buildPageMetadata, buildPageSchema } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: {
    absolute: "Mishrikotkar Travels (MTPL) | Holiday Packages & Travel Agency in Nagpur",
  },
  description:
    "Explore curated domestic and international holiday packages, flight ticketing, hotels, cruises, visa support, forex, and end-to-end travel assistance from Mishrikotkar Travels Pvt. Ltd. (MTPL) since 2006.",
  path: "/",
  ogTitle: "Mishrikotkar Travels (MTPL) | Travel, Taken Care Of.",
  ogImage: {
    url: "/assets/headers/header-home.jpg",
    width: 1200,
    height: 630,
    alt: "Mishrikotkar Travels (MTPL) — Travel, Taken Care Of.",
  },
}) 

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-[var(--background)]">
      <JsonLd
        id="schema-home-page"
        data={buildPageSchema({
          type: "WebPage",
          title: "Mishrikotkar Travels (MTPL) — Travel, Taken Care Of.",
          description:
            "IATA-accredited travel agency in Dharampeth, Nagpur providing domestic and international holiday packages, flights, visas, and personalized travel assistance since 2006.",
          path: "/",
        })}
      />
      <Hero />
      <TrustSection />
      <IntroductionSection />
      <PackagesPreview />
      <ServicesSection />
      <WhyMtplSection />
      <TestimonialsSection />
      <EnquiryCta />
    </div>
  )
}
