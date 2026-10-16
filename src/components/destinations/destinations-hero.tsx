import * as React from "react"
import Image from "next/image"
import { Container } from "@/components/ui/container"

export function DestinationsHero() {
  return (
    <div className="bg-[var(--brand-dark)] pt-32 pb-20 md:pt-40 md:pb-28 min-h-[55vh] md:min-h-[64vh] flex flex-col justify-center relative overflow-hidden text-center">
      {/* Background Image with Opacity & Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/headers/header-destinations.jpg"
          alt="World Destinations Exploration Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[var(--brand-dark)]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[var(--brand-dark)]/25 pointer-events-none" />
      </div>

      <Container className="relative z-10 flex flex-col items-center">

        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 font-display drop-shadow-2xl leading-[1.15]">
          Explore <br />
          <span className="inline-block text-gradient-brand-light pb-2 pt-1">World Destinations</span>
        </h1>

        <p className="text-lg md:text-xl text-[#EEF8F3]/85 font-light leading-relaxed max-w-2xl mx-auto">
          From bustling international metropolises to serene tropical beaches and majestic mountain ranges, explore authentic destinations crafted with dedicated care by MTPL.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-xs font-semibold text-white/70">
          <span>Global Network</span>
          <span className="text-white/30">•</span>
          <span>Verified Accommodations</span>
          <span className="text-white/30">•</span>
          <span>Point-to-Point Transfers</span>
          <span className="text-white/30">•</span>
          <span>24/7 Trip Support</span>
        </div>
      </Container>
    </div>
  )
}
