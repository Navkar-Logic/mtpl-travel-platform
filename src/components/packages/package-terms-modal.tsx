"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Scale, FileText, X, ExternalLink, ShieldCheck, ChevronRight } from "lucide-react"
import { HolidayPackageTermsSection } from "./holiday-package-terms-section"

interface PackageTermsModalProps {
  packageName: string
  destination: string
}

export function PackageTermsModal({ packageName, destination }: PackageTermsModalProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  // Listen to hash change for #package-terms or custom event
  React.useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#package-terms" || window.location.hash === "#terms") {
        setIsOpen(true)
      }
    }
    checkHash()
    window.addEventListener("hashchange", checkHash)
    return () => window.removeEventListener("hashchange", checkHash)
  }, [])

  // Lock body scroll and handle Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  return (
    <>
      {/* Interactive Trigger Banner on Package Page */}
      <div 
        id="package-terms-trigger"
        className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-sm hover:border-brand/40 transition-colors"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-brand border border-emerald-200/70 flex items-center justify-center shrink-0">
            <Scale className="w-6 h-6 text-[#0E7443]" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100/70 text-emerald-800 border border-emerald-200">
                Official MTPL Policy
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-base md:text-lg font-sans">
              Tour Booking Terms &amp; Policies
            </h3>
            <p className="text-slate-600 text-xs md:text-sm font-light mt-0.5 leading-relaxed">
              Review authoritative payment terms, cancellation slabs, and liability guidelines for this tour.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 font-bold text-sm hover:bg-[#0E7443] hover:text-white hover:border-[#0E7443] shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto group"
        >
          <FileText className="w-4 h-4 text-brand group-hover:text-white transition-colors" />
          <span>View Terms &amp; Conditions</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Fullscreen Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="terms-modal-title"
          >
            {/* Dark Blurred Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-brand flex items-center justify-center shrink-0 border border-emerald-200/60">
                    <Scale className="w-5 h-5 text-[#0E7443]" />
                  </div>
                  <div>
                    <h3 id="terms-modal-title" className="text-base sm:text-lg font-bold text-slate-900 font-sans">
                      Tour Booking Terms &amp; Conditions
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Applicable to: <span className="text-slate-800 font-semibold">{packageName}</span> ({destination})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="/holiday-package-terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    <span>Full Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-9 h-9 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Close terms popup"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body - Scrollable Terms Content */}
              <div className="overflow-y-auto p-6 md:p-8 space-y-6">
                <HolidayPackageTermsSection
                  packageName={packageName}
                  destination={destination}
                />
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand shrink-0" />
                  <span>Governed by MTPL Client Agreement &amp; Supplier Policies</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Close Terms
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
