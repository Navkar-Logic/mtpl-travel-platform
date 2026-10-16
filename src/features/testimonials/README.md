# Testimonials Data Schema & Asset Management

This directory hosts the structured content manifest for customer testimonials supplied by Mishrikotkar Travels Pvt. Ltd. (MTPL).

## File Structure

- `testimonials.json`: Authoritative JSON manifest capturing extraction and audit data for all 29 customer feedback images.
- Images directory: `public/assets/testimonials/` (`testimonial-001.png` through `testimonial-029.jpg`).

## Schema Specification (`testimonials.json`)

```typescript
interface TestimonialsManifest {
  version: number;
  sourceArchive: string;
  totalImages: number;
  testimonials: TestimonialRecord[];
}

interface TestimonialRecord {
  id: string; // "testimonial-001" .. "testimonial-029"
  image: string; // Project-relative public web path, e.g. "/assets/testimonials/testimonial-001.png"
  originalFilename: string; // Original path within Test.zip archive
  format: "PNG" | "JPEG";
  dimensions: {
    width: number;
    height: number;
  };
  type: "whatsapp" | "whatsapp_group" | "blackberry_messenger" | "sms" | "email_testimonial" | "platform_review";
  customerName: string | null; // Customer name only if explicitly supported by the source
  customerEntity?: string; // Optional company or group entity if visible
  customerLocation?: string; // Optional city/location tag if visible
  recipient?: string; // Recipient or chat counterpart
  text: string; // Verbatim extracted testimonial content
  conversationContext?: Array<{
    sender: string;
    text: string;
    time?: string;
  }>;
  rating: number | null; // Numerical star rating (1 to 5) ONLY if visibly present in the source; otherwise null
  ratingStatus: "verified" | "not_present" | "unclear";
  platform: string | null; // Platform identified from interface (e.g., "WhatsApp", "BBM", "Google Review")
  date: string | null; // ISO YYYY-MM-DD date if explicitly visible; otherwise null
  language: string; // Primary language code ('en', 'mr', 'hinglish')
  extractionConfidence: "high" | "medium" | "low";
  uncertainText: string[]; // List of uncertain or ambiguous readings
  privacyFlags: string[]; // Privacy concerns: phone numbers, profile photos, personal travel logistics
  publicationStatus: "needs_review" | "approved" | "rejected"; // Default: "needs_review"
}
```

## Privacy & Publication Protocol

1. **Default Status:** All testimonials are set to `needs_review`.
2. **PII Protection:** Multiple screenshots contain visible mobile numbers (e.g., `093 72 118234`, `098222 98342`, `98222 26205`, `9881245457`, `9775579203`, `+91 94222 06791`, `+91 96043 84564`), personal profile photos, and full names.
3. **Publication Rules:** Unmodified source screenshots containing customer phone numbers or private profile avatars must NOT be directly published to production without client redaction approval or text-only card treatment.
