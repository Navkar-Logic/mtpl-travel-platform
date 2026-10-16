"use client"

import * as React from "react"
import { TestimonialCard } from "./testimonial-card"
import { TestimonialLightbox } from "./testimonial-lightbox"
import { TestimonialRecord } from "@/types/testimonial"
import { MessageSquare, ShieldCheck, Star } from "lucide-react"

interface TestimonialsGalleryProps {
  testimonials: TestimonialRecord[]
}

export function TestimonialsGallery({ testimonials }: TestimonialsGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null)
  const [selectedPlatform, setSelectedPlatform] = React.useState<string>("all")

  // Filter options based on platforms present
  const platforms = React.useMemo(() => {
    const set = new Set<string>()
    testimonials.forEach(t => {
      if (t.platform) set.add(t.platform)
    })
    return ["all", ...Array.from(set)]
  }, [testimonials])

  const filteredTestimonials = React.useMemo(() => {
    if (selectedPlatform === "all") return testimonials
    return testimonials.filter(t => t.platform === selectedPlatform)
  }, [testimonials, selectedPlatform])

  // Count verified ratings
  const verifiedRatingCount = testimonials.filter(t => t.ratingStatus === "verified").length

  return (
    <>
      <div className="space-y-10">
        {/* Verification & Trust Banner */}
        <div className="bg-[var(--brand-pale)] border border-[var(--border)] rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand text-white flex-shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[var(--foreground)]">
                100% Unaltered Feedback Archive
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
                Every review displayed below is an authentic, unedited screenshot as originally received from MTPL travellers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-[var(--muted-foreground)] flex-shrink-0">
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[var(--border)] shadow-xs">
              <MessageSquare className="w-3.5 h-3.5 text-brand" />
              <span>{testimonials.length} Authentic Testimonials</span>
            </span>
            {verifiedRatingCount > 0 && (
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[var(--border)] shadow-xs">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                <span>Verified Google Review</span>
              </span>
            )}
          </div>
        </div>

        {/* Platform Filter Tabs */}
        {platforms.length > 2 && (
          <div className="flex flex-wrap items-center gap-2">
            {platforms.map((platform) => (
              <button
                key={platform}
                type="button"
                onClick={() => setSelectedPlatform(platform)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all capitalize cursor-pointer ${
                  selectedPlatform === platform
                    ? "bg-[#16A765] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {platform === "all" ? "All Reviews" : platform}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {filteredTestimonials.map((testimonial, idx) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={idx}
              onOpenLightbox={(cardIndex) => setLightboxIndex(cardIndex)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <TestimonialLightbox
        testimonials={filteredTestimonials}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />
    </>
  )
}
