"use client"

import * as React from "react"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { directors, teamMembers } from "@/data/team"
import { officeImages } from "@/config/office-images"
import {
  Plane,
  Building2,
  Route,
  Hotel,
  Compass,
  FileCheck2,
  Coins,
  Shield,
  Ship,
  Headphones,
  UserCheck,
  ShieldCheck,
} from "lucide-react"

const capabilities = [
  { name: "Domestic & International Air Ticketing", icon: Plane },
  { name: "Corporate Travel Management", icon: Building2 },
  { name: "International Routing", icon: Route },
  { name: "Hotel Reservations", icon: Hotel },
  { name: "Luxury FIT Holidays", icon: Compass },
  { name: "Visa & Passport Assistance", icon: FileCheck2 },
  { name: "Forex Coordination", icon: Coins },
  { name: "Travel Insurance", icon: Shield },
  { name: "Cruise Vacations", icon: Ship },
  { name: "Customer Support & Travel Operations", icon: Headphones },
]

const lifeAtMtplImages = [
  {
    image: officeImages.consultantsFloor,
    badge: "Operations Floor",
  },
  {
    image: officeImages.clientConsultation,
    badge: "In-Person Consultation",
  },
  {
    image: officeImages.ticketingOperations,
    badge: "Ticketing & Documentation",
  },
  {
    image: officeImages.teamFestiveCelebration,
    badge: "Team Culture",
  },
]

