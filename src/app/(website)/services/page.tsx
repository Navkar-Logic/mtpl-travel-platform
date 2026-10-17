import * as React from "react"
import type { Metadata } from "next"

import { ServicesHero } from "@/components/services/services-hero"
import { ServiceExplorer } from "@/components/services/service-explorer"
import { EnquiryCta } from "@/components/home/enquiry-cta"

export const metadata: Metadata = {
  title: "Travel Services",
  description: "Comprehensive domestic and international travel services including flights, hotel bookings, holiday packages, visa support, foreign exchange assistance, travel insurance, and corporate travel management.",
  alternates: {
    canonical: "/services",
  },
}

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full">
      <ServicesHero />
      <ServiceExplorer />
      <EnquiryCta />
    </div>
  )
}
