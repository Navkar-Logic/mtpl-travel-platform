"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { getFeaturedPackages } from "@/features/packages/data/packages"
import { ArrowRight, Clock, Calendar } from "lucide-react"
import { getMediaUrl } from "@/lib/media"

export function PackagesPreview() {
  const featured = getFeaturedPackages(3)

  return (
    <Section spacing="large" className="bg-[var(--background)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-muted to-transparent pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="flex items-center gap-4 mb-4"
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground font-sans">Curated Journeys</h2>
              <div className="h-[1px] w-16 bg-border hidden md:block"></div>
            </motion.div>
            <motion.span 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-brand font-bold tracking-[0.2em] text-xs uppercase flex items-center gap-2"
            >
              Handpicked For You
            </motion.span>
          </div>
          <motion.div
             initial={{ opacity: 0, x: 10 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <Link 
              href="/packages"
              className="group text-foreground font-bold hover:text-brand transition-colors inline-flex items-center gap-2 text-sm uppercase tracking-widest"
            >
              Discover All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Editorial Layout: 1 Large Featured, 2 Smaller Secondary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Feature */}
          {featured[0] && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8"
            >
              <div className="group relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden bg-slate-900 shadow-xl">
                <Image
                  src={getMediaUrl(featured[0].heroImage)}
                  alt={featured[0].title}
                  fill
                  unoptimized
                  quality={95}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-100" />
                
                <div className="absolute top-6 left-6 z-20">
                  <span className="bg-brand/90 backdrop-blur-md text-white border border-brand text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">Signature Package</span>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20">
                  <div className="flex items-center gap-2 text-white/80 text-sm font-medium mb-4">
                    <Clock className="w-4 h-4 text-brand" />
                    {featured[0].duration}
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-3 font-sans leading-tight">{featured[0].title}</h3>
                  <p className="text-white/70 text-base md:text-lg mb-6 max-w-xl font-light line-clamp-2">{featured[0].shortDescription}</p>
                  
                  {/* Price & Validity Meta */}
                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    <span className="bg-brand text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm">
                      Request a Quote
                    </span>
                    {featured[0].validityStatus === "verified" && featured[0].validityDisplay && (
                      <span className="bg-black/50 backdrop-blur-md text-white/90 border border-white/10 text-xs font-medium px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand" /> {featured[0].validityDisplay}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Link 
                      href={`/packages/${featured[0].slug}`} 
                      className="inline-flex items-center justify-center rounded-full bg-white text-brand font-bold transition-all hover:bg-brand hover:text-white h-14 px-8 shadow-lg hover:shadow-[0_10px_30px_rgba(7,162,94,0.3)] hover:-translate-y-1"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Secondary Stack */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {featured.slice(1, 3).map((pkg, i) => (
              <motion.div 
                key={pkg.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="flex-1"
              >
                <div className="group relative h-full min-h-[250px] lg:min-h-[284px] rounded-3xl overflow-hidden bg-slate-900 shadow-md hover:shadow-xl transition-shadow">
                  <Image
                    src={getMediaUrl(pkg.heroImage)}
                    alt={pkg.title}
                    fill
                    unoptimized
                    quality={95}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent z-10 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 z-20">
                    <div className="flex items-center gap-2 text-white/80 text-xs font-medium mb-2">
                      <Clock className="w-3 h-3 text-brand" />
                      {pkg.duration}
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-display group-hover:text-brand-light transition-colors">{pkg.title}</h3>
                    
                    {/* Price & Validity Meta */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-xs font-bold text-emerald-400">
                        Request a Quote
                      </span>
                      {pkg.validityStatus === "verified" && pkg.validityDisplay && (
                        <>
                          <span className="text-white/30">•</span>
                          <span className="text-[11px] text-white/70 font-medium">
                            {pkg.validityDisplay}
                          </span>
                        </>
                      )}
                    </div>

                    <Link 
                      href={`/packages/${pkg.slug}`} 
                      className="inline-flex items-center text-white text-sm font-bold group-hover:text-brand transition-colors"
                    >
                      Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </Container>
    </Section>
  )
}
