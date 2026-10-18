import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { siteConfig } from "@/config/site"
import { ArrowRight, MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react"

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

const navigation = {
  main: [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Holiday Packages", href: "/packages" },
    { name: "Client Reviews", href: "/reviews" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "Flight Assistance", href: "/services#flights" },
    { name: "Hotel Bookings", href: "/services#hotels" },
    { name: "Holiday Planning", href: "/services#holidays" },
    { name: "Cruise Vacations", href: "/services#cruises" },
    { name: "Visa & Passport Support", href: "/services#visa" },
    { name: "Foreign Exchange (Forex)", href: "/services#forex" },
    { name: "Travel Insurance", href: "/services#insurance" },
    { name: "Corporate & Group Travel", href: "/services#corporate" },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer 
      className="bg-[#073B2D] text-white mt-auto relative overflow-hidden" 
      aria-labelledby="footer-heading"
    >
      {/* Subtle depth vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/25 pointer-events-none" />
      
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <Container className="pt-16 pb-10 md:pt-20 md:pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Column 1: Brand & Accreditations */}
          <div className="space-y-6 lg:pr-4">
            <div className="inline-flex items-center bg-white px-5 py-3 rounded-2xl shadow-sm border border-white/20 w-fit">
              <Image 
                src="/assets/mtpl-desktop-logo.png" 
                alt="Mishrikotkar Travels Logo" 
                width={150} 
                height={180} 
                className="h-8 md:h-10 w-auto object-contain" 
                unoptimized 
              />
            </div>
            <div className="space-y-2.5">
              <h4 className="text-lg md:text-lg font-semibold tracking-wide text-white">
                MISHRIKOTKAR TRAVELS PVT. LTD.
              </h4>
              <h3 className="text-lg md:text-lg font-semibold tracking-wide text-white">
                Travel, Taken Care Of.
              </h3>
              <p className="text-sm leading-relaxed text-[#D0E2D9]">
                Professional travel assistance, holiday planning and personalized travel support.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#91D7B0] mb-3">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Mishrikotkar Travels on Instagram"
                  className="group flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-white/90 hover:text-white border border-white/15 hover:border-transparent transition-all duration-300 shadow-sm hover:scale-105"
                >
                  <InstagramIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Mishrikotkar Travels on Facebook"
                  className="group flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-[#1877F2] text-white/90 hover:text-white border border-white/15 hover:border-transparent transition-all duration-300 shadow-sm hover:scale-105"
                >
                  <FacebookIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="lg:pl-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#91D7B0] mb-5">
              Company
            </h3>
            <ul role="list" className="space-y-3.5">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="group flex items-center gap-2 text-sm text-[#D0E2D9] hover:text-white transition-colors duration-200"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-[#91D7B0] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#91D7B0] mb-5">
              Services
            </h3>
            <ul role="list" className="space-y-3.5">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="group flex items-center gap-2 text-sm text-[#D0E2D9] hover:text-white transition-colors duration-200"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-[#91D7B0] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#91D7B0] mb-5">
              Contact Us
            </h3>
            <ul role="list" className="space-y-4 text-sm text-[#D0E2D9]">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#91D7B0] mt-1 flex-shrink-0" />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Mishrikotkar Travels Pvt Ltd, 101, Shri Ganesh Apartments, Dharampeth, Nagpur, Maharashtra 440010")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="not-italic leading-relaxed text-[#D0E2D9] hover:text-white transition-colors cursor-pointer"
                >
                  {siteConfig.contact.address}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#91D7B0] mt-1.5 flex-shrink-0" />
                <div>
                  <a 
                    href={`tel:${siteConfig.contact.phones.primary.replace(/\s/g, '')}`} 
                    className="block text-xl font-bold tracking-tight text-white hover:text-[#91D7B0] transition-colors mb-0.5"
                  >
                    {siteConfig.contact.phones.primary}
                  </a>
                  <span className="text-xs text-[#D0E2D9]/75 flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3 h-3 text-[#91D7B0]" />
                    Mon – Sat: {siteConfig.contact.businessHours}
                  </span>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#91D7B0] flex-shrink-0" />
                <a 
                  href={`mailto:${siteConfig.contact.email}`} 
                  className="hover:text-white transition-colors underline-offset-4 hover:underline text-sm"
                >
                  {siteConfig.contact.email}
                </a>
              </li>

              {/* Accreditations: IATA & GST */}
              <li className="pt-3 border-t border-[#175240]/70 space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#D0E2D9]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#91D7B0] flex-shrink-0" />
                  <span>
                    IATA Accredited: <strong className="text-white font-semibold tracking-wide">14344864</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#D0E2D9]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#91D7B0] flex-shrink-0 ml-1" />
                  <span className="ml-0.5">
                    GSTIN: <strong className="text-white font-semibold tracking-wide">27AAJCM1228J1ZE</strong>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom / Copyright / Legal */}
        <div className="mt-14 sm:mt-18 pt-8 border-t border-[#175240] flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-[#D0E2D9]/75">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="font-medium">
              &copy; {currentYear} {siteConfig.companyName}. All rights reserved.
            </p>
            <span className="hidden sm:inline text-[#175240]">&bull;</span>
            <p className="text-[11px] text-[#91D7B0]/80">
              IATA: 14344864 &bull; GSTIN: 27AAJCM1228J1ZE
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-medium">
            <Link 
              href="/privacy-policy" 
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-[#91D7B0]/30 hidden sm:inline">&bull;</span>
            <Link 
              href="/terms-and-conditions" 
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </Link>
            <span className="text-[#91D7B0]/30 hidden sm:inline">&bull;</span>
            <Link 
              href="/disclaimer" 
              className="hover:text-white transition-colors"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

