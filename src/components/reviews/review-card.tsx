"use client";

import * as React from "react";
import Image from "next/image";
import { Star, Calendar, Quote, CheckCircle2, ShieldCheck } from "lucide-react";
import { TestimonialRecord } from "@/types/testimonial";

interface ReviewCardProps {
  review: TestimonialRecord;
}

function formatVerifiedDate(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    if (year && month && day) {
      const date = new Date(Date.UTC(year, month - 1, day));
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      });
    }
  } catch {
    // Return original string if parse fails
  }
  return dateStr;
}

function getInitials(name?: string | null): string {
  if (!name || !name.trim()) return "MT";
  // Strip common honorifics
  const clean = name.replace(/^(dr\.?|mr\.?|mrs\.?|ms\.?|prof\.?|shri\.?)\s+/i, "").trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "MT";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getPlatformBadge(type: TestimonialRecord["type"]): string {
  switch (type) {
    case "platform_review":
      return "Google Review";
    case "email_testimonial":
      return "Email Feedback";
    case "sms":
      return "SMS Feedback";
    case "whatsapp":
    case "whatsapp_group":
      return "WhatsApp";
    default:
      return "Client Feedback";
  }
}

export function ReviewCard({ review }: ReviewCardProps) {
  const hasVerifiedRating =
    review.ratingStatus === "verified" &&
    typeof review.rating === "number" &&
    review.rating > 0;

  const displayName = review.customerName?.trim() || "Verified Traveller";
  const subtitle =
    review.customerEntity?.trim() ||
    review.customerLocation?.trim() ||
    "Verified Guest Experience";

  const initials = getInitials(review.customerName);

  return (
    <article className="group relative flex flex-col h-[340px] w-full bg-[#0A1626] rounded-2xl border border-white/20 p-6 shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.45)] hover:border-white/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Testimonial Background Image (100% Clear, Original colors) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <Image
          src="/assets/testimonial-bg.png"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center opacity-100 scale-105 transition-transform duration-500 group-hover:scale-110"
          aria-hidden="true"
        />
      </div>

      {/* Decorative top hover accent */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#16A765]/0 to-transparent group-hover:via-[#16A765] transition-all duration-300 z-10" 
        aria-hidden="true"
      />

      {/* Decorative quotation watermark in background */}
      <Quote 
        className="absolute top-4 right-4 w-12 h-12 text-white/15 -scale-x-100 pointer-events-none select-none transition-transform duration-300 group-hover:scale-105 z-0" 
        aria-hidden="true"
      />

      {/* Top Header: Fixed height for perfect horizontal alignment across cards */}
      <div className="relative z-10 flex-shrink-0 flex items-center justify-between gap-3 pb-3.5 border-b border-white/20">
        <div className="flex items-center gap-3 min-w-0">
          {/* Customer Initials Avatar */}
          <div 
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#16A765] to-[#0E7443] text-white font-bold text-xs sm:text-sm flex items-center justify-center flex-shrink-0 shadow-md ring-2 ring-white/30 tracking-wider"
            aria-hidden="true"
          >
            {initials}
          </div>

          {/* Name & Subtitle (fixed 2 lines) */}
          <div className="min-w-0">
            <h3 className="font-bold text-sm sm:text-[15px] text-white font-sans truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]" title={displayName}>
              {displayName}
            </h3>
            <p className="text-xs text-white/90 truncate mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]" title={subtitle}>
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right Header Status: Star Rating or Verified Badge */}
        {hasVerifiedRating ? (
          <div
            className="flex items-center gap-1 bg-black/45 border border-white/25 px-2.5 py-1 rounded-full text-amber-300 text-xs font-bold flex-shrink-0 shadow-sm backdrop-blur-xs"
            aria-label={`Verified rating: ${review.rating} out of 5 stars`}
          >
            <div className="flex items-center">
              {Array.from({ length: Math.round(review.rating || 5) }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="ml-1 text-xs">{review.rating?.toFixed(1)}</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-black/40 px-2.5 py-1 rounded-full border border-white/30 flex-shrink-0 backdrop-blur-xs shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
            <span>Verified</span>
          </div>
        )}
      </div>

      {/* Review Body Text: Uniform fixed height scrollable container */}
      <div className="flex-1 py-3.5 flex flex-col justify-start relative overflow-hidden">
        <div className="relative z-10 w-full h-full overflow-y-auto pr-1 text-sm text-white font-sans leading-relaxed whitespace-pre-line break-words [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/30 hover:[&::-webkit-scrollbar-thumb]:bg-white/50 [&::-webkit-scrollbar-track]:bg-transparent">
          <p className="text-[13.5px] sm:text-sm text-white leading-relaxed font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            &ldquo;{review.text.trim()}&rdquo;
          </p>
        </div>
      </div>

      {/* Footer: Guaranteed uniform bottom bar across ALL cards */}
      <div className="relative z-10 flex-shrink-0 h-10 pt-2.5 border-t border-white/20 flex items-center justify-between text-xs text-white">
        {review.date ? (
          <span className="inline-flex items-center gap-1.5 font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
            <Calendar className="w-3.5 h-3.5 text-[#34D399]" />
            <span>{formatVerifiedDate(review.date)}</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
            <span>Verified Guest</span>
          </span>
        )}

        <span className="text-[11px] font-semibold text-white bg-black/40 px-2.5 py-0.5 rounded-md border border-white/30 backdrop-blur-xs shadow-sm">
          {getPlatformBadge(review.type)}
        </span>
      </div>
    </article>
  );
}
