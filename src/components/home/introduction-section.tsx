"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { officeImages } from "@/config/office-images"
import { Award, Users, CheckCircle2 } from "lucide-react"

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
              <span className="text-brand font-bold tracking-[0.2em] text-xs uppercase">Welcome to MTPL</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-foreground leading-[1.2] tracking-tight"
            >
              A long-standing tradition of trust, service, and business integrity.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed"
            >
              Mishrikotkar Travels Pvt. Ltd. (MTPL) assists business travellers, families, honeymooners, and corporate clients with well-planned, dependable travel arrangements. From planning to documentation and on-trip support, our experienced team ensures you travel with greater ease and confidence.
            </motion.p>

            {/* Credibility Key Points */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2"
            >
              <div className="flex items-center gap-2.5 text-sm text-foreground font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0" />
                <span>Established 2006 in Nagpur</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-foreground font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0" />
                <span>IATA & TAAI Certified Agency</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-foreground font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0" />
                <span>IndiGo Top 10 Seller Partner</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-foreground font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0" />
                <span>In-Person & Virtual Planning</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Editorial Photo Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
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
                  src={officeImages.clientConsultation.src}
                  alt={officeImages.clientConsultation.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Photo Tag */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-brand shadow-sm backdrop-blur-sm border border-brand/20">
                    <Users className="w-3.5 h-3.5 text-brand" />
                    In-Person Consultation
                  </span>
                </div>

                {/* Photo Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm font-semibold leading-snug drop-shadow-sm">
                    Personalized Holiday & Corporate Travel Planning
                  </p>
                  <p className="text-xs text-white/80 font-light mt-0.5">
                    Dharampeth Head Office, Nagpur
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Credibility Badge */}
            <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-border/80 flex items-center gap-3.5 max-w-xs">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#A7F3C0]/35 to-[#4ADE80]/15 text-brand flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-foreground">Airline Partner Excellence</span>
                <span className="block text-[11px] text-muted-foreground font-light leading-tight">
                  IndiGo Top 10 Seller in Nagpur for 8+ years
                </span>
              </div>
            </div>

          </motion.div>

        </div>
      </Container>
    </Section>
  )
}
