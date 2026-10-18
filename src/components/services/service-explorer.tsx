"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/ui/container"
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, Award, PhoneCall, Sparkles } from "lucide-react"
import { siteConfig } from "@/config/site"

export interface ServiceItem {
  id: string
  title: string
  category: "all" | "air-hotels" | "holidays-cruises" | "support" | "corporate"
  badge: string
  icon: string
  description: string
  highlights: string[]
  enquiryParam: string
}

const servicesData: ServiceItem[] = [
  {
    id: "flights",
    title: "Flight Assistance",
    category: "air-hotels",
    badge: "IATA Accredited Desk",
    icon: "/assets/icons/air.png",
    description: "Domestic and international flight ticketing across global airlines with route planning and 24/7 desk support.",
    highlights: [
      "Domestic & Global Airline Ticketing",
      "Urgent Rescheduling & Date Changes",
      "Direct GDS Booking with 24/7 Support"
    ],
    enquiryParam: "Flight Assistance",
  },
  {
    id: "hotels",
    title: "Hotel Bookings",
    category: "air-hotels",
    badge: "Curated Accommodations",
    icon: "/assets/icons/hotels.png",
    description: "Handpicked luxury resorts, boutique retreats, and executive hotels with verified comfort and corporate rates.",
    highlights: [
      "5-Star, Boutique & Business Stays",
      "Negotiated Tariffs & Room Upgrades",
      "Verified Cleanliness & Location Priority"
    ],
    enquiryParam: "Hotel Bookings",
  },
  {
    id: "holidays",
    title: "Holiday Planning",
    category: "holidays-cruises",
    badge: "Bespoke Itineraries",
    icon: "/assets/icons/holidays.png",
    description: "Tailor-made vacation itineraries customized for your pace with private transfers, stays, and guided sightseeing.",
    highlights: [
      "Personalized Day-by-Day Itineraries",
      "Private Chauffeur & Airport Transfers",
      "Handpicked Local Sightseeing & Guides"
    ],
    enquiryParam: "Holiday Planning",
  },
  {
    id: "cruises",
    title: "Cruise Vacations",
    category: "holidays-cruises",
    badge: "Ocean & River Voyages",
    icon: "/assets/icons/cruise.png",
    description: "Luxury ocean and river voyages aboard premier cruise liners with elegant staterooms, dining, and excursions.",
    highlights: [
      "Royal Caribbean, Costa, NCL & River Cruises",
      "Ocean-view & Balcony Stateroom Guidance",
      "All-Inclusive Dining & Shore Excursions"
    ],
    enquiryParam: "Cruise Vacations",
  },
  {
    id: "visa",
    title: "Visa & Passport Support",
    category: "support",
    badge: "Consular Guidance",
    icon: "/assets/icons/passport-visa.png",
    description: "Comprehensive visa and consular documentation across 80+ countries with verified checklists and appointments.",
    highlights: [
      "80+ Countries Visa Documentation",
      "VFS & Embassy Appointment Booking",
      "Fast-Track Scrutiny & Status Updates"
    ],
    enquiryParam: "Visa & Passport Support",
  },
  {
    id: "forex",
    title: "Foreign Exchange (Forex)",
    category: "support",
    badge: "Authorized Dealer Network",
    icon: "/assets/icons/forex.png",
    description: "Assisting guests in securing the lowest exchange rates across authorized dealers, arranging currency notes and travel cards.",
    highlights: [
      "Lowest Rates Sourced Across Multiple Dealers",
      "Physical Currency Notes in Major Denominations",
      "Multi-Currency Forex Cards & Doorstep Delivery"
    ],
    enquiryParam: "Foreign Exchange",
  },
  {
    id: "insurance",
    title: "Travel Insurance",
    category: "support",
    badge: "Comprehensive Protection",
    icon: "/assets/icons/travel-insurance.png",
    description: "Overseas and domestic travel insurance shielding against medical emergencies, flight delays, and luggage loss.",
    highlights: [
      "Overseas Medical & Hospitalization Cover",
      "Lost Baggage & Flight Disruption Claims",
      "Instant Digital Policy Issuance"
    ],
    enquiryParam: "Travel Insurance",
  },
  {
    id: "corporate",
    title: "Corporate & Group Travel",
    category: "corporate",
    badge: "MICE & Group Tours",
    icon: "/assets/icons/group-tour.png",
    description: "Corporate travel management, MICE conferences, and group tours with dedicated account managers and GST billing.",
    highlights: [
      "Corporate MICE & Annual Offsites",
      "Dedicated Account Manager & 24/7 Desk",
      "Transparent Invoicing & Full GST Compliance"
    ],
    enquiryParam: "Corporate & Group Travel",
  },
]

const categories = [
  { id: "all", label: "All Services" },
  { id: "air-hotels", label: "Flights & Hotels" },
  { id: "holidays-cruises", label: "Holidays & Cruises" },
  { id: "support", label: "Visa, Forex & Insurance" },
  { id: "corporate", label: "Corporate & Groups" },
]

