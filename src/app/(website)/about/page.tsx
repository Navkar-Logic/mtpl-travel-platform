import * as React from "react"
import type { Metadata } from "next"

import { AboutHero } from "@/components/about/about-hero"
import { AboutIntro } from "@/components/about/about-intro"
import { MissionVision } from "@/components/about/mission-vision"
import { ScrollStory } from "@/components/about/scroll-story"
import { AchievementsSection } from "@/components/about/achievements"
import { LeadershipSection } from "@/components/about/leadership-section"
import { TeamSection } from "@/components/about/team-section"
import { OfficeGallery } from "@/components/about/office-gallery"
import { EnquiryCta } from "@/components/home/enquiry-cta"

export const metadata: Metadata = {
  title: "About Us",
  description: "Established in 2006, Mishrikotkar Travels Pvt. Ltd. (MTPL) is a premier travel management company based in Nagpur providing end-to-end domestic and international travel support.",
  alternates: {
    canonical: "/about",
  },
}

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      <AboutHero />
      <AboutIntro />
      <MissionVision />
      <ScrollStory />
      <AchievementsSection />
      <LeadershipSection />
      <TeamSection />
      <OfficeGallery />
      <EnquiryCta />
    </div>
  )
}
