"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin } from "lucide-react"

export function Hero() {
  return (
    <div className="relative w-full overflow-hidden bg-[var(--brand-dark)] min-h-[90vh] flex flex-col justify-center">
      {/* Background Image with Opacity & Optimal Framing */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="w-full h-full relative">
          <Image
            src="/assets/headers/header-home.jpg"
            alt="Majestic Mountain & Glacial Lake Travel Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%] opacity-75"
          />
        </div>
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-dark)]/90 via-black/35 to-black/50 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[var(--brand-dark)]/20 pointer-events-none z-10" />
      </div>
      
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 pb-20 md:pb-24 flex flex-col items-center text-center">
        <div className="space-y-8 flex flex-col items-center w-full">
          
          {/* Eyebrow */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs md:text-sm font-bold tracking-[0.2em] text-[#EEF8F3] uppercase">
            <span className="bg-white/10 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">Explore</span> 
            <span className="bg-white/10 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">Experience</span> 
            <span className="bg-white/10 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">Belong</span>
          </div>
          
          {/* Headline */}
          <div className="relative">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl leading-[1.08] drop-shadow-2xl font-sans">
              TRAVEL,<br className="hidden sm:inline" /> TAKEN CARE{" "}
              <span className="text-gradient-brand-light">OF.</span>
            </h1>
          </div>
          
          {/* Subheading */}
          <p className="text-lg md:text-2xl leading-relaxed text-[#EEF8F3]/85 max-w-3xl font-light mx-auto">
            Professional travel assistance, curated holiday planning, and personalized end-to-end travel support.
          </p>
          
          {/* Badges / Trust Markers */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 pb-2">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium text-white tracking-wide">Premium Quality</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium text-white tracking-wide">Expert Assistance</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium text-white tracking-wide">Global Reach</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium text-white tracking-wide">Since 2006 Trust</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-5">
            <Link 
              href="/contact#enquiry-form"
              className="group relative inline-flex items-center justify-center gap-3 rounded-full text-base font-bold transition-all bg-gradient-brand text-white overflow-hidden h-14 px-8 shadow-[0_10px_35px_rgba(14,116,67,0.3)] hover:shadow-[0_15px_45px_rgba(14,116,67,0.4)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10">Plan Your Trip</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/services"
              className="group inline-flex items-center justify-center gap-2 text-base font-medium text-white hover:text-brand-light transition-colors px-6 py-3 rounded-full border border-white/20 hover:bg-white/10"
            >
              Explore Services
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  )
}