export function ServiceExplorer() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all")

  // Listen to URL hash if direct deep link is provided
  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase()
      if (!hash) return
      if (hash === "flights" || hash === "hotels") setSelectedCategory("air-hotels")
      else if (hash === "holidays" || hash === "cruises") setSelectedCategory("holidays-cruises")
      else if (hash === "visa" || hash === "forex" || hash === "insurance") setSelectedCategory("support")
      else if (hash === "corporate" || hash === "group-tour") setSelectedCategory("corporate")
    }
    handleHash()
    window.addEventListener("hashchange", handleHash)
    return () => window.removeEventListener("hashchange", handleHash)
  }, [])

  const filteredServices = selectedCategory === "all"
    ? servicesData
    : servicesData.filter((s) => s.category === selectedCategory)

  return (
    <section className="relative w-full bg-slate-50/60 py-16 sm:py-24 overflow-hidden" id="all-services">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-brand/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Single-Window Travel Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-sans">
            Comprehensive Services, <br className="hidden sm:block" />
            <span className="text-brand">Delivered with Precision</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            Every aspect of your domestic and international journey is handled by certified travel professionals with over three decades of verified industry expertise.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap mb-12 sm:mb-14">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 outline-none ${
                  isSelected
                    ? "bg-brand text-white shadow-md shadow-brand/25 scale-[1.02]"
                    : "bg-white text-slate-700 hover:text-brand hover:bg-slate-100 border border-slate-200/80 shadow-xs"
                }`}
              >
                <span>{cat.label}</span>
                {isSelected && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 rounded-full bg-brand -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Services Grid (All 8 Services) */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="group relative flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(14,116,67,0.12)] hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Top Section */}
                <div className="flex flex-col items-center">
                  
                  {/* Significantly Enlarged Rounded square with green radial gradient */}
                  <div className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-2.5 sm:p-3 bg-[radial-gradient(circle_at_top_left,#16A34A_0%,#0E7443_55%,#053322_100%)] shadow-[0_14px_30px_-5px_rgba(14,116,67,0.45)] ring-1 ring-emerald-400/35 group-hover:shadow-[0_20px_40px_-4px_rgba(14,116,67,0.65)] group-hover:ring-emerald-300/70 group-hover:scale-105 transition-all duration-300 flex-shrink-0 mb-4">
                    {/* Specular gleam */}
                    <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.35)_0%,transparent_60%)] pointer-events-none" />
                    
                    <div className="relative w-full h-full flex items-center justify-center p-0.5">
                      <Image
                        src={service.icon}
                        alt={service.title}
                        width={112}
                        height={112}
                        className="w-full h-full object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-110"
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* Single Line Tag / Badge (Always 1 Line) */}
                  <div className="w-full flex justify-center mb-3">
                    <span className="text-xs font-bold text-brand bg-brand/10 border border-brand/15 px-3.5 py-1 rounded-full whitespace-nowrap text-center">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-[22px] font-bold text-slate-900 group-hover:text-brand transition-colors tracking-tight text-center mb-3">
                    {service.title}
                  </h3>

                  {/* Exactly 3-Line Information Justified & Content-Centered */}
                  <div className="w-full flex justify-center items-center text-center mb-6">
                    <p className="text-slate-600 text-sm font-light leading-relaxed text-justify [text-align-last:center] [text-justify:inter-word] w-full">
                      {service.description}
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <ul className="space-y-2.5 pt-4 border-t border-slate-100 mb-6 w-full">
                    {service.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 font-medium leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA */}
                <div className="pt-2">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.enquiryParam)}#enquiry-form`}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl py-3 px-4 text-sm font-semibold text-brand bg-brand/10 hover:bg-brand hover:text-white transition-all duration-300 shadow-xs hover:shadow-md"
                  >
                    <span>Enquire for {service.title}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* The MTPL Desk Advantage Bar */}
        <div className="mt-20 sm:mt-24 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-5">
              <span className="text-brand font-bold text-xs uppercase tracking-wider">Reliable Execution</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
                Why Travelers Depend on the MTPL Travel Desk
              </h3>
              <p className="text-slate-600 text-sm sm:text-base font-light mt-3 leading-relaxed">
                Unlike automated algorithms, our physical IATA operations desk provides dedicated human expertise, personalized re-routings, and authentic accountability.
              </p>
              
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a 
                  href={`tel:${siteConfig.contact.phones.primary.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-brand text-white font-semibold text-sm shadow-md hover:bg-brand-dark transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call {siteConfig.contact.phones.primary}</span>
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-brand transition-colors"
                >
                  <span>Our 30-Year Heritage</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">IATA Accredited Agency</h4>
                  <p className="text-xs text-slate-600 font-light mt-1 leading-relaxed">
                    Direct Global Distribution Systems access ensuring genuine tickets and transparent fare rules.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Zero Hidden Surcharges</h4>
                  <p className="text-xs text-slate-600 font-light mt-1 leading-relaxed">
                    100% transparent invoicing with complete breakdown of airfares, taxes, and service fees.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">24/7 Journey Support</h4>
                  <p className="text-xs text-slate-600 font-light mt-1 leading-relaxed">
                    Real-time assistance during airline delays, weather cancellations, and transit emergencies.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Central Nagpur Headquarters</h4>
                  <p className="text-xs text-slate-600 font-light mt-1 leading-relaxed">
                    Walk in anytime to our Dharampeth office for one-on-one consultation with certified senior agents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </Container>
    </section>
  )
}
