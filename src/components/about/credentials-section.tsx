import * as React from "react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"

const credentials = [
  { title: "IATA Accredited", subtitle: "International Air Transport Association" },
  { title: "TAAI Accredited", subtitle: "Travel Agents Association of India" }
]

export function CredentialsSection() {
  return (
    <Section spacing="large" className="bg-white border-b border-slate-100">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-md w-full">
            <span className="text-brand font-bold tracking-[0.2em] text-sm uppercase mb-2 block">Industry Standing</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-snug mb-6">
              Recognized for Excellence
            </h2>
            <p className="text-slate-600 font-light leading-relaxed">
              Our commitment to professional travel management is validated by our official accreditations and standing within the global travel industry.
            </p>
          </div>
          
          <div className="flex-1 flex flex-wrap justify-center sm:justify-start gap-6 w-full">
            {credentials.map((cred) => (
              <div key={cred.title} className="bg-white border border-border/80 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:border-brand-medium/40 transition-all duration-300 group max-w-sm w-full">
                <div className="w-16 h-16 bg-gradient-to-br from-[#A7F3C0]/40 to-[#4ADE80]/15 shadow-sm rounded-full flex items-center justify-center mb-6 text-brand group-hover:scale-105 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                </div>
                <h3 className="font-bold text-foreground mb-2">{cred.title}</h3>
                <p className="text-xs text-muted-foreground font-medium">{cred.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
