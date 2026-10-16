import * as React from "react"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { officeImages } from "@/config/office-images"
import { Award, ShieldCheck, Users, Trophy } from "lucide-react"

const achievements = [
  {
    icon: ShieldCheck,
    title: "Professional Accreditation",
    description: "MTPL is an IATA-certified and TAAI-accredited travel company, adhering to recognized industry standards."
  },
  {
    icon: Award,
    title: "IndiGo Recognition",
    description: "Recognized among IndiGo's Top 10 sellers in Nagpur for approximately 8–9 consecutive years."
  },
  {
    icon: Trophy,
    title: "GoAir Sales Recognition",
    description: "Received sales-performance recognition from GoAir for approximately 3–4 years."
  },
  {
    icon: Users,
    title: "Experienced Leadership",
    description: "Led by Directors Tushar Mishrikotkar and Pooja Mishrikotkar, bringing extensive experience across multiple travel-business verticals."
  }
]

export function AchievementsSection() {
  return (
    <Section spacing="large" className="bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Proven Track Record</span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-sans">Achievements & Credentials</h2>
          <p className="mt-4 text-lg text-muted-foreground font-light">
            Decades of industry experience backed by official accreditations and sustained recognition.
          </p>
        </div>

        {/* 4 Core Credential Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {achievements.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-border/80 shadow-sm transition-all hover:border-brand-medium/40 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A7F3C0]/35 to-[#4ADE80]/15 text-brand flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>

        {/* Authentic Airline Recognition Photo Showcase */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-2xl font-bold font-sans text-foreground mt-3">
              Official Airline Recognition Moments
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Plaque Photo Card */}
            <div className="group rounded-3xl overflow-hidden border border-border/80 bg-white shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] w-full bg-slate-900">
                <Image
                  src={officeImages.airlineRecognitionIndigo.src}
                  alt={officeImages.airlineRecognitionIndigo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-brand shadow-sm backdrop-blur-sm border border-brand/20">
                    Official Plaque
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-base sm:text-lg font-bold leading-snug drop-shadow-sm">
                    {officeImages.airlineRecognitionIndigo.title}
                  </h4>
                  <p className="text-xs text-white/80 font-light mt-1">
                    {officeImages.airlineRecognitionIndigo.caption}
                  </p>
                </div>
              </div>
            </div>

            {/* Directors Certificate Photo Card */}
            <div className="group rounded-3xl overflow-hidden border border-border/80 bg-white shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] w-full bg-slate-900">
                <Image
                  src={officeImages.directorsAirlineCertificate.src}
                  alt={officeImages.directorsAirlineCertificate.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-brand shadow-sm backdrop-blur-sm border border-brand/20">
                    Directorship Honor
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-base sm:text-lg font-bold leading-snug drop-shadow-sm">
                    {officeImages.directorsAirlineCertificate.title}
                  </h4>
                  <p className="text-xs text-white/80 font-light mt-1">
                    {officeImages.directorsAirlineCertificate.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Association Spotlight */}
        <div className="max-w-3xl mx-auto bg-gradient-brand-subtle border border-brand-medium/30 rounded-2xl p-8 md:p-12 text-center flex flex-col items-center shadow-sm">
           <Award className="w-10 h-10 text-brand mb-6" strokeWidth={1.5} />
           <h3 className="text-2xl font-sans font-bold text-foreground mb-4">Industry Association</h3>
           <p className="text-lg text-foreground font-light leading-relaxed">
             Demonstrating a strong commitment to the travel community, Director Tushar Mishrikotkar has served as the Honorary Treasurer of the TAAI Vidarbha Chapter since 2024 and continues to hold the position for the 2026–28 term.
           </p>
        </div>
      </Container>
    </Section>
  )
}
