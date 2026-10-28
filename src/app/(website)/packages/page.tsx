import * as React from "react"
import type { Metadata } from "next"

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
  const allPackages = getAllPackages()

  return (
    <div className="flex flex-col w-full max-w-full bg-white overflow-x-clip">
      <React.Suspense
        fallback={
          <div className="py-20 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand border-r-transparent align-[-0.125em]" />
            <p className="mt-4 text-sm text-slate-500 font-medium">Loading holiday packages...</p>
          </div>
        }
      >
        <PackagesGrid packages={allPackages} />
      </React.Suspense>
      <PlanningAssurance />
      <EnquiryCta />
    </div>
  )
}
