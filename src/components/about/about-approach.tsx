"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import {
  Route,
  FileCheck2,
  Sliders,
  Luggage,
  Building2,
  ShieldCheck,
  Car,
  Compass,
  CheckCircle2,
} from "lucide-react"

const considerations = [
  {
    title: "Routing & Connection Practicality",
    description: "Evaluating layovers, inter-terminal transfers and realistic connection windows.",
    icon: Route,
  },
  {
    title: "Transit Visa Requirements",
    description: "Pre-checking technical stops and transit immigration mandates across intermediate countries.",
    icon: FileCheck2,
  },
  {
    title: "Fare Rules & Flexibility",
    description: "Clarifying change penalties, cancellation flexibility and reissue conditions before ticketing.",
    icon: Sliders,
  },
  {
    title: "Airline & Baggage Conditions",
    description: "Ensuring through-checked baggage allowances and seamless interline baggage transfers.",
    icon: Luggage,
  },
  {
    title: "Hotel Location & Traveller Preferences",
    description: "Matching properties to business districts, tourist areas, accessibility and room specifications.",
    icon: Building2,
  },
  {
    title: "Visa & Documentation Requirements",
    description: "Detailed checklist review, consular appointments and document preparation support.",
    icon: ShieldCheck,
  },
  {
    title: "On-Ground Convenience",
    description: "Airport transfers, chauffeur-driven vehicles and reliable local transit arrangements.",
    icon: Car,
  },
  {
    title: "Cost, Comfort & Travel Purpose",
    description: "Harmonizing budget efficiency with traveller comfort and the true purpose of the journey.",
    icon: Compass,
  },
]

export function AboutApproach() {
  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#F7F9F8] border-b border-[#D2E3DA]/80" aria-label="Our Approach">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#16A765] bg-[#16A765]/10 border border-[#16A765]/20 px-3.5 py-1.5 rounded-full">
            TRAVEL MADE SIMPLER
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17201C] tracking-tight font-sans">
            More Than Just a Booking
          </h2>

          <div className="text-base sm:text-lg text-[#66736D] font-light leading-relaxed space-y-3 max-w-2xl mx-auto">
            <p>
              Modern travel involves much more than finding the lowest airfare or choosing a hotel online. International journeys may involve complex routings, multiple airlines, transit visa requirements, changing fare rules, baggage conditions, hotel location concerns and destination-specific procedures.
            </p>
            <p className="font-medium text-[#17201C]">
              At MTPL, our experienced team studies the complete journey before recommending an option.
            </p>
          </div>
        </div>

        {/* 8 Considerations in a Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-12">
          {considerations.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-5 border border-[#D2E3DA] shadow-xs hover:shadow-md hover:border-[#16A765]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#16A765]/10 text-[#0E7443] flex items-center justify-center group-hover:bg-[#16A765] group-hover:text-white transition-colors duration-200">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#17201C] leading-snug tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#66736D] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Concluding Statement Box */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-[#16A765]/30 shadow-xs text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16A765] mb-1">
            <CheckCircle2 className="w-4 h-4 text-[#16A765]" />
            <span>The MTPL Commitment</span>
          </div>
          <p className="text-base sm:text-xl font-medium text-[#063D2A] leading-relaxed">
            “The objective is not simply to book travel — but to make the entire journey better planned, better coordinated and better supported.”
          </p>
        </div>
      </Container>
    </section>
  )
}
