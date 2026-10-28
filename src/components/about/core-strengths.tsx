"use client"

import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Plane, Compass, Route, FileCheck2, ArrowRight, ShieldCheck } from "lucide-react"

export function CoreStrengths() {
  return (
    <section className="relative w-full py-16 sm:py-24 bg-white border-b border-[#D2E3DA]/80" aria-label="Core Strengths">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#16A765] bg-[#16A765]/10 border border-[#16A765]/20 px-3.5 py-1.5 rounded-full">
            FOUR PILLARS OF EXPERTISE
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17201C] tracking-tight font-sans">
            Our Core Strengths
          </h2>

          <p className="text-base sm:text-lg text-[#66736D] font-light leading-relaxed max-w-2xl mx-auto">
            From demanding corporate flight requirements to tailor-made private vacations, MTPL delivers specialized knowledge across four distinct travel domains.
          </p>
        </div>

        {/* 4 Distinct Core Strength Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* 1. Corporate Air Ticketing */}
          <div className="group relative bg-[#F7F9F8] rounded-3xl p-7 sm:p-9 border border-[#D2E3DA] hover:border-[#16A765]/50 hover:bg-white shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#16A765]/10 text-[#0E7443] flex items-center justify-center border border-[#16A765]/20 group-hover:bg-[#16A765] group-hover:text-white transition-colors duration-200">
                <Plane className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#16A765] block">
                Business &amp; Corporate Desk
              </span>
              <h3 className="text-2xl font-bold text-[#17201C] tracking-tight">
                Corporate Air Ticketing
              </h3>
              <p className="text-sm sm:text-base text-[#66736D] font-light leading-relaxed">
                Professional domestic and international air ticketing with a strong focus on corporate travellers, business travel and flexible fare options.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-[#D2E3DA] flex items-center justify-between">
              <Link
                href="/contact?service=Corporate%20%26%20Group%20Travel#enquiry-form"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E7443] hover:text-[#16A765] transition-colors"
              >
                <span>Enquire for Corporate Travel</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* 2. Luxury FIT Holidays */}
          <div className="group relative bg-[#F7F9F8] rounded-3xl p-7 sm:p-9 border border-[#D2E3DA] hover:border-[#16A765]/50 hover:bg-white shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#16A765]/10 text-[#0E7443] flex items-center justify-center border border-[#16A765]/20 group-hover:bg-[#16A765] group-hover:text-white transition-colors duration-200">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#16A765] block">
                Tailor-Made Leisure
              </span>
              <h3 className="text-2xl font-bold text-[#17201C] tracking-tight">
                Luxury FIT Holidays
              </h3>
              <p className="text-sm sm:text-base text-[#66736D] font-light leading-relaxed">
                Bespoke international journeys designed around the traveller’s pace, interests, preferred hotels, experiences and comfort.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-[#D2E3DA] flex items-center justify-between">
              <Link
                href="/contact?service=Holiday%20Planning#enquiry-form"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E7443] hover:text-[#16A765] transition-colors"
              >
                <span>Enquire for Holiday Planning</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* 3. Complex International Routing */}
          <div className="group relative bg-[#F7F9F8] rounded-3xl p-7 sm:p-9 border border-[#D2E3DA] hover:border-[#16A765]/50 hover:bg-white shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#16A765]/10 text-[#0E7443] flex items-center justify-center border border-[#16A765]/20 group-hover:bg-[#16A765] group-hover:text-white transition-colors duration-200">
                <Route className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#16A765] block">
                Advanced Itinerary Engineering
              </span>
              <h3 className="text-2xl font-bold text-[#17201C] tracking-tight">
                Complex International Routing
              </h3>
              <p className="text-sm sm:text-base text-[#66736D] font-light leading-relaxed">
                Experienced handling of multi-city itineraries, transit requirements, international connections and airline combinations.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-[#D2E3DA] flex items-center justify-between">
              <Link
                href="/contact?service=Flight%20Assistance#enquiry-form"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E7443] hover:text-[#16A765] transition-colors"
              >
                <span>Enquire for Routing Assistance</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* 4. Visa Assistance in Nagpur */}
          <div className="group relative bg-[#F7F9F8] rounded-3xl p-7 sm:p-9 border border-[#D2E3DA] hover:border-[#16A765]/50 hover:bg-white shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#16A765]/10 text-[#0E7443] flex items-center justify-center border border-[#16A765]/20 group-hover:bg-[#16A765] group-hover:text-white transition-colors duration-200">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#16A765] block">
                Central India Consular Support
              </span>
              <h3 className="text-2xl font-bold text-[#17201C] tracking-tight">
                Visa Assistance in Nagpur
              </h3>
              <p className="text-sm sm:text-base text-[#66736D] font-light leading-relaxed">
                Visa documentation, appointment guidance and the added convenience of biometric and document submission support in Nagpur for many European countries and the UK.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-xs text-[#66736D]/80">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16A765] flex-shrink-0" />
                <span>Note: Visa grant decisions remain under consular authority.</span>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-[#D2E3DA] flex items-center justify-between">
              <Link
                href="/contact?service=Visa%20%26%20Passport%20Support#enquiry-form"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E7443] hover:text-[#16A765] transition-colors"
              >
                <span>Enquire for Visa &amp; Passport</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
