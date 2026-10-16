import { z } from "zod";

export const CURRENT_POLICY_VERSION = "2026.1";

export const consentDeclarationsSchema = z.object({
  accuracyConfirmed: z.literal(true, {
    message: "Accuracy of information declaration must be accepted",
  }),
  communicationConsent: z.literal(true, {
    message: "Communication consent declaration must be accepted",
  }),
  privacyAcknowledged: z.literal(true, {
    message: "Privacy policy acknowledgement declaration must be accepted",
  }),
  bookingDisclaimerAcknowledged: z.literal(true, {
    message: "Booking disclaimer acknowledgement declaration must be accepted",
  }),
  termsAcknowledged: z.literal(true, {
    message: "Terms and disclaimer acknowledgement declaration must be accepted",
  }),
});

export const enquirySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  companyName: z.string().max(100, "Company name is too long").optional().or(z.literal("")),
  email: z.string().email("Invalid email address").max(100, "Email is too long"),
  phone: z.string().min(8, "Phone number is too short").max(20, "Phone number is too long"),
  travelType: z.enum(["domestic", "international", "corporate", "holidays-visas", "group-custom", "other"]).optional().or(z.literal("")),
  destination: z.string().max(100, "Destination is too long").optional().or(z.literal("")),
  travelDate: z.string().optional().or(z.literal("")),
  returnDate: z.string().optional().or(z.literal("")),
  travellers: z.coerce.number().min(1).max(999).optional().or(z.literal("").transform(() => undefined)),
  budget: z.string().max(50, "Budget string is too long").optional().or(z.literal("")),
  message: z.string().min(10, "Please provide more details (min 10 chars)").max(2000, "Message is too long"),
  source: z.enum(["general", "package", "destination", "offer", "service"]),
  packageSlug: z.string().max(100).optional().or(z.literal("")),
  destinationSlug: z.string().max(100).optional().or(z.literal("")),
  offerSlug: z.string().max(100).optional().or(z.literal("")),
  serviceId: z.string().max(100).optional().or(z.literal("")),
  consentAccepted: z.literal(true, {
    message: "Customer consent acceptance must be explicitly true",
  }),
  declarations: consentDeclarationsSchema,
  honeypot: z.string().max(0, "Invalid submission").optional(), // Spam prevention
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

