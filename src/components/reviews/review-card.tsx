"use client";

import * as React from "react";
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
    <article className="group relative flex flex-col h-[340px] w-full bg-white rounded-2xl border border-[#E3EBE7] p-6 shadow-[0_4px_16px_rgba(6,61,42,0.03)] hover:shadow-[0_12px_32px_rgba(6,61,42,0.08)] hover:border-[#16A765]/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Decorative top hover accent */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#16A765]/0 to-transparent group-hover:via-[#16A765] transition-all duration-300" 
        aria-hidden="true"
      />

      {/* Decorative quotation watermark in background */}
      <Quote 
        className="absolute top-4 right-4 w-12 h-12 text-[#16A765]/8 -scale-x-100 pointer-events-none select-none transition-transform duration-300 group-hover:scale-105" 
        aria-hidden="true"
      />

      {/* Top Header: Fixed height for perfect horizontal alignment across cards */}
      <div className="flex-shrink-0 flex items-center justify-between gap-3 pb-3.5 border-b border-[#F0F4F2]">
        <div className="flex items-center gap-3 min-w-0">
          {/* Customer Initials Avatar */}
          <div 
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#063D2A] to-[#16A765] text-white font-bold text-xs sm:text-sm flex items-center justify-center flex-shrink-0 shadow-xs ring-2 ring-[#DCFCE7]/60 tracking-wider"
            aria-hidden="true"
          >
            {initials}
          </div>

          {/* Name & Subtitle (fixed 2 lines) */}
          <div className="min-w-0">
            <h3 className="font-bold text-sm sm:text-[15px] text-[#17201C] font-sans truncate" title={displayName}>
              {displayName}
            </h3>
            <p className="text-xs text-[#66736D] truncate mt-0.5" title={subtitle}>
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right Header Status: Star Rating or Verified Badge */}
        {hasVerifiedRating ? (
          <div
            className="flex items-center gap-1 bg-[#FFFBEB] border border-[#FEF3C7] px-2.5 py-1 rounded-full text-amber-800 text-xs font-bold flex-shrink-0 shadow-xs"
            aria-label={`Verified rating: ${review.rating} out of 5 stars`}
          >
            <div className="flex items-center">
              {Array.from({ length: Math.round(review.rating || 5) }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              ))}
            </div>
            <span className="ml-1 text-xs">{review.rating?.toFixed(1)}</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#16A765] bg-[#F0FDF4] px-2.5 py-1 rounded-full border border-[#DCFCE7] flex-shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A765]" />
            <span>Verified</span>
          </div>
        )}
      </div>

      {/* Review Body Text: Uniform fixed height scrollable container */}
      <div className="flex-1 py-3.5 flex flex-col justify-start relative overflow-hidden">
        <div className="relative z-10 w-full h-full overflow-y-auto pr-1 text-sm text-[#2D3748] font-sans leading-relaxed whitespace-pre-line break-words [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#16A765]/20 hover:[&::-webkit-scrollbar-thumb]:bg-[#16A765]/50 [&::-webkit-scrollbar-track]:bg-transparent">
          <p className="text-[13.5px] sm:text-sm text-[#2D3748] leading-relaxed">
            &ldquo;{review.text.trim()}&rdquo;
          </p>
        </div>
      </div>

      {/* Footer: Guaranteed uniform bottom bar across ALL cards */}
      <div className="flex-shrink-0 h-10 pt-2.5 border-t border-[#F0F4F2] flex items-center justify-between text-xs text-[#66736D]">
        {review.date ? (
          <span className="inline-flex items-center gap-1.5 font-medium text-[#52605A]">
            <Calendar className="w-3.5 h-3.5 text-[#16A765]" />
            <span>{formatVerifiedDate(review.date)}</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 font-medium text-[#52605A]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#16A765]" />
            <span>Verified Guest</span>
          </span>
        )}

        <span className="text-[11px] font-semibold text-[#063D2A] bg-[#F0FDF4] px-2.5 py-0.5 rounded-md border border-[#DCFCE7]">
          {getPlatformBadge(review.type)}
        </span>
      </div>
    </article>
  );
}
