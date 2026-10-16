export type EnquirySource = "general" | "package" | "destination" | "offer" | "service";
export type EnquiryStatus = "NEW" | "CONTACTED" | "IN_PROGRESS" | "CONVERTED" | "CLOSED" | "SPAM";
export type TravelType = "domestic" | "international" | "corporate" | "holidays-visas" | "group-custom" | "other";

/**
 * The 5 mandatory customer declarations required for enquiry submission.
 */
export interface EnquiryConsentDeclarations {
  /** 1. Accuracy of Information confirmation */
  accuracyConfirmed: boolean;
  /** 2. Contact and communication consent via phone, email, WhatsApp */
  communicationConsent: boolean;
  /** 3. Privacy Policy acknowledgement */
  privacyAcknowledged: boolean;
  /** 4. Enquiry does not confirm a booking disclaimer acknowledgement */
  bookingDisclaimerAcknowledged: boolean;
  /** 5. Terms & Conditions and Website Disclaimer acknowledgement */
  termsAcknowledged: boolean;
}

/**
 * Persisted consent audit record with server-validated timestamp and policy version.
 */
export interface EnquiryConsentDetails extends EnquiryConsentDeclarations {
  /** Server-recorded timestamp of explicit consent acceptance */
  acceptedAt: string | Date;
  /** Server-validated policy version identifier (e.g. '2026.1') */
  policyVersion: string;
}

export type Enquiry = {
  id?: string;
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  travelType?: TravelType;
  destination?: string;
  travelDate?: string;
  returnDate?: string;
  travellers?: number;
  budget?: string;
  message: string;
  source: EnquirySource;
  packageSlug?: string;
  destinationSlug?: string;
  offerSlug?: string;
  serviceId?: string;
  consentAccepted: boolean;
  consentDetails?: EnquiryConsentDetails;
  status: EnquiryStatus;
  createdAt?: string;
  updatedAt?: string;
};
