import * as React from "react"
import type { Metadata } from "next"

import { Hero } from "@/components/home/hero"
import { TrustSection } from "@/components/home/trust-section"
import { IntroductionSection } from "@/components/home/introduction-section"
import { DestinationsSection } from "@/components/home/destinations-section"
import { PackagesPreview } from "@/components/home/packages-preview"
import { ServicesSection } from "@/components/home/services-section"
import { WhyMtplSection } from "@/components/home/why-mtpl-section"
import { OffersSection } from "@/components/home/offers-section"
import { TestimonialsSection } from "@/components/testimonials/testimonials-section"
import { EnquiryCta } from "@/components/home/enquiry-cta"

export const metadata: Metadata = {
  title: "MTPL | Travel The World With Confidence",
  description: "Experience premium, personalized travel support and end-to-end assistance for all your domestic and international journeys with Mishrikotkar Travels Pvt. Ltd.",
  alternates: {
    canonical: "/",
  },
}

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-[var(--background)]">
      <Hero />
      <TrustSection />
      <IntroductionSection />
      <DestinationsSection />
      <PackagesPreview />
      <ServicesSection />
      <WhyMtplSection />
      <OffersSection />
      <TestimonialsSection />
      <EnquiryCta />
    </div>
  )
}
