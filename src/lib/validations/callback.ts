import { z } from "zod";

/**
 * Validates domestic Indian mobile numbers and international phone numbers.
 * Preserves user's raw string while checking formatting rules.
 */
export function validatePhoneNumber(phoneRaw: string): { isValid: boolean; error?: string } {
  const trimmed = phoneRaw.trim();
  if (!trimmed) {
    return { isValid: false, error: "Phone number is required." };
  }

  // Allow only digits, plus prefix, spaces, hyphens, and parentheses
  if (!/^[+]?[0-9\s\-()]+$/.test(trimmed)) {
    return { isValid: false, error: "Phone number contains invalid characters." };
  }

  const digits = trimmed.replace(/\D/g, "");

  if (digits.length < 7) {
    return { isValid: false, error: "Phone number is too short (minimum 7 digits)." };
  }

  if (digits.length > 15) {
    return { isValid: false, error: "Phone number cannot exceed 15 digits." };
  }

  // If input matches an Indian telephone number pattern (+91, 91, 0, or 10 digits)
  let indianDigits = "";
  if (trimmed.startsWith("+91")) {
    indianDigits = digits.slice(2);
  } else if (digits.length === 12 && digits.startsWith("91")) {
    indianDigits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith("0")) {
    indianDigits = digits.slice(1);
  } else if (digits.length === 10) {
    indianDigits = digits;
  }

  if (indianDigits.length === 10) {
    if (!/^[6-9]\d{9}$/.test(indianDigits)) {
      return {
        isValid: false,
        error: "Indian mobile numbers must start with 6, 7, 8, or 9.",
      };
    }
  }

  return { isValid: true };
}

export const callbackRequestSchema = z
  .object({
    name: z
      .string()
      .trim()
      .max(100, "Name cannot exceed 100 characters")
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .trim()
      .min(1, "Phone number is required")
      .max(25, "Phone number cannot exceed 25 characters"),
    email: z
      .string()
      .trim()
      .max(120, "Email cannot exceed 120 characters")
      .optional()
      .or(z.literal("")),
    tourType: z
      .enum(["national", "international", ""])
      .optional()
      .default(""),
    requestType: z
      .enum(["callback", "quote"])
      .optional()
      .default("callback"),
    packageSlug: z.string().trim().max(100).optional().or(z.literal("")),
    packageName: z.string().trim().max(200).optional().or(z.literal("")),
    honeypot: z.string().max(0, "Invalid submission").optional(),
  })
  .superRefine((data, ctx) => {
    // Validate phone number
    const phoneRes = validatePhoneNumber(data.phone);
    if (!phoneRes.isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: phoneRes.error || "Please enter a valid phone number.",
      });
    }

    // If requestType is 'quote', email is strictly mandatory
    if (data.requestType === "quote") {
      if (!data.email || data.email.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["email"],
          message: "Email address is required for a free quote.",
        });
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email.trim())) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["email"],
            message: "Please enter a valid email address.",
          });
        }
      }
    } else if (data.email && data.email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email.trim())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["email"],
          message: "Please enter a valid email address.",
        });
      }
    }
  });

export type CallbackRequestInput = z.infer<typeof callbackRequestSchema>;
