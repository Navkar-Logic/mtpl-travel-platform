import * as React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { siteConfig } from "@/config/site"
import { Compass, ArrowLeft, ArrowRight } from "lucide-react"
import { HolidayPackageTermsSection } from "@/components/packages/holiday-package-terms-section"

export const metadata: Metadata = {
  title: "Holiday Tour Package Terms, Client Declaration & Limitation of Liability | Mishrikotkar Travels",
  description:
    "Official terms and conditions, client declaration, and limitation of liability governing holiday tour packages arranged or facilitated by Mishrikotkar Travels Pvt. Ltd. (MTPL).",
  alternates: {
    canonical: `${siteConfig.url}/holiday-package-terms`,
  },
}

export default function HolidayPackageTermsPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Editorial Hero Header */}
      <div className="bg-[#073B2D] pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/headers/header-packages.jpg"
            alt="Holiday Package Terms Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%] opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[#073B2D]/90 pointer-events-none" />
          <div className="absolute inset-0 bg-[#073B2D]/25 pointer-events-none" />
        </div>
        <Container className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#EEF8F3] border border-white/15 text-xs font-bold tracking-[0.2em] uppercase mb-4">
            <Compass className="w-3.5 h-3.5 text-[#91D7B0]" />
            Holiday Package Governance
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-sans">
            Holiday Tour Package Terms
          </h1>
          <p className="text-sm md:text-base text-[#EEF8F3]/85 font-light mt-3 max-w-2xl mx-auto">
            Package conditions, client declaration, and limitation of liability governing MTPL domestic and international tours.
          </p>
        </Container>
      </div>

      <Container className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <Link
              href="/terms-and-conditions"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#16A765] hover:text-[#0F5A40] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Website Terms &amp; Conditions
            </Link>
          </div>

          {/* Full verbatim terms section matching all package pages */}
          <HolidayPackageTermsSection />

          <div className="pt-8 border-t border-slate-200 flex flex-wrap gap-4 items-center justify-between">
            <Link
              href="/booking-policy"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#16A765] hover:underline"
            >
              <span>View General Booking Policy</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/terms-and-conditions"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 hover:underline"
            >
              <span>View Website Terms &amp; Conditions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
