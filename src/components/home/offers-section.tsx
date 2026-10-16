"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { getFeaturedOffers } from "@/features/offers/data/offers"
import { ArrowRight, Calendar, Info } from "lucide-react"

export function OffersSection() {
  const featuredOffers = getFeaturedOffers(2)

  if (featuredOffers.length === 0) return null

  const mainOffer = featuredOffers[0]
  const secondaryOffers = featuredOffers.slice(1, 3)

  return (
    <Section spacing="large" className="bg-[var(--brand-dark)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-brand/20 via-[var(--brand-dark)] to-[var(--brand-dark)] z-0" />
      
      <Container className="relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="flex items-center gap-4 mb-2"
            >
              <h2 className="text-4xl font-bold tracking-tight text-white font-sans">Travel Campaigns</h2>
            </motion.div>
            <motion.p 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-[#EEF8F3]/60 font-light"
            >
               Exclusive moments, carefully curated.
            </motion.p>
          </div>
          <motion.div
             initial={{ opacity: 0, x: 10 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <Link 
              href="/offers"
              className="group text-white font-bold hover:text-brand transition-colors inline-flex items-center gap-2 text-sm uppercase tracking-widest"
            >
              View Campaigns <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Editorial Feature */}
          {mainOffer && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-7/12"
            >
              <Link href={`/offers/${mainOffer.slug}`} className="group block relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden bg-slate-900 shadow-2xl">
                {mainOffer.heroImagePlaceholder && (
                  <Image
                    src={mainOffer.heroImagePlaceholder}
                    alt={mainOffer.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-95" />
                
                <div className="absolute top-6 right-6 z-20">
                  <span className="bg-brand text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg">Featured</span>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20">
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 font-sans leading-tight">{mainOffer.title}</h3>
                  <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl font-light line-clamp-2">{mainOffer.shortDescription}</p>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="inline-flex items-center justify-center rounded-full bg-white text-[var(--brand-dark)] font-bold h-12 px-8 shadow-lg group-hover:bg-brand group-hover:text-white transition-colors">
                      Discover
                    </span>
                    <span className="text-white/60 text-sm font-medium flex items-center gap-2">
                       <Calendar className="w-4 h-4" /> Limited Time
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Secondary Editorial Features */}
          <div className="lg:w-5/12 flex flex-col gap-8">
            {secondaryOffers.map((offer, i) => (
              <motion.div 
                key={offer.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="flex-1"
              >
                <Link href={`/offers/${offer.slug}`} className="group block relative h-full min-h-[284px] rounded-3xl overflow-hidden bg-slate-900 shadow-lg">
                  {offer.heroImagePlaceholder && (
                    <Image
                      src={offer.heroImagePlaceholder}
                      alt={offer.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-dark)]/90 via-[var(--brand-dark)]/40 to-transparent z-10 transition-opacity duration-500 group-hover:from-black/90" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                    <h3 className="text-2xl font-bold text-white mb-3 font-sans leading-tight group-hover:text-brand-light transition-colors">{offer.title}</h3>
                    
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                      <span className="text-white/60 text-xs font-medium flex items-center gap-2 uppercase tracking-widest">
                         <Info className="w-3 h-3" /> Special Offer
                      </span>
                      <span className="text-white group-hover:text-brand transition-colors">
                         <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </Container>
    </Section>
  )
}
