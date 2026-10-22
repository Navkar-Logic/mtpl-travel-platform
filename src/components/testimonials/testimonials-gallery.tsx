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
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all")

  // Category filter tabs with counts
  const categories = React.useMemo(() => {
    const counts: Record<string, number> = {}
    testimonials.forEach(t => {
      counts[t.type] = (counts[t.type] || 0) + 1
    })

    const list: Array<{ id: string; label: string; count: number }> = [
      { id: "all", label: "All Reviews", count: testimonials.length },
    ]

    const typeOrder: Array<{ id: TestimonialRecord["type"]; label: string }> = [
      { id: "whatsapp", label: "WhatsApp" },
      { id: "whatsapp_group", label: "WhatsApp Groups" },
      { id: "email_testimonial", label: "Email Feedback" },
      { id: "sms", label: "SMS Messages" },
      { id: "platform_review", label: "Google Review" },
      { id: "blackberry_messenger", label: "BBM Chats" },
    ]

    typeOrder.forEach(item => {
      if (counts[item.id]) {
        list.push({ id: item.id, label: item.label, count: counts[item.id] })
      }
    })

    return list
  }, [testimonials])

  const filteredTestimonials = React.useMemo(() => {
    if (selectedCategory === "all") return testimonials
    return testimonials.filter(t => t.type === selectedCategory)
  }, [testimonials, selectedCategory])

  // Count verified ratings
  const verifiedRatingCount = testimonials.filter(t => t.ratingStatus === "verified").length

  return (
    <>
      <div className="space-y-10">
        {/* Verification & Trust Banner */}
        <div className="bg-[#EEF8F3] border border-[#A7F3C0]/60 rounded-3xl p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-xs">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-brand text-white flex-shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-foreground">
                100% Verified Original Review Archive
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">
                Every record in this gallery is an authentic, unaltered screenshot received directly from MTPL travellers.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-muted-foreground flex-shrink-0">
            <span className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-full border border-border shadow-xs text-foreground">
              <MessageSquare className="w-4 h-4 text-brand" />
              <span>{testimonials.length} Genuine Testimonials</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-full border border-border shadow-xs text-foreground">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>4.6 ★ Google (57 Reviews)</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-full border border-border shadow-xs text-foreground">
              <span className="w-2 h-2 rounded-full bg-[#F58220]" />
              <span>4.6 ★ Justdial (89 Votes)</span>
            </span>
          </div>
        </div>

        {/* Platform Filter Tabs */}
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter reviews by communication channel">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 ${
                  selectedCategory === cat.id
                    ? "bg-brand text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id ? "bg-white/20 text-white" : "bg-white text-slate-600 border border-slate-200"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
