"use client"

import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { FileCheck2, CheckCircle2, ArrowRight, ShieldCheck, MapPin } from "lucide-react"

const visaItems = [
  "Visa Assistance for 80+ Countries",
  "Documentation & Application Scrutiny",
  "VFS / Embassy Appointment Assistance",
  "Biometric & Document Submission Support in Nagpur for Many European Countries & UK",
  "Application Tracking & Status Guidance",
  "New Passport Assistance",
  "Passport Renewals",
  "Tatkal Passport Assistance",
  "Changes & Corrections in Passport Details",
]

export function VisaPassportSection() {
  return (
    <section 
      id="visa-passport" 
      className="scroll-mt-28 relative w-full py-16 sm:py-24 bg-[#F7F9F8] border-b border-[#D2E3DA]/80"
      aria-label="Visa & Passport Expertise"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: 9 Items Grid (Swapped to create alternating visual rhythm) */}
          <div className="lg:col-span-7 order-2 lg:order-1 bg-white rounded-3xl p-6 sm:p-8 border border-[#D2E3DA] shadow-xs">
            <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#D2E3DA]">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-[#16A765]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#17201C]">
                  Consular &amp; Passport Services
                </h3>
              </div>
              <span className="text-xs font-bold text-[#0E7443] bg-[#16A765]/10 px-2.5 py-0.5 rounded-full">
                80+ Countries
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {visaItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7F9F8] border border-[#D2E3DA] text-xs sm:text-sm text-[#17201C] font-medium leading-snug hover:border-[#16A765]/40 hover:bg-white transition-colors shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#16A765] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Nagpur Highlight Callout */}
            <div className="mt-5 p-3.5 rounded-xl bg-[#0E7443]/5 border border-[#16A765]/20 flex items-start gap-2.5 text-xs text-[#063D2A] leading-relaxed">
              <MapPin className="w-4 h-4 text-[#16A765] flex-shrink-0 mt-0.5" />
              <span>
                <strong>Nagpur Biometric Convenience:</strong> Travellers from Central India benefit from local biometric and document submission guidance right here in Nagpur for the UK and many European Schengen countries.
              </span>
            </div>
          </div>

          {/* Right Column: Heading, Copy, Disclaimer, CTA */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#16A765] bg-[#16A765]/10 border border-[#16A765]/20 px-3.5 py-1.5 rounded-full">
              VISA &amp; PASSPORT ASSISTANCE
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17201C] tracking-tight font-sans">
              Making International Travel Easier
            </h2>

            <p className="text-base sm:text-lg text-[#66736D] font-light leading-relaxed">
              Consular paperwork and shifting entry protocols can be stressful. We simplify the entire journey through rigorous document scrutiny, official appointment scheduling, and step-by-step guidance.
            </p>

            <div className="p-4 rounded-2xl bg-white border border-[#D2E3DA] space-y-1.5 text-xs text-[#66736D] leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-[#17201C]">
                <ShieldCheck className="w-4 h-4 text-[#16A765]" />
                <span>Transparent Regulatory Compliance</span>
              </div>
              <p>
                Please note: MTPL provides application scrutiny and appointment logistics. Visa approval decisions, processing timeframes, and interview requirements remain under the sole authority of the respective embassies and consulates.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/contact?service=Visa%20%26%20Passport%20Support#enquiry-form"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#0E7443] hover:bg-[#063D2A] transition-all shadow-sm"
              >
                <span>Enquire for Visa &amp; Passport</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
