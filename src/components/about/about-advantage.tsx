"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import {
  Award,
  Plane,
  Briefcase,
  Compass,
  Route,
  Layers,
  UserCheck,
  HeartHandshake,
  Sparkles,
  MapPin,
} from "lucide-react"

const advantageItems = [
  {
    title: "IATA Accredited Agency",
    description: "Official IATA Accreditation No. 14344864 ensuring authentic airline ticketing and direct GDS access.",
    icon: Award,
    badge: "IATA: 14344864",
  },
  {
    title: "Direct Airline Agency Ties",
    description: "Direct commercial relationships and accredited agency status across premier domestic and global airlines.",
    icon: Plane,
  },
  {
    title: "Corporate Ticketing Mastery",
    description: "Special fare access, centralized billing and prompt ticketing tailored for business executives.",
    icon: Briefcase,
  },
  {
    title: "Luxury FIT Expertise",
    description: "Crafting private, customized leisure itineraries with handpicked hotels, transfers and local tours.",
    icon: Compass,
  },
  {
    title: "Complex Routing Knowledge",
    description: "Multi-city, open-jaw and visa-sensitive connections planned for comfort and transit compliance.",
    icon: Route,
  },
  {
    title: "Complete Travel Solutions",
    description: "Single-window desk covering flights, hotels, holidays, cruises, visas, forex and insurance.",
    icon: Layers,
  },
  {
    title: "Real Human Assistance",
    description: "Direct communication with experienced travel professionals rather than automated chatbots.",
    icon: UserCheck,
  },
  {
    title: "Support Beyond Booking",
    description: "Ongoing coordination for schedule changes, flight disruptions and travel revisions during trips.",
    icon: HeartHandshake,
  },
  {
    title: "Personalized Advice",
    description: "Itinerary options tailored to your distinct schedule, comfort and preferences rather than rigid packages.",
    icon: Sparkles,
  },
  {
    title: "Centrally Located in Nagpur",
    description: "Accessible Dharampeth office at Shri Ganesh Apartments welcoming in-person consultations.",
    icon: MapPin,
    badge: "Dharampeth, Nagpur",
  },
]

export function AboutAdvantage() {
  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#F7F9F8] border-b border-[#D2E3DA]/80" aria-label="The MTPL Advantage">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14 sm:mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#16A765] bg-[#16A765]/10 border border-[#16A765]/20 px-3.5 py-1.5 rounded-full">
            THE MTPL ADVANTAGE
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17201C] tracking-tight font-sans">
            Why Travellers Choose Us
          </h2>

          <p className="text-base sm:text-lg text-[#66736D] font-light leading-relaxed max-w-2xl mx-auto">
            Combining modern booking systems with the genuine care of seasoned travel arrangers who stand by you throughout your journey.
          </p>
        </div>

        {/* 10 Advantages Grid (5x2 on wide desktop, responsive on tablet and mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {advantageItems.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-5 border border-[#D2E3DA] shadow-xs hover:shadow-md hover:border-[#16A765]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#16A765]/10 text-[#0E7443] flex items-center justify-center group-hover:bg-[#16A765] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-bold text-[#0E7443] bg-[#16A765]/10 px-2 py-0.5 rounded-full border border-[#16A765]/20">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-[#17201C] tracking-tight leading-snug">
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
      </Container>
    </section>
  )
}
