import * as React from "react"
import type { Metadata } from "next"

import { PackagesGrid } from "@/components/packages/packages-grid"
import { PlanningAssurance } from "@/components/packages/planning-assurance"
import { getAllPackages } from "@/features/packages/data/packages"
import { EnquiryCta } from "@/components/home/enquiry-cta"
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildPageMetadata,
  buildPageSchema,
} from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Holiday Tour Packages — Domestic India & International",
  description:
    "Browse 90+ curated domestic India and international holiday tour packages with verified hotel tariffs, itineraries, and downloadable brochures from Mishrikotkar Travels (MTPL).",
  path: "/packages",
  ogImage: {
    url: "/assets/headers/header-packages.jpg",
    width: 1200,
    height: 630,
    alt: "Curated Domestic and International Holiday Packages — MTPL",
  },
})

export default function PackagesPage() {
  const allPackages = getAllPackages()

  return (
    <div className="flex flex-col w-full max-w-full bg-white overflow-x-clip">
      <JsonLd
        id="schema-packages-page"
        data={[
          buildPageSchema({
            type: "CollectionPage",
            title: "Holiday Tour Packages | Mishrikotkar Travels (MTPL)",
            description:
              "Explore verified national India and international holiday packages arranged by Mishrikotkar Travels Pvt. Ltd.",
            path: "/packages",
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Holiday Packages", path: "/packages" },
          ]),
        ]}
      />
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
