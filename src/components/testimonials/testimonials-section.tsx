"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { getHomepageFeaturedTestimonials, getPlatformDisplayName } from "@/features/testimonials/data/testimonials"
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  MessageSquare, 
  Quote, 
  Calendar, 
  User, 
  ShieldCheck 
} from "lucide-react"

export function TestimonialsSection() {
  const featuredTestimonials = getHomepageFeaturedTestimonials(6)
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
            {featuredTestimonials.map((testimonial) => {
              const hasVerifiedRating = testimonial.ratingStatus === "verified" && typeof testimonial.rating === "number"
              const platformLabel = getPlatformDisplayName(testimonial.type, testimonial.platform)

              return (
                <div 
                  key={testimonial.id}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 p-3 flex"
                >
                  <article className="group relative flex flex-col justify-between w-full min-h-[260px] bg-[#0A1626] rounded-3xl border border-white/20 hover:border-white/40 shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.45)] transition-all duration-300 p-6 sm:p-7 overflow-hidden">
                    {/* Testimonial Background Image (100% Clear, Original colors) */}
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

                    {/* Decorative quotation watermark in background */}
                    <Quote 
                      className="absolute top-4 right-4 w-12 h-12 text-white/15 -scale-x-100 pointer-events-none select-none transition-transform duration-300 group-hover:scale-105 z-0" 
                      aria-hidden="true"
                    />

                    <div className="relative z-10">
                      {/* Top Meta: Platform Badge & Rating / Verified */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/40 text-white border border-white/30 backdrop-blur-xs shadow-sm">
                          <MessageSquare className="w-3 h-3 text-[#34D399]" />
                          <span>{platformLabel}</span>
                        </span>

                        {hasVerifiedRating ? (
                          <div className="flex items-center gap-1 bg-black/45 border border-white/25 font-bold text-xs px-2.5 py-0.5 rounded-full text-amber-300 backdrop-blur-xs shadow-sm">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>5.0</span>
                          </div>
                        ) : (
                          <span className="text-[11px] font-semibold text-white uppercase tracking-wider drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                            Verified Feedback
                          </span>
                        )}
                      </div>

                      {/* Customer Quote */}
                      <div className="relative mb-4">
                        <Quote className="w-8 h-8 text-[#34D399]/70 mb-2 -ml-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                        <blockquote className="text-sm sm:text-[15px] text-white font-sans italic leading-relaxed line-clamp-5 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                          &ldquo;{testimonial.text}&rdquo;
                        </blockquote>
                      </div>
                    </div>

                    {/* Card Footer: Customer Identity & Verification */}
                    <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between gap-3 mt-4">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-sm text-white truncate flex items-center gap-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                          <User className="w-3.5 h-3.5 text-[#34D399] flex-shrink-0" />
                          <span className="truncate">{testimonial.customerName || "Valued MTPL Traveller"}</span>
                        </h4>
                        {testimonial.customerEntity ? (
                          <p className="text-[11px] text-white/90 font-medium truncate mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                            {testimonial.customerEntity}
                          </p>
                        ) : testimonial.date ? (
                          <p className="text-[11px] text-white/80 flex items-center gap-1 mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                            <Calendar className="w-3 h-3 text-[#34D399]" />
                            <span>{testimonial.date}</span>
                          </p>
                        ) : null}
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-black/40 px-2.5 py-1 rounded-full border border-white/30 flex-shrink-0 backdrop-blur-xs shadow-sm">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
                        <span>Verified</span>
                      </span>
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
              Explore All Verified Customer Reviews &amp; Experiences
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Read authentic feedback from travellers across domestic tours, international packages, and visa services.
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
    </Section>
  )
}
