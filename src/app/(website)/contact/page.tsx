"use client"

import * as React from "react"
import { Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"

import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { EnquiryForm } from "@/components/enquiries/enquiry-form"
import { siteConfig } from "@/config/site"
import { officeImages } from "@/config/office-images"

import { MapPin, Phone, Mail, Clock, Building, Users, CreditCard, Maximize2, X, Download } from "lucide-react"

export default function ContactPage() {
  const [isPaymentOpen, setIsPaymentOpen] = React.useState(false)

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

  // Handle ESC key and body scroll lock for Payment Fullscreen modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsPaymentOpen(false)
      }
    }
    if (isPaymentOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isPaymentOpen])

  return (
    <div className="flex flex-col w-full bg-[var(--background)] min-h-screen">
      {/* Departure Hero */}
      <div className="bg-[var(--brand-dark)] pt-32 pb-48 min-h-[55vh] md:min-h-[64vh] flex flex-col justify-center relative overflow-hidden text-center">
        {/* Background Image with Opacity & Gradient Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="w-full h-full relative">
            <Image
              src="/assets/headers/header-contact.jpg"
              alt="Departure Point Background"
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-[center_35%] opacity-75"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-[var(--brand-dark)]/90 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-[var(--brand-dark)]/20 pointer-events-none z-10" />
        </div>
        <Container className="relative z-20 flex flex-col items-center">

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

              {/* WhatsApp CTA - Sleek compact height */}
              <a 
                href={`https://wa.me/${siteConfig.contact.phones.customerEnquiry[0].replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-[#0E7443] hover:bg-[#0A5C34] text-white rounded-2xl py-3.5 px-6 shadow-sm border border-[#0E7443]/30 flex items-center justify-center gap-3 transition-all hover:shadow-md hover:-translate-y-0.5 group"
              >
                <svg className="w-5 h-5 fill-current text-white shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span className="font-bold text-base font-sans tracking-tight">WhatsApp Us</span>
                <span className="text-white/80 text-xs hidden sm:inline">&bull; Quick Response</span>
              </a>

              {/* Official Payment Details Card */}
              <div className="bg-white rounded-3xl p-5 border border-border shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#EEF8F3] text-[#0E7443] flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground">Official Payment Details</h4>
                      <p className="text-[11px] text-muted-foreground">UPI QR, NEFT / RTGS &amp; Bank Accounts</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#EEF8F3] text-[#0E7443] border border-[#A7F3C0]/50">
                    Verified Desk
                  </span>
                </div>

                {/* Clickable Image Preview */}
                <button
                  type="button"
                  onClick={() => setIsPaymentOpen(true)}
                  className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border/80 bg-slate-900 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 transition-all hover:shadow-md"
                  aria-label="Click to open Payment Details in full screen"
                >
                  <Image
                    src="/assets/Payment.jpeg"
                    alt="MTPL Payment Details, Bank Accounts and UPI QR Code"
                    fill
                    unoptimized
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent group-hover:from-black/85 transition-colors" />

                  {/* Click to open badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-xs font-semibold drop-shadow-sm flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                      Click to view full screen
                    </span>
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md font-medium border border-white/30 group-hover:bg-[#0E7443] group-hover:border-[#0E7443] transition-colors">
                      Full View &rarr;
                    </span>
                  </div>
                </button>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground px-1">
                  <span>IDFC &bull; ICICI &bull; HDFC &bull; GPay UPI</span>
                  <span className="font-semibold text-[#0E7443]">Mishrikotkar Travels</span>
                </div>
              </div>
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

      {/* Fullscreen Payment Lightbox Modal */}
      <AnimatePresence>
        {isPaymentOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6"
            onClick={() => setIsPaymentOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Full screen Payment Details"
          >
            {/* Top action bar */}
            <div 
              className="w-full max-w-2xl flex items-center justify-between text-white mb-2 sm:mb-3 px-2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base">MTPL Official Payment Details</span>
                <span className="text-xs text-white/60 hidden sm:inline">&bull; UPI QR &amp; Bank Accounts</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/assets/Payment.jpeg"
                  download="MTPL-Payment-Details.jpeg"
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur transition-colors inline-flex items-center gap-1.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Save Image</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsPaymentOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur transition-colors cursor-pointer"
                  aria-label="Close full screen payment view"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Image Container */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative max-w-2xl max-h-[85vh] w-full flex items-center justify-center overflow-auto rounded-2xl bg-white shadow-2xl p-2 sm:p-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-h-[80vh] flex items-center justify-center">
                <Image
                  src="/assets/Payment.jpeg"
                  alt="Official Mishrikotkar Travels Pvt Ltd Payment Details"
                  width={1000}
                  height={1500}
                  unoptimized
                  priority
                  className="w-auto h-auto max-h-[80vh] max-w-full object-contain rounded-xl"
                />
              </div>
            </motion.div>

            <p className="text-white/60 text-xs mt-3 text-center">
              Click anywhere outside or press <kbd className="px-1.5 py-0.5 rounded bg-white/20 text-white font-mono text-[10px]">Esc</kbd> to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
