import * as React from "react"
import { Container } from "@/components/ui/container"
import { Star, ExternalLink, ShieldCheck, Award, ThumbsUp, MapPin, CheckCircle2 } from "lucide-react"

export function GoogleIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.04h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
        fill="#4285F4"
      />
      <path
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.04c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.27 21.43 7.35 24 12 24z"
        fill="#34A853"
      />
      <path
        d="M5.28 14.28c-.25-.72-.38-1.49-.38-2.28s.13-1.56.38-2.28V6.59H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.41l4.03-3.13z"
        fill="#FBBC05"
      />
      <path
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.27 2.57 1.25 6.59l4.03 3.13c.95-2.83 3.6-4.97 6.72-4.97z"
        fill="#EA4335"
      />
    </svg>
  )
}

export function JustdialBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center font-black tracking-tight text-white bg-[#F58220] rounded-md text-xs px-2 py-0.5 shadow-xs ${className}`}>
      JD
    </span>
  )
}

interface RatingStarProps {
  score: number // e.g. 4.6
}

function StarRatingRow({ score }: RatingStarProps) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating: ${score} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const isFull = i <= Math.floor(score)
        const isPartial = !isFull && i - 1 < score
        return (
          <div key={i} className="relative">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            {isPartial && (
              <div 
                className="absolute inset-0 overflow-hidden" 
                style={{ width: `${(score % 1) * 100}%` }}
              >
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

const reviewThemes = [
  { label: "Professional Team", count: 8, icon: "👥" },
  { label: "Tour Planning", count: 6, icon: "🗺️" },
  { label: "Itinerary", count: 5, icon: "📍" },
  { label: "Seamless Trips", count: 4, icon: "✈️" },
  { label: "170+ Real Photos", count: null, icon: "📸" },
  { label: "Nagpur, Maharashtra", count: null, icon: "🏢" },
]

export function PublicRatingsShowcase() {
  const googleSearchUrl = "https://www.google.com/search?q=Mishrikotkar+Travels+Pvt+Ltd+Nagpur+Reviews"
  const justdialUrl = "https://www.justdial.com/Nagpur/Mishrikotkar-Travels-Pvt-Ltd-Dharampeth/0712PX712-X712-000499648937-I9B2_BZDET"

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#F7FBF9] via-white to-white border-b border-border/70 relative overflow-hidden">
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-brand/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 space-y-8 md:space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 text-brand border border-brand/20 text-xs font-bold tracking-[0.15em] uppercase">
            <ShieldCheck className="w-4 h-4 text-brand" />
            <span>Public Web Standing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-foreground">
            Rated <span className="text-brand">4.6 / 5.0</span> Across Google & Justdial
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            Independent ratings and traveller sentiment from verified Google Search reviews and Justdial public votes for Mishrikotkar Travels Pvt Ltd, Nagpur.
          </p>
        </div>

        {/* 3 Prominent Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {/* Card 1: Google Reviews Summary */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shadow-xs">
                    <GoogleIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground">Google Review Summary</h3>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand" />
                      Nagpur, Maharashtra · Open
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified
                </span>
              </div>

              {/* Big Score */}
              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-black font-sans tracking-tight text-foreground">
                  4.6
                </span>
                <div className="space-y-1">
                  <StarRatingRow score={4.6} />
                  <span className="text-xs font-semibold text-muted-foreground block">
                    Based on 57 Google Reviews
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                Travel agency with 170+ traveler photos, itinerary reviews, and verified domestic and international journey feedback.
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100">
              <a
                href={googleSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-brand/10 border border-slate-200/80 hover:border-brand/40 text-xs font-bold text-foreground hover:text-brand transition-colors group/btn"
                aria-label="View Mishrikotkar Travels reviews on Google"
              >
                <span>Read Reviews on Google</span>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover/btn:text-brand transition-colors" />
              </a>
            </div>
          </div>

          {/* Card 2: Justdial Web Reputation */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50/80 border border-orange-200/80 flex items-center justify-center shadow-xs">
                    <JustdialBadge />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground">Reviews from the Web</h3>
                    <p className="text-[11px] text-muted-foreground">Justdial Traveler Ratings</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                  89 Votes
                </span>
              </div>

              {/* Big Score */}
              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-black font-sans tracking-tight text-foreground">
                  4.6<span className="text-xl sm:text-2xl font-bold text-muted-foreground">/5</span>
                </span>
                <div className="space-y-1">
                  <StarRatingRow score={4.6} />
                  <span className="text-xs font-semibold text-muted-foreground block">
                    89 Verified Public Votes
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                One of Nagpur&apos;s most established travel consultancies, recognized for reliable holiday packages, airline ticketing, and visa support.
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100">
              <a
                href={justdialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-orange-50/70 border border-slate-200/80 hover:border-orange-300 text-xs font-bold text-foreground hover:text-orange-700 transition-colors group/btn"
                aria-label="View Mishrikotkar Travels ratings on Justdial"
              >
                <span>View Justdial Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover/btn:text-orange-700 transition-colors" />
              </a>
            </div>
          </div>

          {/* Card 3: Combined Aggregate Trust */}
          <div className="bg-gradient-to-br from-brand-pale via-white to-[#EEF8F3] rounded-3xl p-6 sm:p-7 border border-[#A7F3C0]/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-brand text-white flex items-center justify-center shadow-xs">
                    <Award className="w-5 h-5 text-emerald-100" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground">Combined Web Standing</h3>
                    <p className="text-[11px] text-brand font-medium">146+ Verified Ratings</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand bg-white px-2 py-0.5 rounded-full border border-brand/30 shadow-2xs">
                  4.6 ★ Avg
                </span>
              </div>

              {/* Big Aggregate Stat */}
              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-black font-sans tracking-tight text-brand">
                  146+
                </span>
                <div className="space-y-1">
                  <StarRatingRow score={4.6} />
                  <span className="text-xs font-semibold text-foreground block">
                    Public Ratings & Reviews
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-1 text-xs text-foreground/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                  <span>30+ Years of travel planning experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                  <span>TAAI & IATA accredited operations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                  <span>100% genuine screenshots & customer records</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-brand/15">
              <div className="flex items-center gap-2 text-xs font-bold text-brand">
                <ThumbsUp className="w-4 h-4 text-brand" />
                <span>Consistently recommended for custom trips</span>
              </div>
            </div>
          </div>
        </div>

        {/* Highlighted Review Themes (Directly from user's Google Reviews screenshot) */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1 max-w-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand">
                Frequently Mentioned by Travellers
              </span>
              <h4 className="text-base sm:text-lg font-bold text-foreground">
                What Travellers Praise Most on Google Reviews
              </h4>
              <p className="text-xs text-muted-foreground">
                Key themes highlighted in public Google reviews for Mishrikotkar Travels Pvt Ltd.
              </p>
            </div>

            {/* Topic Pills */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {reviewThemes.map((theme) => (
                <div
                  key={theme.label}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-50 hover:bg-[#EEF8F3] text-foreground border border-slate-200 hover:border-brand/40 text-xs font-semibold transition-colors shadow-2xs"
                >
                  <span className="text-sm">{theme.icon}</span>
                  <span className="font-bold">{theme.label}</span>
                  {theme.count !== null && (
                    <span className="px-2 py-0.5 rounded-full bg-brand/10 text-brand text-[11px] font-black">
                      {theme.count}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
