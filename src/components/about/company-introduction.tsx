import * as React from "react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"

export function CompanyIntroduction() {
  return (
    <Section spacing="large" className="bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/3 w-[800px] h-[800px] bg-brand/5 rounded-full blur-3xl pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Who We Are</h2>
                <div className="h-[2px] w-12 bg-slate-300 mt-2"></div>
              </div>
              <span className="text-brand font-bold tracking-[0.2em] text-sm uppercase flex items-center gap-2">
                <div className="h-[2px] w-6 bg-brand"></div> A Legacy of Trust
              </span>
            </div>
            
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-light">
              <p>
                Established in 2006, <strong>Mishrikotkar Travels Pvt. Ltd. (MTPL)</strong> is a premier travel management company based in Nagpur, Maharashtra. For nearly two decades, we have dedicated ourselves to transforming travel into a seamless, enriching experience for every client.
              </p>
              <p>
                We specialize in providing comprehensive travel facilitation for both domestic and international journeys. From individual leisure trips and luxury stays to complex corporate and group travel itineraries (FIT/GIT), our team delivers end-to-end support with a personal touch.
              </p>
              <p>
                At MTPL, we believe travel is not just about booking a ticket—it is about meticulous planning, proper documentation, and professional service that ensures you explore the world with complete peace of mind.
              </p>
            </div>
          </div>
          
          <div className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden bg-slate-200 border border-slate-200 shadow-2xl">
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mb-4 text-brand">
                  <span className="font-bold text-xl font-sans">MTPL</span>
                </div>
                <span className="text-slate-600 font-semibold text-sm tracking-wider uppercase">Nagpur Headquarters</span>
                <span className="text-slate-400 text-xs mt-1">Established 2006</span>
             </div>
             {/* Decorative element */}
             <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand rounded-full blur-2xl opacity-40"></div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
