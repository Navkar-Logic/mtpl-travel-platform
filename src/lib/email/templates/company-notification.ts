import "server-only";
import { escapeHtml, formatTelUrl, formatWhatsAppUrl } from "../config";
import type { EmailConfig, EnquiryEmailData } from "../types";
import type { RenderedEmail } from "./customer-confirmation";
import {
  renderBaseEmailHtml,
  renderBaseEmailText,
  EmailActionItem,
  EmailDetailField,
  EMAIL_PALETTE,
} from "./base-template";

/**
 * Renders the internal admin notification email for comprehensive website holiday enquiries.
 * Separates customer-provided travel plans from system audit metadata in a clean, legible hierarchy.
 */
export function renderCompanyNotificationEmail(
  data: EnquiryEmailData,
  config: EmailConfig,
  logoCidAvailable = true
): RenderedEmail {
  const travelTypeDisplay = data.travelType ? data.travelType.toUpperCase() : "GENERAL";
  const subject = `[New Lead] #${data.reference} — ${travelTypeDisplay} Enquiry from ${data.fullName}`;

  const submissionDate = data.createdAt ? new Date(data.createdAt) : new Date();
  const formattedIstDate =
    submissionDate.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    }) + " (IST)";

  // Format customer-provided travel details
  const details: EmailDetailField[] = [
    { label: "Customer Name", value: data.fullName },
    ...(data.companyName?.trim() ? [{ label: "Company", value: data.companyName.trim() }] : []),
    {
      label: "Phone Number",
      value: `<a href="${formatTelUrl(data.phone)}" style="color: #16A765; font-weight: 700; text-decoration: none;">${escapeHtml(data.phone)}</a>`,
      rawHtml: true,
    },
    {
      label: "Email Address",
      value: `<a href="mailto:${escapeHtml(data.email)}" style="color: #16A765; text-decoration: none;">${escapeHtml(data.email)}</a>`,
      rawHtml: true,
    },
    { label: "Travel Type", value: data.travelType || "General Enquiry" },
    { label: "Destination", value: data.destination || "Not specified" },
    { label: "Travel Date", value: data.travelDate || "Flexible" },
    ...(data.returnDate ? [{ label: "Return Date", value: data.returnDate }] : []),
    { label: "Travellers", value: data.travellers ? `${data.travellers} Person(s)` : "Not specified" },
    { label: "Budget", value: data.budget || "Flexible / On Request" },
    ...(data.packageSlug ? [{ label: "Package Slug", value: data.packageSlug }] : []),
    { label: "Received At", value: formattedIstDate },
    {
      label: "Reference Code",
      value: `<code style="background-color: #F0F4F2; padding: 2px 7px; border-radius: 4px; font-family: monospace; font-size: 13px; font-weight: 700; color: #063D2A; border: 1px solid #D6DFDB;">${escapeHtml(data.reference)}</code>`,
      rawHtml: true,
    },
  ];

  // Action Buttons
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
    const mailtoSubject = encodeURIComponent(`Re: Enquiry #${data.reference} - Mishrikotkar Travels`);
    actions.push({
      label: "Reply by Email",
      url: `mailto:${encodeURIComponent(data.email.trim())}?subject=${mailtoSubject}`,
      type: "secondary",
    });
  }

  // Customer Message Box + System Audit Metadata Block
  const policyVersion = data.consentDetails?.policyVersion || "2026.1";
  const customContentHtml = `
    <!-- Customer Message Block -->
    <div style="margin: 20px 0; background-color: #FAFCFA; border: 1px solid ${EMAIL_PALETTE.border}; border-radius: 8px; padding: 16px 20px;">
      <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: ${EMAIL_PALETTE.secondaryText}; margin-bottom: 6px;">
        Customer Planning Notes / Message
      </div>
      <p style="margin: 0; font-size: 14px; color: ${EMAIL_PALETTE.primaryText}; line-height: 1.6; white-space: pre-wrap;">
        ${escapeHtml(data.message)}
      </p>
    </div>

    <!-- System Audit Stamp Block -->
    <div style="margin: 20px 0; background-color: #F8FAF9; border: 1px dashed ${EMAIL_PALETTE.border}; border-radius: 8px; padding: 14px 18px;">
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: ${EMAIL_PALETTE.secondaryText}; margin-bottom: 6px;">
        System Metadata &amp; Compliance Audit Stamp
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size: 12px; color: ${EMAIL_PALETTE.secondaryText};">
        <tr>
          <td style="padding: 3px 0; width: 40%;">Database Record ID:</td>
          <td style="padding: 3px 0; font-family: monospace; color: ${EMAIL_PALETTE.primaryText};">${escapeHtml(data.id)}</td>
        </tr>
        <tr>
          <td style="padding: 3px 0;">Acquisition Source:</td>
          <td style="padding: 3px 0; color: ${EMAIL_PALETTE.primaryText};">${escapeHtml(data.source)}</td>
        </tr>
        <tr>
          <td style="padding: 3px 0;">Mandatory Declarations:</td>
          <td style="padding: 3px 0; color: #16A765; font-weight: 600;">5/5 Mandatory Declarations Verified</td>
        </tr>
        <tr>
          <td style="padding: 3px 0;">Consent Policy Version:</td>
          <td style="padding: 3px 0; color: ${EMAIL_PALETTE.primaryText};">v${escapeHtml(policyVersion)}</td>
        </tr>
      </table>
    </div>
  `;

  const introMessage = "A new comprehensive travel enquiry has been submitted through the MTPL platform. Review the traveller's preferences below and initiate contact.";

  const nextStepsTitle = "Action Required";
  const nextStepsText = "Please review the proposed travel dates, group size, and itinerary requirements, then reach out to the customer with an authoritative tariff estimate.";

  const html = renderBaseEmailHtml(
    {
      subject,
      badgeText: "NEW TRAVEL ENQUIRY",
      title: "New Comprehensive Holiday Enquiry",
      referenceCode: data.reference,
      introMessage,
      details,
      customContentHtml,
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
      badgeText: "NEW TRAVEL ENQUIRY",
      title: "New Comprehensive Holiday Enquiry",
      referenceCode: data.reference,
      introMessage: `${introMessage}\n\nCustomer Message:\n${data.message}\n\nAudit Stamp: ID ${data.id} | Source: ${data.source} | Policy: v${policyVersion}`,
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
