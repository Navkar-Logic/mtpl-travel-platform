import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Offer } from "@/types/offer"

export function OfferCard({ offer }: { offer: Offer }) {
  return (
    <Link href={`/offers/${offer.slug}`} className="group flex flex-col overflow-hidden rounded-3xl bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(7,162,94,0.12)] hover:-translate-y-2 transition-all duration-500 relative">
      <div className="aspect-[16/9] bg-slate-900 relative flex items-center justify-center overflow-hidden">
        {offer.heroImagePlaceholder ? (
          <Image
            src={offer.heroImagePlaceholder}
            alt={offer.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 group-hover:scale-110 transition-transform duration-700 flex items-center justify-center">
             <span className="text-white/60 font-bold text-sm tracking-widest uppercase">{offer.title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent z-10" />
        
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-brand/90 backdrop-blur-md text-white border border-white/20 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
            {offer.category}
          </span>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-1 relative z-20 bg-white">
        <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-brand transition-colors">{offer.title}</h3>
        
        <p className="text-slate-600 text-sm mb-6 flex-1 leading-relaxed">{offer.shortDescription}</p>
        
        {offer.validity && (
          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-6 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {offer.validity}
          </div>
        )}
        
        <div className="flex items-center justify-end mt-auto pt-6 border-t border-slate-100">
          <span className="inline-flex items-center justify-center rounded-xl bg-brand/10 text-brand font-bold transition-colors group-hover:bg-brand group-hover:text-white h-12 px-6 shadow-sm group-hover:shadow-md">
            {offer.ctaLabel || "View Details"} &rarr;
          </span>
        </div>
      </div>
    </Link>
  )
}
