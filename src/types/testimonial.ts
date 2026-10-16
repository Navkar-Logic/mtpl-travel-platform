export type TestimonialPlatform = 
  | "whatsapp" 
  | "whatsapp_group" 
  | "blackberry_messenger" 
  | "sms" 
  | "email_testimonial" 
  | "platform_review";

export type TestimonialRecord = {
  id: string;
  image: string;
  originalFilename: string;
  format: "PNG" | "JPEG";
  dimensions: {
    width: number;
    height: number;
  };
  type: TestimonialPlatform;
  customerName: string | null;
  customerEntity?: string;
  customerLocation?: string;
  recipient?: string;
  text: string;
  conversationContext?: Array<{
    sender: string;
    text?: string;
    time?: string;
    subject?: string;
  }>;
  rating: number | null;
  ratingStatus: "verified" | "not_present" | "unclear";
  platform: string | null;
  date: string | null;
  language: string;
  extractionConfidence: "high" | "medium" | "low";
  uncertainText: string[];
  privacyFlags: string[];
  publicationStatus: "needs_review" | "approved" | "rejected";
};

// Legacy compatible view model if needed
export type Testimonial = {
  id: string;
  name: string;
  role?: string;
  company?: string;
  text: string;
  rating?: number;
  imagePlaceholder?: string;
  source?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  date?: string;
};

