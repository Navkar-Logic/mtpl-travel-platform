"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Container } from "@/components/ui/container"
import {
  Building2,
  Plane,
  Users,
  Compass,
  Briefcase,
  FileCheck,
  ShieldCheck,
  Award,
  Sparkles,
  Globe,
  Clock,
  MapPin,
  CheckCircle2,
} from "lucide-react"

interface HighlightItem {
  icon: React.ComponentType<{ className?: string }>
  title: string
  detail: string
}

interface StoryPoint {
  id: string
  step: string
  year: string
  badge: string
  title: string
  tagline: string
  paragraphs: string[]
  highlights: HighlightItem[]
  imageSrc: string
  imageAlt: string
  caption: string
  locationTag: string
}

const storyPoints: StoryPoint[] = [
  {
    id: "intro",
    step: "01",
    year: "2006",
    badge: "The Foundation",
    title: "The Beginning of a Trusted Journey",
    tagline: "Founded in Dharampeth, Nagpur with a singular commitment to integrity, transparency, and personal care.",
    paragraphs: [
      "Mishrikotkar Travels Pvt. Ltd. (MTPL) was established in 2006 at Shri Ganesh Apartments in Dharampeth, Nagpur, with a clear, singular purpose: to bring honesty, genuine accountability, and simplicity to travel services in Central India.",
      "At a time when flight booking and complex itineraries were fraught with confusing fees and distant call centers, MTPL opened its doors as a dedicated, walk-in travel house. Starting with domestic air ticketing and individual pilgrimage & leisure tours, our founders personally attended to every traveler, building the foundation of lasting client trust that defines MTPL today.",
    ],
    highlights: [
      {
        icon: Building2,
        title: "Dharampeth Head Office",
        detail: "Established our physical service center at Shri Ganesh Apartments, Nagpur",
      },
      {
        icon: Plane,
        title: "Direct Airline Ticketing",
        detail: "Providing transparent, verified flight reservations with zero hidden charges",
      },
      {
        icon: Users,
        title: "Founder-Led Care",
        detail: "Personal attention and hands-on accountability for every traveler from day one",
      },
    ],
    imageSrc: "/assets/office/exterior/office.png",
    imageAlt: "MTPL Dharampeth Office Building and IATA Signboard in Nagpur",
    caption: "Shri Ganesh Apartments, Dharampeth, Nagpur",
    locationTag: "Nagpur Headquarters · Est. 2006",
  },
  {
    id: "growth",
    step: "02",
    year: "2010s",
    badge: "Service Evolution",
    title: "The Experience Grows Across Continents",
    tagline: "Scaling beyond ticketing into bespoke international holidays, corporate travel management, and visa operations.",
    paragraphs: [
      "As customer confidence grew, so did traveler ambitions. The 2010s marked a decade of rapid expansion across custom holiday packages (FIT & GIT), corporate business accounts, and specialized global visa processing.",
      "We invested in cutting-edge global distribution systems (GDS), established dedicated in-person consultation desks, and developed tailored travel programs for regional enterprises and vacationers. Whether orchestrating scenic European rail holidays or wildlife safaris across Central India, our team earned a reputation for meticulous execution and genuine hospitality.",
    ],
    highlights: [
      {
        icon: Compass,
        title: "Bespoke Itinerary Design",
        detail: "One-on-one travel planning sessions tailoring domestic and worldwide tour packages",
      },
      {
        icon: Briefcase,
        title: "Corporate Travel Desk",
        detail: "Streamlined business travel logistics, hotel accommodations, and expense coordination",
      },
      {
        icon: FileCheck,
        title: "Consular Visa Liaison",
        detail: "In-house document verification and visa processing support for over 45 destinations",
      },
    ],
    imageSrc: "/assets/office/consultation/mtpl-client-consultation-session.webp",
    imageAlt: "MTPL travel specialists engaged in personalized client holiday consultation in Nagpur",
    caption: "One-on-one travel planning sessions tailoring domestic and international tour packages",
    locationTag: "In-Person Consultation Desk",
  },
  {
    id: "trust",
    step: "03",
    year: "Accredited",
    badge: "Industry Accreditations",
    title: "The Trust Builds with Premier Airline Alliances",
    tagline: "Direct IATA accreditation, TAAI and ETAA memberships, and prestigious airline partner awards.",
    paragraphs: [
      "Uncompromising professionalism and financial legitimacy have always been MTPL's hallmark. Achieving direct accreditation from the International Air Transport Association (IATA), alongside active memberships in TAAI (Travel Agents Association of India) and ETAA (Enterprising Travel Agent Association), confirmed MTPL as a premier verified travel partner in Central India.",
      "Our direct partnerships with leading international carriers and domestic airlines like IndiGo and Air India have translated directly into client advantages—exclusive routing flexibility, preferential corporate airfares, and rapid resolution during unexpected travel disruptions.",
    ],
    highlights: [
      {
        icon: ShieldCheck,
        title: "IATA Accredited Agency",
        detail: "Direct global airline ticketing authority and strict international compliance standards",
      },
      {
        icon: Award,
        title: "Apex Industry Memberships",
        detail: "Proud, active member of TAAI and ETAA, upholding ethical tourism practices",
      },
      {
        icon: Sparkles,
        title: "IndiGo Airline Recognition",
        detail: "Honored with the official IndiGo '6E Together' partnership award for ticketing excellence",
      },
    ],
    imageSrc: "/assets/office/awards/mtpl-airline-recognition-indigo.webp",
    imageAlt: "Directors Tushar Mishrikotkar and Puja Mishrikotkar receiving the official IndiGo airline award plaque",
    caption: "Honoring outstanding performance and premier partnership in commercial airline ticketing",
    locationTag: "Official IndiGo Airline Plaque",
  },
  {
    id: "today",
    step: "04",
    year: "Today",
    badge: "Global Operations",
    title: "MTPL Today: Seamless Operations, Human Care",
    tagline: "A dedicated team of 9 specialists coordinating journeys across 45+ countries worldwide.",
    paragraphs: [
      "Today, Mishrikotkar Travels coordinates thousands of journeys each year, serving corporate conglomerates, families, leisure explorers, and international students. Guided by our founding philosophy — 'Travel, Taken Care Of' — our central operations floor in Nagpur features specialized desks for flight booking, boutique stays, visa logistics, and field support.",
      "Despite our expanded scale and technological capabilities, our core philosophy remains unchanged: every traveler has a direct human advocate ready to assist before, during, and after their journey. With over 15,000 satisfied travelers and a flawless customer satisfaction track record, our story is still just beginning.",
    ],
    highlights: [
      {
        icon: Globe,
        title: "45+ Global Destinations",
        detail: "Coordinating domestic circuits and global itineraries across Europe, Asia, and the Americas",
      },
      {
        icon: Users,
        title: "9 Specialized Arrangers",
        detail: "Dedicated operations leads for ticketing, hotels, visas, and field support",
      },
      {
        icon: Clock,
        title: "24/7 On-Trip Care",
        detail: "Real-time flight monitoring and emergency transit coordination whenever you travel",
      },
    ],
    imageSrc: "/assets/office/operations/mtpl-consultants-operations-desk.webp",
    imageAlt: "Dedicated travel operations floor and workstations at MTPL headquarters in Nagpur",
    caption: "Professional travel planners coordinating customer bookings and airline reservations",
    locationTag: "Central Operations Desk · Nagpur",
  },
]

