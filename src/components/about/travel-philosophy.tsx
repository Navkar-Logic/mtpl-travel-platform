import * as React from "react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"

const pillars = [
  { title: "Experience", desc: "Decades of industry knowledge ensuring meticulously planned itineraries." },
  { title: "Trust", desc: "A foundation built on transparency, reliability, and putting our clients first." },
  { title: "Personalised Assistance", desc: "Tailored travel solutions designed specifically for your unique preferences." },
  { title: "End-to-End Support", desc: "From the first inquiry to your safe return, we handle every detail." }
]

export function TravelPhilosophy() {
  return (
    <Section spacing="large" className="bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/10 rounded-full blur-3xl pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand font-bold tracking-[0.2em] text-sm uppercase mb-4 block">Our Philosophy</span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-6">More Than Just a Booking Engine</h2>
          <p className="text-slate-300 text-lg font-light leading-relaxed">
            In an era of automated bookings, we champion professional human support. We provide expert travel facilitation to ensure your journey is crafted with care and executed flawlessly.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300">
              <div className="w-12 h-12 bg-brand/20 text-brand rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
              <p className="text-slate-400 font-light text-sm leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
