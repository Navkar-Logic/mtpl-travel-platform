import * as React from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import { Container } from "@/components/ui/container"
import { getOfferBySlug } from "@/features/offers/data/offers"
import { getPackageBySlug } from "@/features/packages/data/packages"
import { getDestinationBySlug } from "@/features/destinations/data/destinations"
import { PackageCard } from "@/components/packages/package-card"
import { DestinationCard } from "@/components/destinations/destination-card"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const offer = getOfferBySlug(resolvedParams.slug)
  
  if (!offer) {
    return {
      title: "Offer Not Found",
    }
  }

  return {
    title: `${offer.title} | MTPL Offers`,
    description: offer.shortDescription,
    alternates: {
      canonical: `/offers/${resolvedParams.slug}`,
    },
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function OfferDetailPage({ params }: Props) {
  const resolvedParams = await params
  const offer = getOfferBySlug(resolvedParams.slug)

  if (!offer || !offer.isActive) {
    notFound()
  }

  const relatedPackages = offer.relatedPackageSlugs 
    ? offer.relatedPackageSlugs.map(slug => getPackageBySlug(slug)).filter((p): p is NonNullable<typeof p> => p !== undefined)
    : [];
    
  const relatedDestinations = offer.relatedDestinationSlugs 
    ? offer.relatedDestinationSlugs.map(slug => getDestinationBySlug(slug)).filter((d): d is NonNullable<typeof d> => d !== undefined)
    : [];

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero */}
      <div className="relative w-full overflow-hidden bg-[var(--brand-dark)] border-b border-emerald-950/40 flex flex-col justify-center min-h-[42vh] md:min-h-[50vh]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-dark)] via-[var(--brand-dark)]/70 to-black/30 z-10" />
          {offer.heroImagePlaceholder ? (
            <Image
              src={offer.heroImagePlaceholder}
              alt={offer.title}
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
            <span className="inline-block bg-brand text-white px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-xs">
              {offer.category}
            </span>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-lg font-sans">
              {offer.title}
            </h1>
            
            <p className="text-white/80 text-base md:text-lg max-w-2xl font-light mx-auto">
              {offer.shortDescription}
            </p>
            
            {offer.validity && (
              <div className="flex items-center justify-center gap-2 text-white/80 mt-2">
                <svg className="w-4 h-4 text-brand-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="font-medium text-xs text-white/90">{offer.validity}</span>
              </div>
            )}
          </div>
        </Container>
      </div>

      <Container className="py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3 space-y-12">
            
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">About this Offer</h2>
              <p className="text-slate-600 leading-relaxed font-light text-lg">
                {offer.description || offer.shortDescription}
              </p>
            </section>

            {/* Highlights */}
            {offer.highlights && offer.highlights.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Offer Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {offer.highlights.map((highlight, i) => (
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
            
            {/* Related Destinations */}
            {relatedDestinations.length > 0 && (
              <section className="pt-8 border-t border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Featured Destinations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedDestinations.map(dest => (
                    <DestinationCard key={dest.id} destination={dest} />
                  ))}
                </div>
              </section>
            )}
            
            {/* Related Packages */}
            {relatedPackages.length > 0 && (
              <section className="pt-8 border-t border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Applicable Packages</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPackages.map(pkg => (
                    <PackageCard key={pkg.id} pkg={pkg} />
                  ))}
                </div>
              </section>
            )}
            
            {/* Terms and Notes */}
            {offer.termsAndNotes && offer.termsAndNotes.length > 0 && (
              <section className="pt-8 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Terms & Conditions</h3>
                <ul className="space-y-3">
                  {offer.termsAndNotes.map((term, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-500 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0" />
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-28 bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Interested in this offer?</h3>
              <p className="text-slate-600 text-sm mb-6 font-light">
                Our experts are ready to help you plan your journey based on this promotion.
              </p>
              
              <Link 
                href={`/contact?offer=${offer.slug}#enquiry-form`}
                className="w-full flex items-center justify-center gap-2 rounded-xl text-base font-bold transition-all bg-brand text-white hover:bg-brand/90 hover:shadow-lg h-14"
              >
                {offer.ctaLabel || "Enquire Now"}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
