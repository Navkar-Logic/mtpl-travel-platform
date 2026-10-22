"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export function IntroductionSection() {
  return (
    <Section spacing="large" className="bg-[var(--background)] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3"
            >
              <div className="h-[2px] w-8 bg-brand"></div>
              <span className="text-brand font-bold tracking-[0.2em] text-xs uppercase">
                YOUR JOURNEY, THOUGHTFULLY PLANNED
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-foreground leading-[1.2] tracking-tight"
            >
              Travel planning built on experience and trust.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed"
            >
              From flights and hotel reservations to holiday packages, visas and travel documentation, MTPL helps individuals, families and businesses plan their journeys with confidence.
            </motion.p>

            {/* Credibility Key Points */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2"
            >
              <div className="flex items-center gap-2.5 text-sm text-foreground font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0" />
                <span>Established in Nagpur in 2006</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-foreground font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0" />
                <span>Flight and hotel assistance</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-foreground font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0" />
                <span>Domestic and international holidays</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-foreground font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0" />
                <span>Visa and travel documentation assistance</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="pt-4 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/contact#enquiry-form"
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-full text-sm font-semibold transition-all bg-gradient-brand text-white overflow-hidden h-12 px-7 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-100"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10">Plan Your Trip</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/services"
                className="group inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-700 hover:text-brand transition-colors px-6 py-3 rounded-full border border-slate-200 hover:bg-slate-50"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Visual Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient blur glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand/15 via-emerald-100/30 to-transparent rounded-[2.5rem] blur-2xl pointer-events-none" />

            {/* Main Visual Card */}
            <div className="relative rounded-[2rem] overflow-hidden border border-border/80 bg-white shadow-xl">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/assets/headers/header-packages.jpg"
                  alt="Scenic mountain highway journey representing thoughtfully planned travel by MTPL"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </Section>
  )
}
