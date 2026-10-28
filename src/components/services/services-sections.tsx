"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import {
  Plane,
  Building2,
  Compass,
  Ship,
  FileCheck2,
  Coins,
  ShieldCheck,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Info,
} from "lucide-react"

export interface ServiceSectionData {
  id: string
  eyebrow: string
  title: string
  description: string
  features: string[]
  ctaText: string
  enquiryParam: string
  lucideIcon: React.ElementType
  iconSrc: string
  complianceNotice?: string
}

export const servicesList: ServiceSectionData[] = [
  {
    id: "flights",
    eyebrow: "IATA ACCREDITED TRAVEL DESK",
    title: "Flight Assistance",
    description:
      "Professional domestic & international air ticketing with a strong focus on corporate travel, complex routing and dependable human support.",
    features: [
      "Corporate & Business Air Ticketing",
      "Domestic & International Flight Bookings",
      "Access to Corporate & Special Fare Options",
      "Smart Route Planning & Multi-City Itineraries",
      "Complex International Routing Expertise",
      "Transit Visa Requirement Guidance",
      "Routing Based on Current Airline & Industry Updates",
      "Flexible Fare Options for Changes & Cancellations",
      "Rescheduling, Reissuance & Urgent Travel Support",
      "Seat, Meal & Special Service Assistance",
      "Professional GDS-Based Ticketing",
      "Centralized Billing & Corporate Travel Support",
    ],
    ctaText: "Enquire for Flight Assistance",
    enquiryParam: "Flight Assistance",
    lucideIcon: Plane,
    iconSrc: "/assets/icons/air.png",
  },
  {
    id: "hotels",
    eyebrow: "CURATED STAYS",
    title: "Hotel Bookings",
    description:
      "Carefully selected hotels and resorts for business, leisure and luxury stays across India and worldwide — chosen with your comfort, location and travel purpose in mind.",
    features: [
      "Luxury Resorts, Boutique & Business Hotels",
      "Competitive & Negotiated Hotel Rates",
      "Location-Based Hotel Recommendations",
      "Preferred Room Category & Bed Type Requests",
      "Meal Plan Selection",
      "Early Check-In & Late Check-Out Requests",
      "Airport / Railway Station Transfer Assistance",
      "Service Standards & Guest Comfort Considerations",
      "Corporate Bookings with GST Input Support",
      "Family, Corporate & Group Bookings",
      "Special Occasion & Luxury Stays",
      "Room Upgrade & Special Request Assistance",
    ],
    ctaText: "Enquire for Hotel Bookings",
    enquiryParam: "Hotel Bookings",
    lucideIcon: Building2,
    iconSrc: "/assets/icons/hotels.png",
  },
  {
    id: "holidays",
    eyebrow: "TAILOR-MADE JOURNEYS",
    title: "Holiday Planning",
    description:
      "Personalized holidays designed around your interests, comfort, pace and budget — from arrival to departure.",
    features: [
      "Customized Day-by-Day Itineraries",
      "Hotels, Transfers & Sightseeing",
      "Private Vehicles & Airport Transfers",
      "Local Experiences & Guided Tours",
      "Honeymoons, Families & Special Occasions",
      "Domestic & International Holidays",
    ],
    ctaText: "Enquire for Holiday Planning",
    enquiryParam: "Holiday Planning",
    lucideIcon: Compass,
    iconSrc: "/assets/icons/holidays.png",
  },
  {
    id: "cruises",
    eyebrow: "OCEAN & RIVER VOYAGES",
    title: "Cruise Vacations",
    description:
      "Cruise holidays made simple — from choosing the right ship and cabin to planning your complete journey.",
    features: [
      "Leading International & Indian Cruise Lines",
      "Ocean, River & Luxury Cruises",
      "Cabin & Stateroom Selection Assistance",
      "Cruise Packages with Meals & Entertainment",
      "Shore Excursion Guidance",
      "Pre & Post-Cruise Travel Arrangements",
    ],
    ctaText: "Enquire for Cruise Vacations",
    enquiryParam: "Cruise Vacations",
    lucideIcon: Ship,
    iconSrc: "/assets/icons/cruise.png",
  },
  {
    id: "visa",
    eyebrow: "VISA & PASSPORT ASSISTANCE",
    title: "Visa & Passport Support",
    description:
      "From documentation to biometrics, we simplify the visa process with careful scrutiny, appointment assistance and step-by-step support — including the added convenience of biometric and document submission assistance in Nagpur for many European countries and the UK.",
    features: [
      "Visa Assistance for 80+ Countries",
      "Documentation & Application Scrutiny",
      "VFS / Embassy Appointment Assistance",
      "Biometric & Document Submission Support in Nagpur for Many European Countries & UK",
      "Application Tracking & Status Guidance",
      "New Passport & Renewal Assistance",
      "Tatkal Passport Assistance",
      "Changes & Corrections in Passport Details",
    ],
    ctaText: "Enquire for Visa & Passport Support",
    enquiryParam: "Visa & Passport Support",
    lucideIcon: FileCheck2,
    iconSrc: "/assets/icons/passport-visa.png",
    complianceNotice:
      "Please note: Visa issuance and processing timelines remain under the sole discretion of the respective embassy or consular authorities.",
  },
  {
    id: "forex",
    eyebrow: "FOREIGN CURRENCY SOLUTIONS",
    title: "Forex Assistance",
    description:
      "Convenient foreign exchange assistance through authorized channels for your international travel requirements.",
    features: [
      "Competitive Foreign Currency Rates",
      "Major International Currencies",
      "Multi-Currency Forex Cards",
      "Currency Notes in Required Denominations",
      "International Remittance Assistance",
      "Convenient Forex Delivery Assistance",
    ],
    ctaText: "Enquire for Forex Assistance",
    enquiryParam: "Forex Assistance",
    lucideIcon: Coins,
    iconSrc: "/assets/icons/forex.png",
  },
  {
    id: "insurance",
    eyebrow: "TRAVEL WITH CONFIDENCE",
    title: "Travel Insurance",
    description:
      "Travel insurance solutions offering valuable protection against unexpected medical and journey-related emergencies.",
    features: [
      "International & Domestic Travel Insurance",
      "Overseas Medical & Hospitalization Cover",
      "Trip Delay & Cancellation Coverage Options",
      "Baggage Loss & Delay Coverage",
      "Schengen-Compliant Travel Insurance",
      "Quick Digital Policy Issuance",
    ],
    ctaText: "Enquire for Travel Insurance",
    enquiryParam: "Travel Insurance",
    lucideIcon: ShieldCheck,
    iconSrc: "/assets/icons/travel-insurance.png",
    complianceNotice:
      "Coverage, claim settlements and terms are strictly governed by the selected insurer's policy terms and conditions.",
  },
  {
    id: "corporate",
    eyebrow: "BUSINESS TRAVEL SOLUTIONS",
    title: "Corporate & Group Travel",
    description:
      "End-to-end travel management for companies, conferences, events and groups with responsive professional support.",
    features: [
      "Domestic & International Corporate Travel",
      "MICE, Conferences & Annual Offsites",
      "Group Airfare & Hotel Coordination",
      "Dedicated Corporate Travel Desk",
      "Centralized Billing & GST Invoicing",
      "Traveller Coordination & Journey Support",
    ],
    ctaText: "Enquire for Corporate & Group Travel",
    enquiryParam: "Corporate & Group Travel",
    lucideIcon: Briefcase,
    iconSrc: "/assets/icons/group-tour.png",
  },
]

