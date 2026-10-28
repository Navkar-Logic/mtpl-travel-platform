import "server-only";
import { escapeHtml, formatTelUrl } from "../config";
import type { EmailConfig } from "../types";
import type { RenderedEmail } from "./customer-confirmation";
import {
  renderBaseEmailHtml,
  renderBaseEmailText,
  EmailActionItem,
  EmailDetailField,
  EMAIL_PALETTE,
} from "./base-template";

export interface FeedbackEmailData {
  reference: string;
  customerName: string;
  email?: string;
  phone?: string;
  rating?: number;
  feedbackText?: string;
  feedback?: string;
  destinationOrPackage?: string;
  packageOrService?: string;
  travelYear?: string;
  createdAt?: string | Date;
}

/**
 * Renders the internal admin notification email when a customer submits trip feedback/testimonial.
 */
export function renderAdminFeedbackNotificationEmail(
  data: FeedbackEmailData,
  config: EmailConfig,
  logoCidAvailable = true
): RenderedEmail {
  const subject = `New Customer Feedback — MTPL | Reference #${data.reference}`;

  const submissionDate = data.createdAt ? new Date(data.createdAt) : new Date();
  const formattedIstDate =
    submissionDate.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    }) + " (IST)";

  const feedbackContent = data.feedbackText || data.feedback || "";
  const destinationOrPkg = data.destinationOrPackage || data.packageOrService || "";

  const details: EmailDetailField[] = [
    { label: "Customer Name", value: data.customerName },
    ...(data.phone ? [{
      label: "Phone",
      value: `<a href="${formatTelUrl(data.phone)}" style="color: #16A765; font-weight: 700; text-decoration: none;">${escapeHtml(data.phone)}</a>`,
      rawHtml: true,
    }] : []),
    ...(data.email ? [{
      label: "Email",
      value: `<a href="mailto:${escapeHtml(data.email)}" style="color: #16A765; text-decoration: none;">${escapeHtml(data.email)}</a>`,
      rawHtml: true,
    }] : []),
    ...(data.rating ? [{ label: "Overall Rating", value: `${data.rating} / 5 Stars` }] : []),
    ...(destinationOrPkg ? [{ label: "Package / Service", value: destinationOrPkg }] : []),
    { label: "Submitted At", value: formattedIstDate },
    {
      label: "Reference Code",
      value: `<code style="background-color: #F0F4F2; padding: 2px 7px; border-radius: 4px; font-family: monospace; font-size: 13px; font-weight: 700; color: #063D2A; border: 1px solid #D6DFDB;">${escapeHtml(data.reference)}</code>`,
      rawHtml: true,
    },
  ];

  const actions: EmailActionItem[] = [];
  if (data.email?.trim()) {
    actions.push({
      label: "Thank Customer via Email",
      url: `mailto:${encodeURIComponent(data.email.trim())}?subject=${encodeURIComponent(`Thank you for your feedback #${data.reference} - Mishrikotkar Travels`)}`,
      type: "primary",
    });
  }

  const customContentHtml = `
    <div style="margin: 20px 0; background-color: #FAFCFA; border: 1px solid ${EMAIL_PALETTE.border}; border-radius: 8px; padding: 16px 20px;">
      <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: ${EMAIL_PALETTE.secondaryText}; margin-bottom: 6px;">
        Traveller Review &amp; Feedback Comments
      </div>
      <p style="margin: 0; font-size: 14px; color: ${EMAIL_PALETTE.primaryText}; line-height: 1.6; white-space: pre-wrap;">
        ${escapeHtml(feedbackContent)}
      </p>
    </div>
  `;

  const introMessage = "A customer has submitted feedback regarding their holiday experience with Mishrikotkar Travels.";

  const html = renderBaseEmailHtml(
    {
      subject,
      badgeText: "CUSTOMER FEEDBACK",
      title: "New Customer Review & Feedback Received",
      referenceCode: data.reference,
      introMessage,
      details,
      customContentHtml,
      actions,
      nextStepsTitle: "Review Action",
      nextStepsText: "Review the feedback for quality assurance and archive for customer testimonials if approved.",
      recipientType: "admin",
      headerLogoCid: logoCidAvailable ? "mtpl-desktop-logo" : undefined,
      footerLogoCid: logoCidAvailable ? "mtpl-footer-logo" : undefined,
    },
    config
  );

  const text = renderBaseEmailText(
    {
      subject,
      badgeText: "CUSTOMER FEEDBACK",
      title: "New Customer Review & Feedback Received",
      referenceCode: data.reference,
      introMessage: `${introMessage}\n\nReview Comments:\n${data.feedbackText}`,
      details,
      actions,
      recipientType: "admin",
    },
    config
  );

  return { subject, html, text };
}

