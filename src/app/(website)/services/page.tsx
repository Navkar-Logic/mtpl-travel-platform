import * as React from "react"
import type { Metadata } from "next"

import { ServicesHero } from "@/components/services/services-hero"
import { SingleWindowIntro } from "@/components/services/single-window-intro"
import { ServicesSections } from "@/components/services/services-sections"
import { MtplAdvantage } from "@/components/services/mtpl-advantage"
import { ServicesCta } from "@/components/services/services-cta"

export const metadata: Metadata = {
  title: "Travel Services",
  description:
    "From a simple flight booking to a complete international holiday, MTPL brings every aspect of your journey together through one professional travel desk: Flights, Hotels, Holidays, Cruises, Visa & Passport, Forex, Travel Insurance, and Corporate & Group Travel.",
  alternates: {
    canonical: "/services",
  },
}

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full">
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
