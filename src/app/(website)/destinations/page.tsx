import * as React from "react"
import type { Metadata } from "next"

import { DestinationsHero } from "@/components/destinations/destinations-hero"
import { DestinationsGrid } from "@/components/destinations/destinations-grid"
import { PlanningAssurance } from "@/components/packages/planning-assurance"
import { getAllDestinations } from "@/features/destinations/data/destinations"
import { EnquiryCta } from "@/components/home/enquiry-cta"

export const metadata: Metadata = {
  title: "Destinations",
  description: "Explore the incredible domestic and international destinations supported by Mishrikotkar Travels.",
  alternates: {
    canonical: "/destinations",
  },
}

export default function DestinationsPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      <DestinationsHero />
      <DestinationsGrid destinations={getAllDestinations()} />
      <PlanningAssurance />
      <EnquiryCta />
    </div>
  )
}
