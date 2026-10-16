import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { officeImages } from "@/config/office-images"
import { ArrowRight, Compass, CheckCircle2 } from "lucide-react"

export function PlanningAssurance() {
  return (
    <section className="py-16 md:py-24 bg-slate-50/70 border-t border-border overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
          {/* Photo Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-border/80 shadow-lg group bg-slate-900">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={officeImages.itineraryPlanning.src}
                  alt={officeImages.itineraryPlanning.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-brand shadow-sm backdrop-blur-sm border border-brand/20">
                    <Compass className="w-3.5 h-3.5" />
                    Itinerary Design Desk
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm font-semibold leading-snug">
                    {officeImages.itineraryPlanning.title}
                  </p>
                  <p className="text-xs text-white/80 font-light mt-0.5">
                    {officeImages.itineraryPlanning.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-brand font-bold tracking-[0.2em] text-xs uppercase block">
              Tailored Holiday Design
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-foreground tracking-tight leading-tight">
              Looking for a Customized Route or Specific Dates?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
              Every traveller is unique. If our pre-curated packages don&apos;t match your exact flight schedule, family preferences, or hotel choices, our itinerary planners will craft a tailored program from scratch.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 text-sm text-foreground font-medium">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0" />
                <span>Custom hotel category upgrades</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0" />
                <span>Multi-city flights & airport connections</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0" />
                <span>Private dedicated AC vehicle transfers</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0" />
                <span>Transparent day-wise quotation</span>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/contact#enquiry-form"
                className="inline-flex items-center gap-2.5 rounded-full bg-brand text-white font-bold h-12 px-8 hover:bg-brand-dark transition-all shadow-md hover:shadow-lg hover:scale-[1.02]"
              >
                Request Custom Itinerary <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
