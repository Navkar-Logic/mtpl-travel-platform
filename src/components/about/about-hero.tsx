"use client"

import * as React from "react"
import Image from "next/image"
import { Container } from "@/components/ui/container"

export function AboutHero() {
  return (
    <div className="relative w-full overflow-hidden bg-[var(--brand-dark)] flex flex-col justify-center min-h-[55vh] md:min-h-[64vh]">
      {/* Background Image with Opacity & Optimal Framing */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="w-full h-full relative">
          <Image
            src="/assets/headers/header-about.jpg"
            alt="Mishrikotkar Travels Legacy Journey Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_28%] opacity-70"
          />
        </div>
        {/* Gradients for optimal contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[var(--brand-dark)]/90 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[var(--brand-dark)]/25 pointer-events-none z-10" />
      </div>
      
      <Container className="relative z-20 pt-32 pb-24 flex flex-col items-center text-center">
        <div className="max-w-4xl space-y-6 flex flex-col items-center w-full">
          
          <div className="flex items-center justify-center gap-3 text-xs font-bold tracking-[0.2em] text-[#EEF8F3] uppercase">
            <span className="bg-white/10 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">Our Journey</span> 
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight md:leading-[1.18] font-sans drop-shadow-2xl">
            About <span className="text-gradient-brand-light inline italic">Mishrikotkar Travels Pvt Ltd</span>
          </h1>
          
          <p className="text-lg md:text-2xl leading-relaxed text-[#EEF8F3]/85 max-w-2xl font-light mx-auto">
            Travel, Taken Care Of. Professional travel management with a human touch since 2006.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-xs font-semibold text-white/70">
            <span>Established 2006</span>
            <span className="text-white/30">•</span>
            <span>Nagpur Headquarters</span>
            <span className="text-white/30">•</span>
            <span>Global Network</span>
            <span className="text-white/30">•</span>
            <span>Dedicated Consultation</span>
          </div>

        </div>
      </Container>
    </div>
  )
}
