import * as React from "react"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { officeImages } from "@/config/office-images"
import { Heart, Sparkles, MapPin, Smile } from "lucide-react"

const cultureHighlights = [
  {
    image: officeImages.teamFestiveCelebration,
    tag: "Festive Spirit",
    icon: Sparkles,
  },
  {
    image: officeImages.teamMilestoneCelebration,
    tag: "Shared Milestones",
    icon: Heart,
  },
  {
    image: officeImages.teamReceptionDesk,
    tag: "Client Hospitality",
    icon: Smile,
  },
  {
    image: officeImages.streetSignboard,
    tag: "Centrally Located",
    icon: MapPin,
  },
]

export function OfficeGallery() {
  return (
    <Section spacing="large" className="bg-slate-50/60 border-t border-border overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <span className="text-brand font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
            Workplace & Team Life
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 font-sans">
            Life at MTPL
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            Beyond itineraries and flight tickets, our strength lies in a close-knit team that celebrates traditions, milestones, and customer relationships together.
          </p>
        </div>

        {/* 4-Card Visual Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {cultureHighlights.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.image.id}
                className="group relative flex flex-col rounded-3xl overflow-hidden bg-white border border-border/80 shadow-sm hover:shadow-xl hover:border-brand-medium/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-slate-900 shadow-xs backdrop-blur-xs border border-slate-200/50">
                      <Icon className="w-3 h-3 text-brand" />
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h4 className="text-base font-bold text-foreground font-sans leading-snug mb-1 group-hover:text-brand transition-colors">
                      {item.image.title}
                    </h4>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-2">
                      {item.image.caption}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}


