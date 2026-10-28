"use client"

import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { HeartHandshake, CheckCircle2, ArrowRight, Phone, MessageSquare } from "lucide-react"

const supportFeatures = [
  "Flight Rescheduling",
  "Ticket Reissuance",
  "Airline Schedule Change Support",
  "International Routing Assistance",
  "Hotel Modifications",
  "Itinerary Changes",
  "Airline & Supplier Coordination",
  "Traveller Communication",
  "WhatsApp & Phone Assistance",
  "On-Trip Support When Required",
]

export function SupportBeyondSection() {
  return (
    <section 
      id="support-beyond" 
      className="scroll-mt-28 relative w-full py-16 sm:py-24 bg-white border-b border-[#D2E3DA]/80"
      aria-label="Support Beyond Booking"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading, Copy, Communication Badges, CTA */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#16A765] bg-[#16A765]/10 border border-[#16A765]/20 px-3.5 py-1.5 rounded-full">
              HUMAN COMMITMENT
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17201C] tracking-tight font-sans">
              With You Before, During &amp; After Travel
            </h2>

            <p className="text-base sm:text-lg text-[#66736D] font-light leading-relaxed">
              Our relationship does not terminate when tickets are issued or hotel vouchers are emailed. Travel plans evolve, airlines adjust flight schedules, and weather can disrupt connections.
            </p>

            <p className="text-sm sm:text-base text-[#66736D] font-light leading-relaxed">
              When schedule modifications or unexpected journey changes arise, our team remains directly accessible via phone, WhatsApp and email to coordinate available airline and supplier options, helping minimize stress and disruptions.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F7F9F8] border border-[#D2E3DA] text-xs font-semibold text-[#17201C]">
                <Phone className="w-3.5 h-3.5 text-[#16A765]" />
                <span>Direct Voice Support</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F7F9F8] border border-[#D2E3DA] text-xs font-semibold text-[#17201C]">
                <MessageSquare className="w-3.5 h-3.5 text-[#16A765]" />
                <span>Responsive WhatsApp Help</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact#enquiry-form"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#0E7443] hover:bg-[#063D2A] transition-all shadow-sm"
              >
                <span>Speak with Our Travel Team</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: 10 Features Grid */}
          <div className="lg:col-span-7 bg-[#F7F9F8] rounded-3xl p-6 sm:p-8 border border-[#D2E3DA]">
            <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#D2E3DA]">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#16A765]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#17201C]">
                  Ongoing Journey Support Services
                </h3>
              </div>
              <span className="text-xs font-bold text-[#0E7443] bg-[#16A765]/10 px-2.5 py-0.5 rounded-full">
                10 Core Areas
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {supportFeatures.map((feat, idx) => (
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
