import * as React from "react"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { officeImages } from "@/config/office-images"
import { CheckCircle2, ShieldCheck, UserCheck } from "lucide-react"

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

            {/* Photo 1: Dedicated Travel Operations & Ticketing Desk */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-border/80 shadow-lg group bg-slate-900">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={officeImages.consultantsFloor.src}
                    alt={officeImages.consultantsFloor.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full mb-1">
                      Travel Operations Desk
                    </span>
                    <p className="text-xs sm:text-sm font-semibold leading-snug">
                      Flight Ticketing, Verified Accommodations &amp; Route Management
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
            {/* Photo 2: Director's Cabin (Left on desktop) */}
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
                      Director&apos;s Cabin
                    </span>
                    <p className="text-xs sm:text-sm font-semibold leading-snug">
                      Private Client Consultation &amp; Executive Journey Planning
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text (Right on desktop) */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <span className="text-brand font-bold tracking-[0.2em] text-xs uppercase block">
                Hands-On Leadership
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-foreground tracking-tight leading-tight">
                Personal Consultation &amp; Director-Led Oversight
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                At Mishrikotkar Travels, senior leadership remains personally involved in crafting and supervising journeys. From bespoke international holidays to corporate travel programs, our directors actively review routes, lodging standards, and schedules.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                Clients have direct access to experienced decision-makers rather than an anonymous call center. In our private consultation cabin, we welcome travellers for one-on-one itinerary planning, offering honest guidance and tailored travel solutions.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm text-foreground font-medium">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-brand flex-shrink-0" />
                  <span>Direct Leadership Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand flex-shrink-0" />
                  <span>Personalized Itinerary Consultation</span>
                </div>
              </div>
            </div>
          </div>

        </div>


        
      </Container>
    </Section>
  )
}
