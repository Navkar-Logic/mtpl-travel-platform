"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { teamMembers } from "@/data/team"
import { TeamMember } from "@/types/team"
import {
  Users,
  ShieldCheck,
  Headphones,
  Plane,
  Building2,
  Coins,
  MapPin,
  ArrowRight,
  Mail,
  Luggage,
  UserCheck,
  Star,
  X,
} from "lucide-react"

interface DepartmentFilter {
  name: string
  icon?: React.ComponentType<{ className?: string }>
}

const departmentFilters: DepartmentFilter[] = [
  { name: "All Specialists" },
  { name: "Operations & Visas", icon: Plane },
  { name: "Ticketing & Stays", icon: Building2 },
  { name: "Finance & Accounts", icon: Coins },
  { name: "Field Operations", icon: MapPin },
]

export function TeamSection() {
  const [activeDept, setActiveDept] = React.useState<string>("All Specialists")
  const [selectedMember, setSelectedMember] = React.useState<TeamMember | null>(null)
  const triggerRef = React.useRef<HTMLElement | null>(null)

  // Featured Lead: Ms. Prajakta Sukhdeve
  const featuredLead = React.useMemo(() => {
    return teamMembers.find((m) => m.isLead) || teamMembers[0]
  }, [])

  // In "All Specialists" view:
  // Top 3 cards: Sachin Kamble, Razina Soloman, Nikita Partike
  // Bottom 5 cards: Anurag Sahu, Tanushree Farkade, Bhuvnesh Kshirsagar, Naman Ukebondre, Manish Jain
  const row1Members = React.useMemo(() => {
    return teamMembers.filter((m) =>
      ["sachin-kamble", "razina-soloman", "nikita-partike"].includes(m.id)
    )
  }, [])

  const row2Members = React.useMemo(() => {
    return teamMembers.filter((m) =>
      [
        "anurag-sahu",
        "tanushree-farkade",
        "bhuvnesh-kshirsagar",
        "naman-ukebondre",
        "manish-jain",
      ].includes(m.id)
    )
  }, [])

  // When filtered by specific department
  const filteredDepartmentMembers = React.useMemo(() => {
    if (activeDept === "All Specialists") return []
    return teamMembers.filter((m) => m.department === activeDept && !m.isLead)
  }, [activeDept])

  const showFeaturedLead =
    activeDept === "All Specialists" || activeDept === "Operations & Visas"

  const closeModal = React.useCallback(() => {
    setSelectedMember(null)
    if (triggerRef.current) {
      triggerRef.current.focus()
      triggerRef.current = null
    }
  }, [])

  const openModal = React.useCallback((member: TeamMember, eventTarget?: HTMLElement) => {
    if (eventTarget) {
      triggerRef.current = eventTarget
    }
    setSelectedMember(member)
  }, [])

  // Modal accessibility: Escape key and focus management
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedMember) {
        closeModal()
      }
    }

    if (selectedMember) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedMember, closeModal])

  return (
    <Section spacing="large" className="bg-[#FAFCFA] relative overflow-hidden border-t border-border/60">
      <Container className="relative z-10 max-w-7xl">
        {/* ========================================================= */}
        {/* 1. CINEMATIC TEAM-SECTION HERO BANNER                     */}
        {/* ========================================================= */}
        <div className="relative mb-10 lg:mb-12 rounded-[2.5rem] bg-white border border-[#DFEAE3] overflow-hidden shadow-[0_4px_24px_rgba(6,61,42,0.03)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-center relative z-10">
              <span className="inline-flex items-center gap-2 text-[#087B50] font-bold tracking-[0.2em] text-xs uppercase mb-4">
                — OUR PEOPLE · MTPL
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-bold text-[#102820] tracking-tight leading-[1.12] mb-5">
                The Team Behind <br />
                Every Journey
              </h2>
              <p className="text-sm sm:text-base text-[#60736A] font-light leading-relaxed max-w-lg mb-8">
                Experienced travel specialists bringing industry knowledge, hands-on operations and personalized care to make your journey smooth and memorable.
              </p>

              {/* 3 Circular Trust Indicators */}
              <div className="flex flex-wrap items-center gap-5 sm:gap-6 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#087B50] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#102820] max-w-[100px] leading-snug">
                    Experienced Professionals
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#087B50] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#102820] max-w-[80px] leading-snug">
                    Reliable Support
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#087B50] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#102820] max-w-[90px] leading-snug">
                    Personalized Assistance
                  </span>
                </div>
              </div>
            </div>

            {/* Right Panoramic Visual (Matches Reference Image) */}
            <div className="lg:col-span-6 relative h-[280px] sm:h-[340px] lg:h-[400px] w-full overflow-hidden">
              <Image
                src="/assets/team/team-hero-traveler.webp"
                alt="More Than Travel Support A Team You Can Trust - MTPL"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. DEPARTMENT FILTER NAVIGATION                           */}
        {/* ========================================================= */}
        <div className="flex items-center justify-center mb-8 sm:mb-10">
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-2 px-1 max-w-full">
            {departmentFilters.map((filter) => {
              const isActive = activeDept === filter.name
              const Icon = filter.icon
              const count =
                filter.name === "All Specialists"
                  ? teamMembers.length
                  : teamMembers.filter((m) => m.department === filter.name).length

              return (
                <button
                  key={filter.name}
                  type="button"
                  onClick={() => setActiveDept(filter.name)}
                  className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#087B50]/50 ${
                    isActive
                      ? "bg-[#087B50] text-white shadow-md"
                      : "bg-white hover:bg-[#E7F5ED]/70 text-[#60736A] hover:text-[#102820] border border-[#DFEAE3] shadow-xs"
                  }`}
                  aria-pressed={isActive}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{filter.name}</span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                      isActive ? "bg-white/25 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. FEATURED EMPLOYEE CARD (Ms. Prajakta Sukhdeve)         */}
        {/* ========================================================= */}
        {showFeaturedLead && (
          <div className="mb-6 sm:mb-8">
            <div className="relative rounded-3xl bg-gradient-to-r from-[#F4FAF6] via-white to-[#F0F8F5] border border-[#DFEAE3] p-5 sm:p-6 lg:p-7 shadow-xs overflow-hidden">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
                {/* Left Portrait with Badge */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={(e) => openModal(featuredLead, e.currentTarget)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      openModal(featuredLead, e.currentTarget)
                    }
                  }}
                  className="group relative w-36 h-44 sm:w-44 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-[#E7F5ED] to-white ring-2 ring-[#087B50]/15 flex-shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#087B50]"
                  aria-label={`View full bio of ${featuredLead.name}`}
                >
                  {featuredLead.image && (
                    <Image
                      src={featuredLead.image}
                      alt={featuredLead.alt || featuredLead.name}
                      fill
                      sizes="176px"
                      className="object-cover object-[center_15%] transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  {/* Pinned Department Lead Badge */}
                  <div className="absolute bottom-2 left-2 bg-[#087B50] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 z-10">
                    <Star className="w-3 h-3 fill-white" />
                    <span>Department Lead</span>
                  </div>
                </div>

                {/* Middle Info Column */}
                <div className="flex-1 text-left">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#087B50] bg-[#E7F5ED] px-3 py-1 rounded-full inline-block mb-2">
                    {featuredLead.department}
                  </span>
                  <h3
                    onClick={(e) => openModal(featuredLead, e.currentTarget)}
                    className="text-xl sm:text-2xl font-bold text-[#102820] font-sans tracking-tight hover:text-[#087B50] transition-colors cursor-pointer"
                  >
                    {featuredLead.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5 mb-2.5">
                    {featuredLead.role}
                  </p>
                  <p className="text-xs sm:text-sm text-[#60736A] font-light leading-relaxed max-w-xl">
                    {featuredLead.description || featuredLead.bio}
                  </p>
                </div>

                {/* Feature Bullets (Center-Right in reference) */}
                <div className="hidden md:flex flex-col gap-2.5 flex-shrink-0 border-l border-slate-200/80 pl-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#E7F5ED] text-[#087B50] flex items-center justify-center flex-shrink-0">
                      <Plane className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-[#102820]">
                      Travel Operations & Visa Support
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#E7F5ED] text-[#087B50] flex items-center justify-center flex-shrink-0">
                      <Luggage className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-[#102820]">
                      Holiday Packages & Tour Planning
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#E7F5ED] text-[#087B50] flex items-center justify-center flex-shrink-0">
                      <UserCheck className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-[#102820]">
                      Customer Guidance & Personal Assistance
                    </span>
                  </div>
                </div>

                {/* Right Call To Action with Passport Motif */}
                <div className="flex flex-col items-center justify-center flex-shrink-0 gap-3 relative">
                  <div className="relative w-36 h-20 hidden lg:block overflow-hidden rounded-xl opacity-90">
                    <Image
                      src="/assets/team/passport-airplane-motif.webp"
                      alt="Travel Planning"
                      fill
                      sizes="144px"
                      className="object-cover"
                    />
                  </div>
                  <Link
                    href={`/contact?specialist=${encodeURIComponent(
                      featuredLead.name
                    )}&dept=${encodeURIComponent(featuredLead.department)}#enquiry-form`}
                    className="inline-flex items-center gap-2 bg-[#087B50] hover:bg-[#07583D] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all whitespace-nowrap"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. TEAM MEMBER CARDS (Matches Reference Grid Layout)      */}
        {/* ========================================================= */}
        {activeDept === "All Specialists" ? (
          <div className="space-y-4 sm:space-y-5 mb-10">
            {/* Row 1: 3 Cards (Sachin, Razina, Nikita) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {row1Members.map((member) => (
                <TeamCard
                  key={member.id}
                  member={member}
                  onOpenModal={(m, el) => openModal(m, el)}
                />
              ))}
            </div>

            {/* Row 2: 5 Cards (Anurag, Tanushree, Bhuvnesh, Naman, Manish) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4">
              {row2Members.map((member) => (
                <TeamCard
                  key={member.id}
                  member={member}
                  isCompact
                  onOpenModal={(m, el) => openModal(m, el)}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Filtered Department Grid */
          filteredDepartmentMembers.length > 0 && (
            <div className="mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filteredDepartmentMembers.map((member) => (
                  <TeamCard
                    key={member.id}
                    member={member}
                    onOpenModal={(m, el) => openModal(m, el)}
                  />
                ))}
              </div>
            </div>
          )
        )}

        {/* ========================================================= */}
        {/* 5. CLOSING TRUST & ENQUIRY BANNER                         */}
        {/* ========================================================= */}
        <div className="rounded-3xl bg-[#E8F5EE] border border-[#DFEAE3] p-5 sm:p-6 lg:p-7 relative overflow-hidden shadow-xs">
          {/* Subtle Mountain Landscape Overlay on the right */}
          <div className="absolute top-0 right-0 h-full w-72 lg:w-96 pointer-events-none opacity-40">
            <Image
              src="/assets/team/footer-mountains.webp"
              alt="Mountain Travel Landscape"
              fill
              sizes="384px"
              className="object-cover object-right"
            />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-8 relative z-10">
            {/* Handshake Icon & Title */}
            <div className="flex items-center gap-4 text-left flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-[#CCE8D8] text-[#087B50] flex items-center justify-center flex-shrink-0 shadow-xs">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#102820] leading-snug">
                  A Dedicated Team <br className="hidden sm:inline" />
                  for a Better Travel Experience
                </h3>
              </div>
            </div>

            {/* Vertical Divider Line on Large Screens */}
            <div className="hidden lg:block w-px h-12 bg-slate-300" />

            {/* Middle Explanatory Copy */}
            <p className="text-xs sm:text-sm text-[#60736A] font-light leading-relaxed max-w-xl text-center lg:text-left">
              From planning to operations, our team works together to ensure reliable service, clear communication and a hassle-free travel experience for every client.
            </p>

            {/* Right Action Button */}
            <div className="flex-shrink-0">
              <Link
                href="/contact#enquiry-form"
                className="inline-flex items-center gap-2 bg-[#087B50] hover:bg-[#07583D] text-white text-xs sm:text-sm font-semibold px-6 sm:px-7 py-3 rounded-full shadow-sm hover:shadow-md transition-all whitespace-nowrap"
              >
                <span>Plan Your Journey With Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* ========================================================= */}
      {/* 6. INTERACTIVE EMPLOYEE BIO CARD MODAL                    */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedMember && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="employee-modal-title"
          >
            {/* Soft backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            />

            {/* Centered Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-[480px] bg-white rounded-3xl shadow-2xl border border-[#DFEAE3] overflow-hidden z-10 my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Decorative Banner */}
              <div className="relative w-full h-28 sm:h-32 bg-gradient-to-r from-[#087B50] via-[#0A9662] to-[#065A3B] px-5 py-4 flex items-start justify-between">
                {/* Department Badge */}
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full border border-white/25 shadow-sm">
                  {selectedMember.department}
                  {selectedMember.isLead && (
                    <span className="text-[10px] bg-white text-[#087B50] font-bold px-2 py-0.5 rounded-full">
                      Lead
                    </span>
                  )}
                </span>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close profile"
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-900 shadow-sm backdrop-blur-md flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Portrait Container - Gracefully overlaps the banner with ideal portrait aspect ratio */}
              <div className="relative -mt-16 sm:-mt-20 flex justify-center px-6">
                <div className="relative w-40 h-52 sm:w-44 sm:h-56 rounded-2xl overflow-hidden bg-slate-100 shadow-xl ring-4 ring-white border border-slate-200/80">
                  {selectedMember.image ? (
                    <Image
                      src={selectedMember.image}
                      alt={selectedMember.alt || selectedMember.name}
                      fill
                      sizes="200px"
                      className="object-cover object-[center_15%]"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#E7F5ED] via-[#F4FAF6] to-[#DCEDE3] flex flex-col items-center justify-center text-[#087B50]">
                      <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center font-bold text-2xl font-sans mb-1 ring-4 ring-[#087B50]/20">
                        {selectedMember.initials || "RS"}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#087B50]">
                        MTPL Specialist
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Information Section */}
              <div className="p-6 sm:p-7">
                <h3
                  id="employee-modal-title"
                  className="text-2xl font-bold text-[#102820] font-sans tracking-tight mb-1"
                >
                  {selectedMember.name}
                </h3>
                <p className="text-sm font-semibold text-[#087B50] mb-4">
                  {selectedMember.role}
                </p>

                {selectedMember.bio && (
                  <div className="mb-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Professional Overview
                    </p>
                    <p className="text-sm text-[#60736A] font-normal leading-relaxed">
                      {selectedMember.bio}
                    </p>
                  </div>
                )}

                {/* Responsibilities / Areas of Expertise */}
                {selectedMember.responsibilities && (
                  <div className="mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Areas of Responsibility
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMember.responsibilities.map((resp) => (
                        <span
                          key={resp}
                          className="text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg"
                        >
                          {resp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Section */}
                <div className="flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-slate-100">
                  <Link
                    href={`/contact?specialist=${encodeURIComponent(
                      selectedMember.name
                    )}&dept=${encodeURIComponent(selectedMember.department)}#enquiry-form`}
                    onClick={closeModal}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#087B50] hover:bg-[#07583D] text-white text-sm font-semibold py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all text-center"
                  >
                    <span>Enquire About Our Services</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="py-3 px-5 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  )
}

/**
 * Reusable Team Card matching the reference mockup layout
 */
function TeamCard({
  member,
  isCompact = false,
  onOpenModal,
}: {
  member: TeamMember
  isCompact?: boolean
  onOpenModal: (member: TeamMember, el: HTMLElement) => void
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(e) => onOpenModal(member, e.currentTarget)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onOpenModal(member, e.currentTarget)
        }
      }}
      className={`group relative bg-white rounded-2xl border border-[#DFEAE3] shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(6,61,42,0.06)] hover:border-[#087B50]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#087B50] ${
        isCompact ? "p-3.5 sm:p-4" : "p-4 sm:p-4.5"
      }`}
      aria-label={`View bio for ${member.name}`}
    >
      <div>
        <div className="flex items-start gap-3 mb-2.5">
          {/* Portrait Photo on Left */}
          <div
            className={`relative rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 ring-1 ring-slate-200/80 group-hover:ring-[#087B50]/30 transition-all ${
              isCompact ? "w-14 h-16 sm:w-16 sm:h-18" : "w-18 h-22 sm:w-20 sm:h-24"
            }`}
          >
            {member.image ? (
              <Image
                src={member.image}
                alt={member.alt || member.name}
                fill
                sizes="80px"
                className="object-cover object-[center_15%] transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#E7F5ED] to-[#D5EDE0] flex items-center justify-center text-[#087B50] font-bold text-base sm:text-lg font-sans">
                {member.initials || "RS"}
              </div>
            )}
          </div>

          {/* Right Information */}
          <div className="flex-1 min-w-0">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#087B50] bg-[#E7F5ED] px-2 py-0.5 rounded-full inline-block mb-1">
              {member.department}
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-[#102820] font-sans tracking-tight leading-snug group-hover:text-[#087B50] transition-colors">
              {member.name}
            </h4>
            <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight line-clamp-2 mt-0.5">
              {member.role}
            </p>
          </div>
        </div>

        {/* Short Factual Description */}
        {member.description && (
          <p className="text-[10px] sm:text-[11px] text-[#60736A] font-light leading-snug line-clamp-2 mb-2 pl-0.5">
            {member.description}
          </p>
        )}
      </div>

      {/* Enquire Text Link on Bottom-Right */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
        <span className="text-xs font-semibold text-slate-700 group-hover:text-[#087B50] inline-flex items-center gap-1 transition-colors">
          <Mail className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#087B50] transition-colors" />
          <span>Enquire</span>
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </div>
  )
}
