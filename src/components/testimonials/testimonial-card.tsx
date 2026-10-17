"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, MessageSquare, ZoomIn, Calendar, User} from "lucide-react"
import { TestimonialRecord } from "@/types/testimonial"

interface TestimonialCardProps {
  testimonial: TestimonialRecord
  index: number
  onOpenLightbox: (index: number) => void
}

export function TestimonialCard({ testimonial, index, onOpenLightbox }: TestimonialCardProps) {
  const hasVerifiedRating = testimonial.ratingStatus === "verified" && typeof testimonial.rating === "number"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
      className="group relative flex flex-col bg-white rounded-3xl border border-[var(--border)] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(6,61,42,0.08)] hover:border-brand/40 transition-all duration-300"
    >
      {/* Top Media Preview Section (Preserves natural aspect ratio & text readability) */}
      <div 
        className="relative bg-slate-900 overflow-hidden cursor-pointer flex items-center justify-center border-b border-slate-100 group/image"
        onClick={() => onOpenLightbox(index)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onOpenLightbox(index)
          }
        }}
        aria-label={`Open testimonial screenshot from ${testimonial.customerName || "Customer"}`}
      >
        <div className="relative w-full overflow-hidden bg-slate-950 flex items-center justify-center p-2 min-h-[220px] max-h-[360px]">
          <Image
            src={testimonial.image}
            alt={testimonial.customerName ? `Feedback screenshot from ${testimonial.customerName}` : "Feedback screenshot"}
            width={testimonial.dimensions.width}
            height={testimonial.dimensions.height}
            className="w-auto h-auto max-h-[340px] max-w-full object-contain transition-transform duration-500 group-hover/image:scale-[1.02]"
            unoptimized
            loading={index < 12 ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Hover zoom overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-[var(--foreground)] font-semibold text-xs shadow-lg transform -translate-y-2 group-hover/image:translate-y-0 transition-transform">
              <ZoomIn className="w-3.5 h-3.5 text-brand" />
              <span>View</span>
            </span>
          </div>
        </div>

        {/* Source badge on top-left of image */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-[var(--brand-dark)] shadow-sm backdrop-blur-sm border border-slate-200">
            <MessageSquare className="w-3 h-3 text-brand" />
            <span>{testimonial.platform || "Direct Feedback"}</span>
          </span>
        </div>

        {/* Verified star rating badge (rendered ONLY if verified in source) */}
        {hasVerifiedRating && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-amber-500 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-md">
            <Star className="w-3 h-3 fill-current" />
            <span>5.0</span>
          </div>
        )}
      </div>

      {/* Editorial Content Bottom Section */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Customer Headline */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-bold text-base sm:text-lg text-[var(--foreground)] font-sans flex items-center gap-2">
                <User className="w-4 h-4 text-brand flex-shrink-0" />
                <span>{testimonial.customerName || "Valued MTPL Traveller"}</span>
              </h3>
              {testimonial.customerEntity && (
                <p className="text-xs text-brand font-medium mt-0.5">
                  {testimonial.customerEntity}
                </p>
              )}
              {testimonial.customerLocation && (
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                  {testimonial.customerLocation}
                </p>
              )}
            </div>

            {/* Date if supported */}
            {testimonial.date && (
              <span className="text-[11px] text-[var(--muted-foreground)] flex items-center gap-1 bg-[var(--muted)] px-2.5 py-1 rounded-md border border-[var(--border)] flex-shrink-0">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>{testimonial.date}</span>
              </span>
            )}
          </div>

          {/* Testimonial Excerpt */}
          <div className="relative pl-3 border-l-2 border-brand/30 my-3">
            <p className="text-sm text-[var(--foreground)] font-sans italic leading-relaxed line-clamp-4">
              &ldquo;{testimonial.text}&rdquo;
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-5 pt-4 border-t border-[var(--border)]/60 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--muted-foreground)]">
            Original Record #{testimonial.id.replace('testimonial-', '')}
          </span>

          <button
            type="button"
            onClick={() => onOpenLightbox(index)}
            className="text-xs font-bold text-brand hover:text-brand/80 transition-colors inline-flex items-center gap-1 group/btn"
          >
            <span>View</span>
            <span className="group-hover/btn:translate-x-0.5 transition-transform">&rarr;</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
