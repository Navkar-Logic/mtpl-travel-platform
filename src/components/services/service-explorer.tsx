"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/ui/container"
import { ArrowRight, Plane, Building2, Map, FileText, Briefcase, Car } from "lucide-react"
import Link from "next/link"
import { officeImages, OfficeImage } from "@/config/office-images"

interface ServiceCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  desc: string;
  image: OfficeImage;
  badge: string;
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "flights",
    title: "Flight Assistance",
    icon: Plane,
    desc: "Comprehensive support for domestic and international air travel. We handle complex itineraries, group bookings, and urgent travel requirements with precision.",
    image: officeImages.ticketingOperations,
    badge: "IATA Certified Ticketing Desk",
  },
  {
    id: "hotels",
    title: "Hotel Bookings",
    icon: Building2,
    desc: "From luxury resorts to business accommodations, we secure the perfect stay based on your precise location requirements and comfort preferences.",
    image: officeImages.directorCabin,
    badge: "Curated Accommodations",
  },
  {
    id: "holidays",
    title: "Holiday Planning",
    icon: Map,
    desc: "End-to-end curated travel experiences. We design personalized itineraries that transform your travel aspirations into flawless realities.",
    image: officeImages.clientConsultation,
    badge: "Personalized Consultations",
  },
  {
    id: "visa",
    title: "Visa Assistance",
    icon: FileText,
    desc: "Navigating international travel requirements with expertise. We provide comprehensive support for tourist and business visa applications.",
    image: officeImages.operationsFloorWide,
    badge: "Documentation & Visa Desk",
  },
  {
    id: "corporate",
    title: "Corporate Travel",
    icon: Briefcase,
    desc: "Streamlined business travel solutions. We manage executive travel, MICE (Meetings, Incentives, Conferences, and Exhibitions), and team offsites.",
    image: officeImages.travelExpoStall,
    badge: "MICE & Trade Delegations",
  },
  {
    id: "transfers",
    title: "Transfers & Ground",
    icon: Car,
    desc: "Seamless point-to-point connectivity. Reliable airport transfers, intercity travel, and local sightseeing arrangements.",
    image: officeImages.buildingSignboard,
    badge: "Nagpur Central Dispatch",
  },
]

export function ServiceExplorer() {
  const [activeService, setActiveService] = React.useState<ServiceCategory>(serviceCategories[0])

  return (
    <section className="relative w-full bg-[var(--background)] py-20 md:py-28 overflow-hidden">
      <Container className="relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-10">
          
          {/* Interactive List */}
          <div className="w-full lg:w-5/12 flex flex-col gap-2.5">
            {serviceCategories.map((service) => {
              const isActive = activeService.id === service.id
              const Icon = service.icon
              
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  onMouseEnter={() => setActiveService(service)}
                  className={`w-full text-left group flex items-start gap-5 p-5.5 rounded-2xl transition-all duration-300 ${
                    isActive 
                      ? "bg-brand text-white shadow-xl scale-[1.01] -translate-y-0.5" 
                      : "bg-white hover:bg-slate-50 text-foreground border border-border/60 hover:border-brand/30"
                  }`}
                >
                  <div className={`mt-0.5 flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                    isActive ? "bg-white/20 text-white" : "bg-brand/10 text-brand group-hover:bg-brand/15"
                  }`}>
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-bold font-sans mb-1 transition-colors ${
                      isActive ? "text-white" : "text-foreground group-hover:text-brand"
                    }`}>
                      {service.title}
                    </h3>
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="text-white/85 text-xs sm:text-sm font-light leading-relaxed overflow-hidden"
                        >
                          {service.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {isActive && (
                    <div className="hidden sm:block flex-shrink-0 self-center">
                      <ArrowRight className="w-4 h-4 text-white/70" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
          
          {/* Visual Explorer / Display */}
          <div className="w-full lg:w-7/12 lg:sticky lg:top-32 h-[480px] lg:h-[640px]">
            <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-slate-950 relative shadow-2xl border border-slate-800">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Real Image */}
                  <Image
                    src={activeService.image.src}
                    alt={activeService.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                    priority
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 z-10" />
                  
                  {/* Top Badge */}
                  <div className="absolute top-6 left-6 z-20">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/95 text-brand shadow-sm backdrop-blur-sm border border-brand/20">
                      <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                      {activeService.badge}
                    </span>
                  </div>

                  {/* Bottom Editorial Content */}
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20">
                    <motion.div
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <h2 className="text-3xl md:text-4xl font-bold text-white font-sans mb-3 drop-shadow-sm">
                        {activeService.title}
                      </h2>
                      <p className="text-white/85 text-sm sm:text-base font-light mb-6 max-w-lg leading-relaxed">
                        {activeService.desc}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4">
                        <Link 
                          href="/contact#enquiry-form"
                          className="inline-flex items-center gap-2.5 rounded-full bg-brand text-white font-bold h-11 px-7 hover:bg-brand-dark transition-all shadow-lg hover:shadow-brand/30 hover:scale-[1.02]"
                        >
                          Enquire Now <ArrowRight className="w-4 h-4" />
                        </Link>
                        <span className="text-xs text-white/70 font-light">
                          {activeService.image.title}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
        </div>
      </Container>
    </section>
  )
}
