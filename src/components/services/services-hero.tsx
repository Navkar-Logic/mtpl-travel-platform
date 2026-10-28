"use client"

import * as React from "react"
import Image from "next/image"
import { Container } from "@/components/ui/container"

export function ServicesHero() {
  return (
    <div className="relative w-full overflow-hidden bg-[var(--brand-dark)] flex flex-col justify-center min-h-[55vh] md:min-h-[64vh]">
      {/* Background Image with Opacity & Optimal Framing */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="w-full h-full relative">
          <Image
            src="/assets/headers/header-services.jpg"
            alt="Travel Services Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_38%] opacity-70"
          />
        </div>
        {/* Gradients for optimal contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[var(--brand-dark)]/90 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[var(--brand-dark)]/25 pointer-events-none z-10" />
      </div>
      
      <Container className="relative z-20 pt-32 pb-24 flex flex-col items-center text-center">
        <div className="max-w-4xl space-y-6 flex flex-col items-center w-full">
          
          <div className="flex items-center justify-center gap-3 text-xs font-bold tracking-[0.2em] text-[#EEF8F3] uppercase">
            <span className="bg-white/10 px-4 py-1.5 rounded-full border border-white/15 backdrop-blur-md shadow-xs">
              OUR EXPERTISE
            </span> 
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight md:leading-[1.18] font-sans drop-shadow-2xl">
            Travel Services, <span className="text-gradient-brand-light italic">Taken Care Of.</span>
          </h1>
          
          <p className="text-lg md:text-2xl leading-relaxed text-[#EEF8F3]/90 max-w-3xl font-light mx-auto">
            From a simple flight booking to a complete international holiday, MTPL brings every aspect of your journey together through one professional travel desk.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-3.5 sm:gap-x-4 gap-y-2 pt-3 text-xs sm:text-sm md:text-base font-medium text-white/95 max-w-4xl tracking-wide">
            <span>Flights</span>
            <span className="text-white/40 select-none">•</span>
            <span>Hotels</span>
            <span className="text-white/40 select-none">•</span>
            <span>Holidays</span>
            <span className="text-white/40 select-none">•</span>
            <span>Cruises</span>
            <span className="text-white/40 select-none">•</span>
            <span>Visa &amp; Passport</span>
            <span className="text-white/40 select-none">•</span>
            <span>Forex</span>
            <span className="text-white/40 select-none">•</span>
            <span>Travel Insurance</span>
            <span className="text-white/40 select-none">•</span>
            <span>Corporate &amp; Group Travel</span>
          </div>
          
        </div>
      </Container>
    </div>
  )
}
