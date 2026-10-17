"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { officeImages } from "@/config/office-images"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import { Menu, X, ArrowRight } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
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
  }

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
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
              {/* Mobile device logo */}
              <Image 
                src="/assets/mtpl-logo.png" 
                alt="MTPL Logo" 
                width={170} 
                height={46} 
                className="h-8 sm:h-8.5 w-auto object-contain block md:hidden flex-shrink-0" 
                priority
                unoptimized
              />
              {/* Tablet, Laptop and Desktop PC logo */}
              <Image 
                src="/assets/mtpl-desktop-logo.png" 
                alt="MTPL Desktop Logo" 
                width={140} 
                height={150} 
                className="h-10 md:h-11 lg:h-12 w-auto object-contain hidden md:block flex-shrink-0" 
                priority
                unoptimized
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-1 xl:gap-2 px-4" aria-label="Desktop Navigation">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))

              return (
                <div key={item.name} className="relative flex items-center">
                  <Link
                    href={item.href}
                    className={`group flex items-center gap-1 px-3.5 py-2 outline-none rounded-lg text-sm xl:text-[15px] font-semibold whitespace-nowrap transition-colors relative z-10 ${
                      isActive 
                        ? 'text-brand font-bold' 
                        : 'text-slate-800 hover:text-brand hover:bg-slate-50'
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{item.name}</span>
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-2.5 right-2.5 h-[2.5px] bg-gradient-brand rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
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

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3.5 rounded-xl text-lg font-semibold transition-colors outline-none ${
                      isActive ? "bg-brand/10 text-brand" : "text-foreground hover:bg-slate-50"
                    }`}
                  >
                    {item.name}
                  </Link>
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
