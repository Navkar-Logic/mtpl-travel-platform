import * as React from "react"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { officeImages } from "@/config/office-images"
import { Map, Briefcase, Target, HeartHandshake, ShieldCheck, MessageSquareHeart, CheckCircle } from "lucide-react"

const strengths = [
  { icon: Map, title: "End-to-End Assistance", description: "We coordinate different travel requirements through one experienced team, reducing the effort of managing multiple arrangements separately." },
  { icon: Briefcase, title: "Experienced Travel Team", description: "Our travel arrangers bring practical industry knowledge and hands-on experience to the planning process." },
  { icon: Target, title: "Personalised Planning", description: "Every journey is different. We work around the traveller’s requirements rather than relying on a one-size-fits-all approach." },
  { icon: HeartHandshake, title: "Support Beyond the Booking", description: "Our role continues when plans change or unexpected issues arise during travel." },
  { icon: ShieldCheck, title: "Professional Credentials", description: "MTPL is an IATA-certified and TAAI-accredited travel company." },
  { icon: MessageSquareHeart, title: "Customer-Focused Service", description: "Responsive communication, practical guidance and personalised attention remain at the centre of our service." }
]

export function WhyMtplSection() {
  return (
    <Section spacing="large" className="bg-white border-y border-border">
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading + Real Operations Floor Card */}
          <div className="lg:w-5/12 flex flex-col justify-between">
            <div>
              <span className="text-brand font-bold tracking-[0.2em] text-xs uppercase mb-3 block">The MTPL Difference</span>
              <h2 className="text-3xl lg:text-4xl font-sans font-bold tracking-tight text-foreground mb-4">Why Choose MTPL</h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed font-light mb-6">
                We combine professional travel expertise with responsive, personalised service — before, during and after your journey.
              </p>
            </div>

            {/* Real Operations Photo Card */}
            <div className="relative rounded-3xl overflow-hidden border border-border/80 shadow-md group mt-2 bg-slate-900">
              <div className="relative aspect-[16/11] w-full">
                <Image
                  src={officeImages.consultantsFloor.src}
                  alt={officeImages.consultantsFloor.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Floating pill badge */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 text-brand shadow-sm backdrop-blur-sm border border-brand/20">
                    <CheckCircle className="w-3.5 h-3.5 text-brand" />
                    Central Operations Floor
                  </span>
                </div>

                {/* Bottom text */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                  <p className="text-xs sm:text-sm font-semibold leading-snug">
                    Dedicated Booking & Reservation Desks
                  </p>
                  <p className="text-[11px] text-white/80 font-light mt-0.5">
                    Coordinating real-time flight ticketing, visas, and holiday itineraries from Nagpur
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Strengths Grid */}
          <div className="lg:w-7/12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {strengths.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#A7F3C0]/35 to-[#4ADE80]/15 flex items-center justify-center text-brand">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-semibold text-foreground mb-1.5">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed font-light">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </Container>
    </Section>
  )
}
