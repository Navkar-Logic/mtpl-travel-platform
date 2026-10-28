"use client"

import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Briefcase, CheckCircle2, ArrowRight } from "lucide-react"

const corporateFeatures = [
  "Domestic & International Corporate Air Ticketing",
  "Corporate & Special Fare Options",
  "Flexible Fare Recommendations",
  "Multi-City & Complex Routing",
  "Last-Minute Business Travel",
  "Group Airfare Coordination",
  "MICE & Conference Travel",
  "Centralized Billing",
  "GST-Compliant Invoicing",
  "Dedicated Corporate Travel Desk",
  "Rescheduling & Reissuance Support",
  "Traveller Coordination",
]

export function CorporateTravelSection() {
  return (
    <section 
      id="corporate-travel" 
      className="scroll-mt-28 relative w-full py-16 sm:py-24 bg-[#F7F9F8] border-b border-[#D2E3DA]/80"
      aria-label="Corporate Travel Management"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: 12 Features Grid (Swapped to create visual alternation!) */}
          <div className="lg:col-span-7 order-2 lg:order-1 bg-white rounded-3xl p-6 sm:p-8 border border-[#D2E3DA] shadow-xs">
            <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#D2E3DA]">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#16A765]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#17201C]">
                  Corporate Travel Infrastructure
                </h3>
              </div>
              <span className="text-xs font-bold text-[#0E7443] bg-[#16A765]/10 px-2.5 py-0.5 rounded-full">
                12 Features
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {corporateFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7F9F8] border border-[#D2E3DA] text-xs sm:text-sm text-[#17201C] font-medium leading-snug hover:border-[#16A765]/40 hover:bg-white transition-colors shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#16A765] flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Heading, Copy, CTA */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#16A765] bg-[#16A765]/10 border border-[#16A765]/20 px-3.5 py-1.5 rounded-full">
              BUSINESS TRAVEL SOLUTIONS
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17201C] tracking-tight font-sans">
              Built for Business Travel
            </h2>

            <p className="text-base sm:text-lg text-[#66736D] font-light leading-relaxed">
              Business travel demands speed, fare flexibility, prompt communication and reliable support when plans inevitably change.
            </p>

            <p className="text-sm sm:text-base text-[#66736D] font-light leading-relaxed">
              MTPL operates a dedicated corporate desk delivering complete transparency on fare conditions, centralized monthly billing, and full GST invoicing compliance for companies, executive travellers and corporate offsites.
            </p>

            <div className="pt-2">
              <Link
                href="/contact?service=Corporate%20%26%20Group%20Travel#enquiry-form"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#0E7443] hover:bg-[#063D2A] transition-all shadow-sm"
              >
                <span>Connect with Corporate Desk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
