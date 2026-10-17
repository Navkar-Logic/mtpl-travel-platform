"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Star, MessageSquare, Calendar, User, ExternalLink } from "lucide-react"
import { TestimonialRecord } from "@/types/testimonial"

interface TestimonialLightboxProps {
  testimonials: TestimonialRecord[]
  currentIndex: number | null
  onClose: () => void
  onNavigate: (newIndex: number) => void
}

export function TestimonialLightbox({
  testimonials,
  currentIndex,
  onClose,
  onNavigate
}: TestimonialLightboxProps) {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < testimonials.length
  const current = isOpen ? testimonials[currentIndex] : null

  // Keyboard navigation & lock body scroll
  React.useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        onNavigate((currentIndex - 1 + testimonials.length) % testimonials.length)
      } else if (e.key === "ArrowRight") {
        onNavigate((currentIndex + 1) % testimonials.length)
      }
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, currentIndex, testimonials.length, onClose, onNavigate])

  if (!isOpen || !current) return null

  const hasVerifiedRating = current.ratingStatus === "verified" && typeof current.rating === "number"

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-label="Testimonial details view"
        onClick={onClose}
      >
        {/* Top bar controls */}
        <div 
          className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none"
        >
          <div className="bg-white/10 backdrop-blur-md text-white/90 text-xs sm:text-sm font-medium px-4 py-2 rounded-full border border-white/10 pointer-events-auto">
            Review {currentIndex + 1} of {testimonials.length}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10 focus:outline-none focus:ring-2 focus:ring-white pointer-events-auto"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Previous Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onNavigate((currentIndex - 1 + testimonials.length) % testimonials.length)
          }}
          className="absolute left-2 sm:left-6 z-20 p-2.5 sm:p-3.5 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white transition-all border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm shadow-xl"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onNavigate((currentIndex + 1) % testimonials.length)
          }}
          className="absolute right-2 sm:right-6 z-20 p-2.5 sm:p-3.5 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white transition-all border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm shadow-xl"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Modal Content Container */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-5xl w-full max-h-[90vh] bg-slate-900 border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Screenshot Display Column */}
          <div className="relative flex-1 bg-black/60 flex items-center justify-center p-3 sm:p-6 overflow-hidden min-h-[300px] md:min-h-[520px]">
            <div className="relative w-full h-full flex items-center justify-center max-h-[75vh]">
              <Image
                src={current.image}
                alt={current.customerName ? `Original testimonial screenshot from ${current.customerName}` : "Customer feedback screenshot"}
                width={current.dimensions.width}
                height={current.dimensions.height}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
                priority
                unoptimized
              />
            </div>
            
            {/* View Full Resolution Link */}
            <a
              href={current.image}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 flex items-center gap-1.5 text-xs text-white/70 hover:text-white bg-black/60 hover:bg-black/80 px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors border border-white/10"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Full Image</span>
            </a>
          </div>

          {/* Context & Metadata Column */}
          <div className="w-full md:w-80 lg:w-96 bg-slate-900/95 border-t md:border-t-0 md:border-l border-white/10 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto max-h-[40vh] md:max-h-[75vh]">
            <div className="space-y-5">
              {/* Header: Platform & Rating */}
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {current.platform || "Direct Feedback"}
                </span>

                {hasVerifiedRating ? (
                  <div className="flex items-center gap-1 text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="text-xs font-bold text-amber-300 ml-1">5.0</span>
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
                    Verified Feedback
                  </span>
                )}
              </div>

              {/* Customer Info */}
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-white font-sans flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{current.customerName || "Valued MTPL Traveller"}</span>
                </h3>
                {current.customerEntity && (
                  <p className="text-xs text-emerald-400/90 font-medium pl-6">
                    {current.customerEntity}
                  </p>
                )}
                {current.customerLocation && (
                  <p className="text-xs text-slate-400 pl-6">
                    Location: {current.customerLocation}
                  </p>
                )}
              </div>

              {/* Verbatim Excerpt */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 block">
                  Original Transcript
                </span>
                <blockquote className="text-sm text-slate-200 italic font-sans leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                  &ldquo;{current.text}&rdquo;
                </blockquote>
              </div>

              {/* Date (only if visibly supported) */}
              {current.date && (
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Verified Date: {current.date}</span>
                </div>
              )}
            </div>

            {/* Lightbox Footer Note */}
            <div className="pt-6 mt-6 border-t border-white/10 text-center">
              <p className="text-[11px] text-slate-500 leading-normal">
                Authentic, unedited feedback screenshot as originally received by Mishrikotkar Travels Pvt. Ltd.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
