"use client"

import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Compass, CheckCircle2, ArrowRight, Sparkles } from "lucide-react"

const fitFeatures = [
  "Bespoke International Itineraries",
  "Premium & Luxury Hotels and Resorts",
  "Private Airport & Inter-City Transfers",
  "Chauffeur-Driven Travel",
  "Handpicked Local Experiences",
  "Guided Sightseeing",
  "Honeymoons & Special Occasion Travel",
  "Family & Multi-Generational Holidays",
  "Multi-Country Itineraries",
  "Complex International Journeys",
  "Complete Pre-Departure Assistance",
  "On-Trip Travel Support",
]

export function LuxuryFitSection() {
  return (
    <section 
      id="luxury-fit" 
      className="scroll-mt-28 relative w-full py-16 sm:py-24 bg-white border-b border-[#D2E3DA]/80"
      aria-label="Luxury FIT Holidays"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading, Copy, Emphasized Statement, CTA */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#16A765] bg-[#16A765]/10 border border-[#16A765]/20 px-3.5 py-1.5 rounded-full">
              TAILOR-MADE EXPERIENCES
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17201C] tracking-tight font-sans">
              Travel Designed Around You
            </h2>

            <p className="text-base sm:text-lg text-[#66736D] font-light leading-relaxed">
              For travellers who prefer flexibility, comfort, selected hotels and private experiences instead of fixed group packages, MTPL curates personalized international holidays from arrival to departure.
            </p>

            {/* Emphasized Statement */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#063D2A] text-white space-y-1.5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A7F3C0]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Bespoke Promise</span>
              </div>
              <p className="text-base sm:text-lg font-serif italic text-white leading-snug">
                “No fixed templates. No forced schedules. Your journey, planned around you.”
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/contact?service=Holiday%20Planning#enquiry-form"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#0E7443] hover:bg-[#063D2A] transition-all shadow-sm"
              >
                <span>Plan Your Bespoke Holiday</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: 12 Features Clean Grid */}
          <div className="lg:col-span-7 bg-[#F7F9F8] rounded-3xl p-6 sm:p-8 border border-[#D2E3DA]">
            <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#D2E3DA]">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#16A765]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#17201C]">
                  Luxury FIT Inclusions &amp; Capabilities
                </h3>
              </div>
              <span className="text-xs font-bold text-[#0E7443] bg-[#16A765]/10 px-2.5 py-0.5 rounded-full">
                12 Features
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {fitFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#D2E3DA] text-xs sm:text-sm text-[#17201C] font-medium leading-snug hover:border-[#16A765]/40 transition-colors shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#16A765] flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
