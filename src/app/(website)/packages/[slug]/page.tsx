import * as React from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import { Container } from "@/components/ui/container"
import { getPackageBySlug, getAllPackages, getPackageTables } from "@/features/packages/data/packages"
import { officeImages } from "@/config/office-images"
import { PackageTables } from "@/components/packages/package-tables"
import { PackageTermsModal } from "@/components/packages/package-terms-modal"
import { Clock, MapPin, Download, MessageCircle, Send, CheckCircle2, XCircle, Calendar, ShieldCheck, ChevronRight, Scale } from "lucide-react"

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
          url: pkg.heroImage,
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

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Editorial Hero Header */}
      <div className="relative w-full overflow-hidden bg-slate-950 border-b border-slate-900 min-h-[50vh] md:min-h-[55vh] flex flex-col justify-end">
        {/* Cover Photograph */}
        <div className="absolute inset-0 z-0">
          <Image
            src={pkg.heroImage}
            alt={pkg.title}
            fill
            priority
            unoptimized
            quality={95}
            sizes="100vw"
            className="object-cover opacity-80"
          />
          {/* Dual Layer Gradient for High-Contrast Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent z-10" />
        </div>

        {/* Hero Content */}
        <Container className="relative z-20 pt-36 pb-12 flex flex-col items-center text-center">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-white/70 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/packages" className="hover:text-white transition-colors">Packages</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-emerald-400 font-semibold truncate max-w-[200px] md:max-w-none">{pkg.title}</span>
          </nav>

          <div className="max-w-4xl space-y-4 flex flex-col items-center w-full">
            <div className="flex flex-wrap justify-center gap-2.5 mb-2">
              <span className="bg-brand text-white px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-md">
                {pkg.destination}
              </span>
              <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
                <Clock className="w-3.5 h-3.5 text-brand" /> {pkg.duration}
              </span>
              {pkg.featured && (
                <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-md">
                  Signature Tour
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-sans drop-shadow-xl leading-tight">
              {pkg.title}
            </h1>

            <p className="text-base md:text-lg text-white/85 font-light max-w-2xl leading-relaxed mx-auto">
              {pkg.shortDescription}
            </p>
          </div>
        </Container>
      </div>

      {/* Main Content Layout */}
      <Container className="py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column: Itinerary & Details */}
          <div className="lg:w-2/3 space-y-12">
            {/* Overview Section */}
            {pkg.overview && (
              <section className="bg-slate-50/70 p-6 md:p-8 rounded-3xl border border-slate-200/80">
                <h2 className="text-xl md:text-2xl font-bold font-sans text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-6 bg-brand rounded-full inline-block" />
                  Journey Overview
                </h2>
                <p className="text-slate-600 leading-relaxed font-light text-base md:text-lg">
                  {pkg.overview}
                </p>
              </section>
            )}

            {/* Key Highlights */}
            {pkg.highlights && pkg.highlights.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl font-bold font-sans text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 bg-brand rounded-full inline-block" />
                  Key Highlights & Sightseeing
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {pkg.highlights.map((highlight, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-brand/40 transition-colors"
                    >
                      <div className="mt-0.5 text-brand flex-shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="text-slate-800 font-medium text-sm leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Day by Day Itinerary */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl font-bold font-sans text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 bg-brand rounded-full inline-block" />
                  Day-by-Day Itinerary
                </h2>
                <div className="space-y-6 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
                  {pkg.itinerary.map((day) => (
                    <div key={day.day} className="flex gap-4 md:gap-6 relative">
                      {/* Day Number Badge */}
                      <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-md ring-4 ring-white z-10">
                        {day.day}
                      </div>

                      {/* Day Content Card */}
                      <div className="flex-1 bg-white p-5 md:p-6 rounded-2xl border border-slate-200/90 shadow-sm">
                        <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 font-sans">
                          {day.title}
                        </h3>
                        <p className="text-slate-600 font-light text-sm leading-relaxed">
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
                  <div className="bg-emerald-50/60 p-6 md:p-7 rounded-3xl border border-emerald-200/80">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 font-sans">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      What&apos;s Included
                    </h3>
                    <ul className="space-y-3">
                      {pkg.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-slate-700 text-xs md:text-sm leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Exclusions */}
                {pkg.exclusions && pkg.exclusions.length > 0 && (
                  <div className="bg-rose-50/50 p-6 md:p-7 rounded-3xl border border-rose-200/70">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 font-sans">
                      <XCircle className="w-5 h-5 text-rose-500" />
                      What&apos;s Not Included
                    </h3>
                    <ul className="space-y-3">
                      {pkg.exclusions.map((exc, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-slate-700 text-xs md:text-sm leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
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
              <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex items-start gap-3.5">
                <Calendar className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Seasonal Validity & Terms</h4>
                  <p className="text-slate-600 text-xs md:text-sm font-light leading-relaxed">
                    {pkg.validityNotice}. Peak surcharge may apply during national holidays, festive periods, and long weekends.
                  </p>
                </div>
              </section>
            )}

            {/* Authoritative Holiday Tour Package Terms & Conditions Modal */}
            <PackageTermsModal
              packageName={pkg.title}
              destination={pkg.destination}
            />
          </div>

          {/* Right Column: Sticky Booking & Enquiry Box */}
          <div className="lg:w-1/3">
            <div className="sticky top-28 space-y-6">
              {/* Pricing & Primary CTA Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-bl-full pointer-events-none" />

                {/* Pricing Block */}
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block mb-1">
                    Price
                  </span>
                  <div className="flex flex-wrap items-baseline gap-2 mb-2">
                    <span className="text-2xl md:text-3xl font-bold text-brand font-display tracking-tight">
                      {pkg.priceDisplay}
                    </span>
                    {pkg.priceDisplay.startsWith("Starting") && (
                      <span className="text-xs font-semibold text-slate-500">/ person (twin sharing)</span>
                    )}
                  </div>

                  {/* Validity Display */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 my-3 flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-slate-500 block">Package Validity:</span>
                      <span className={`text-xs md:text-sm font-bold leading-snug ${
                        pkg.validityStatus === "confirmation_required"
                          ? "text-amber-700"
                          : "text-emerald-800"
                      }`}>
                        {pkg.validityDisplay || "1 October 2026 – 31 March 2027"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Contact CTA */}
                <div className="space-y-3 mb-6">
                  <Link
                    href={`/contact?package=${pkg.slug}`}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl text-base font-bold transition-all bg-brand text-white hover:bg-brand/90 hover:shadow-lg h-13 shadow-md"
                  >
                    <Send className="w-4 h-4" /> Send Enquiry Form
                  </Link>

                  <a
                    href={pkg.whatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 rounded-2xl text-sm font-bold transition-all bg-[#0E7443] text-white hover:bg-[#0A5C34] h-12 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                  </a>

                  <a
                    href={`/api/packages/${pkg.slug}/download`}
                    download
                    className="w-full flex items-center justify-center gap-2 rounded-2xl text-sm font-semibold transition-all bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 h-12"
                  >
                    <Download className="w-4 h-4 text-brand" /> Download Original PDF
                  </a>
                </div>

                {/* Service Guarantees */}
                <div className="pt-6 border-t border-slate-100 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                    <ShieldCheck className="w-4 h-4 text-brand flex-shrink-0" />
                    Customizable to your specific travel dates
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                    <ShieldCheck className="w-4 h-4 text-brand flex-shrink-0" />
                    Dedicated point-to-point AC transfers
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                    <ShieldCheck className="w-4 h-4 text-brand flex-shrink-0" />
                    IATA certified & end-to-end trip assistance
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

                {/* Pricing Notice Footnote - Very Small Font at the End */}
                <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-400 leading-relaxed text-center sm:text-left">
                  <span className="font-semibold text-slate-500">Notice Regarding Tour Pricing:</span> Prices shown are indicative base rates. Actual tour price varies depending on specific travel dates, seasonality, number of guests, and selected hotel category. Send a request below for an exact, tailored quotation.
                </div>
              </div>

              {/* Need Assistance Card */}
              <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200/80 text-center overflow-hidden">
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
      </Container>
    </div>
  )
}