export function ScrollStory() {
  const containerRef = React.useRef<HTMLDivElement>(null)

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#FAFCFA] py-24 md:py-32 overflow-hidden border-t border-border/60"
    >
      {/* Ambient background decoration */}
      <div className="absolute top-1/4 right-0 translate-x-1/3 w-[600px] h-[600px] bg-brand/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 -translate-x-1/3 w-[600px] h-[600px] bg-brand-light/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <span className="inline-flex items-center gap-2 text-brand font-bold tracking-[0.2em] text-xs uppercase mb-3 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/20">
            <Sparkles className="w-3.5 h-3.5" />
            Our Evolution · 2006 to Today
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-sans tracking-tight leading-tight">
            Two Decades of Travel Excellence
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            From our foundation in Dharampeth, Nagpur to an IATA-accredited travel management company, explore the milestones, physical offices, and dedicated team that built our trusted reputation.
          </p>
        </div>

        {/* Milestone Scenes */}
        <div className="flex flex-col gap-24 md:gap-36 relative z-10">
          {storyPoints.map((point, index) => {
            const isEven = index % 2 === 0
            return (
              <StoryScene
                key={point.id}
                point={point}
                isEven={isEven}
                index={index}
              />
            )
          })}
        </div>
      </Container>
    </section>
  )
}