export function LeadershipAndTeam() {
  const [selectedDept, setSelectedDept] = React.useState<string>("All")

  const filteredTeam = React.useMemo(() => {
    if (selectedDept === "All") return teamMembers
    return teamMembers.filter((m) => m.department === selectedDept)
  }, [selectedDept])

  const departments = React.useMemo(() => {
    return ["All", "Operations & Visas", "Ticketing & Stays", "Finance & Accounts", "Field Operations"]
  }, [])

  return (
    <section className="relative w-full py-16 sm:py-24 bg-white border-b border-[#D2E3DA]/80" aria-label="Leadership & Team">
      <Container>
        
        {/* ================= 1. OUR LEADERSHIP ================= */}
        <div className="mb-20 sm:mb-24">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#16A765] bg-[#16A765]/10 border border-[#16A765]/20 px-3.5 py-1.5 rounded-full">
              EXECUTIVE LEADERSHIP
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17201C] tracking-tight font-sans">
              Our Leadership
            </h2>

            <p className="text-base sm:text-lg text-[#66736D] font-light leading-relaxed max-w-2xl mx-auto">
              Our directors remain actively involved in day-to-day operations, client relationships and service standards.
            </p>

            <div className="p-4 rounded-2xl bg-[#F7F9F8] border border-[#D2E3DA] max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-[#16A765] block mb-1">
                Directorial Philosophy
              </span>
              <p className="text-sm sm:text-base font-serif italic text-[#063D2A]">
                “Professional advice, transparent communication, personal accountability and dependable travel assistance.”
              </p>
            </div>
          </div>

          {/* Two Directors Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 sm:gap-10">
            {directors.map((director) => (
              <div
                key={director.name}
                className="group relative bg-[#F7F9F8] rounded-3xl p-7 sm:p-9 border border-[#D2E3DA] hover:border-[#16A765]/50 hover:bg-white shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
              >
                {/* Director Portrait */}
                <div className="relative w-44 h-52 sm:w-48 sm:h-56 rounded-2xl overflow-hidden mb-6 bg-slate-200 shadow-sm ring-4 ring-[#16A765]/10 border-2 border-white group-hover:ring-[#16A765]/30 transition-all duration-300">
                  <Image
                    src={director.image}
                    alt={director.alt}
                    fill
                    sizes="(max-width: 768px) 176px, 192px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <span className="text-xs font-bold text-[#0E7443] bg-[#16A765]/10 border border-[#16A765]/20 px-3.5 py-1 rounded-full uppercase tracking-widest mb-2">
                  {director.role}
                </span>

                <h3 className="text-2xl font-bold text-[#17201C] font-sans tracking-tight mb-3">
                  {director.name}
                </h3>

                <p className="text-sm text-[#66736D] font-light leading-relaxed max-w-sm">
                  {director.message}
                </p>
              </div>
            ))}
          </div>

          {/* Hands-On Leadership & Directorial Consultation Desks */}
          <div className="mt-12 sm:mt-16 bg-[#F7F9F8] rounded-3xl p-6 sm:p-10 border border-[#D2E3DA]">
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-8 sm:mb-10">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#16A765] bg-[#16A765]/10 border border-[#16A765]/20 px-3 py-1 rounded-full">
                HANDS-ON LEADERSHIP
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#17201C] font-sans tracking-tight">
                Personal Consultation &amp; Director-Led Oversight
              </h3>
              <p className="text-sm sm:text-base text-[#66736D] font-light leading-relaxed max-w-2xl mx-auto">
                At Mishrikotkar Travels, senior leadership remains personally involved in crafting and supervising journeys. From bespoke international holidays to corporate travel programs, our directors actively review routes, lodging standards, and schedules.
              </p>
              <p className="text-sm sm:text-base text-[#66736D] font-light leading-relaxed max-w-2xl mx-auto">
                Clients have direct access to experienced decision-makers rather than an anonymous call center. In our private consultation workspaces, we welcome travellers for one-on-one itinerary planning, offering honest guidance and tailored travel solutions.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-[#17201C] font-semibold">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#16A765] flex-shrink-0" />
                  <span>Direct Leadership Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#16A765] flex-shrink-0" />
                  <span>Personalized Itinerary Consultation</span>
                </div>
              </div>
            </div>

            {/* Two Director Workspace Photos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {/* Photo 1: Director Tushar Mishrikotkar in Consultation Cabin */}
              <div className="group bg-white rounded-2xl overflow-hidden border border-[#D2E3DA] shadow-xs hover:shadow-md transition-all duration-300">
                <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={officeImages.directorCabin.src}
                    alt={officeImages.directorCabin.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-[#0E7443] shadow-xs">
                      Director&apos;s Cabin
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-emerald-300 block">
                      Tushar Mishrikotkar
                    </span>
                    <p className="text-xs sm:text-sm font-semibold leading-snug">
                      Executive Consultation Cabin
                    </p>
                  </div>
                </div>
                <div className="p-4 sm:p-5 space-y-1">
                  <h4 className="text-sm sm:text-base font-bold text-[#17201C]">
                    {officeImages.directorCabin.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#66736D] font-light leading-relaxed">
                    {officeImages.directorCabin.caption}
                  </p>
                </div>
              </div>

              {/* Photo 2: Director Puja Mishrikotkar at Consultation Desk */}
              <div className="group bg-white rounded-2xl overflow-hidden border border-[#D2E3DA] shadow-xs hover:shadow-md transition-all duration-300">
                <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={officeImages.directorDesk.src}
                    alt={officeImages.directorDesk.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-[#0E7443] shadow-xs">
                      Consultation Desk
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-emerald-300 block">
                      Puja Mishrikotkar
                    </span>
                    <p className="text-xs sm:text-sm font-semibold leading-snug">
                      Directorial Planning Desk
                    </p>
                  </div>
                </div>
                <div className="p-4 sm:p-5 space-y-1">
                  <h4 className="text-sm sm:text-base font-bold text-[#17201C]">
                    {officeImages.directorDesk.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#66736D] font-light leading-relaxed">
                    {officeImages.directorDesk.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 2. OUR TEAM & CAPABILITIES ================= */}
        <div className="mb-20 sm:mb-24 pt-12 border-t border-[#D2E3DA]">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-10 sm:mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#16A765] bg-[#16A765]/10 border border-[#16A765]/20 px-3.5 py-1.5 rounded-full">
              TEAM EXPERTISE
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17201C] tracking-tight font-sans">
              Specialists Behind Every Journey
            </h2>

            <p className="text-base sm:text-lg text-[#66736D] font-light leading-relaxed max-w-2xl mx-auto">
              Our verified, in-house team combines specialized expertise across every essential travel vertical.
            </p>
          </div>

          {/* Grouped Capabilities Pills (10 items) */}
          <div className="mb-12">
            <div className="text-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#66736D]">
                Specialized Departmental Capabilities
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-5xl mx-auto">
              {capabilities.map((cap, i) => {
                const Icon = cap.icon
                return (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F7F9F8] border border-[#D2E3DA] text-xs font-medium text-[#17201C]"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#16A765] flex-shrink-0" />
                    <span>{cap.name}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Department Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  selectedDept === dept
                    ? "bg-[#0E7443] text-white shadow-xs"
                    : "bg-[#F7F9F8] text-[#66736D] hover:text-[#17201C] hover:bg-slate-100 border border-[#D2E3DA]"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Team Members Grid (Showing all verified team members) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredTeam.map((member) => (
              <div
                key={member.id}
                className="group relative bg-[#F7F9F8] rounded-3xl p-6 border border-[#D2E3DA] hover:border-[#16A765]/40 hover:bg-white shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-18 h-22 sm:w-20 sm:h-24 rounded-2xl overflow-hidden bg-slate-200 border border-slate-200 shadow-2xs flex-shrink-0">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.alt || member.name}
                        fill
                        sizes="80px"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#16A765]/10 text-[#0E7443] font-bold text-sm">
                        {member.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#0E7443] uppercase tracking-wider block truncate">
                      {member.department}
                    </span>
                    <h3 className="text-base font-bold text-[#17201C] leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#66736D] font-light leading-snug line-clamp-2">
                      {member.role}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#66736D] font-light leading-relaxed mb-4">
                  {member.bio || member.description}
                </p>

                {member.responsibilities && (
                  <div className="pt-3 border-t border-[#D2E3DA] flex flex-wrap gap-1.5">
                    {member.responsibilities.slice(0, 3).map((resp, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium bg-white px-2 py-0.5 rounded-md border border-slate-200 text-[#17201C]"
                      >
                        {resp}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ================= 3. LIFE AT MTPL ================= */}
        <div className="pt-12 border-t border-[#D2E3DA]">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#16A765] bg-[#16A765]/10 border border-[#16A765]/20 px-3.5 py-1.5 rounded-full">
              PRACTICAL MASTERY
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17201C] tracking-tight font-sans">
              Knowledge That Comes from the Industry
            </h2>

            <p className="text-base sm:text-lg text-[#66736D] font-light leading-relaxed max-w-2xl mx-auto">
              Our travel recommendations do not originate from search algorithms. They are built on direct airline policy knowledge, changing visa regulations, hands-on destination familiarization, strong supplier relationships and decades of practical travel experience.
            </p>
          </div>

          {/* Genuine Office / Team Photo Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {lifeAtMtplImages.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden bg-white border border-[#D2E3DA] shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-[#0E7443] shadow-xs">
                      {item.badge}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <h4 className="text-sm font-bold text-[#17201C] line-clamp-1">
                    {item.image.title}
                  </h4>
                  <p className="text-xs text-[#66736D] font-light line-clamp-2 leading-relaxed">
                    {item.image.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </Container>
    </section>
  )
}
