"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Package } from "@/types/package"
import { Clock, MapPin, Download, ArrowRight, MessageCircle, Calendar } from "lucide-react"

export function PackageCard({ pkg }: { pkg: Package }) {
  const [imgSrc, setImgSrc] = React.useState(pkg.heroImage)

  return (
    <div className="group flex flex-col h-full overflow-hidden rounded-3xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(7,162,94,0.12)] hover:-translate-y-1.5 transition-all duration-500 relative">
      {/* Cover Image Container */}
      <div className="aspect-[16/10] bg-slate-900 relative overflow-hidden flex-shrink-0">
        <Image
          src={imgSrc}
          alt={pkg.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          onError={() => setImgSrc("/assets/package-fallback.webp")}
        />

        {/* Ambient Subtle Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent z-10" />

        {/* Duration Pill at bottom-right */}
        <div className="absolute bottom-3 right-3 z-20">
          <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-brand" /> {pkg.duration}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 bg-white">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold font-sans text-slate-900 mb-1.5 group-hover:text-brand transition-colors line-clamp-1">
          <Link href={`/packages/${pkg.slug}`}>
            {pkg.title}
          </Link>
        </h3>

        {/* Short Factual Description */}
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2 font-light">
          {pkg.shortDescription}
        </p>

        {/* Day-by-Day Route Itinerary */}
        {pkg.itinerary && pkg.itinerary.length > 0 && (
          <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-200/70 mb-3">
            <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-200/60">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-brand" />
                Route Itinerary
              </span>
              <span className="text-[10.5px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200/70">
                {pkg.days}D / {pkg.nights}N
              </span>
            </div>

            <ul className="space-y-1.5">
              {(() => {
                const total = pkg.itinerary.length
                const maxDisplay = total <= 6 ? total : 5
                const displayDays = pkg.itinerary.slice(0, maxDisplay)
                const remaining = total - maxDisplay

                return (
                  <>
                    {displayDays.map((day) => (
                      <li
                        key={day.day}
                        className="flex items-start gap-2 text-xs leading-snug text-slate-700"
                      >
                        <span className="font-bold text-emerald-900 bg-emerald-50 border border-emerald-200/80 rounded px-1.5 py-0.5 text-[10.5px] whitespace-nowrap flex-shrink-0">
                          Day {day.day}
                        </span>
                        <span className="font-medium text-slate-800 text-xs">
                          {day.title}
                        </span>
                      </li>
                    ))}
                    {remaining > 0 && (
                      <li className="pt-2 mt-1.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-medium text-slate-500">
                          + {remaining} more {remaining === 1 ? "day" : "days"} in itinerary
                        </span>
                        <Link
                          href={`/packages/${pkg.slug}`}
                          className="text-[11px] font-bold text-brand hover:underline inline-flex items-center gap-0.5"
                        >
                          View Details &rarr;
                        </Link>
                      </li>
                    )}
                  </>
                )
              })()}
            </ul>
          </div>
        )}

        {/* Pricing & Validity Block */}
        <div className="pt-2.5 border-t border-slate-100 flex flex-col gap-1.5 mt-auto mb-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-[10.5px] text-slate-400 font-bold uppercase tracking-wider block">
                Price
              </span>
              <span className="text-sm sm:text-base font-bold text-brand tracking-tight">
                Request a Quote
              </span>
            </div>
            <Link
              href={`/contact?package=${pkg.slug}`}
              className="text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-600 hover:text-white font-semibold px-3 py-1 rounded-full border border-emerald-200/70 hover:border-emerald-600 transition-all shadow-xs"
              title={`Request a quote for ${pkg.title}`}
            >
              Request Quote &rarr;
            </Link>
          </div>

          {/* Package Validity Row: Display only when verified, never infer */}
          {pkg.validityStatus === "verified" && pkg.validityDisplay && (
            <div className="flex items-center gap-1.5 text-xs pt-2 border-t border-slate-100/80">
              <Calendar className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="text-slate-500 font-medium">Validity:</span>
              <span className="font-semibold text-emerald-800 bg-emerald-50/80 px-2 py-0.5 rounded-md truncate">
                {pkg.validityDisplay}
              </span>
            </div>
          )}
          {pkg.validityStatus === "confirmation_required" && (
            <div className="flex items-center gap-1.5 text-xs pt-2 border-t border-slate-100/80">
              <Calendar className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span className="text-slate-500 font-medium">Validity:</span>
              <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md truncate">
                Confirmation on Request
              </span>
            </div>
          )}
        </div>

        {/* Actions Row */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* View Details Link */}
          <Link
            href={`/packages/${pkg.slug}`}
            className="inline-flex items-center gap-1 text-sm font-bold text-brand hover:text-brand-dark transition-colors py-1.5"
          >
            View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {/* Action Buttons: PDF Download & WhatsApp */}
          <div className="flex items-center gap-1.5">
            {/* Download Original PDF */}
            <a
              href={`/api/packages/${pkg.slug}/download`}
              download
              title={`Download original ${pkg.title} itinerary PDF`}
              className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-600 hover:text-brand hover:border-brand/40 hover:bg-brand/5 flex items-center justify-center transition-all shadow-sm"
              aria-label={`Download itinerary PDF for ${pkg.title}`}
            >
              <Download className="w-4 h-4" />
            </a>

            {/* WhatsApp Link */}
            <a
              href={pkg.whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              title="Enquire on WhatsApp"
              className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-700 hover:bg-[#0E7443] hover:text-white hover:border-[#0E7443] flex items-center justify-center transition-all shadow-sm"
              aria-label={`Enquire about ${pkg.title} on WhatsApp`}
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