function StoryScene({
  point,
  isEven,
  index,
}: {
  point: StoryPoint
  isEven: boolean
  index: number
}) {
  const sceneRef = React.useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start 85%", "center center"],
  })

  // Trigger animations based on this specific scene's scroll position
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.4, 0.9, 1])
  const y = useTransform(scrollYProgress, [0, 1], [40, 0])

  return (
    <motion.div
      ref={sceneRef}
      style={{ opacity }}
      className={`flex flex-col ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } items-center gap-10 sm:gap-12 lg:gap-16 relative`}
    >
      {/* Left/Right Text Content */}
      <motion.div
        style={{ y }}
        className={`w-full lg:w-1/2 flex flex-col justify-center ${
          isEven ? "lg:pr-4" : "lg:pl-4"
        }`}
      >
        {/* Step & Year Badge */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-9 h-9 rounded-xl bg-brand text-white flex items-center justify-center font-bold text-xs shadow-sm font-sans">
            {point.step}
          </span>
          <span className="text-brand font-bold tracking-[0.2em] text-xs sm:text-sm uppercase bg-brand/10 border border-brand/20 px-3.5 py-1 rounded-full">
            {point.year} · {point.badge}
          </span>
        </div>

        {/* Heading */}
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 font-sans mb-3 leading-tight">
          {point.title}
        </h3>

        {/* Tagline */}
        <p className="text-sm sm:text-base font-semibold text-brand mb-5 leading-relaxed">
          {point.tagline}
        </p>

        {/* Detailed Narrative Paragraphs */}
        <div className="space-y-3.5 mb-6 text-slate-600 text-sm sm:text-base leading-relaxed font-light">
          {point.paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* 3 Concrete Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200/80">
          {point.highlights.map((item, hIdx) => {
            const Icon = item.icon
            return (
              <div
                key={hIdx}
                className="bg-white rounded-2xl p-3.5 border border-[#DFEAE3] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-brand/40 hover:bg-[#F4FAF6] transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center mb-2">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 font-light leading-snug">
                  {item.detail}
                </p>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Relevant Real Office Image Container */}
      <motion.div
        style={{ y }}
        className={`w-full lg:w-1/2 ${isEven ? "lg:pl-4" : "lg:pr-4"}`}
      >
        <div className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 shadow-2xl border-4 border-white ring-1 ring-black/10">
          <Image
            src={point.imageSrc}
            alt={point.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority={index === 0}
          />

          {/* Vignette & Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

          {/* Floating Location Tag Top-Left */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-brand font-bold text-xs px-3.5 py-1.5 rounded-full shadow-md border border-white/80">
              <MapPin className="w-3.5 h-3.5 text-brand" />
              {point.locationTag}
            </span>
          </div>

          {/* Floating Year Pill Top-Right */}
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-brand text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-md font-sans">
              {point.year}
            </span>
          </div>

          {/* Bottom Caption Pill */}
          <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/60 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/20 text-white">
            <p className="text-xs sm:text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{point.caption}</span>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
