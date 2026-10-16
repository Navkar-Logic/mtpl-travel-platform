"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { getFeaturedDestinations } from "@/features/destinations/data/destinations"
import { MapPin, ArrowRight } from "lucide-react"

export function DestinationsSection() {
  const featured = getFeaturedDestinations(4)

  return (
    <Section spacing="large" className="bg-[var(--background)] overflow-hidden relative">
      <Container>
        {/* Editorial Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-[1px] w-12 bg-brand/30"></div>
            <span className="text-brand font-bold tracking-[0.2em] text-xs uppercase">Destination Discovery</span>
            <div className="h-[1px] w-12 bg-brand/30"></div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground font-sans mb-6"
          >
            Explore the World with Us
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl font-light"
          >
            From our headquarters in Nagpur to the most breathtaking locations across the globe.
          </motion.p>
        </div>

        {/* Journey Map Layout */}
        <div className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Origin Point (Nagpur) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-shrink-0 relative z-10 flex flex-col items-center"
          >
            <div className="w-24 h-24 rounded-full bg-[var(--brand-dark)] flex items-center justify-center shadow-2xl relative">
              <div className="absolute inset-0 bg-brand rounded-full animate-ping opacity-20" />
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <div className="mt-4 text-center">
              <span className="block text-foreground font-bold text-xl font-sans">Nagpur</span>
              <span className="block text-muted-foreground text-xs uppercase tracking-widest mt-1">Headquarters</span>
            </div>
          </motion.div>



          {/* Destinations Grid (Editorial) */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full relative z-10">
            {featured.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (index * 0.1) }}
              >
                <Link 
                  href={`/destinations/${dest.slug}`} 
                  className="group block relative aspect-[16/9] md:aspect-[4/3] overflow-hidden rounded-2xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-90" />
                  
                  {dest.heroImagePlaceholder ? (
                    <Image 
                      src={dest.heroImagePlaceholder}
                      alt={dest.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 z-0"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center z-0 bg-gradient-to-br from-slate-900 via-slate-850 to-emerald-950 group-hover:scale-105 transition-transform duration-700">
                      <span className="text-white/35 text-xs font-bold tracking-widest uppercase">{dest.name}</span>
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 z-20 flex items-end justify-between">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-sans">{dest.name}</h3>
                      <p className="text-sm text-white/80 font-light max-w-[200px] line-clamp-2">{dest.shortDescription}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <Link 
            href="/destinations"
            className="group inline-flex items-center gap-3 text-brand font-bold hover:text-brand-dark transition-colors uppercase tracking-widest text-sm"
          >
            Explore All Destinations
            <span className="w-8 h-[1px] bg-brand group-hover:w-12 transition-all duration-300 relative">
               <ArrowRight className="absolute -right-1 -top-[9px] w-5 h-5" />
            </span>
          </Link>
        </motion.div>

      </Container>
    </Section>
  )
}
