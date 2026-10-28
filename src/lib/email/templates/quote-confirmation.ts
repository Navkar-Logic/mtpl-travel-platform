import "server-only";
import { escapeHtml, formatTelUrl } from "../config";
import type { EmailConfig } from "../types";
import type { RenderedEmail } from "./customer-confirmation";
import {
  renderBaseEmailHtml,
  renderBaseEmailText,
  EmailActionItem,
  EmailDetailField,
} from "./base-template";

export interface QuoteConfirmationEmailData {
  reference: string;
  name?: string;
  email: string;
  phone: string;
  tourType?: string;
  packageSlug?: string;
  packageName?: string;
  createdAt?: string | Date;
}

/**
 * Renders the customer-facing confirmation email for quick free-quote requests.
 */
export function renderQuoteConfirmationEmail(
  data: QuoteConfirmationEmailData,
  config: EmailConfig,
  logoCidAvailable = true
): RenderedEmail {
  const subject = `Quote Request Received — Mishrikotkar Travels (Ref: #${data.reference})`;

  const displayName = data.name?.trim() ? data.name.trim() : "Traveller";

  // Tour Type Formatting
  let tourTypeDisplay = "Custom Tour Request";
  if (data.tourType === "international") {
    tourTypeDisplay = "International Holiday";
  } else if (data.tourType === "national") {
    tourTypeDisplay = "National (Discover India)";
  }

  // Package Name Formatting
  const packageDisplay = data.packageName?.trim()
    ? data.packageName.trim()
    : "General Website Itinerary Request";

  const details: EmailDetailField[] = [
    { label: "Selected Holiday", value: packageDisplay },
    { label: "Tour Category", value: tourTypeDisplay },
    { label: "Registered Phone", value: data.phone },
    {
      label: "Reference Code",
      value: `<code style="background-color: #F0F4F2; padding: 2px 7px; border-radius: 4px; font-family: monospace; font-size: 13px; font-weight: 700; color: #063D2A; border: 1px solid #D6DFDB;">${escapeHtml(data.reference)}</code>`,
      rawHtml: true,
    },
  ];

  const actions: EmailActionItem[] = [
    {
      label: `Call Support: ${config.supportPhone}`,
      url: formatTelUrl(config.supportPhone),
      type: "primary",
    },
    {
      label: "Chat on WhatsApp",
      url: `https://wa.me/${config.supportWhatsApp}?text=${encodeURIComponent(`Hello MTPL, I requested a quote for ${packageDisplay} (Ref: #${data.reference}) and would like more details.`)}`,
      type: "secondary",
    },
  ];

  const introMessage = `Hello <strong>${escapeHtml(displayName)}</strong>,<br><br>Thank you for requesting a holiday quote with <strong>Mishrikotkar Travels Pvt. Ltd. (MTPL)</strong>. We have received your request and our specialists are preparing verified starting rates tailored to your travel plans.`;

  const nextStepsTitle = "What Happens Next?";
  const nextStepsText = "An MTPL travel consultant will review your itinerary preferences and connect with you shortly with transparent pricing, hotel options, and transport details.";

  const disclaimerText = "Please note: This email confirms receipt of your quote request. Quoted rates depend on actual travel dates, room sharing occupancy, and seasonal hotel availability at the time of booking.";

  const html = renderBaseEmailHtml(
    {
      subject,
      badgeText: "FREE QUOTE CONFIRMATION",
      title: "Your Free Quote Request Has Been Received",
      referenceCode: data.reference,
      introMessage,
      details,
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
      badgeText: "FREE QUOTE CONFIRMATION",
      title: "Your Free Quote Request Has Been Received",
      referenceCode: data.reference,
      introMessage: `Hello ${displayName},\n\nThank you for requesting a holiday quote with Mishrikotkar Travels Pvt. Ltd. (MTPL). We have received your request and our specialists are preparing verified starting rates tailored to your travel plans.`,
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
