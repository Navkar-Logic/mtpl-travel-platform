"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { officeImages } from "@/config/office-images"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { 
    name: "Services", 
    href: "/services",
    dropdown: [
      {
        title: "Travel Services",
        items: [
          { name: "Flight Assistance", href: "/services#flight-assistance" },
          { name: "Hotel Bookings", href: "/services#hotel-bookings" },
          { name: "Holiday Planning", href: "/services#holiday-planning" },
        ]
      },
      {
        title: "Travel Assistance",
        items: [
          { name: "Visa Assistance", href: "/services#visa-assistance" },
          { name: "Passport Assistance", href: "/services#passport-assistance" },
          { name: "Forex Assistance", href: "/services#forex-assistance" },
          { name: "Travel Insurance", href: "/services#travel-insurance" },
        ]
      },
      {
        title: "Ground & Business",
        items: [
          { name: "Transfers & Car Rental", href: "/services#transfers" },
          { name: "Corporate Travel", href: "/services#corporate-travel" },
          { name: "FIT / GIT", href: "/services#group-travel" },
        ]
      }
    ]
  },
  { 
    name: "Holidays", 
    href: "/packages",
  },
  { 
    name: "Reviews", 
    href: "/reviews",
  },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
  const [mobileAccordion, setMobileAccordion] = React.useState<string | null>(null)
  const [isScrolled, setIsScrolled] = React.useState(false)
  
  const pathname = usePathname()
  const { scrollY } = useScroll()

  React.useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 20)
    })
  }, [scrollY])



  const [prevPathname, setPrevPathname] = React.useState(pathname)
  
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setMobileMenuOpen(false)
    setActiveDropdown(null)
  }

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null)
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  return (
    <>
      <header 
        className="fixed top-2.5 sm:top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none transition-all duration-300"
      >
        <div 
          className={`pointer-events-auto w-full max-w-7xl mx-auto rounded-2xl lg:rounded-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between transition-all duration-300 ${
            isScrolled 
              ? 'bg-white/85 backdrop-blur-xl border border-white/60 shadow-[0_12px_36px_rgba(0,0,0,0.12)] ring-1 ring-black/5' 
              : 'bg-white/70 backdrop-blur-lg border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.07)] hover:bg-white/80 ring-1 ring-black/5'
          }`}
        >
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center outline-none" aria-label="MTPL Home">
              <Image 
                src="/assets/mtpl-logo.png" 
                alt="MTPL Logo" 
                width={220} 
                height={60} 
                className="h-8 md:h-9.5 lg:h-10 w-auto object-contain flex-shrink-0" 
                priority
                unoptimized
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered and full width balance */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-1 xl:gap-2 2xl:gap-3 px-4" aria-label="Desktop Navigation">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
              const hasDropdown = !!item.dropdown

              return (
                <div 
                  key={item.name} 
                  className="relative flex items-center"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`group flex items-center gap-1 px-3 py-2 outline-none rounded-lg text-sm xl:text-[15px] font-semibold whitespace-nowrap transition-colors relative z-10 ${
                      isActive 
                        ? 'text-brand font-bold' 
                        : 'text-slate-800 hover:text-brand hover:bg-slate-50'
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{item.name}</span>
                    {hasDropdown && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        activeDropdown === item.name 
                          ? 'rotate-180 text-brand' 
                          : isActive 
                            ? 'text-brand' 
                            : 'text-slate-400 group-hover:text-brand'
                      }`} />
                    )}
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-2.5 right-2.5 h-[2.5px] bg-gradient-brand rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>

                  {/* Desktop Dropdown */}
                  {hasDropdown && (
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2 pointer-events-auto z-50 min-w-max"
                        >
                          <div className="bg-white/98 backdrop-blur-2xl border border-slate-200/90 shadow-2xl rounded-2xl p-2.5 flex gap-4 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-brand/5 pointer-events-none" />
                            
                            {item.dropdown?.map((col) => (
                              <div key={col.title} className="p-3 min-w-[200px] relative z-10">
                                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 px-3">{col.title}</h4>
                                <ul className="space-y-1">
                                  {col.items.map((subItem) => (
                                    <li key={subItem.name}>
                                      <Link 
                                        href={subItem.href}
                                        className="block px-3 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-brand/10 hover:text-brand transition-all"
                                        onClick={() => setActiveDropdown(null)}
                                      >
                                        {subItem.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}

                            {/* Contextual Operations Card in Services Dropdown */}
                            {item.name === "Services" && (
                              <div className="p-3 w-56 relative z-10 border-l border-slate-100 flex flex-col justify-between bg-slate-50/50 rounded-r-xl">
                                <div>
                                  <div className="relative w-full h-28 rounded-xl overflow-hidden mb-2.5 shadow-xs border border-slate-200/60">
                                    <Image
                                      src={officeImages.consultantsFloor.src}
                                      alt={officeImages.consultantsFloor.alt}
                                      fill
                                      sizes="224px"
                                      className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <span className="absolute bottom-2 left-2 text-[10px] font-bold uppercase tracking-wider text-white bg-brand/85 px-2 py-0.5 rounded-full backdrop-blur-xs">
                                      Operations HQ
                                    </span>
                                  </div>
                                  <h5 className="text-xs font-bold text-slate-800">Nagpur Travel Desk</h5>
                                  <p className="text-[11px] text-slate-500 font-light mt-0.5 line-clamp-2">
                                    IATA-certified specialists managing flights, visas & tours.
                                  </p>
                                </div>
                                <Link
                                  href="/about"
                                  onClick={() => setActiveDropdown(null)}
                                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-brand hover:underline"
                                >
                                  About Our Team &rarr;
                                </Link>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Right Action */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <Link 
              href="/contact#enquiry-form" 
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-5.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md hover:scale-[1.02] active:scale-100 whitespace-nowrap overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Enquire Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <Link 
              href="/contact#enquiry-form"
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-brand text-white shadow-xs sm:hidden"
            >
              Enquire
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-800 hover:text-brand hover:bg-slate-100 transition-colors outline-none"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl pt-28 px-4 pb-24 overflow-y-auto lg:hidden"
            id="mobile-menu"
          >
            <nav className="flex flex-col gap-2 max-w-md mx-auto">
              {navigation.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
                const hasDropdown = !!item.dropdown
                const isAccordionOpen = mobileAccordion === item.name

                return (
                  <div key={item.name} className="flex flex-col">
                    {hasDropdown ? (
                      <button
                        onClick={() => setMobileAccordion(isAccordionOpen ? null : item.name)}
                        className={`flex items-center justify-between px-4 py-4 rounded-xl text-lg font-semibold transition-colors outline-none ${isActive ? "text-brand" : "text-foreground"}`}
                      >
                        {item.name}
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isAccordionOpen ? "rotate-180 text-brand" : "text-muted-foreground"}`} />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center px-4 py-4 rounded-xl text-lg font-semibold transition-colors outline-none ${isActive ? "bg-brand/10 text-brand" : "text-foreground"}`}
                      >
                        {item.name}
                      </Link>
                    )}

                    {/* Mobile Accordion */}
                    {hasDropdown && (
                      <AnimatePresence>
                        {isAccordionOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-6 pr-4 pb-4 space-y-6">
                              {item.dropdown?.map((col) => (
                                <div key={col.title}>
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">{col.title}</h4>
                                  <ul className="space-y-1 border-l-2 border-border pl-4">
                                    {col.items.map((subItem) => (
                                      <li key={subItem.name}>
                                        <Link 
                                          href={subItem.href}
                                          className="block py-2 text-base font-medium text-foreground hover:text-brand transition-colors"
                                        >
                                          {subItem.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                )
              })}

              <div className="mt-8 pt-8 border-t border-border flex flex-col gap-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/60">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={officeImages.buildingSignboard.src}
                      alt="MTPL Nagpur Head Office"
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-xs font-bold text-slate-900 truncate">Dharampeth Head Office</span>
                    <span className="block text-[11px] text-slate-500 font-light truncate">Shri Ganesh Apts, Nagpur</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <a href={`tel:${siteConfig.contact.phones.primary.replace(/\s/g, '')}`} className="text-lg font-bold text-foreground">{siteConfig.contact.phones.primary}</a>
                  <span className="text-sm text-muted-foreground font-medium">Mon - Sat: {siteConfig.contact.businessHours}</span>
                </div>
                <Link 
                  href="/contact#enquiry-form" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl text-lg font-semibold transition-all bg-gradient-brand text-white hover:opacity-95 h-14 shadow-md"
                >
                  Enquire Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
