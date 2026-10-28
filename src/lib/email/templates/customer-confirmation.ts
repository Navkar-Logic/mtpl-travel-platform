import "server-only";
import { escapeHtml, formatTelUrl } from "../config";
import type { EmailConfig, EnquiryEmailData } from "../types";
import {
  renderBaseEmailHtml,
  renderBaseEmailText,
  EmailActionItem,
  EmailDetailField,
  EMAIL_PALETTE,
} from "./base-template";

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

/**
 * Renders the customer confirmation email for comprehensive holiday enquiries.
 * Provides transparent itinerary recap, reassuring next steps, and direct MTPL desk actions.
 */
export function renderCustomerConfirmationEmail(
  data: EnquiryEmailData,
  config: EmailConfig,
  logoCidAvailable = true
): RenderedEmail {
  const subject = `Enquiry Received — Mishrikotkar Travels (Ref: #${data.reference})`;

  const details: EmailDetailField[] = [
    { label: "Destination", value: data.destination || "Personalized Custom Tour" },
    { label: "Tour Type", value: data.travelType || "Leisure / Holiday Tour" },
    { label: "Proposed Dates", value: data.travelDate ? `${data.travelDate}${data.returnDate ? ` to ${data.returnDate}` : ""}` : "Flexible / To be confirmed" },
    { label: "Travellers", value: data.travellers ? `${data.travellers} Person(s)` : "Not specified" },
    { label: "Budget / Tariff Note", value: data.budget || "Flexible / On Request" },
    ...(data.packageSlug ? [{ label: "Package Reference", value: data.packageSlug }] : []),
  ];

  // Optional Customer Notes Box
  let customContentHtml = "";
  if (data.message && data.message.trim()) {
    customContentHtml = `
      <div style="margin: 20px 0; background-color: #FAFCFA; border: 1px solid ${EMAIL_PALETTE.border}; border-radius: 8px; padding: 14px 18px;">
        <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: ${EMAIL_PALETTE.secondaryText}; margin-bottom: 4px;">
          Your Trip Planning Notes
        </div>
        <p style="margin: 0; font-size: 13px; color: ${EMAIL_PALETTE.primaryText}; line-height: 1.5; white-space: pre-wrap;">
          ${escapeHtml(data.message.trim())}
        </p>
      </div>
    `;
  }

  // Working customer support actions
  const actions: EmailActionItem[] = [
    {
      label: `Call Support: ${config.supportPhone}`,
      url: formatTelUrl(config.supportPhone),
      type: "primary",
    },
    {
      label: "Chat on WhatsApp",
      url: `https://wa.me/${config.supportWhatsApp}?text=${encodeURIComponent(`Hello MTPL, I have submitted an enquiry (Ref: #${data.reference}) and would like to speak with a consultant.`)}`,
      type: "secondary",
    },
  ];

  const introMessage = `Hello <strong>${escapeHtml(data.fullName)}</strong>,<br><br>Thank you for choosing <strong>Mishrikotkar Travels Pvt. Ltd. (MTPL)</strong>. We have successfully received your travel enquiry, and our holiday specialists are reviewing your journey requirements.`;

  const nextStepsTitle = "What Happens Next?";
  const nextStepsText = "An MTPL holiday consultant will review your preferences and connect with you shortly with transparent hotel tiers, dedicated private cab logistics, and a personalized day-by-day plan.";

  const disclaimerText = "Important Notice: This acknowledgement email confirms that your travel request has been safely received. It does not constitute a confirmed ticket, hotel booking, or tariff lock. All itineraries and tariffs are finalized upon customer confirmation.";

  const html = renderBaseEmailHtml(
    {
      subject,
      badgeText: "ENQUIRY CONFIRMATION",
      title: "We Have Received Your Travel Enquiry",
      referenceCode: data.reference,
      introMessage,
      details,
      customContentHtml,
      actions,
      nextStepsTitle,
      nextStepsText,
      disclaimerText,
      recipientType: "customer",
      headerLogoCid: logoCidAvailable ? "mtpl-desktop-logo" : undefined,
      footerLogoCid: logoCidAvailable ? "mtpl-footer-logo" : undefined,
    },
    config
  );

  const text = renderBaseEmailText(
    {
      subject,
      badgeText: "ENQUIRY CONFIRMATION",
      title: "We Have Received Your Travel Enquiry",
      referenceCode: data.reference,
      introMessage: `Hello ${data.fullName},\n\nThank you for choosing Mishrikotkar Travels Pvt. Ltd. (MTPL). We have successfully received your travel enquiry, and our holiday specialists are reviewing your journey requirements.\n\nYour Notes:\n${data.message || "None provided"}`,
      details,
      actions,
      nextStepsTitle,
      nextStepsText,
      disclaimerText,
      recipientType: "customer",
    },
    config
  );

  return { subject, html, text };
}
