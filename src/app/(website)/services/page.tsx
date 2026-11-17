import * as React from "react"
import type { Metadata } from "next"

import { ServicesHero } from "@/components/services/services-hero"
import { SingleWindowIntro } from "@/components/services/single-window-intro"
import { ServicesSections } from "@/components/services/services-sections"
import { MtplAdvantage } from "@/components/services/mtpl-advantage"
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildPageMetadata,
  buildPageSchema,
} from "@/lib/seo"
import { ServicesCta } from "@/components/services/services-cta"

export const metadata: Metadata = buildPageMetadata({
  title: "Travel Services — Flights, Hotels, Holidays, Visas, Forex & Insurance",
  description:
    "MTPL provides end-to-end travel services in Nagpur: flight bookings, hotels, holiday packages, cruises, visa and passport assistance, foreign exchange, travel insurance, and corporate travel management.",
  path: "/services",
  ogImage: {
    url: "/assets/headers/header-services.jpg",
    width: 1200,
    height: 630,
    alt: "Travel Services by Mishrikotkar Travels Pvt. Ltd. (MTPL)",
  },
})

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full">
      <JsonLd
        id="schema-services-page"
        data={[
          buildPageSchema({
            type: "WebPage",
            title: "Travel Services | Mishrikotkar Travels Pvt. Ltd. (MTPL)",
            description:
              "Single-window travel desk covering flights, hotels, holiday planning, cruises, visas, passport guidance, forex, travel insurance, and corporate travel.",
            path: "/services",
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Travel Services", path: "/services" },
          ]),
        ]}
      />
      {/* 1. Hero: Our Expertise */}
      <ServicesHero />

      {/* 2. Single-Window Travel Desk introduction */}
      <SingleWindowIntro />

      {/* 3. Eight service sections */}
      <ServicesSections />

      {/* 4. The MTPL Advantage */}
      <MtplAdvantage />

      {/* 5. Final enquiry CTA */}
      <ServicesCta />
    </div>
  )
}