/**
 * Renders the customer confirmation email thanking them for submitting feedback.
 */
export function renderCustomerFeedbackConfirmationEmail(
  data: FeedbackEmailData,
  config: EmailConfig,
  logoCidAvailable = true
): RenderedEmail {
  const subject = `We’ve Received Your Feedback | Mishrikotkar Travels (Ref: #${data.reference})`;

  const destinationOrPkg = data.destinationOrPackage || data.packageOrService || "";

  const details: EmailDetailField[] = [
    ...(destinationOrPkg ? [{ label: "Package / Service", value: destinationOrPkg }] : []),
    ...(data.rating ? [{ label: "Your Rating", value: `${data.rating} / 5 Stars` }] : []),
    {
      label: "Feedback Reference",
      value: `<code style="background-color: #F0F4F2; padding: 2px 7px; border-radius: 4px; font-family: monospace; font-size: 13px; font-weight: 700; color: #063D2A; border: 1px solid #D6DFDB;">${escapeHtml(data.reference)}</code>`,
      rawHtml: true,
    },
  ];

  const actions: EmailActionItem[] = [
    {
      label: "Explore More Holiday Packages",
      url: "https://www.mishrikotkartravels.com/packages",
      type: "primary",
    },
    {
      label: "Connect on WhatsApp",
      url: `https://wa.me/${config.supportWhatsApp}`,
      type: "secondary",
    },
  ];

  const introMessage = `Hello <strong>${escapeHtml(data.customerName)}</strong>,<br><br>Thank you for taking the time to share your travel feedback with <strong>Mishrikotkar Travels Pvt. Ltd. (MTPL)</strong>. Authentic feedback from our travellers helps us continually refine our itineraries, hotel partnerships, and customer support.`;

  const nextStepsTitle = "Our Commitment to Quality";
  const nextStepsText = "Our management team personally reviews all guest experiences. If your journey requires any direct follow-up or assistance, our guest relations team will connect with you.";

  const html = renderBaseEmailHtml(
    {
      subject,
      badgeText: "FEEDBACK RECEIVED",
      title: "Thank You for Sharing Your Experience",
      referenceCode: data.reference,
      introMessage,
      details,
      actions,
      nextStepsTitle,
      nextStepsText,
      recipientType: "customer",
      headerLogoCid: logoCidAvailable ? "mtpl-desktop-logo" : undefined,
      footerLogoCid: logoCidAvailable ? "mtpl-footer-logo" : undefined,
    },
    config
  );

  const text = renderBaseEmailText(
    {
      subject,
      badgeText: "FEEDBACK RECEIVED",
      title: "Thank You for Sharing Your Experience",
      referenceCode: data.reference,
      introMessage: `Hello ${data.customerName},\n\nThank you for taking the time to share your travel feedback with Mishrikotkar Travels Pvt. Ltd. (MTPL). Authentic feedback from our travellers helps us continually refine our itineraries, hotel partnerships, and customer support.`,
      details,
      actions,
      nextStepsTitle,
      nextStepsText,
      recipientType: "customer",
    },
    config
  );

  return { subject, html, text };
}
