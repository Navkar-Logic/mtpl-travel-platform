import * as React from "react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"

const documentationServices = [
  { name: "Visa Assistance", desc: "Professional guidance and support for visa application processes and documentation requirements for various countries.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { name: "Passport Assistance", desc: "Help with passport applications, renewals, and related advisory to ensure your travel documents are in order.", icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" },
  { name: "Forex Assistance", desc: "Assisting guests in securing competitive rates across authorized dealers for physical currency and multi-currency travel cards.", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { name: "Travel Insurance", desc: "Comprehensive travel insurance options to protect you against unforeseen circumstances while traveling.", icon: "M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" }
]

export function TravelAssistance() {
  return (
    <Section spacing="large" className="bg-slate-900 text-white relative overflow-hidden" id="visa">
      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          <div className="md:w-1/3">
            <div className="sticky top-32">
              <span className="text-brand font-bold tracking-[0.2em] text-sm uppercase mb-4 block">Essential Support</span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-6">Travel Documentation &amp; Assistance</h2>
              <p className="text-slate-400 text-lg font-light leading-relaxed mb-8">
                Navigating international travel requirements can be complex. Our expert team provides end-to-end guidance to ensure your documentation is fully compliant and your trip is secure.
              </p>
            </div>
          </div>
          
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {documentationServices.map((service) => (
              <div key={service.name} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300">
                <div className="w-12 h-12 bg-brand/20 text-brand rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={service.icon} /></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                <p className="text-slate-400 font-light text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
