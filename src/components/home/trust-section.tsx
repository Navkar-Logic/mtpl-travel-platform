import * as React from "react"

const trustItems = [
  { icon: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z", title: "Global Flights", subtitle: "Domestic & International" },
  { icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", title: "Wide Hotel Selection", subtitle: "Curated Accommodations" },
  { icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", title: "Holiday Planning", subtitle: "Customized Itineraries" },
  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Industry Accredited", subtitle: "IATA & TAAI Certified" },
  { icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z", title: "Dedicated Assistance", subtitle: "Before, During & After Travel" }
]

export function TrustSection() {
  return (
    <div className="relative z-30 -mt-6 sm:-mt-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white border border-slate-200/80 shadow-[0_10px_35px_rgb(0,0,0,0.04)] rounded-2xl p-4 sm:p-5 lg:px-6 lg:py-5 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 divide-slate-100 sm:gap-4 lg:gap-0 lg:divide-x lg:divide-slate-200/80">
          {trustItems.map((item, i) => (
            <div 
              key={item.title} 
              className={`flex items-center gap-3.5 py-3 sm:py-0 w-full min-w-0 first:pt-0 last:pb-0 ${
                i === 4 ? "sm:col-span-2 sm:max-w-md sm:mx-auto lg:col-span-1 lg:max-w-none lg:mx-0" : ""
              } lg:px-3 xl:px-4 lg:first:pl-0 lg:last:pr-0`}
            >
              <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#A7F3C0]/35 to-[#4ADE80]/15 flex items-center justify-center text-brand">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d={item.icon} />
                </svg>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-bold tracking-tight text-foreground truncate">{item.title}</span>
                <span className="text-[11px] sm:text-xs font-medium text-muted-foreground truncate">{item.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

