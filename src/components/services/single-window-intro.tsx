"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { Sparkles, Plane, Building2, Compass, Ship, FileCheck2, Coins, ShieldCheck, Briefcase } from "lucide-react"

const quickNavLinks = [
  { id: "flights", label: "Flight Assistance", icon: Plane },
  { id: "hotels", label: "Hotel Bookings", icon: Building2 },
  { id: "holidays", label: "Holiday Planning", icon: Compass },
  { id: "cruises", label: "Cruise Vacations", icon: Ship },
  { id: "visa", label: "Visa & Passport", icon: FileCheck2 },
  { id: "forex", label: "Forex Assistance", icon: Coins },
  { id: "insurance", label: "Travel Insurance", icon: ShieldCheck },
  { id: "corporate", label: "Corporate Travel", icon: Briefcase },
]

export function SingleWindowIntro() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section className="relative w-full pt-16 pb-12 sm:pt-20 sm:pb-16 bg-slate-50/70 border-b border-slate-200/80">
      {/* Decorative ambient gradient */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#0E7443]/5 via-transparent to-transparent blur-3xl pointer-events-none" 
        aria-hidden="true"
      />

      <Container className="relative z-10 w-full max-w-7xl">
        <div className="w-full max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E7443]/10 border border-[#0E7443]/20 text-[#0E7443] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Single-Window Travel Desk</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-sans leading-[1.18] max-w-4xl mx-auto">
            Everything You Need for a <span className="text-[#0E7443]">Seamless Journey</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-4xl mx-auto">
            Domestic or international, business or leisure — our experienced travel team assists you at every stage, from planning and booking to support during your journey.
          </p>
        </div>

        {/* Full-width responsive quick jump service buttons */}
        <div className="mt-10 sm:mt-12 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-2.5 w-full">
            {quickNavLinks.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleScrollTo(item.id)}
                  className="group w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2.5 sm:py-3 rounded-full text-xs font-semibold bg-white text-slate-700 hover:text-[#0E7443] hover:bg-[#EDF7F2] border border-slate-200/90 hover:border-[#0E7443]/30 shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer active:scale-95 text-center"
                >
                  <Icon className="w-3.5 h-3.5 text-[#0E7443] transition-transform duration-200 group-hover:scale-110 flex-shrink-0" />
                  <span className="leading-tight text-center whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
