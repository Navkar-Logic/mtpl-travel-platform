import * as React from "react"
import type { Metadata } from "next"

import { OffersHero } from "@/components/offers/offers-hero"
import { OffersGrid } from "@/components/offers/offers-grid"
import { PlanningAssurance } from "@/components/packages/planning-assurance"
import { getActiveOffers } from "@/features/offers/data/offers"
import { EnquiryCta } from "@/components/home/enquiry-cta"

export const metadata: Metadata = {
  title: "Offers & Promotions",
  description: "Discover exclusive travel collections, seasonal specials, and curated experiences from MTPL.",
  alternates: {
    canonical: "/offers",
  },
}

export default function OffersPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      <OffersHero />
      <OffersGrid offers={getActiveOffers()} />
      <PlanningAssurance />
      <EnquiryCta />
    </div>
  )
}
