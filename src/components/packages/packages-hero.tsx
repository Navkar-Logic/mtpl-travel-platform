import * as React from "react"
import Image from "next/image"
import { Container } from "@/components/ui/container"

export function PackagesHero() {
  return (
    <div className="bg-[var(--brand-dark)] pt-28 pb-10 md:pt-36 md:pb-12 flex flex-col justify-center relative overflow-hidden text-center">
      {/* Background Image with Opacity & Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/headers/header-packages.jpg"
          alt="Curated Holiday Packages Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%] opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[var(--brand-dark)]/95 pointer-events-none" />
        <div className="absolute inset-0 bg-[var(--brand-dark)]/30 pointer-events-none" />
      </div>

      <Container className="relative z-10 flex flex-col items-center max-w-4xl">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#EEF8F3] border border-white/15 text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-xs">
          <span>MTPL HOLIDAYS</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 font-display drop-shadow-md leading-[1.18]">
          Find your next escape.
        </h1>

        {/* Supporting text */}
        <p className="text-base sm:text-lg text-[#EEF8F3]/90 font-light leading-relaxed max-w-2xl mx-auto">
          Explore curated holidays across India and around the world.
        </p>
      </Container>
    </div>
  )
}

