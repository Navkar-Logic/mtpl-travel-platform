"use client"

import * as React from "react"
import { Suspense } from "react"
import { motion } from "framer-motion"

import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { EnquiryForm } from "@/components/enquiries/enquiry-form"
import { siteConfig } from "@/config/site"
import { officeImages } from "@/config/office-images"

import { MapPin, Phone, Mail, Clock, Building, Users } from "lucide-react"

export default function ContactPage() {
  React.useEffect(() => {
    const handleScrollToForm = () => {
      if (window.location.hash === "#enquiry-form" || window.location.hash === "#enquiry") {
        const el = document.getElementById("enquiry-form")
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }
    }
    const timer = setTimeout(handleScrollToForm, 150)
    window.addEventListener("hashchange", handleScrollToForm)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("hashchange", handleScrollToForm)
    }
  }, [])

  return (
    <div className="flex flex-col w-full bg-[var(--background)] min-h-screen">
      {/* Departure Hero */}
      <div className="bg-[var(--brand-dark)] pt-32 pb-48 min-h-[55vh] md:min-h-[64vh] flex flex-col justify-center relative overflow-hidden text-center">
        {/* Background Image with Opacity & Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/headers/header-contact.jpg"
            alt="Departure Point Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_20%] md:object-[62%_25%] opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[var(--brand-dark)]/90 pointer-events-none" />
          <div className="absolute inset-0 bg-[var(--brand-dark)]/25 pointer-events-none" />
        </div>
        <Container className="relative z-10 flex flex-col items-center">

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 font-sans drop-shadow-2xl leading-tight md:leading-[1.18]">
            Ready For Your <br/>
            <span className="italic text-gradient-brand-light">Next Journey?</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#EEF8F3]/85 font-light leading-relaxed max-w-2xl mx-auto">
            Tell us where you want to go. Our travel consultants are ready to assist you.
          </p>
        </Container>
      </div>


      <Section spacing="large" className="relative -mt-8 z-20">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* Form */}
            <Suspense fallback={<div className="lg:w-2/3 h-[600px] w-full bg-white rounded-3xl animate-pulse shadow-xl border border-border flex items-center justify-center text-muted-foreground font-bold">Loading enquiry form...</div>}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:w-2/3"
              >
                <div id="enquiry-form" className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-2xl border border-border/50 relative overflow-hidden scroll-mt-28">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-bl-full pointer-events-none -z-0" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-foreground font-sans mb-8">Start Planning</h3>
                    <EnquiryForm />
                  </div>
                </div>
              </motion.div>
            </Suspense>

            {/* Contact Info Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/3 flex flex-col gap-6"
            >
              
              <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-lg border border-border/50 flex flex-col gap-6">
                <h3 className="text-xl font-bold text-foreground font-sans">Connect With Us</h3>
                
                {/* Phone */}
                <div className="flex items-start gap-4 group -mx-2 px-2 py-2 rounded-2xl hover:bg-[#EEF8F3]/60 transition-colors">
                  <a
                    href={`tel:${siteConfig.contact.phones.primary.replace(/\s+/g, '')}`}
                    aria-label="Call MTPL Primary Line"
                    className="w-12 h-12 rounded-2xl bg-[#EEF8F3] text-[#0E7443] border border-[#A7F3C0]/50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0E7443] group-hover:text-white group-hover:scale-105 group-hover:shadow-md transition-all duration-300"
                  >
                    <Phone className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  </a>
                  <div className="flex-1 min-w-0">
                    <span className="block text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Call Us</span>
                    <a 
                      href={`tel:${siteConfig.contact.phones.alternate.replace(/\s+/g, '')}`} 
                      className="block text-foreground hover:text-[#0E7443] transition-colors font-medium text-sm hover:underline underline-offset-2 cursor-pointer"
                    >
                      {siteConfig.contact.phones.alternate}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 group -mx-2 px-2 py-2 rounded-2xl hover:bg-[#EEF8F3]/60 transition-colors">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    aria-label="Email Mishrikotkar Travels"
                    className="w-12 h-12 rounded-2xl bg-[#EEF8F3] text-[#0E7443] border border-[#A7F3C0]/50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0E7443] group-hover:text-white group-hover:scale-105 group-hover:shadow-md transition-all duration-300"
                  >
                    <Mail className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </a>
                  <div className="flex-1 min-w-0">
                    <span className="block text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Email</span>
                    <a 
                      href={`mailto:${siteConfig.contact.email}`} 
                      className="block text-foreground hover:text-[#0E7443] transition-colors font-medium text-sm break-all hover:underline underline-offset-2 cursor-pointer"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 group -mx-2 px-2 py-2 rounded-2xl hover:bg-[#EEF8F3]/60 transition-colors">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Mishrikotkar Travels Pvt Ltd, 101, Shri Ganesh Apartments, Dharampeth, Nagpur, Maharashtra 440010")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open MTPL Office Location on Google Maps"
                    className="w-12 h-12 rounded-2xl bg-[#EEF8F3] text-[#0E7443] border border-[#A7F3C0]/50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0E7443] group-hover:text-white group-hover:scale-105 group-hover:shadow-md transition-all duration-300"
                  >
                    <MapPin className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
                  </a>
                  <div className="flex-1 min-w-0">
                    <span className="block text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Office</span>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Mishrikotkar Travels Pvt Ltd, 101, Shri Ganesh Apartments, Dharampeth, Nagpur, Maharashtra 440010")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/addr block text-foreground hover:text-[#0E7443] transition-colors font-medium text-sm leading-relaxed cursor-pointer"
                    >
                      <span>{siteConfig.contact.address}</span>
                      <span className="flex items-center gap-1 text-xs text-[#0E7443] font-semibold mt-1.5 group-hover/addr:underline">
                        Open in Google Maps &rarr;
                      </span>
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 pt-4 border-t border-border -mx-2 px-2">
                  <div className="w-12 h-12 rounded-2xl bg-muted text-muted-foreground flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Business Hours</span>
                    <p className="text-foreground font-medium text-sm">Mon - Sat: {siteConfig.contact.businessHours}</p>
                    <p className="text-muted-foreground/60 text-xs mt-1">Sunday Closed</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a 
                href={`https://wa.me/${siteConfig.contact.phones.customerEnquiry[0].replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#0E7443] hover:bg-[#0A5C34] text-white rounded-[2.5rem] p-8 shadow-sm border border-[#0E7443]/30 flex flex-col items-center text-center gap-3 hover:-translate-y-1 transition-all"
              >
                <h4 className="font-bold text-xl font-sans">WhatsApp Us</h4>
                <p className="text-white/80 text-sm font-light">Quick responses for urgent travel queries.</p>
              </a>
            </motion.div>

          </div>
        </Container>
      </Section>

      {/* Head Office Visual Showcase */}
      <Section spacing="large" className="bg-slate-50/70 border-t border-border overflow-hidden">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
            <span className="text-brand font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
              Physical Location
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 font-sans">
              Visit Our Head Office
            </h2>
            <p className="mt-3 text-base text-slate-600 font-light leading-relaxed">
              We welcome walk-in travelers for face-to-face holiday planning, visa submissions, and flight ticketing at our Dharampeth, Nagpur center.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Building Exterior Card */}
            <div className="group rounded-3xl overflow-hidden border border-border/80 bg-white shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[16/10] w-full bg-slate-900">
                <Image
                  src={officeImages.buildingSignboard.src}
                  alt={officeImages.buildingSignboard.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-brand shadow-sm backdrop-blur-sm border border-brand/20">
                    <Building className="w-3.5 h-3.5" />
                    Office Facade
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-base sm:text-lg font-bold leading-snug drop-shadow-sm">
                    {officeImages.buildingSignboard.title}
                  </h4>
                  <p className="text-xs text-white/80 font-light mt-1">
                    {officeImages.buildingSignboard.caption}
                  </p>
                </div>
              </div>
            </div>

            {/* Front Desk Reception Card */}
            <div className="group rounded-3xl overflow-hidden border border-border/80 bg-white shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[16/10] w-full bg-slate-900">
                <Image
                  src={officeImages.consultantsFloor.src}
                  alt={officeImages.consultantsFloor.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-brand shadow-sm backdrop-blur-sm border border-brand/20">
                    <Users className="w-3.5 h-3.5" />
                    Front Desk Care
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-base sm:text-lg font-bold leading-snug drop-shadow-sm">
                    {officeImages.teamReceptionDesk.title}
                  </h4>
                  <p className="text-xs text-white/80 font-light mt-1">
                    {officeImages.teamReceptionDesk.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

    </div>
  )
}
