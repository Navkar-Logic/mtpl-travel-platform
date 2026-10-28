"use client"

import * as React from "react"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { officeImages } from "@/config/office-images"
import { ShieldCheck, Award, Users, Trophy, Info } from "lucide-react"

const credibilityItems = [
  {
    icon: ShieldCheck,
    tag: "Global Standard",
    title: "IATA Accredited Agency",
    description:
      "MTPL is an IATA-accredited travel agency providing professional domestic and international airline ticketing with direct Global Distribution System (GDS) ticketing access.",
    highlight: "IATA No.: 14344864",
  },
  {
    icon: Award,
    tag: "Trade Association",
    title: "Active TAAI Member",
    description:
      "MTPL is an active member of the Travel Agents Association of India (TAAI), the country’s premier and oldest travel-trade body, adhering to professional standards.",
    highlight: "TAAI Member Agency",
  },
  {
    icon: Users,
    tag: "Elected Leadership",
    title: "Industry Leadership",
    description:
      "Tushar Mishrikotkar, Director of MTPL, serves as Honorary Treasurer of the TAAI Vidarbha Chapter since 2024, and was elected unopposed for the next term through 2028.",
    highlight: "TAAI Vidarbha Treasurer (2024–2028)",
  },
  {
    icon: Trophy,
    tag: "Commercial Partnerships",
    title: "Direct Airline Agency & Sales Recognition",
    description:
      "Direct agency accreditation, commercial distribution relationships and sustained airline sales performance recognition, including premier carrier partnerships like IndiGo.",
    highlight: "IndiGo Sales Recognition",
  },
]

export function IndustryPresence() {
  return (
    <section className="relative w-full py-16 sm:py-24 bg-white border-b border-[#D2E3DA]/80" aria-label="Industry Presence">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14 sm:mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#16A765] bg-[#16A765]/10 border border-[#16A765]/20 px-3.5 py-1.5 rounded-full">
            CREDENTIALS &amp; RECOGNITION
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17201C] tracking-tight font-sans">
            Professional Associations &amp; Airline Relationships
          </h2>

          <p className="text-base sm:text-lg text-[#66736D] font-light leading-relaxed max-w-2xl mx-auto">
            Our established relationships with international bodies and airlines ensure direct ticketing access, authenticated inventory and dependable service for travellers.
          </p>
        </div>

        {/* 4 Credibility Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mb-14">
          {credibilityItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="group relative bg-[#F7F9F8] rounded-3xl p-6 sm:p-7 border border-[#D2E3DA] shadow-xs hover:shadow-md hover:border-[#16A765]/40 hover:bg-white transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-[#16A765]/10 text-[#0E7443] flex items-center justify-center border border-[#16A765]/20 group-hover:bg-[#16A765] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-[#66736D] uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#17201C] tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#66736D] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#D2E3DA]">
                  <span className="text-xs font-bold text-[#0E7443] bg-white px-3 py-1 rounded-full border border-[#D2E3DA] inline-block shadow-2xs">
                    {item.highlight}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Authentic Photo Proof Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-10">
          
          {/* Photo 1: IndiGo Partnership Plaque */}
          <div className="group rounded-3xl overflow-hidden border border-[#D2E3DA] bg-white shadow-xs hover:shadow-md transition-all duration-300">
            <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden">
              <Image
                src={officeImages.airlineRecognitionIndigo.src}
                alt={officeImages.airlineRecognitionIndigo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-[#0E7443] shadow-xs">
                  Official Recognition Plaque
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h4 className="text-sm sm:text-base font-bold leading-snug">
                  {officeImages.airlineRecognitionIndigo.title}
                </h4>
                <p className="text-xs text-white/80 font-light mt-1">
                  {officeImages.airlineRecognitionIndigo.caption}
                </p>
              </div>
            </div>
          </div>

          {/* Photo 2: Directors Airline Certificate */}
          <div className="group rounded-3xl overflow-hidden border border-[#D2E3DA] bg-white shadow-xs hover:shadow-md transition-all duration-300">
            <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden">
              <Image
                src={officeImages.directorsAirlineCertificate.src}
                alt={officeImages.directorsAirlineCertificate.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-[#0E7443] shadow-xs">
                  Leadership Certification
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h4 className="text-sm sm:text-base font-bold leading-snug">
                  {officeImages.directorsAirlineCertificate.title}
                </h4>
                <p className="text-xs text-white/80 font-light mt-1">
                  {officeImages.directorsAirlineCertificate.caption}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Factual Disclaimer Banner */}
        <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-[#F7F9F8] border border-[#D2E3DA] flex items-start gap-3 text-xs text-[#66736D] leading-relaxed">
          <Info className="w-4 h-4 text-[#16A765] flex-shrink-0 mt-0.5" />
          <span>
            <strong>Transparency Notice:</strong> All industry associations, direct accreditations and sales recognitions reflect authentic commercial agency arrangements. Supporting documentation and airline distribution credentials are confirmed through official industry registers.
          </span>
        </div>

      </Container>
    </section>
  )
}
