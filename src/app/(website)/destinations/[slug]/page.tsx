import * as React from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import { Container } from "@/components/ui/container"
import { getDestinationBySlug } from "@/features/destinations/data/destinations"
import { getPackageBySlug } from "@/features/packages/data/packages"
import { PackageCard } from "@/components/packages/package-card"
import { officeImages } from "@/config/office-images"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const dest = getDestinationBySlug(resolvedParams.slug)
  
  if (!dest) {
    return {
      title: "Destination Not Found",
    }
  }

  return {
    title: `${dest.name} | MTPL Destinations`,
    description: dest.shortDescription,
    alternates: {
      canonical: `/destinations/${resolvedParams.slug}`,
    },
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function DestinationDetailPage({ params }: Props) {
  const resolvedParams = await params
  const dest = getDestinationBySlug(resolvedParams.slug)

  if (!dest) {
    notFound()
  }

  const relatedPackages = dest.relatedPackageSlugs 
    ? dest.relatedPackageSlugs.map(slug => getPackageBySlug(slug)).filter((p): p is NonNullable<typeof p> => p !== undefined)
    : [];

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero */}
      <div className="relative w-full overflow-hidden bg-[var(--brand-dark)] border-b border-emerald-950/40 flex flex-col justify-center min-h-[42vh] md:min-h-[50vh]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-dark)] via-[var(--brand-dark)]/70 to-black/30 z-10" />
          {dest.heroImagePlaceholder ? (
            <Image
              src={dest.heroImagePlaceholder}
              alt={dest.name}
              fill
              priority
              className="object-cover opacity-60 z-0"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 flex items-center justify-center relative">
               <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand via-slate-900 to-slate-950" />
            </div>
          )}
        </div>
        
        <Container className="relative z-20 pt-28 pb-12 mt-auto flex flex-col items-center text-center">
          <div className="max-w-4xl space-y-4 flex flex-col items-center w-full">
            <div className="flex flex-wrap justify-center gap-3 mb-2">
              {dest.region && (
                <span className="bg-brand text-white px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-xs">
                  {dest.region}
                </span>
              )}
              {dest.country && (
                <span className="bg-white/20 backdrop-blur-md text-white border border-white/20 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                  {dest.country}
                </span>
              )}
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-lg font-sans">
              {dest.name}
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-2xl font-light mx-auto">
              {dest.shortDescription}
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3 space-y-12">
            
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
              <p className="text-slate-600 leading-relaxed font-light text-lg">
                {dest.longDescription || dest.shortDescription}
              </p>
            </section>

            {/* Highlights */}
            {dest.highlights && dest.highlights.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dest.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div className="mt-0.5 text-brand flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-slate-700 font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Best For */}
            {dest.bestFor && dest.bestFor.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Perfect For</h2>
                <div className="flex flex-wrap gap-3">
                  {dest.bestFor.map((category, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-brand/10 text-brand px-4 py-2 rounded-full font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                      {category}
                    </span>
                  ))}
                </div>
              </section>
            )}
            
            {/* Related Packages */}
            {relatedPackages.length > 0 && (
              <section className="pt-8 border-t border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Popular Packages to {dest.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPackages.map(pkg => (
                    <PackageCard key={pkg.id} pkg={pkg} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-28 bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Plan your trip to {dest.name}</h3>
              <p className="text-slate-600 text-sm mb-6 font-light">
                Our experts can help you craft the perfect itinerary to experience everything {dest.name} has to offer.
              </p>
              
              <Link 
                href={`/contact?destination=${dest.slug}#enquiry-form`}
                className="w-full flex items-center justify-center gap-2 rounded-xl text-base font-bold transition-all bg-brand text-white hover:bg-brand/90 hover:shadow-lg h-14"
              >
                Enquire Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
              
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" /></svg>
                  Customizable itineraries
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" /></svg>
                  Expert travel advice
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" /></svg>
                  End-to-end support
                </div>
              </div>

              {/* Consultation Reassurance Card */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-3 bg-slate-900 border border-slate-200/60 shadow-xs">
                  <Image
                    src={officeImages.clientConsultation.src}
                    alt={officeImages.clientConsultation.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 320px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-xs">
                    In-Person Planning
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-light leading-relaxed text-center">
                  Visit our Dharampeth, Nagpur head office or connect via WhatsApp for personalized routing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
