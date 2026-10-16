import * as React from "react"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { directors } from "@/data/team"

export function LeadershipSection() {
  return (
    <Section spacing="large" className="bg-[#F8FAF9] relative overflow-hidden border-t border-border/60">
      {/* Subtle brand ambient glow */}
      <div className="absolute top-0 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brand/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 translate-y-1/2 w-[500px] h-[500px] bg-brand-light/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <span className="text-brand font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
            Our Leadership
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 font-sans">
            Our Directors
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            MTPL is driven by passionate directors who bring deep industry expertise, strategic direction, and dedicated service to every traveler.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 sm:gap-10">
          {directors.map((director) => (
            <div
              key={director.name}
              className="group relative bg-white rounded-3xl p-8 sm:p-9 border border-border/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(6,61,42,0.08)] hover:border-brand-medium/50 transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* Clear, Visible Director Portrait */}
              <div className="relative w-44 h-52 sm:w-52 sm:h-60 rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-md ring-4 ring-brand/10 border-2 border-white group-hover:ring-brand/30 transition-all duration-300">
                <Image
                  src={director.image}
                  alt={director.alt}
                  fill
                  sizes="(max-width: 768px) 176px, 208px"
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Director Details */}
              <span className="text-brand font-bold text-xs uppercase tracking-[0.2em] mb-2 inline-block px-3.5 py-1 rounded-full bg-brand/5 border border-brand/15">
                {director.role}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 font-sans tracking-tight mb-3">
                {director.name}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-sm">
                {director.message}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
