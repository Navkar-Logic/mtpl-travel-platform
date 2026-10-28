import { z } from "zod";
import { validatePhoneNumber } from "./callback";

/**
 * Zod validation schema for MTPL customer feedback submissions.
 * Enforces strict trimming, length limits, valid email, and optional phone validation.
 */
export const feedbackSubmissionSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Please enter your full name (at least 2 characters).")
      .max(100, "Full name cannot exceed 100 characters."),
    email: z
      .string()
      .trim()
      .min(1, "Email address is required.")
      .max(120, "Email address cannot exceed 120 characters.")
      .email("Please enter a valid email address."),
    phone: z
      .string()
      .trim()
      .max(25, "Phone number cannot exceed 25 characters.")
      .optional()
      .or(z.literal("")),
    packageOrService: z
      .string()
      .trim()
      .max(200, "Package or service details cannot exceed 200 characters.")
      .optional()
      .or(z.literal("")),
    feedback: z
      .string()
      .trim()
      .min(10, "Please share a few more details in your feedback (minimum 10 characters).")
      .max(3000, "Feedback text cannot exceed 3,000 characters."),
    honeypot: z
      .string()
      .max(0, "Invalid submission.")
      .optional(),
  })
  .superRefine((data, ctx) => {
    // If phone number is supplied, validate it using the standard telephone rules
    if (data.phone && data.phone.trim() !== "") {
      const phoneRes = validatePhoneNumber(data.phone);
      if (!phoneRes.isValid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["phone"],
          message: phoneRes.error || "Please enter a valid phone number.",
        });
      }
    }
  });

export type FeedbackSubmissionInput = z.infer<typeof feedbackSubmissionSchema>;
