import * as React from "react"
import type { Metadata } from "next"

import { AboutHero } from "@/components/about/about-hero"
import { AboutApproach } from "@/components/about/about-approach"
import { CoreStrengths } from "@/components/about/core-strengths"
import { OurJourney } from "@/components/about/our-journey"
import { LuxuryFitSection } from "@/components/about/luxury-fit-section"
import { CorporateTravelSection } from "@/components/about/corporate-travel-section"
import { ComplexRoutingSection } from "@/components/about/complex-routing-section"
import { VisaPassportSection } from "@/components/about/visa-passport-section"
import { SupportBeyondSection } from "@/components/about/support-beyond-section"
import { AboutAdvantage } from "@/components/about/about-advantage"
import { IndustryPresence } from "@/components/about/industry-presence"
import { MissionVisionApproach } from "@/components/about/mission-vision-approach"
import { LeadershipAndTeam } from "@/components/about/leadership-and-team"
import { AboutCta } from "@/components/about/about-cta"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Based in Dharampeth, Nagpur, Mishrikotkar Travels Pvt. Ltd. (MTPL) is an IATA-accredited travel company specializing in corporate air ticketing, luxury FIT holidays, complex international travel and end-to-end travel assistance since 2006.",
  alternates: {
    canonical: "/about",
  },
}

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero — strongest positioning first + 4 prominent positioning cards */}
      <AboutHero />

      {/* 2. Our approach: Travel Made Simpler */}
      <AboutApproach />

      {/* 3. Core strengths: Four pillars of expertise */}
      <CoreStrengths />

      {/* 4. Our journey — since 2006 */}
      <OurJourney />

      {/* 5. Luxury FIT Holidays */}
      <LuxuryFitSection />

      {/* 6. Corporate Travel Management */}
      <CorporateTravelSection />

      {/* 7. Complex International Travel */}
      <ComplexRoutingSection />

      {/* 8. Visa & Passport Expertise */}
      <VisaPassportSection />

      {/* 9. Support beyond booking */}
      <SupportBeyondSection />

      {/* 10. The MTPL Advantage */}
      <AboutAdvantage />

      {/* 11. Industry presence & accreditations */}
      <IndustryPresence />

      {/* 12. Mission, vision and approach */}
      <MissionVisionApproach />

      {/* 13. Leadership, Team & Life at MTPL */}
      <LeadershipAndTeam />

      {/* 14. Final CTA and contact details */}
      <AboutCta />
    </div>
  )
}
