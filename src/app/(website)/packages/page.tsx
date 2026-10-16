import * as React from "react"
import type { Metadata } from "next"

import { PackagesHero } from "@/components/packages/packages-hero"
import { PackagesGrid } from "@/components/packages/packages-grid"
import { PlanningAssurance } from "@/components/packages/planning-assurance"
import { getAllPackages } from "@/features/packages/data/packages"
import { EnquiryCta } from "@/components/home/enquiry-cta"

export const metadata: Metadata = {
  title: "Holiday Packages",
  description: "Browse curated domestic and international holiday packages from Mishrikotkar Travels.",
  alternates: {
    canonical: "/packages",
  },
}

export default function PackagesPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      <PackagesHero />
      <PackagesGrid packages={getAllPackages()} />
      <PlanningAssurance />
      <EnquiryCta />
    </div>
  )
}
