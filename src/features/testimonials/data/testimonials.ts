import testimonialsManifest from "./testimonials.json";
import { TestimonialRecord, Testimonial } from "@/types/testimonial";

export interface TestimonialsManifest {
  version: number;
  sourceArchive: string;
  totalImages: number;
  testimonials: TestimonialRecord[];
}

// Single source of truth from testimonials.json
export const allTestimonialRecords: TestimonialRecord[] = (testimonialsManifest as TestimonialsManifest).testimonials;

/**
 * Returns all unique testimonial records for website presentation.
 * Per Requirement 7: The duplicate pair testimonial-016 and testimonial-022 is deduplicated
 * by excluding the lower-resolution testimonial-022 and keeping the 1080x1920 testimonial-016.png.
 */
export function getWebsiteTestimonials(): TestimonialRecord[] {
  return allTestimonialRecords.filter(t => t.id !== "testimonial-022");
}

/**
 * Returns a curated set of 3-6 testimonials for the homepage preview,
 * representing key destinations/experiences (UK tour, Google Review, Switzerland, Andaman, etc.)
 */
export function getHomepageFeaturedTestimonials(limit: number = 6): TestimonialRecord[] {
  const websiteTestimonials = getWebsiteTestimonials();
  
  // Curate a diverse selection of 3-6 verified records across trip types
  const preferredIds = [
    "testimonial-021", // 5-Star Google Review by Amit Jain
    "testimonial-001", // Deven Chauhan (UK holiday tour email)
    "testimonial-015", // Sunil B Banubakode (Switzerland trip)
    "testimonial-019", // Shridhar Dhanagare (7 MTPL trips: Kashmir, Manali, Ooty, Dubai, etc.)
    "testimonial-025", // Dr Anita Khandelwal (Andaman family tour)
    "testimonial-014", // Dr Sonkuwar (Coorg / Bangalore / Nagpur tour)
  ];

  const featured = preferredIds
    .map(id => websiteTestimonials.find(t => t.id === id))
    .filter((t): t is TestimonialRecord => Boolean(t));

  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }

  // Fallback to first available unique records if any missing
  return websiteTestimonials.slice(0, limit);
}

// Legacy helper for any components expecting Testimonial format
export function getActiveTestimonials(): Testimonial[] {
  return getWebsiteTestimonials().map(t => ({
    id: t.id,
    name: t.customerName || "Valued Client",
    role: t.customerEntity || t.platform || undefined,
    text: t.text,
    rating: t.rating ?? undefined,
    date: t.date ?? undefined,
    isActive: true,
  }));
}

export function getFeaturedTestimonials(limit: number = 3): Testimonial[] {
  return getActiveTestimonials().slice(0, limit);
}
