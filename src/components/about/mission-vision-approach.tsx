"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { Target, Eye, Sparkles, CheckCircle2 } from "lucide-react"

const approachPillars = [
  "Transparent Communication",
  "Experienced Travel Professionals",
  "Practical Recommendations",
  "Personalized Travel Planning",
  "Responsible Advice",
  "Long-Term Client Relationships",
  "Responsive After-Sales Support",
  "Continuous Industry Knowledge",
]

export function MissionVisionApproach() {
  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#F7F9F8] border-b border-[#D2E3DA]/80" aria-label="Mission, Vision and Approach">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14 sm:mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#16A765] bg-[#16A765]/10 border border-[#16A765]/20 px-3.5 py-1.5 rounded-full">
            FOUNDATIONAL VALUES
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17201C] tracking-tight font-sans">
            Mission, Vision &amp; Philosophy
          </h2>

          <p className="text-base sm:text-lg text-[#66736D] font-light leading-relaxed max-w-2xl mx-auto">
            Guiding principles that define how we advise, coordinate and stand by every traveler who places their confidence in MTPL.
          </p>
        </div>

        {/* 3 Compact Editorial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          
          {/* Card 1: Our Mission */}
          <div className="bg-white rounded-3xl p-7 sm:p-9 border border-[#D2E3DA] shadow-xs hover:shadow-md hover:border-[#16A765]/40 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-[#16A765]/10 text-[#0E7443] flex items-center justify-center border border-[#16A765]/20">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#17201C] tracking-tight">
                Our Mission
              </h3>
              <p className="text-sm sm:text-base text-[#66736D] font-light leading-relaxed">
                To simplify travel through dependable, personalized and end-to-end assistance — combining professional planning, accurate guidance and responsive support before, during and after every journey.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <span className="text-xs font-semibold text-[#16A765] uppercase tracking-wider">
                Reliable Execution
              </span>
            </div>
          </div>

          {/* Card 2: Our Vision */}
          <div className="bg-white rounded-3xl p-7 sm:p-9 border border-[#D2E3DA] shadow-xs hover:shadow-md hover:border-[#16A765]/40 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-[#16A765]/10 text-[#0E7443] flex items-center justify-center border border-[#16A765]/20">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#17201C] tracking-tight">
                Our Vision
              </h3>
              <p className="text-sm sm:text-base text-[#66736D] font-light leading-relaxed">
                To be a trusted travel management company known for professional service, customer confidence and the ability to make even complex travel arrangements simple and well coordinated.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <span className="text-xs font-semibold text-[#16A765] uppercase tracking-wider">
                Trusted Partnership
              </span>
            </div>
          </div>

          {/* Card 3: Our Approach */}
          <div className="bg-white rounded-3xl p-7 sm:p-9 border border-[#D2E3DA] shadow-xs hover:shadow-md hover:border-[#16A765]/40 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#16A765]/10 text-[#0E7443] flex items-center justify-center border border-[#16A765]/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A765] block mb-1">
                  Our Approach
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#17201C] tracking-tight">
                  Professional Advice. Personal Attention.
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {approachPillars.map((pillar, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-[#17201C] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16A765] flex-shrink-0" />
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <span className="text-xs font-semibold text-[#16A765] uppercase tracking-wider">
                8 Core Operating Pillars
              </span>
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
