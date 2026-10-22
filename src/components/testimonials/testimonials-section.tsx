"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { getHomepageFeaturedTestimonials, getPlatformDisplayName } from "@/features/testimonials/data/testimonials"
import { TestimonialLightbox } from "@/components/testimonials/testimonial-lightbox"
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  MessageSquare, 
  Quote, 
  ZoomIn, 
  Calendar, 
  User, 
  ShieldCheck 
} from "lucide-react"

export function TestimonialsSection() {
  const featuredTestimonials = getHomepageFeaturedTestimonials(6)
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  
  // Responsive cards per view: 1 on mobile (<768px), 2 on tablet (<1024px), 3 on desktop (>=1024px)
  const [cardsPerView, setCardsPerView] = React.useState(3)

  React.useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1)
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2)
      } else {
        setCardsPerView(3)
      }
    }

    updateCardsPerView()
    window.addEventListener("resize", updateCardsPerView)
    return () => window.removeEventListener("resize", updateCardsPerView)
  }, [])

  const maxIndex = Math.max(0, featuredTestimonials.length - cardsPerView)
  const safeIndex = Math.min(currentIndex, maxIndex)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
  }

  // Keyboard navigation when carousel region has focus
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      handlePrev()
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      handleNext()
    }
  }

  if (featuredTestimonials.length === 0) {
    return null
  }

  return (
    <Section spacing="large" className="bg-[#F8FAF9] relative overflow-hidden border-t border-[var(--border)]/50">
      {/* Background ambient accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-[0.2em] mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Authentic Client Archive</span>
            </div>
            <h2 className="text-3xl font-sans font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Stories from our travellers
            </h2>
            <p className="text-muted-foreground font-normal text-sm sm:text-base mt-2">
              Real feedback from customers who have travelled with MTPL.
            </p>
          </div>

          {/* Carousel Navigation Controls & Link to All Reviews */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <Link 
              href="/reviews"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-brand font-bold text-xs sm:text-sm shadow-xs border border-border hover:border-brand/40 hover:bg-brand hover:text-white transition-all duration-300"
            >
              <span>Read All Reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-1.5 ml-1">
              <button
                type="button"
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white border border-border shadow-xs hover:bg-brand hover:text-white hover:border-brand transition-all flex items-center justify-center text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white border border-border shadow-xs hover:bg-brand hover:text-white hover:border-brand transition-all flex items-center justify-center text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div 
          className="relative overflow-hidden -mx-3 px-1 py-1"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Traveller stories carousel"
        >
          <div 
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ 
              transform: `translateX(-${safeIndex * (100 / cardsPerView)}%)` 
            }}
          >
            {featuredTestimonials.map((testimonial, idx) => {
              const hasVerifiedRating = testimonial.ratingStatus === "verified" && typeof testimonial.rating === "number"
              const platformLabel = getPlatformDisplayName(testimonial.type, testimonial.platform)

              return (
                <div 
                  key={testimonial.id}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 p-3 flex"
                >
                  <article className="group relative flex flex-col justify-between w-full bg-white rounded-3xl border border-border/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(14,116,67,0.08)] hover:border-brand/40 transition-all duration-300 p-6 sm:p-7">
                    <div>
                      {/* Top Meta: Platform Badge & Rating / Verified */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EEF8F3] text-brand border border-[#A7F3C0]/60">
                          <MessageSquare className="w-3 h-3 text-brand" />
                          <span>{platformLabel}</span>
                        </span>

                        {hasVerifiedRating ? (
                          <div className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200/80 font-bold text-xs px-2.5 py-0.5 rounded-full">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span>5.0</span>
                          </div>
                        ) : (
                          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                            Verified Feedback
                          </span>
                        )}
                      </div>

                      {/* Customer Quote */}
                      <div className="relative mb-5">
                        <Quote className="w-8 h-8 text-brand/15 mb-2 -ml-1" />
                        <blockquote className="text-sm text-foreground/90 font-sans italic leading-relaxed line-clamp-4">
                          &ldquo;{testimonial.text}&rdquo;
                        </blockquote>
                      </div>

                      {/* Original Screenshot Thumbnail (Compact & Containment) */}
                      <button
                        type="button"
                        onClick={() => setLightboxIndex(idx)}
                        className="w-full relative bg-slate-950 rounded-2xl overflow-hidden p-2 flex items-center justify-center min-h-[140px] max-h-[160px] border border-border/60 cursor-pointer group/thumb text-left focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 transition-all hover:border-brand/50 mb-5"
                        aria-label={`View full original screenshot for ${testimonial.customerName || "Customer feedback"}`}
                      >
                        <Image
                          src={testimonial.image}
                          alt={testimonial.customerName ? `Original screenshot from ${testimonial.customerName}` : "Feedback screenshot"}
                          width={testimonial.dimensions.width}
                          height={testimonial.dimensions.height}
                          className="w-auto h-auto max-h-[145px] max-w-full object-contain transition-transform duration-300 group-hover/thumb:scale-[1.02]"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-foreground font-bold text-xs shadow-md">
                            <ZoomIn className="w-3.5 h-3.5 text-brand" />
                            <span>View Original Screenshot</span>
                          </span>
                        </div>
                      </button>
                    </div>

                    {/* Card Footer: Customer Identity & Action */}
                    <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-sm text-foreground truncate flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                          <span className="truncate">{testimonial.customerName || "Valued MTPL Traveller"}</span>
                        </h4>
                        {testimonial.customerEntity ? (
                          <p className="text-[11px] text-brand font-medium truncate mt-0.5">
                            {testimonial.customerEntity}
                          </p>
                        ) : testimonial.date ? (
                          <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            <span>{testimonial.date}</span>
                          </p>
                        ) : null}
                      </div>

                      <button
                        type="button"
                        onClick={() => setLightboxIndex(idx)}
                        className="text-xs font-bold text-brand hover:text-brand-dark transition-colors inline-flex items-center gap-1 flex-shrink-0"
                      >
                        <span>Inspect</span>
                        <span>&rarr;</span>
                      </button>
                    </div>
                  </article>
                </div>
              )
            })}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        {maxIndex > 0 && (
          <div className="flex items-center justify-center gap-2 mt-8" aria-label="Carousel pagination">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIndex(dotIdx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  safeIndex === dotIdx ? "w-8 bg-brand" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
                aria-current={safeIndex === dotIdx ? "true" : undefined}
              />
            ))}
          </div>
        )}

        {/* View All Reviews Callout Bar */}
        <div className="mt-12 pt-8 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-5 sm:p-6 border shadow-xs">
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-sm sm:text-base text-foreground">
              Explore All 28 Verified Original Conversations &amp; Screenshots
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Read authentic travel experiences across flights, visas, Europe, Maldives, and customized holiday packages.
            </p>
          </div>
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand text-white font-bold text-xs sm:text-sm shadow-sm hover:bg-brand-dark transition-colors flex-shrink-0"
          >
            <span>Read All Reviews</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>

      {/* Lightbox for inspecting high-res original screenshot */}
      <TestimonialLightbox
        testimonials={featuredTestimonials}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />
    </Section>
  )
}
