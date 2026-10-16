"use client"

import * as React from "react"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Offer } from "@/types/offer"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function OffersGrid({ offers }: { offers: Offer[] }) {
  const activeOffers = offers.filter(o => o.isActive);

  if (activeOffers.length === 0) {
    return (
      <Container className="py-24 text-center">
        <h3 className="text-2xl font-bold font-sans text-foreground mb-2">No Active Campaigns</h3>
        <p className="text-muted-foreground font-light">Check back later for our latest travel promotions and collections.</p>
      </Container>
    )
  }

  return (
    <section className="bg-[var(--background)] py-16 md:py-24 relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeOffers.map((offer) => {
            return (
              <div
                key={offer.id}
                className="flex flex-col group"
              >
                <Link 
                  href={`/offers/${offer.slug}`} 
                  className="group block relative h-[380px] rounded-3xl overflow-hidden bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-500 mb-6 border border-slate-200/60"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-dark)]/90 via-[var(--brand-dark)]/25 to-transparent z-10 transition-opacity duration-500" />
                  
                  {offer.heroImagePlaceholder ? (
                    <Image
                      src={offer.heroImagePlaceholder}
                      alt={offer.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 z-0"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-800 group-hover:scale-105 transition-transform duration-700 flex items-center justify-center absolute inset-0 z-0">
                       <span className="text-white/20 font-bold text-sm tracking-widest uppercase text-center px-4">{offer.title}</span>
                    </div>
                  )}
                  
                  {offer.isFeatured && (
                    <div className="absolute top-5 left-5 z-20">
                      <span className="bg-brand text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Featured
                      </span>
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end">
                     <span className="text-brand-light text-xs font-bold tracking-widest uppercase mb-1">
                        {offer.category || "Special Offer"}
                     </span>
                     <h4 className="text-xl font-bold text-white font-sans leading-snug drop-shadow-sm group-hover:text-brand-light transition-colors">
                       {offer.title}
                     </h4>
                  </div>
                </Link>
                
                {/* Text outside image */}
                <div className="px-1 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm font-light line-clamp-3 mb-4 leading-relaxed">
                      {offer.shortDescription}
                    </p>
                  </div>
                  <Link 
                    href={`/offers/${offer.slug}`}
                    className="inline-flex items-center gap-2 text-brand font-bold text-xs uppercase tracking-wider hover:text-brand-dark transition-colors pt-2 border-t border-slate-100"
                  >
                    View Campaign Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
