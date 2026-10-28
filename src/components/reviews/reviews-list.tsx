"use client";

import * as React from "react";
import { ReviewCard } from "./review-card";
import { TestimonialRecord } from "@/types/testimonial";
import { ChevronDown, MessageSquareHeart } from "lucide-react";

interface ReviewsListProps {
  reviews: TestimonialRecord[];
  initialCount?: number;
  increment?: number;
}

export function ReviewsList({
  reviews,
  initialCount = 9,
  increment = 9,
}: ReviewsListProps) {
  const [visibleCount, setVisibleCount] = React.useState(initialCount);

  const visibleReviews = React.useMemo(() => {
    return reviews.slice(0, visibleCount);
  }, [reviews, visibleCount]);

  const hasMore = visibleCount < reviews.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + increment, reviews.length));
  };

  return (
    <div className="space-y-10">
      {/* Reviews Summary Counter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E3EBE7]">
        <div className="flex items-center gap-2.5">
          <MessageSquareHeart className="w-5 h-5 text-[#16A765]" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#063D2A] font-sans">
            Traveller Stories &amp; Experiences
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#66736D] font-medium">
          Showing <span className="font-bold text-[#063D2A]">{visibleReviews.length}</span> of{" "}
          <span className="font-bold text-[#063D2A]">{reviews.length}</span> verified customer reviews
        </p>
      </div>

      {/* Text Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {visibleReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Clean Load More Action */}
      {hasMore && (
        <div className="text-center pt-6">
          <button
            type="button"
            onClick={handleLoadMore}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white border border-[#16A765] text-[#16A765] hover:bg-[#F0FDF4] hover:text-[#063D2A] font-bold text-sm shadow-xs transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#16A765] focus:ring-offset-2"
          >
            <span>Load More Reviews</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
