import * as React from "react"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { officeImages } from "@/config/office-images"
import { CheckCircle2, ShieldCheck, Headphones } from "lucide-react"

export function AboutIntro() {
  return (
    <Section spacing="large" className="bg-white border-b border-border overflow-hidden">
      <Container>
        <div className="space-y-20 lg:space-y-24">
          
          {/* Story Block 1: Simplifying Complex Travel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-brand font-bold tracking-[0.2em] text-xs uppercase block">
                Travel Made Effortless
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-foreground tracking-tight leading-tight">
                Simplifying Complex Travel
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                Travel planning today can be complicated. Airfares change constantly, hotel choices are endless, visa procedures can be demanding, and some destinations require careful planning of routes and accessibility.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                At MTPL, we simplify that process. Our experienced travel arrangers understand the client’s requirements, evaluate the available options and coordinate a practical, consolidated travel solution.
              </p>
              
              <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm text-foreground font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0" />
                  <span>Direct Airline Ticketing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0" />
                  <span>Verified Hotel Bookings</span>
                </div>
              </div>
            </div>

            {/* Photo 1: Operations Floor Wide */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-border/80 shadow-lg group bg-slate-900">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={officeImages.operationsFloorWide.src}
                    alt={officeImages.operationsFloorWide.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full mb-1">
                      Nagpur Central Operations
                    </span>
                    <p className="text-xs sm:text-sm font-semibold leading-snug">
                      Operations Floor & Accreditation Wall
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-border" />

          {/* Story Block 2: Continuous Support */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Photo 2: Executive Consultation Cabin (Left on desktop) */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden border border-border/80 shadow-lg group bg-slate-900">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={officeImages.directorCabin.src}
                    alt={officeImages.directorCabin.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full mb-1">
                      Executive Lounge
                    </span>
                    <p className="text-xs sm:text-sm font-semibold leading-snug">
                      Private Itinerary Consultation & Client Discussions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text (Right on desktop) */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <span className="text-brand font-bold tracking-[0.2em] text-xs uppercase block">
                With You At Every Step
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-foreground tracking-tight leading-tight">
                Continuous Support
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                Our service does not stop once a booking is confirmed. If a flight is missed, a hotel reservation changes, an itinerary needs to be revised or an unforeseen disruption occurs, our team works to assist with suitable alternatives and support.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                Customer satisfaction is central to the way we work. We aim to combine professional travel expertise with responsive, personalised service — before, during and after the journey.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm text-foreground font-medium">
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-brand flex-shrink-0" />
                  <span>On-Trip WhatsApp & Phone Helpline</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand flex-shrink-0" />
                  <span>Rapid Itinerary Re-routing</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </Section>
  )
}
