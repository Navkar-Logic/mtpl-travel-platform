import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getWebsiteTestimonials } from "@/features/testimonials/data/testimonials";
import { ReviewsList } from "@/components/reviews/reviews-list";
import { FeedbackForm } from "@/components/reviews/feedback-form";
import { EnquiryCta } from "@/components/home/enquiry-cta";
import { MessageSquarePlus } from "lucide-react";

export const metadata: Metadata = {
  title: "Customer Reviews & Feedback | Mishrikotkar Travels (MTPL)",
  description:
    "Read genuine, unedited customer experiences from travellers who explored India and international destinations with Mishrikotkar Travels Pvt. Ltd., and share your own feedback.",
  alternates: {
    canonical: "/reviews",
  },
};

export default function ReviewsPage() {
  const testimonials = getWebsiteTestimonials();

  return (
    <div className="flex flex-col w-full bg-[#F7F9F8]">
      {/* Section A: Page Hero */}
      <section className="bg-[#063D2A] text-white pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        {/* Subtle decorative background gradient accents */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#16A765]/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#16A765]/10 blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        <Container className="relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#EEF8F3] border border-white/15 text-xs font-bold tracking-[0.2em] uppercase">
              <span>Customer Voice &amp; Experiences</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-sans">
              Your Feedback Matters
            </h1>

            <p className="text-base sm:text-lg text-[#EEF8F3]/90 max-w-2xl font-light leading-relaxed mx-auto">
              Every journey teaches us something. Read our customers&apos; experiences and share your feedback to help us make travel better.
            </p>

            <div className="pt-2">
              <Link
                href="#feedback-form"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#16A765] hover:bg-[#128a53] text-white font-bold text-sm shadow-[0_4px_16px_rgba(22,167,101,0.35)] transition-all transform hover:-translate-y-0.5"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Share Your Feedback</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Section B: Verified Customer Reviews */}
      <Section spacing="large" className="bg-[#F7F9F8] py-16 sm:py-20 md:py-24">
        <Container>
          <div className="max-w-6xl mx-auto space-y-16">
            {/* Reviews Grid Component */}
            <ReviewsList reviews={testimonials} />

            {/* Section C & D: Feedback Form */}
            <FeedbackForm />
          </div>
        </Container>
      </Section>

      {/* Booking CTA Section */}
      <EnquiryCta />
    </div>
  );
}
