import * as React from "react"
import Link from "next/link"
import { Destination } from "@/types/destination"

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link href={`/destinations/${destination.slug}`} className="group flex flex-col overflow-hidden rounded-3xl bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(7,162,94,0.12)] hover:-translate-y-2 transition-all duration-500 relative">
      <div className="aspect-[4/3] bg-slate-200 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10" />
        <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 group-hover:scale-110 transition-transform duration-700 flex items-center justify-center">
           <span className="text-slate-600/60 font-bold text-sm tracking-widest uppercase">{destination.name}</span>
        </div>
        
        {destination.region && (
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-white/90 backdrop-blur-md text-slate-700 border border-white/30 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
              {destination.region}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-8 flex flex-col flex-1 relative z-20 bg-white">
        <h3 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-brand transition-colors">{destination.name}</h3>
        {destination.country && (
          <p className="text-slate-500 text-sm font-medium mb-3">{destination.country}</p>
        )}
        
        <p className="text-slate-600 text-sm mb-8 flex-1 leading-relaxed">{destination.shortDescription}</p>
        
        <div className="flex items-center justify-end mt-auto pt-6 border-t border-slate-100">
          <span className="inline-flex items-center justify-center rounded-xl bg-brand/10 text-brand font-bold transition-colors group-hover:bg-brand group-hover:text-white h-12 px-6 shadow-sm group-hover:shadow-md">
            View Destination &rarr;
          </span>
        </div>
      </div>
    </Link>
  )
}
