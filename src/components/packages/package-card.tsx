"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Package } from "@/types/package"
import { Clock, MapPin, Download, ArrowRight, MessageCircle, Calendar } from "lucide-react"

export function PackageCard({ pkg }: { pkg: Package }) {
  const [imgSrc, setImgSrc] = React.useState(pkg.heroImage)

  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(7,162,94,0.12)] hover:-translate-y-1.5 transition-all duration-500 relative">
      {/* Cover Image Container */}
      <div className="aspect-[16/10] bg-slate-900 relative overflow-hidden">
        <Image
          src={imgSrc}
          alt={pkg.title}
          fill
          unoptimized
          quality={95}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          onError={() => setImgSrc("/assets/package-fallback.webp")}
        />

        {/* Ambient Subtle Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />

        {/* Destination & Duration Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
          <span className="bg-brand text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-md">
            {pkg.destination}
          </span>
          {pkg.featured && (
            <span className="bg-amber-500 text-white px-2.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-md">
              Signature
            </span>
          )}
        </div>

        {/* Duration Pill at bottom-right */}
        <div className="absolute bottom-3 right-3 z-20">
          <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-brand" /> {pkg.duration}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 md:p-7 flex flex-col flex-1 bg-white">
        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold font-sans text-slate-900 mb-2 group-hover:text-brand transition-colors line-clamp-1">
          <Link href={`/packages/${pkg.slug}`}>
            {pkg.title}
          </Link>
        </h3>

        {/* Short Factual Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2 font-light">
          {pkg.shortDescription}
        </p>

        {/* Highlights Pills */}
        {pkg.highlights && pkg.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {pkg.highlights.slice(0, 3).map((h, i) => (
              <span
                key={i}
                className="text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-200/60 px-2.5 py-0.5 rounded-lg flex items-center gap-1"
              >
                <MapPin className="w-3 h-3 text-brand" /> {h}
              </span>
            ))}
          </div>
        )}

        {/* Pricing & Validity Block */}
        <div className="pt-3.5 border-t border-slate-100 flex flex-col gap-2.5 mt-auto mb-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              Price
            </span>
            <Link
              href={`/contact?package=${pkg.slug}`}
              className="text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-600 hover:text-white font-semibold px-3 py-1 rounded-full border border-emerald-200/70 hover:border-emerald-600 transition-all shadow-sm"
              title="Send a request for verified final pricing"
            >
              Request Quote &rarr;
            </Link>
          </div>

          {/* Price In One Clean Unbroken Line */}
          <div className="flex items-baseline gap-1.5 whitespace-nowrap overflow-hidden">
            <span className="text-base sm:text-lg font-bold text-brand tracking-tight">
              {pkg.priceDisplay}
            </span>
            {pkg.priceDisplay.startsWith("Starting") && (
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                / person
              </span>
            )}
          </div>

          {/* Pricing Note */}
          <p className="text-[11px] text-slate-500 leading-relaxed font-light bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            *Indicative base price. For exact dates & hotel tier pricing, please send a quotation request.
          </p>

          {/* Package Validity Row */}
          <div className="flex items-center gap-1.5 text-xs pt-2 border-t border-slate-100/80">
            <Calendar className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="text-slate-500 font-medium">Validity:</span>
            <span className={`font-semibold truncate ${
              pkg.validityStatus === "confirmation_required"
                ? "text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md"
                : "text-emerald-800 bg-emerald-50/80 px-2 py-0.5 rounded-md"
            }`}>
              {pkg.validityDisplay || "31 March 2027"}
            </span>
          </div>
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
