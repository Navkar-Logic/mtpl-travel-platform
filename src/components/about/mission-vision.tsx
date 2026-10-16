import * as React from "react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Target, Compass } from "lucide-react"

export function MissionVision() {
  return (
    <Section spacing="large" className="bg-[var(--background)]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Mission */}
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-border flex flex-col items-start text-left h-full transition-all hover:border-brand-medium/40">
            <div className="w-14 h-14 bg-gradient-to-br from-[#A7F3C0]/40 to-[#4ADE80]/20 text-brand rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <Target className="w-7 h-7" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-sans font-bold text-foreground mb-6">Our Mission</h3>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              To simplify travel through dependable, personalised and end-to-end assistance — combining professional planning, accurate guidance and responsive support before, during and after every journey.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-border flex flex-col items-start text-left h-full transition-all hover:border-brand-medium/40">
            <div className="w-14 h-14 bg-gradient-to-br from-[#A7F3C0]/40 to-[#4ADE80]/20 text-brand rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <Compass className="w-7 h-7" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-sans font-bold text-foreground mb-6">Our Vision</h3>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              To be a trusted travel management company recognised for service quality, customer confidence and the ability to make complex travel arrangements simple, smooth and well managed.
            </p>
          </div>

        </div>
      </Container>
    </Section>
  )
}
