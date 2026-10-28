"use client"

import * as React from "react"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Plane, Compass, Route, FileCheck2, ArrowRight } from "lucide-react"

const positioningCards = [
  {
    id: "corporate-air-ticketing",
    title: "Corporate Air Ticketing",
    tagline: "Dedicated business desk & flexible fare options",
    icon: Plane,
    targetId: "corporate-travel",
    enquiryParam: "Corporate & Group Travel",
  },
  {
    id: "luxury-fit-holidays",
    title: "Luxury FIT Holidays",
    tagline: "Bespoke journeys crafted around your pace",
    icon: Compass,
    targetId: "luxury-fit",
    enquiryParam: "Holiday Planning",
  },
  {
    id: "complex-routing",
    title: "Complex International Routing",
    tagline: "Multi-airline & visa-sensitive itinerary design",
    icon: Route,
    targetId: "complex-routing",
    enquiryParam: "Flight Assistance",
  },
  {
    id: "visa-assistance",
    title: "Visa Assistance in Nagpur",
    tagline: "Consular appointments & local biometric support",
    icon: FileCheck2,
    targetId: "visa-passport",
    enquiryParam: "Visa & Passport Support",
  },
]

export function AboutHero() {
  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <header className="relative w-full overflow-hidden bg-[#063D2A] text-white">
      {/* Background Image with Opacity & Framing */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <Image
          src="/assets/headers/header-about.jpg"
          alt="Mishrikotkar Travels Legacy Journey Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] opacity-40 mix-blend-luminosity"
        />
        {/* Layered gradients for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#063D2A]/80 via-[#063D2A]/90 to-[#063D2A] z-10" />
      </div>

      <Container className="relative z-20 pt-32 pb-20 sm:pt-36 sm:pb-24">
        {/* Hero Top Content */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Eyebrow */}
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase bg-white/10 border border-white/15 text-[#A7F3C0] backdrop-blur-md">
              ABOUT MISHRIKOTKAR TRAVELS
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight font-sans drop-shadow-md">
            Travel, <span className="text-gradient-brand-light italic">Taken Care Of.</span>
          </h1>

          {/* Supporting line */}
          <p className="text-xl sm:text-2xl text-[#A7F3C0] font-medium leading-relaxed">
            Professional travel management with a human touch since 2006.
          </p>

          {/* Company Introduction */}
          <p className="text-base sm:text-lg text-white/90 font-light leading-relaxed max-w-3xl mx-auto">
            Based in Dharampeth, Nagpur, Mishrikotkar Travels Pvt. Ltd. (MTPL) is an IATA-accredited travel company specializing in corporate air ticketing, luxury FIT holidays, complex international travel and end-to-end travel assistance.
          </p>
        </div>

        {/* 4 Visually Prominent Positioning Cards Immediately Below */}
        <div className="mt-14 sm:mt-16 pt-8 border-t border-white/10">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A7F3C0]/90">
              Core Specializations
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {positioningCards.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.id}
                  onClick={() => handleScrollTo(card.targetId)}
                  className="group relative bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 hover:border-[#16A765]/60 rounded-2xl p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleScrollTo(card.targetId)
                    }
                  }}
                >
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-xl bg-[#16A765]/20 text-[#A7F3C0] flex items-center justify-center border border-[#16A765]/30 group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-[#A7F3C0]" />
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-[#A7F3C0] transition-colors">
                      {card.title}
                    </h2>
                    <p className="text-xs text-white/75 font-light leading-relaxed">
                      {card.tagline}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#A7F3C0]">
                    <span>Learn details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </header>
  )
}
