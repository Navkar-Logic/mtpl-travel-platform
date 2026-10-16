"use client"

import * as React from "react"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Destination } from "@/types/destination"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"

export function DestinationsGrid({ destinations }: { destinations: Destination[] }) {
  if (destinations.length === 0) {
    return (
      <Container className="py-24 text-center">
        <h3 className="text-2xl font-bold font-sans text-foreground mb-2">No Destinations Found</h3>
        <p className="text-muted-foreground font-light">Check back later for exciting new travel destinations.</p>
      </Container>
    )
  }

  return (
    <section className="bg-[var(--background)] py-16 md:py-24 relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {destinations.map((dest) => {
            const packageCount = dest.relatedPackageSlugs?.length || 0

            return (
              <div
                key={dest.id}
                className="group relative"
              >
                <Link 
                  href={`/destinations/${dest.slug}`} 
                  className="group block relative rounded-3xl overflow-hidden bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-500 h-[440px] border border-slate-200/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 transition-opacity duration-500" />
                  
                  {dest.heroImagePlaceholder ? (
                    <Image
                      src={dest.heroImagePlaceholder}
                      alt={dest.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 z-0"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-emerald-950 flex items-center justify-center absolute inset-0 z-0">
                       <span className="text-white/30 font-bold text-sm tracking-widest uppercase text-center px-4">{dest.name}</span>
                    </div>
                  )}
                  
                  {/* Top Badge: Package Count */}
                  <div className="absolute top-5 right-5 z-20">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
                      {packageCount} {packageCount === 1 ? 'Package' : 'Packages'}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 flex flex-col justify-end h-full">
                    <div>
                      <div className="flex items-center gap-2 text-brand-light text-xs font-bold tracking-widest uppercase mb-2">
                         <MapPin className="w-3.5 h-3.5 text-brand" /> {dest.region} &bull; {dest.country}
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-sans leading-tight group-hover:text-brand-light transition-colors">
                        {dest.name}
                      </h3>
                      
                      <p className="text-white/80 text-sm font-light line-clamp-2 mb-4 leading-relaxed">
                        {dest.shortDescription}
                      </p>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <span className="text-xs font-semibold text-white/90 group-hover:text-brand-light transition-colors flex items-center gap-1.5">
                          Explore Itineraries
                        </span>
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 group-hover:bg-brand text-white transition-all transform group-hover:translate-x-1">
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
