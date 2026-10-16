import * as React from "react"

const trustItems = [
  { icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "Global Flights", subtitle: "Domestic & International" },
  { icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", title: "Wide Hotel Selection", subtitle: "Curated Accommodations" },
  { icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", title: "Holiday Planning", subtitle: "Customized Itineraries" },
  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Industry Accredited", subtitle: "IATA & TAAI Certified" },
  { icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z", title: "Dedicated Assistance", subtitle: "Before, During & After Travel" }
]

export function TrustSection() {
  return (
    <div className="relative z-30 -mt-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white border border-slate-200/80 shadow-[0_10px_35px_rgb(0,0,0,0.04)] rounded-2xl px-6 py-5 sm:px-8 sm:py-6">
        <div className="flex flex-wrap items-center justify-between gap-6 lg:gap-4 divide-y lg:divide-y-0 lg:divide-x divide-border/60">
          {trustItems.map((item, i) => (
            <div key={item.title} className={`flex items-center gap-4 w-full lg:w-auto flex-1 ${i !== 0 ? 'pt-4 lg:pt-0 lg:pl-6 xl:pl-8' : ''}`}>
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#A7F3C0]/35 to-[#4ADE80]/15 flex items-center justify-center text-brand">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d={item.icon} />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-foreground">{item.title}</span>
                <span className="text-[11px] font-medium text-muted-foreground">{item.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
