"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import {
  Layers,
  Award,
  Users,
  CheckCircle2,
  Building2,
} from "lucide-react"

const timelineMilestones = [
  {
    period: "2006",
    title: "The Beginning",
    subtitle: "Dharampeth, Nagpur Foundation",
    icon: Building2,
    lead: "MTPL was established in Dharampeth, Nagpur with a clear philosophy — provide professional travel assistance with personal attention, transparency and dependable service.",
    details:
      "Starting with domestic and regional air ticketing and leisure travel, MTPL cultivated trusted, long-term relationships with local families, business travellers and emerging corporate clients across Nagpur and Vidarbha.",
    inclusions: [
      "Founded at Shri Ganesh Apartments, Dharampeth",
      "Domestic & international air ticketing desk",
      "Personalized service for families & business travellers",
    ],
  },
  {
    period: "Expansion",
    title: "Expanding Beyond Ticketing",
    subtitle: "Comprehensive Travel Portfolio",
    icon: Layers,
    lead: "Responding to growing client expectations, MTPL systematically expanded beyond flight bookings into a complete single-window travel management agency.",
    details:
      "This era saw heavy investment in advanced global distribution systems (GDS) and specialized desks for international holidays, luxury FIT travel, hotel reservations, corporate accounts, visas, passports, forex, travel insurance and cruise vacations.",
    inclusions: [
      "International Holidays & Luxury FIT Travel",
      "Hotel Reservations & Corporate Desk",
      "Visa & Passport Assistance Desks",
      "Forex, Insurance & Cruise Vacations",
    ],
  },
  {
    period: "Evolution",
    title: "Stronger Industry Presence",
    subtitle: "Accreditations & Airline Partnerships",
    icon: Award,
    lead: "Deepening direct relationships with global carriers, premium hospitality chains and verified consolidators established MTPL's regional leadership.",
    details:
      "Consistent airline sales performance, direct ticketing systems and active trade association involvement earned MTPL widespread recognition and an enviable reputation in Central India's travel trade.",
    inclusions: [
      "IATA Accreditation (No. 14344864)",
      "Direct airline agency accreditations & sales recognition",
      "Active membership and leadership in TAAI",
    ],
  },
  {
    period: "Today",
    title: "MTPL Today",
    subtitle: "Serving Diverse Travel Segments",
    icon: Users,
    lead: "Today, MTPL represents a modern, technology-enabled travel house backed by seasoned professionals who personally manage journeys worldwide.",
    details:
      "We proudly manage complex travel arrangements for a dedicated spectrum of distinguished clients across India.",
    inclusions: [
      "Corporate Travellers",
      "Business Owners & Executives",
      "Families & Multi-Generational Groups",
      "Honeymooners & Luxury Travellers",
      "International FIT Travellers",
    ],
  },
]

export function OurJourney() {
  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#F7F9F8] border-b border-[#D2E3DA]/80" aria-label="Our Journey">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14 sm:mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#16A765] bg-[#16A765]/10 border border-[#16A765]/20 px-3.5 py-1.5 rounded-full">
            SINCE 2006
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17201C] tracking-tight font-sans">
            Our Journey
          </h2>

          <p className="text-base sm:text-lg text-[#66736D] font-light leading-relaxed max-w-2xl mx-auto">
            From our founding in Dharampeth, Nagpur to an IATA-accredited agency handling comprehensive international travel, our focus has always remained consistent: dependable service with personal care.
          </p>
        </div>

        {/* Timeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {timelineMilestones.map((milestone, idx) => {
            const Icon = milestone.icon
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-[#D2E3DA] shadow-xs hover:shadow-md hover:border-[#16A765]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Period tag and Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#16A765]/10 text-[#0E7443] border border-[#16A765]/20">
                      {milestone.period}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 text-[#16A765] flex items-center justify-center border border-slate-200/80 group-hover:bg-[#16A765] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-[#17201C] tracking-tight mb-1">
                    {milestone.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#16A765] uppercase tracking-wider mb-3">
                    {milestone.subtitle}
                  </p>

                  {/* Lead & Details */}
                  <p className="text-xs sm:text-sm text-[#17201C] font-medium leading-relaxed mb-2.5">
                    {milestone.lead}
                  </p>
                  <p className="text-xs text-[#66736D] font-light leading-relaxed mb-4">
                    {milestone.details}
                  </p>
                </div>

                {/* Bullets */}
                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  {milestone.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#17201C]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16A765] flex-shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
