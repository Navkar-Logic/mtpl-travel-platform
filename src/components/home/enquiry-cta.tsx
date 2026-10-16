"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { ArrowRight, Phone } from "lucide-react"
import { siteConfig } from "@/config/site"

export function EnquiryCta() {
  return (
    <section 
      className="py-20 md:py-28 bg-[#E8F5ED] border-t border-[#D0E7D9] relative overflow-hidden"
      aria-label="Enquiry Call to Action"
    >
      {/* Subtle Travel-Inspired Route & Compass Graphics */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-35" aria-hidden="true">
        {/* Subtle curved flight path */}
        <svg
          className="absolute -top-12 -left-20 w-[600px] h-[300px] text-[#123D2E]/15"
          viewBox="0 0 600 300"
          fill="none"
        >
          <path
            d="M 20 280 C 150 120, 380 40, 580 80"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
          <circle cx="20" cy="280" r="3.5" fill="currentColor" />
          <circle cx="580" cy="80" r="4.5" fill="currentColor" />
        </svg>

        {/* Ambient Compass/Globe circles at bottom-right */}
        <svg
          className="absolute -bottom-24 -right-20 w-[420px] h-[420px] text-[#123D2E]/10"
          viewBox="0 0 420 420"
          fill="none"
        >
          <circle cx="210" cy="210" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" />
          <circle cx="210" cy="210" r="130" stroke="currentColor" strokeWidth="1" />
          <circle cx="210" cy="210" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
          <line x1="210" y1="10" x2="210" y2="410" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="10" y1="210" x2="410" y2="210" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
        </svg>

        {/* Soft radial tint */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/40 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <div className="space-y-4">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#16A765] bg-white/80 border border-[#16A765]/20 px-3.5 py-1.5 rounded-full shadow-xs">
              Personalized Travel Planning
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[#123D2E] font-sans leading-[1.15]">
              Ready to <span className="font-serif italic font-normal text-[#16A765]">Experience</span> the World?
            </h2>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#265344] max-w-2xl mx-auto font-normal">
              Let our travel experts craft the perfect itinerary tailored exclusively to your requirements. 
              Reach out today for personalized assistance.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-2">
            <Link 
              href="/contact#enquiry-form"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full text-base font-semibold transition-all duration-200 bg-[#16A765] hover:bg-[#128a53] text-white h-13 sm:h-14 px-8 shadow-md shadow-[#16A765]/25 hover:shadow-lg hover:shadow-[#16A765]/35 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <a 
              href={`tel:${siteConfig.contact.phones.primary.replace(/\s/g, '')}`}
              className="group inline-flex items-center justify-center gap-2 text-base font-medium text-[#123D2E] hover:text-[#16A765] px-4 py-2.5 rounded-full transition-colors duration-200"
            >
              <Phone className="w-4 h-4 text-[#16A765] transition-transform duration-200 group-hover:scale-110" />
              <span>
                Or call us directly: <strong className="font-semibold">{siteConfig.contact.phones.primary}</strong>
              </span>
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

