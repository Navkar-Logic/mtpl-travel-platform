import "server-only";
import { escapeHtml, formatTelUrl, formatWhatsAppUrl } from "../config";
import type { EmailConfig } from "../types";
import {
  renderBaseEmailHtml,
  renderBaseEmailText,
  EmailActionItem,
  EmailDetailField,
} from "./base-template";

export interface LeadNotificationEmailData {
  reference: string;
  requestType: "callback" | "quote";
  name?: string;
  phone: string;
  email?: string;
  tourType?: string;
  packageSlug?: string;
  packageName?: string;
  createdAt?: string | Date;
}

/**
 * Renders the internal admin lead notification email for free quotes and callbacks.
 * Adheres strictly to MTPL's unified corporate travel design system.
 */
export function renderLeadNotificationEmail(
  data: LeadNotificationEmailData,
  config: EmailConfig,
  logoCidAvailable = true
): { subject: string; html: string; text: string } {
  const isQuote = data.requestType === "quote";
  const typeLabel = isQuote ? "Free Quote Request" : "Callback Request";
  const badgeText = isQuote ? "FREE QUOTE REQUEST" : "CALLBACK REQUEST";
  const displayName = data.name?.trim() ? data.name.trim() : "Guest Traveller";

  const subject = `[New ${typeLabel}] #${data.reference} — From ${displayName} (${data.phone})`;

  // Format Received Date (IST)
  const submissionDate = data.createdAt ? new Date(data.createdAt) : new Date();
  const formattedIstDate =
    submissionDate.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    }) + " (IST)";

  // Tour Type Formatting
  let tourTypeDisplay = "Not specified";
  if (data.tourType === "international") {
    tourTypeDisplay = "International Holiday";
  } else if (data.tourType === "national") {
    tourTypeDisplay = "National (Discover India)";
  }

  // Package Name Formatting
  let packageDisplay = "General Website Request (No specific package)";
  if (data.packageName?.trim()) {
    packageDisplay = data.packageName.trim();
    if (data.packageSlug?.trim()) {
      packageDisplay += ` (${data.packageSlug.trim()})`;
    }
  }

  // Structured Information Fields
  const details: EmailDetailField[] = [
    { label: "Lead Type", value: typeLabel },
    { label: "Customer Name", value: data.name?.trim() || "Not provided" },
    {
      label: "Phone Number",
      value: `<a href="${formatTelUrl(data.phone)}" style="color: #16A765; font-weight: 700; text-decoration: none;">${escapeHtml(data.phone)}</a>`,
      rawHtml: true,
    },
    {
      label: "Email Address",
      value: data.email?.trim()
        ? `<a href="mailto:${escapeHtml(data.email.trim())}" style="color: #16A765; text-decoration: none;">${escapeHtml(data.email.trim())}</a>`
        : isQuote
        ? "Not provided"
        : "Not requested (Callback)",
      rawHtml: true,
    },
    ...(isQuote || data.tourType ? [{ label: "Preferred Tour Type", value: tourTypeDisplay }] : []),
    { label: "Package Interest", value: packageDisplay },
    { label: "Received At", value: formattedIstDate },
    {
      label: "Reference Code",
      value: `<code style="background-color: #F0F4F2; padding: 2px 7px; border-radius: 4px; font-family: monospace; font-size: 13px; font-weight: 700; color: #063D2A; border: 1px solid #D6DFDB;">${escapeHtml(data.reference)}</code>`,
      rawHtml: true,
    },
  ];

  // Action Buttons (generated ONLY when valid)
  const actions: EmailActionItem[] = [];

  const telLink = formatTelUrl(data.phone);
  if (telLink) {
    actions.push({
      label: `Call ${data.phone}`,
      url: telLink,
      type: "primary",
    });
  }

  const whatsappUrl = formatWhatsAppUrl(data.phone);
  if (whatsappUrl) {
    actions.push({
      label: "WhatsApp Lead",
      url: whatsappUrl,
      type: "secondary",
    });
  }

  if (data.email?.trim()) {
    const mailtoSubject = encodeURIComponent(`Re: ${typeLabel} #${data.reference} - Mishrikotkar Travels`);
    actions.push({
      label: "Reply by Email",
      url: `mailto:${encodeURIComponent(data.email.trim())}?subject=${mailtoSubject}`,
      type: "secondary",
    });
  }

  const introMessage = "A new customer enquiry has been received. Review the details below and follow up with the customer.";

  const nextStepsTitle = "Action Required";
  const nextStepsText = "Please review the customer's itinerary preferences and initiate contact via their preferred communication channel.";

  const html = renderBaseEmailHtml(
    {
      subject,
      badgeText,
      title: `New ${typeLabel}`,
      referenceCode: data.reference,
      introMessage,
      details,
      actions,
      nextStepsTitle,
      nextStepsText,
      recipientType: "admin",
      headerLogoCid: logoCidAvailable ? "mtpl-desktop-logo" : undefined,
      footerLogoCid: logoCidAvailable ? "mtpl-footer-logo" : undefined,
    },
    config
  );

  const text = renderBaseEmailText(
    {
      subject,
      badgeText,
      title: `New ${typeLabel}`,
      referenceCode: data.reference,
      introMessage,
      details,
      actions,
      nextStepsTitle,
      nextStepsText,
      recipientType: "admin",
    },
    config
  );

  return { subject, html, text };
}
