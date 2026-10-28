import type { EnquirySource, TravelType } from "@/types/enquiry";

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromName: string;
  fromEmail: string;
  notificationRecipient: string;
  appUrl: string;
  supportPhone: string;
  supportWhatsApp: string;
  isConfigured: boolean;
}

export interface EnquiryEmailData {
  id: string;
  reference: string;
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  travelType?: TravelType | string;
  destination?: string;
  travelDate?: string;
  returnDate?: string;
  travellers?: number;
  budget?: string;
  message: string;
  source: EnquirySource | string;
  packageSlug?: string;
  destinationSlug?: string;
  offerSlug?: string;
  serviceId?: string;
  createdAt?: Date;
  consentDetails?: {
    accuracyConfirmed?: boolean;
    communicationConsent?: boolean;
    privacyAcknowledged?: boolean;
    bookingDisclaimerAcknowledged?: boolean;
    termsAcknowledged?: boolean;
    acceptedAt?: Date;
    policyVersion?: string;
  };
}

export type EmailDeliveryStatus = "accepted" | "failed" | "skipped" | "delayed";

export interface EmailSendResult {
  status: EmailDeliveryStatus;
  messageId?: string;
  error?: string;
  recipient?: string;
  attemptedAt: Date;
}

export interface EnquiryEmailDispatchResult {
  customerConfirmation: EmailSendResult;
  companyNotification: EmailSendResult;
  overallSuccess: boolean;
}

export type { LeadNotificationEmailData } from "./templates/lead-notification";
export type { QuoteConfirmationEmailData } from "./templates/quote-confirmation";
export type { FeedbackEmailData } from "./templates/feedback-notification";
export type { RenderedEmail } from "./templates/customer-confirmation";
export type { BaseEmailProps, EmailActionItem, EmailDetailField } from "./templates/base-template";
