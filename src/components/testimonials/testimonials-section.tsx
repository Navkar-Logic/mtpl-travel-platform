"use client"

import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { getHomepageFeaturedTestimonials } from "@/features/testimonials/data/testimonials"
import { TestimonialCard } from "@/components/testimonials/testimonial-card"
import { TestimonialLightbox } from "@/components/testimonials/testimonial-lightbox"
import { ArrowRight } from "lucide-react"

export function TestimonialsSection() {
  const featuredTestimonials = getHomepageFeaturedTestimonials(6)
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null)

  if (featuredTestimonials.length === 0) {
    return null
  }

  return (
    <Section spacing="large" className="bg-[var(--muted)]/60 relative overflow-hidden border-t border-[var(--border)]/50">
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-sans font-bold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
              What Our Travellers Say
            </h2>
            <p className="text-[var(--muted-foreground)] font-medium text-sm sm:text-base mt-2">
              Unaltered feedback screenshots from journeys planned with MTPL.
            </p>
          </div>

          <Link 
            href="/reviews"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-brand font-bold text-sm shadow-xs border border-[var(--border)] hover:border-brand/40 hover:bg-brand hover:text-white transition-all duration-300 self-start md:self-auto"
          >
            <span>Explore All Reviews ({featuredTestimonials.length}+)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 to 6 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {featuredTestimonials.map((testimonial, idx) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={idx}
              onOpenLightbox={(cardIndex) => setLightboxIndex(cardIndex)}
            />
          ))}
        </div>

        {/* View All Reviews Callout Bar */}
        <div className="mt-12 text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--foreground)] hover:text-brand transition-colors"
          >
            <span>Read all 28 authentic traveller conversations and reviews</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </Container>

      {/* Modal Lightbox for Homepage Preview Cards */}
      <TestimonialLightbox
        testimonials={featuredTestimonials}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />
    </Section>
  )
}
