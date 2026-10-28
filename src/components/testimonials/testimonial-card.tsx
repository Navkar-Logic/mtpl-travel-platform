"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, MessageSquare, ZoomIn, Calendar, User} from "lucide-react"
import { TestimonialRecord } from "@/types/testimonial"
import { getPlatformDisplayName } from "@/features/testimonials/data/testimonials"

interface TestimonialCardProps {
  testimonial: TestimonialRecord
  index: number
  onOpenLightbox: (index: number) => void
}

export function TestimonialCard({ testimonial, index, onOpenLightbox }: TestimonialCardProps) {
  const hasVerifiedRating = testimonial.ratingStatus === "verified" && typeof testimonial.rating === "number"
  const platformLabel = getPlatformDisplayName(testimonial.type, testimonial.platform)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
      className="group relative flex flex-col h-full bg-[#0A1626] rounded-3xl border border-white/15 overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.4)] hover:border-white/30 transition-all duration-300"
    >
      {/* Top Media Preview Section (Fixed Aspect Ratio 4:3 for 100% uniform thumbnail framing) */}
      <div 
        className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden cursor-pointer flex items-center justify-center border-b border-slate-100 group/image"
        onClick={() => onOpenLightbox(index)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
          }
        }}
        aria-label={`Open testimonial screenshot from ${testimonial.customerName || "Customer"}`}
      >
        <div className="relative w-full h-full p-2.5 flex items-center justify-center">
          <Image
            src={testimonial.image}
            alt={testimonial.customerName ? `Original customer feedback screenshot from ${testimonial.customerName} via ${platformLabel}` : `Original customer feedback screenshot via ${platformLabel}`}
            fill
            className="object-contain p-2 transition-transform duration-500 group-hover/image:scale-[1.03]"
            unoptimized
            loading={index < 12 ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Hover zoom overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-[var(--foreground)] font-semibold text-xs shadow-lg transform -translate-y-2 group-hover/image:translate-y-0 transition-transform">
              <ZoomIn className="w-3.5 h-3.5 text-brand" />
              <span>View Screenshot</span>
            </span>
          </div>
        </div>

        {/* Source badge on top-left of image */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-[var(--brand-dark)] shadow-sm backdrop-blur-sm border border-slate-200">
            <MessageSquare className="w-3 h-3 text-brand" />
            <span>{platformLabel}</span>
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

      {/* Full-card background image (100% Clear, Original colors) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <Image
          src="/assets/testimonial-bg.png"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center opacity-100 scale-105 transition-transform duration-500 group-hover:scale-110"
          aria-hidden="true"
        />
      </div>

      {/* Editorial Content Bottom Section (Standardized heights for equal-size cards) */}
      <div className="relative z-10 p-6 flex flex-col flex-1 justify-between">
        <div className="flex flex-col flex-1">
          {/* Customer Headline with consistent min-height */}
          <div className="flex items-start justify-between gap-3 min-h-[46px]">
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-base sm:text-lg text-white font-sans flex items-center gap-2 truncate">
                <User className="w-4 h-4 text-[#34D399] flex-shrink-0" />
                <span className="truncate">{testimonial.customerName || "Valued MTPL Traveller"}</span>
              </h3>
              <p className="text-xs text-[#A7F3C0] font-medium mt-0.5 truncate">
                {testimonial.customerEntity || (testimonial.customerLocation ? testimonial.customerLocation : "Verified Traveller")}
              </p>
            </div>

            {/* Date if supported, or Verified indicator */}
            {testimonial.date ? (
              <span className="text-[11px] text-white/70 flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md border border-white/20 flex-shrink-0">
                <Calendar className="w-3 h-3 text-[#34D399]" />
                <span>{testimonial.date}</span>
              </span>
            ) : (
              <span className="text-[10px] text-[#6EE7B7] bg-[#16A765]/20 px-2 py-0.5 rounded border border-[#16A765]/40 font-medium flex-shrink-0">
                Verified
              </span>
            )}
          </div>

          {/* Testimonial Excerpt (Standardized height with line-clamp-3) */}
          <div className="relative pl-3 border-l-2 border-[#16A765]/50 my-3.5 h-[76px] flex items-center overflow-hidden">
            <p className="text-sm text-white font-sans italic leading-relaxed line-clamp-3">
              &ldquo;{testimonial.text}&rdquo;
            </p>
          </div>

          {/* Action button */}
          <div className="mt-auto pt-3.5 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-white/60">
              Original Record #{testimonial.id.replace('testimonial-', '')}
            </span>

            <button
              type="button"
              onClick={() => onOpenLightbox(index)}
              className="text-xs font-bold text-[#34D399] hover:text-[#6EE7B7] transition-colors inline-flex items-center gap-1 group/btn"
            >
              <span>View Screenshot</span>
              <span className="group-hover/btn:translate-x-0.5 transition-transform">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
