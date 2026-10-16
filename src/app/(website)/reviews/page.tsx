import * as React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { getWebsiteTestimonials } from "@/features/testimonials/data/testimonials"
import { TestimonialsGallery } from "@/components/testimonials/testimonials-gallery"
import { EnquiryCta } from "@/components/home/enquiry-cta"
import { officeImages } from "@/config/office-images"
import { Award, ShieldCheck, HeartHandshake } from "lucide-react"

export const metadata: Metadata = {
  title: "Client Reviews & Feedback | Mishrikotkar Travels (MTPL)",
  description: "Browse authentic, unedited feedback and testimonial screenshots from real travellers who have explored India and the world with Mishrikotkar Travels Pvt. Ltd.",
  alternates: {
    canonical: "/reviews",
  },
}

export default function ReviewsPage() {
  const testimonials = getWebsiteTestimonials()

  return (
    <div className="flex flex-col w-full bg-[var(--background)]">
      {/* Editorial Hero Header */}
      <div className="bg-[var(--brand-dark)] pt-32 pb-24 md:pt-40 md:pb-32 min-h-[58vh] md:min-h-[66vh] flex flex-col justify-center relative overflow-hidden">
        {/* Background Image with Opacity & Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/headers/header-reviews.jpg"
            alt="Happy Travellers Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_36%] opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[var(--brand-dark)]/90 pointer-events-none" />
          <div className="absolute inset-0 bg-[var(--brand-dark)]/25 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
        </div>

        <Container className="relative z-10 flex flex-col items-center text-center">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#EEF8F3] border border-white/15 text-xs font-bold tracking-[0.2em] uppercase">
              <span>Authentic Client Archive</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-sans drop-shadow-sm">
              Voices of Our <br />
              <span className="text-brand-light italic">Happy Travellers</span>
            </h1>

            <p className="text-base md:text-lg text-[#EEF8F3]/85 max-w-2xl font-light leading-relaxed mx-auto">
              Real conversations and unedited feedback straight from our travellers. 
              Explore authentic journey memories across family holidays, international tours, and bespoke corporate itineraries.
            </p>
          </div>
        </Container>
      </div>

      {/* Trust & Dedication Reassurance Banner */}
      <div className="py-10 bg-white border-b border-border/80">
        <Container>
          <div className="bg-gradient-brand-subtle border border-brand-medium/30 rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row items-center gap-8 shadow-sm">
            {/* Real Award Team Photo */}
            <div className="relative w-full lg:w-96 aspect-[16/11] rounded-2xl overflow-hidden shadow-md border border-brand/20 flex-shrink-0 bg-slate-900">
              <Image
                src={officeImages.teamAwardReception.src}
                alt={officeImages.teamAwardReception.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 384px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-[11px] font-bold text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full">
                MTPL Operations Team
              </span>
            </div>

            {/* Reassurance Copy */}
            <div className="space-y-4 flex-1 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-brand border border-brand/25 shadow-xs">
                <Award className="w-3.5 h-3.5" />
                Award-Winning Service Reassurance
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-sans text-foreground">
                Dedicated People Behind Every Seamless Journey
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
                Behind each positive review is our cohesive operations and reservations team in Nagpur. We monitor flights, reconfirm hotel bookings, and remain reachable throughout your trip so you can travel with complete peace of mind.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs sm:text-sm font-semibold text-foreground">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand" /> IATA Certified Excellence
                </span>
                <span className="text-border">•</span>
                <span className="flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-brand" /> Responsive On-Trip Support
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Reviews Gallery Section - Unaltered screenshots */}
      <Section spacing="large" className="bg-[var(--background)] py-12 md:py-20">
        <Container>
          <TestimonialsGallery testimonials={testimonials} />
        </Container>
      </Section>

      {/* Booking CTA */}
      <EnquiryCta />
    </div>
  )
}