export function ServicesSections() {
  return (
    <section className="relative w-full py-14 sm:py-20 bg-slate-50/50" aria-label="Our Services">
      <Container>
        <div className="space-y-10 sm:space-y-12">
          {servicesList.map((service) => {
            const LucideIcon = service.lucideIcon

            return (
              <article
                key={service.id}
                id={service.id}
                className="scroll-mt-28 relative bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(14,116,67,0.08)] hover:border-[#0E7443]/30 transition-all duration-300 overflow-hidden"
              >
                {/* Subtle top accent gradient */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0E7443]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" 
                  aria-hidden="true" 
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                  
                  {/* Left Column: Icon, Eyebrow, Title, Description, CTA */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                    <div className="space-y-4">
                      
                      {/* Top icon and badge row */}
                      <div className="flex items-center gap-3.5 flex-wrap">
                        {/* 3D Icon Container */}
                        <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-2 bg-[radial-gradient(circle_at_top_left,#16A34A_0%,#0E7443_55%,#053322_100%)] shadow-md shadow-[#0E7443]/20 ring-1 ring-emerald-400/35 flex-shrink-0">
                          <Image
                            src={service.iconSrc}
                            alt=""
                            width={56}
                            height={56}
                            className="w-full h-full object-contain drop-shadow-md"
                            unoptimized
                          />
                        </div>

                        {/* Category Eyebrow with Lucide Icon */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0E7443]/10 border border-[#0E7443]/20 text-[#0E7443] text-xs font-bold uppercase tracking-wider">
                          <LucideIcon className="w-3.5 h-3.5" />
                          <span>{service.eyebrow}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
                        {service.description}
                      </p>

                      {/* Compliance Notice if required */}
                      {service.complianceNotice && (
                        <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 leading-relaxed font-normal">
                          <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span>{service.complianceNotice}</span>
                        </div>
                      )}
                    </div>

                    {/* Enquiry CTA */}
                    <div className="pt-2">
                      <Link
                        href={`/contact?service=${encodeURIComponent(service.enquiryParam)}#enquiry-form`}
                        className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-[#0E7443] hover:bg-[#0A5C34] shadow-md shadow-[#0E7443]/20 hover:shadow-lg hover:shadow-[#0E7443]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 w-full sm:w-auto"
                      >
                        <span>{service.ctaText}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>

                  </div>

                  {/* Right Column: Feature List Grid */}
                  <div className="lg:col-span-7 bg-slate-50/70 rounded-2xl p-5 sm:p-7 border border-slate-100">
                    <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-200/70">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Service Capabilities &amp; Key Inclusions
                      </h4>
                      <span className="text-xs font-semibold text-[#0E7443] bg-[#0E7443]/10 px-2.5 py-0.5 rounded-full">
                        {service.features.length} Items
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      {service.features.map((feature, featureIdx) => (
                        <div
                          key={featureIdx}
                          className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white border border-slate-200/70 text-xs sm:text-[13px] text-slate-800 font-medium leading-snug hover:border-[#0E7443]/30 hover:bg-[#EDF7F2]/40 transition-colors shadow-2xs"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#0E7443] flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
