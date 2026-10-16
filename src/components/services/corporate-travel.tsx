import * as React from "react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import Link from "next/link"

export function CorporateTravel() {
  return (
    <Section spacing="large" className="bg-[var(--brand-dark)] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-medium via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand rounded-full blur-3xl opacity-10 pointer-events-none -mb-32 -ml-32" />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-brand-light font-bold tracking-[0.2em] text-sm uppercase">Business &amp; Groups</span>
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl leading-tight text-white drop-shadow-sm font-sans">
              Corporate Travel Solutions
            </h2>
            <p className="text-lg text-[#EEF8F3]/80 leading-relaxed font-light max-w-lg">
              We provide streamlined, reliable travel management for businesses. From executive business travel to large-scale group movements, our team ensures efficiency and professionalism.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-4">
              <span className="bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">Corporate Travel</span>
              <span className="bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">Business Travel</span>
              <span className="bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">FIT / GIT</span>
            </div>
          </div>
          
          <div className="flex lg:justify-end">
            <div className="bg-white text-foreground p-8 md:p-10 rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-brand"></div>
               <h3 className="text-2xl font-bold mb-4 font-sans">Partner With Us</h3>
               <p className="text-muted-foreground font-light mb-8 leading-relaxed">
                 Discover how MTPL can optimize your company&apos;s travel logistics and provide dedicated support for your teams.
               </p>
               <Link 
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl text-base font-bold transition-all bg-gradient-brand text-white hover:opacity-95 hover:shadow-lg h-14"
                >
                  Enquire About Corporate Services
                </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
