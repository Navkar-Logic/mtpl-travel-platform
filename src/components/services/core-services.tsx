import * as React from "react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"

export function CoreServices() {
  return (
    <Section spacing="large" className="bg-slate-50 relative overflow-hidden" id="flights">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-brand/5 rounded-full blur-3xl pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="max-w-3xl mb-16">
          <span className="text-brand font-bold tracking-[0.2em] text-sm uppercase mb-4 block">Core Offerings</span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 mb-4">
            Air Travel &amp; Accommodation
          </h2>
          <p className="text-slate-600 text-lg font-light leading-relaxed">
            We handle the foundational elements of your journey, ensuring your flights and stays are booked securely, accurately, and tailored to your preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Air Travel */}
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="w-14 h-14 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mb-8">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Air Travel</h3>
            <p className="text-slate-600 font-light mb-6 leading-relaxed">
              Professional flight ticketing services with personalized support for schedule changes, preferred routing, and special requests.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-brand"></div> Domestic Air Tickets
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-brand"></div> International Air Tickets
              </li>
            </ul>
          </div>

          {/* Accommodation & Holidays */}
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-300" id="hotels">
            <div className="w-14 h-14 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mb-8">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Accommodation &amp; Holidays</h3>
            <p className="text-slate-600 font-light mb-6 leading-relaxed">
              Curated stays and comprehensive holiday planning designed to deliver memorable experiences across the globe.
            </p>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8">
              <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-brand"></div> Hotel Bookings
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-brand"></div> Holiday Packages
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-brand"></div> Luxury Stays
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-brand"></div> Jungle Safaris
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
