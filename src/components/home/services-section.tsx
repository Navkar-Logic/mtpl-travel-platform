"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { ArrowRight } from "lucide-react"

const services = [
  { 
    id: "01", 
    name: "Flight Assistance", 
    desc: "Thoughtful support for domestic and international travel.", 
    image: "/assets/services/flight-assistance.jpg",
    alt: "Commercial passenger aircraft soaring through golden sunset clouds",
    tag: "Domestic & International",
  },
  { 
    id: "02", 
    name: "Hotel Bookings", 
    desc: "Accommodation planning based on your precise requirements.", 
    image: "/assets/services/hotel-bookings.jpg",
    alt: "Luxury oceanfront hotel suite and private balcony",
    tag: "Curated Stays",
  },
  { 
    id: "03", 
    name: "Holiday Packages", 
    desc: "Curated travel experiences and personalized planning.", 
    image: "/assets/services/holiday-packages.jpg",
    alt: "Exotic tropical beach with traditional boat and turquoise waters",
    tag: "Bespoke Holidays",
  },
  { 
    id: "04", 
    name: "Visa Assistance", 
    desc: "Hassle-free processing and travel documentation support.", 
    image: "/assets/services/visa-assistance.jpg",
    alt: "Passport with travel visa stamps and boarding passes",
    tag: "Documentation Desk",
  },
  { 
    id: "05", 
    name: "Corporate Travel", 
    desc: "Business travel solutions for individuals and teams.", 
    image: "/assets/services/corporate-travel.jpg",
    alt: "Corporate executive traveling through modern airport terminal",
    tag: "Executive & MICE",
  },
]

export function ServicesSection() {
  const [hoveredService, setHoveredService] = React.useState<string | null>(services[0].id)

  return (
    <Section spacing="large" className="bg-white border-y border-border relative overflow-hidden">
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-8">
          
          {/* Header & Sticky Image Reveal */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-5/12 lg:sticky lg:top-32"
          >
            <span className="text-muted-foreground font-bold tracking-[0.2em] text-xs uppercase mb-6 block">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15] font-sans mb-12">
              Exceptional Services For Your Journey
            </h2>
            
            {/* Image Reveal Box */}
            <div className="hidden lg:block relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-slate-900 shadow-2xl mb-8 border border-slate-800">
              <AnimatePresence mode="wait">
                {services.map((service) => (
                  service.id === hoveredService && (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={service.image}
                        alt={service.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover"
                        priority={service.id === "01" || service.id === "02"}
                      />
                      
                      {/* Gradient overlay for contrast and legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10" />

                      {/* Top floating pill badge */}
                      <div className="absolute top-5 left-5 z-20">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-[var(--brand-dark)] backdrop-blur-md shadow-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                          {service.tag}
                        </span>
                      </div>

                      {/* Bottom Info Title */}
                      <div className="absolute bottom-6 left-6 right-6 z-20">
                         <span className="text-white/70 text-xs font-bold tracking-widest uppercase mb-1 block">Service {service.id}</span>
                         <span className="text-white font-sans text-2xl font-bold leading-snug block">{service.name}</span>
                         <p className="text-white/80 text-sm font-light mt-1.5 line-clamp-2">{service.desc}</p>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>

            <Link 
              href="/services"
              className="group inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-dark transition-colors uppercase tracking-widest text-sm"
            >
              Explore all services
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
          
          {/* Interactive Editorial List */}
          <div className="lg:w-1/2 w-full pt-10 lg:pt-0">
            <div className="flex flex-col">
              {services.map((service, index) => {
                const isActive = hoveredService === service.id
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                    key={service.id}
                    onMouseEnter={() => setHoveredService(service.id)}
                    className="relative"
                  >
                    <Link 
                      href="/services" 
                      onClick={(e) => {
                        if (!isActive) {
                          e.preventDefault()
                          setHoveredService(service.id)
                        }
                      }}
                      className={`group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-10 border-t border-border transition-all duration-300 relative z-10 ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                    >
                      {/* Active Route Indicator */}
                      {isActive && (
                         <motion.div 
                           layoutId="activeServiceIndicator"
                           className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-brand rounded-r-full -ml-4 sm:-ml-8"
                           transition={{ type: "spring", stiffness: 300, damping: 30 }}
                         />
                      )}
                      
                      <span className="text-sm font-bold text-brand w-8">{service.id}</span>
                      
                      <div className="flex-1">
                        <h3 className={`text-3xl font-bold mb-2 transition-colors font-sans ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {service.name}
                        </h3>
                        <AnimatePresence>
                          {isActive && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="text-muted-foreground font-light text-lg mb-4">
                                {service.desc}
                              </p>
                              {/* Mobile Image preview */}
                              <div className="block lg:hidden relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-md mb-4 border border-border">
                                <Image
                                  src={service.image}
                                  alt={service.alt}
                                  fill
                                  sizes="100vw"
                                  className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                                <div className="absolute bottom-3 left-3 text-white text-xs font-semibold px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm">
                                  {service.tag}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <div className={`hidden sm:flex items-center justify-center w-12 h-12 rounded-full border transition-all ${isActive ? 'border-brand bg-brand text-white shadow-lg' : 'border-border text-muted-foreground group-hover:border-brand/50 group-hover:text-brand'}`}>
                        <ArrowRight className={`w-5 h-5 ${isActive ? '-rotate-45' : ''} transition-transform duration-300`} />
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
              <div className="border-t border-border" />
            </div>
          </div>

        </div>
      </Container>
    </Section>
  )
}
