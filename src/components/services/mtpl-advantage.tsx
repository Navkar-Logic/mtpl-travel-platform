"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import {
  Award,
  Layers,
  UserCheck,
  HeartHandshake,
  FileText,
  Compass,
  Globe2,
  MapPin,
  ExternalLink,
} from "lucide-react"

export interface AdvantageItem {
  id: string
  title: string
  description: string
  icon: React.ElementType
  address?: string
}

const advantages: AdvantageItem[] = [
  {
    id: "iata",
    title: "IATA Accredited Travel Agency",
    description:
      "Professional air ticketing through recognized airline distribution systems with transparent fare rules and reliable booking support.",
    icon: Award,
  },
  {
    id: "single-desk",
    title: "One Travel Desk. Multiple Services.",
    description:
      "Flights, hotels, holidays, visas, forex, insurance and more — coordinated through a single experienced travel team.",
    icon: Layers,
  },
  {
    id: "human-assistance",
    title: "Real Human Assistance",
    description:
      "Speak directly with our travel professionals for recommendations, booking assistance, changes and journey-related support.",
    icon: UserCheck,
  },
  {
    id: "support-beyond",
    title: "Support Beyond Booking",
    description:
      "Our relationship does not end once your ticket or holiday is booked. We remain available for changes, disruptions and travel assistance.",
    icon: HeartHandshake,
  },
  {
    id: "transparent",
    title: "Transparent Communication",
    description:
      "Clear information on fares, inclusions, exclusions, service charges and booking conditions before confirmation.",
    icon: FileText,
  },
  {
    id: "personalized",
    title: "Personalized Travel Planning",
    description:
      "Every traveller is different. We recommend travel options based on your destination, preferences, schedule and budget rather than simply offering standard packages.",
    icon: Compass,
  },
  {
    id: "network",
    title: "Strong Airline & Travel Network",
    description:
      "Our established industry relationships help us efficiently coordinate flights, hotels, holiday arrangements and other travel services.",
    icon: Globe2,
  },
  {
    id: "nagpur",
    title: "Centrally Located in Nagpur",
    description:
      "Prefer discussing your journey personally? Visit our Dharampeth office and speak directly with our travel team.",
    icon: MapPin,
    address: "101, Shri Ganesh Apartments, Dharampeth, Nagpur – 440010",
  },
]

export function MtplAdvantage() {
  return (
    <section className="relative w-full py-16 sm:py-24 bg-white border-t border-slate-200/80 overflow-hidden" aria-label="The MTPL Advantage">
      {/* Subtle ambient blur */}
      <div 
        className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-[#0E7443]/5 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E7443]/10 border border-[#0E7443]/20 text-[#0E7443] text-xs font-bold uppercase tracking-wider">
            THE MTPL ADVANTAGE
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-sans">
            Why Travellers Choose MTPL
          </h2>

          <div className="text-base sm:text-lg text-slate-600 font-light leading-relaxed space-y-2 max-w-2xl mx-auto">
            <p>
              Technology makes travel booking easier. Experienced people make travel smoother.
            </p>
            <p>
              At MTPL, you receive the convenience of modern travel technology backed by a real, accessible team that understands your journey and is available when assistance matters.
            </p>
          </div>
        </div>

        {/* Refined Grid of 8 Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {advantages.map((item) => {
            const Icon = item.icon
            const isNagpurOffice = Boolean(item.address)

            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between bg-slate-50/60 rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#0E7443]/30 hover:bg-white transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Icon container */}
                  <div className="w-12 h-12 rounded-2xl bg-[#0E7443]/10 text-[#0E7443] flex items-center justify-center ring-1 ring-[#0E7443]/15 group-hover:bg-[#0E7443] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Specific address info for Nagpur office */}
                {isNagpurOffice && item.address && (
                  <div className="mt-6 pt-4 border-t border-slate-200/80">
                    <div className="flex items-start gap-2 text-xs font-medium text-slate-700 leading-snug">
                      <MapPin className="w-4 h-4 text-[#0E7443] flex-shrink-0 mt-0.5" />
                      <span>{item.address}</span>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("101, Shri Ganesh Apartments, Dharampeth, Nagpur – 440010")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#0E7443] hover:underline"
                    >
                      <span>View on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </Container>
    </section>
  )
}
