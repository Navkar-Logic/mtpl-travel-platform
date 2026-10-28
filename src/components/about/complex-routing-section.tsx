"use client"

import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Route, CheckCircle2, ArrowRight, ShieldAlert } from "lucide-react"

const routingCapabilities = [
  "Multi-Airline International Routing",
  "Multi-City & Open-Jaw Itineraries",
  "Transit Visa Requirement Guidance",
  "Connection Time Evaluation",
  "Baggage Through-Check Considerations",
  "Airline Combination Planning",
  "Fare Flexibility Assessment",
  "Current Airline & Industry Updates",
  "Alternative Routing During Disruptions",
]

export function ComplexRoutingSection() {
  return (
    <section 
      id="complex-routing" 
      className="scroll-mt-28 relative w-full py-16 sm:py-24 bg-white border-b border-[#D2E3DA]/80"
      aria-label="Complex International Travel"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading, Copy, Conclusion, CTA */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#16A765] bg-[#16A765]/10 border border-[#16A765]/20 px-3.5 py-1.5 rounded-full">
              GLOBAL ITINERARY MASTERY
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17201C] tracking-tight font-sans">
              Routing with Experience
            </h2>

            <p className="text-base sm:text-lg text-[#66736D] font-light leading-relaxed">
              When international itineraries involve multiple carriers, intermediate transit hubs, separate tickets or tight connection windows, routing errors can lead to missed flights or transit immigration hurdles.
            </p>

            <p className="text-sm sm:text-base text-[#66736D] font-light leading-relaxed">
              At MTPL, our GDS ticketing specialists evaluate minimum connection times (MCT), through-baggage agreements, airport terminal transfers and destination-specific requirements before issuing any ticket.
            </p>

            {/* Concluding Statement */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F9F8] border border-[#D2E3DA] space-y-2">
              <p className="text-sm sm:text-base font-medium text-[#17201C] leading-relaxed">
                “Our objective is to help travellers choose a routing that is not only economical, but also practical, compliant and comfortable.”
              </p>
              <div className="flex items-center gap-1.5 text-xs text-[#66736D]/80">
                <ShieldAlert className="w-3.5 h-3.5 text-[#16A765] flex-shrink-0" />
                <span>Transit rules and final boarding clearance remain subject to immigration authorities.</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact?service=Flight%20Assistance#enquiry-form"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#0E7443] hover:bg-[#063D2A] transition-all shadow-sm"
              >
                <span>Request Routing Assistance</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: 9 Capabilities Grid */}
          <div className="lg:col-span-7 bg-[#F7F9F8] rounded-3xl p-6 sm:p-8 border border-[#D2E3DA]">
            <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#D2E3DA]">
              <div className="flex items-center gap-2">
                <Route className="w-4 h-4 text-[#16A765]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#17201C]">
                  International Routing Capabilities
                </h3>
              </div>
              <span className="text-xs font-bold text-[#0E7443] bg-[#16A765]/10 px-2.5 py-0.5 rounded-full">
                9 Key Areas
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {routingCapabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#D2E3DA] text-xs sm:text-sm text-[#17201C] font-medium leading-snug hover:border-[#16A765]/40 transition-colors shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#16A765] flex-shrink-0 mt-0.5" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
