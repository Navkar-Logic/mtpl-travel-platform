import * as React from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import { getPackageBySlug, getAllPackages, getPackageTables, getPackageCategory } from "@/features/packages/data/packages"
import { getPackagePriceDetails } from "@/features/packages/utils/package-pricing"
import { getMediaUrl } from "@/lib/media"
import { officeImages } from "@/config/office-images"
import { PackageTables } from "@/components/packages/package-tables"
import { PackageTermsModal } from "@/components/packages/package-terms-modal"
import { PackageCallbackButton } from "@/components/packages/package-callback-button"
import {
  Clock,
  MapPin,
  Download,
  MessageCircle,
  Send,
  CheckCircle2,
  XCircle,
  Calendar,
  ShieldCheck,
  ChevronRight,
  Scale,
  Sparkles,
  Compass,
  Building,
  Car,
  FileCheck,
  ChevronDown,
  Globe2,
} from "lucide-react"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const pkgs = getAllPackages()
  return pkgs.map((pkg) => ({
    slug: pkg.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const pkg = getPackageBySlug(resolvedParams.slug)

  if (!pkg) {
    return {
      title: "Package Not Found",
    }
  }

  return {
    title: `${pkg.title} (${pkg.duration}) | MTPL Holiday Packages`,
    description: pkg.shortDescription,
    alternates: {
      canonical: `/packages/${resolvedParams.slug}`,
    },
    openGraph: {
      title: `${pkg.title} | MTPL Holiday Packages`,
      description: pkg.shortDescription,
      images: [
        {
          url: getMediaUrl(pkg.heroImage),
          width: 1200,
          height: 630,
          alt: pkg.title,
        },
      ],
    },
  }
}

export default async function PackageDetailPage({ params }: Props) {
  const resolvedParams = await params
  const pkg = getPackageBySlug(resolvedParams.slug)
  const tables = getPackageTables(resolvedParams.slug)

  if (!pkg) {
    notFound()
  }

  const category = getPackageCategory(pkg)
  const priceDetails = getPackagePriceDetails(pkg, tables)

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Modern Editorial Hero Header */}
      <div className="relative w-full overflow-hidden bg-slate-950 border-b border-slate-900 min-h-[52vh] md:min-h-[58vh] flex flex-col justify-end">
        {/* Cover Photograph */}
        <div className="absolute inset-0 z-0">
          <Image
            src={getMediaUrl(pkg.heroImage)}
            alt={pkg.title}
            fill
            priority
            unoptimized
            quality={95}
            sizes="100vw"
            className="object-cover opacity-75 scale-102"
          />
          {/* Dual Layer Gradient for High-Contrast Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/35 z-10" />
          <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/50 z-10" />
        </div>

        {/* Hero Content */}
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-32 md:pt-36 pb-8 md:pb-10 flex flex-col items-center text-center">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="inline-flex items-center gap-2 text-xs font-medium text-white/80 mb-4 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 shadow-sm"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <Link href="/packages" className="hover:text-white transition-colors">
              Holidays
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-emerald-400 font-semibold truncate max-w-[180px] sm:max-w-none">
              {pkg.title}
            </span>
          </nav>

          <div className="max-w-4xl space-y-4 flex flex-col items-center w-full">
            {/* Metadata Pills Row */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 bg-emerald-600/90 text-white px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-xs backdrop-blur-xs">
                <MapPin className="w-3.5 h-3.5" />
                {pkg.destination}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md text-white border border-white/20 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-xs">
                <Clock className="w-3.5 h-3.5 text-emerald-300" />
                {pkg.duration}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-white/90 border border-white/15 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase shadow-xs">
                <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                {category === "international" ? "International Holiday" : "Domestic India Tour"}
              </span>
              {pkg.featured && (
                <span className="inline-flex items-center gap-1.5 bg-amber-500 text-white px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  Signature Tour
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-sans drop-shadow-xl leading-tight">
              {pkg.title}
            </h1>

            <p className="text-base md:text-lg text-white/90 font-light max-w-2xl leading-relaxed mx-auto drop-shadow-sm">
              {pkg.shortDescription}
            </p>

            {/* Quick Feature Strip */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-white/80">
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-emerald-400" /> Verified Partner Hotels
              </span>
              <span className="flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-emerald-400" /> Dedicated Private AC Cab
              </span>
              <span className="flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-emerald-400" /> Official Verified Itinerary
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> IATA Certified Tour Operator
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Left Column: Itinerary, Tables & Tour Details */}
          <div className="flex-1 min-w-0 space-y-10 md:space-y-12">
            {/* Overview Section */}
            {pkg.overview && (
              <section className="bg-gradient-to-br from-slate-50 via-white to-emerald-50/20 p-6 md:p-8 rounded-3xl border border-slate-200/90 shadow-xs relative overflow-hidden">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-2.5 h-6 bg-brand rounded-full inline-block" />
                  <Compass className="w-5 h-5 text-brand" />
                  <h2 className="text-xl md:text-2xl font-bold font-sans text-slate-900 tracking-tight">
                    Journey Overview
                  </h2>
                </div>
                <p className="text-slate-700 leading-relaxed font-normal text-base md:text-lg">
                  {pkg.overview}
                </p>
              </section>
            )}

            {/* Key Highlights */}
            {pkg.highlights && pkg.highlights.length > 0 && (
              <section>
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="w-2.5 h-6 bg-brand rounded-full inline-block" />
                  <h2 className="text-xl md:text-2xl font-bold font-sans text-slate-900 tracking-tight">
                    Key Highlights &amp; Sightseeing
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {pkg.highlights.map((highlight, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-brand/50 hover:shadow-xs transition-all group"
                    >
                      <div className="mt-0.5 w-6 h-6 rounded-lg bg-emerald-50 text-brand flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-white transition-colors">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-slate-800 font-semibold text-sm leading-snug">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Day by Day Itinerary */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <section>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-6 bg-brand rounded-full inline-block" />
                    <h2 className="text-xl md:text-2xl font-bold font-sans text-slate-900 tracking-tight">
                      Day-by-Day Itinerary
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {pkg.itinerary.length} Days Planned
                  </span>
                </div>

                <div className="space-y-6 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-brand before:via-emerald-200 before:to-slate-200">
                  {pkg.itinerary.map((day) => (
                    <div key={day.day} className="flex gap-4 md:gap-6 relative">
                      {/* Day Number Badge */}
                      <div className="w-10 h-10 rounded-2xl bg-gradient-brand text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md ring-4 ring-white z-10">
                        {day.day}
                      </div>

                      {/* Day Content Card */}
                      <div className="flex-1 bg-white p-5 md:p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:border-brand/40 transition-colors">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h3 className="text-base md:text-lg font-bold text-slate-900 font-sans">
                            {day.title}
                          </h3>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/70 shrink-0">
                            Day {day.day}
                          </span>
                        </div>
                        <p className="text-slate-600 font-normal text-sm leading-relaxed">
                          {day.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Accommodation Options & Package Cost Tables */}
            <PackageTables tables={tables} packageName={pkg.title} />

            {/* Inclusions & Exclusions */}
            {(pkg.inclusions || pkg.exclusions) && (
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inclusions */}
                {pkg.inclusions && pkg.inclusions.length > 0 && (
                  <div className="bg-emerald-50/50 p-6 md:p-7 rounded-3xl border border-emerald-200/80 shadow-2xs">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 font-sans">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      What&apos;s Included
                    </h3>
                    <ul className="space-y-3">
                      {pkg.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-slate-700 text-xs md:text-sm leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Exclusions */}
                {pkg.exclusions && pkg.exclusions.length > 0 && (
                  <div className="bg-rose-50/40 p-6 md:p-7 rounded-3xl border border-rose-200/70 shadow-2xs">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 font-sans">
                      <XCircle className="w-5 h-5 text-rose-500" />
                      What&apos;s Not Included
                    </h3>
                    <ul className="space-y-3">
                      {pkg.exclusions.map((exc, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-slate-700 text-xs md:text-sm leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* Validity Notice & Notes */}
            {pkg.validityNotice && (
              <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex items-start gap-3.5 shadow-2xs">
                <Calendar className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Seasonal Validity &amp; Terms</h4>
                  <p className="text-slate-600 text-xs md:text-sm font-light leading-relaxed">
                    {pkg.validityNotice}. Peak surcharges may apply during national holidays, festive periods, and long weekends.
                  </p>
                </div>
              </section>
            )}

            {/* Authoritative Holiday Tour Package Terms & Conditions Modal */}
            <PackageTermsModal packageName={pkg.title} destination={pkg.destination} />
          </div>

          {/* Right Column: Sticky Booking & Enquiry Box */}
          <div className="lg:w-80 xl:w-96 shrink-0">
            <div className="sticky top-28 space-y-6">
              {/* Pricing & Primary CTA Card */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-7 shadow-xl relative overflow-hidden">
                {/* Brand Green Top Stripe */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-brand" />

                {/* Pricing Block - Relevant Verified Tariff */}
                <div className="mb-6 pt-2">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                      {priceDetails.hasPrice ? "Starting From (2 Persons)" : "Tariff Model"}
                    </span>
                    {priceDetails.hasPrice && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                        <CheckCircle2 className="w-3 h-3 text-brand" /> Verified Tariff
                      </span>
                    )}
                  </div>

                  {priceDetails.hasPrice ? (
                    <div>
                      <div className="flex items-baseline gap-1.5 mb-1">
                        <span className="text-3xl md:text-4xl font-extrabold text-brand font-display tracking-tight">
                          {priceDetails.displayPrice}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">/ person</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {priceDetails.subtext}
                      </p>
                      {tables?.costTables && tables.costTables.length > 0 && (
                        <a
                          href="#package-tariff-tables"
                          className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:text-brand-dark hover:underline mt-2 transition-colors cursor-pointer"
                        >
                          <span>View Tariff Breakdown Table</span>
                          <ChevronDown className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-2xl md:text-3xl font-bold text-brand font-display tracking-tight">
                          Request a Quote
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        {priceDetails.subtext}
                      </p>
                    </div>
                  )}

                  {/* Validity Display */}
                  {pkg.validityStatus === "verified" && pkg.validityDisplay && (
                    <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-3 my-3.5 flex items-start gap-2.5 shadow-2xs">
                      <Calendar className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 block">Package Validity:</span>
                        <span className="text-xs md:text-sm font-bold text-emerald-900 leading-snug">
                          {pkg.validityDisplay}
                        </span>
                      </div>
                    </div>
                  )}
                  {pkg.validityStatus === "confirmation_required" && (
                    <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-3 my-3.5 flex items-start gap-2.5 shadow-2xs">
                      <Calendar className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[11px] font-semibold text-amber-700 block">Package Validity:</span>
                        <span className="text-xs md:text-sm font-bold text-amber-800 leading-snug">
                          Confirmation on Request
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Primary Contact CTA Buttons */}
                <div className="space-y-3 mb-6">
                  <Link
                    href={`/contact?package=${pkg.slug}`}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl text-base font-bold transition-all bg-brand text-white hover:bg-brand/90 hover:shadow-lg h-13 shadow-md"
                  >
                    <Send className="w-4 h-4" /> Book / Request Exact Quote
                  </Link>

                  <PackageCallbackButton packageSlug={pkg.slug} packageTitle={pkg.title} />

                  <a
                    href={pkg.whatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 rounded-2xl text-sm font-bold transition-all bg-[#0E7443] text-white hover:bg-[#0A5C34] h-12 shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                  </a>

                  <a
                    href={`/api/packages/${pkg.slug}/download`}
                    download
                    className="w-full flex items-center justify-center gap-2 rounded-2xl text-sm font-semibold transition-all bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/90 h-12 shadow-2xs"
                  >
                    <Download className="w-4 h-4 text-brand" /> Download Original PDF
                  </a>
                </div>

                {/* Service Guarantees */}
                <div className="pt-5 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                    <ShieldCheck className="w-4 h-4 text-brand shrink-0" />
                    <span>Customizable to your specific travel dates</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                    <ShieldCheck className="w-4 h-4 text-brand shrink-0" />
                    <span>Dedicated point-to-point private AC transfers</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                    <ShieldCheck className="w-4 h-4 text-brand shrink-0" />
                    <span>IATA accredited &amp; end-to-end trip assistance</span>
                  </div>
                </div>

                {/* Terms Quick Link */}
                <div className="pt-4 border-t border-slate-100 text-center">
                  <a
                    href="#package-terms"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand transition-colors cursor-pointer"
                  >
                    <Scale className="w-3.5 h-3.5 text-brand" />
                    Subject to MTPL Tour Terms &amp; Conditions
                  </a>
                </div>

                {/* Quotation Notice */}
                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed text-center sm:text-left">
                  <span className="font-semibold text-slate-700">Customized Tour Pricing:</span> Exact package tariff is tailored to your travel dates, group size, and preferred hotel category. Submit an enquiry to receive a verified final quote.
                </div>
              </div>

              {/* Need Assistance Card */}
              <div className="bg-slate-50/90 rounded-3xl p-5 border border-slate-200/80 text-center overflow-hidden shadow-2xs">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-3.5 bg-slate-900 border border-slate-200/60 shadow-xs">
                  <Image
                    src={officeImages.itineraryPlanning.src}
                    alt={officeImages.itineraryPlanning.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 300px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-xs">
                    Itinerary Planning Desk
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 font-sans text-sm mb-1">Looking for Custom Changes?</h4>
                <p className="text-slate-600 text-xs font-light mb-3 leading-relaxed">
                  Talk to our holiday planners for hotel upgrades, multi-city flights, or corporate group departures.
                </p>
                <a
                  href="tel:+918381006600"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-brand hover:bg-brand-dark px-4 py-2 rounded-xl transition-all shadow-xs w-full"
                >
                  Call +91 8381006600
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
