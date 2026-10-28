import "server-only";
import { getEmailConfig, getEmailLogoAttachments } from "./config";
import { getTransporter } from "./transport";
import { renderCustomerConfirmationEmail } from "./templates/customer-confirmation";
import { renderCompanyNotificationEmail } from "./templates/company-notification";
import { renderLeadNotificationEmail, LeadNotificationEmailData } from "./templates/lead-notification";
import { renderQuoteConfirmationEmail, QuoteConfirmationEmailData } from "./templates/quote-confirmation";
import {
  renderAdminFeedbackNotificationEmail,
  renderCustomerFeedbackConfirmationEmail,
  FeedbackEmailData,
} from "./templates/feedback-notification";
import type {
  EmailSendResult,
  EnquiryEmailData,
  EnquiryEmailDispatchResult,
} from "./types";

/**
 * Orchestrates sending customer confirmation and company notification emails for detailed enquiries.
 * Both sends are isolated: a failure in customer confirmation never prevents
 * company notification, and vice versa.
 */
export async function sendEnquiryEmails(
  data: EnquiryEmailData
): Promise<EnquiryEmailDispatchResult> {
  const config = getEmailConfig();
  const transporter = getTransporter(config);
  const attemptedAt = new Date();

  // 1. Check SMTP configuration
  if (!transporter) {
    console.warn(
      `[EmailService] SMTP credentials not configured. Skipping email dispatch for enquiry #${data.reference}.`
    );
    return {
      customerConfirmation: {
        status: "skipped",
        error: "SMTP service not configured in environment",
        recipient: data.email,
        attemptedAt,
      },
      companyNotification: {
        status: "skipped",
        error: "SMTP service not configured in environment",
        recipient: config.notificationRecipient,
        attemptedAt,
      },
      overallSuccess: false,
    };
  }

  // 2. Prepare inline MIME Content-ID logo attachments (both header & footer logos)
  const attachments = getEmailLogoAttachments();
  const hasLogos = attachments.length > 0;

  // 3. Attempt Customer Confirmation
  let customerResult: EmailSendResult;
  try {
    const rendered = renderCustomerConfirmationEmail(data, config, hasLogos);
    const info = await transporter.sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: data.email,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
      attachments,
    });

    customerResult = {
      status: "accepted",
      messageId: info.messageId,
      recipient: data.email,
      attemptedAt: new Date(),
    };
    console.log(
      `[EmailService] Customer confirmation accepted by SMTP for enquiry #${data.reference} (Message-ID: ${info.messageId})`
    );
  } catch (err: unknown) {
    const safeError = err instanceof Error ? err.message : "SMTP transport failure";
    customerResult = {
      status: "failed",
      error: safeError,
      recipient: data.email,
      attemptedAt: new Date(),
    };
    console.error(
      `[EmailService] Customer confirmation delivery failed for enquiry #${data.reference}: ${safeError}`
    );
  }

  // 4. Attempt Company Notification (Independently isolated)
  let companyResult: EmailSendResult;
  try {
    const rendered = renderCompanyNotificationEmail(data, config, hasLogos);
    const info = await transporter.sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: config.notificationRecipient,
      replyTo: data.email,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
      attachments,
    });

    companyResult = {
      status: "accepted",
      messageId: info.messageId,
      recipient: config.notificationRecipient,
      attemptedAt: new Date(),
    };
    console.log(
      `[EmailService] Company notification accepted by SMTP for enquiry #${data.reference} (Message-ID: ${info.messageId})`
    );
  } catch (err: unknown) {
    const safeError = err instanceof Error ? err.message : "SMTP transport failure";
    companyResult = {
      status: "failed",
      error: safeError,
      recipient: config.notificationRecipient,
      attemptedAt: new Date(),
    };
    console.error(
      `[EmailService] Company notification delivery failed for enquiry #${data.reference}: ${safeError}`
    );
  }

  return {
    customerConfirmation: customerResult,
    companyNotification: companyResult,
    overallSuccess:
      customerResult.status === "accepted" && companyResult.status === "accepted",
  };
}

/**
 * Dispatches a lead notification email to company admin for callback and quote requests.
 */
export async function sendLeadNotificationEmail(
  data: LeadNotificationEmailData
): Promise<EmailSendResult> {
  const config = getEmailConfig();
  const transporter = getTransporter(config);
  const attemptedAt = new Date();

  if (!transporter) {
    console.info(
      `[EmailService] SMTP credentials not configured. Admin lead notification logged for #${data.reference} (${data.requestType} from ${data.phone}).`
    );
    return {
      status: "skipped",
      error: "SMTP service not configured in environment",
      recipient: config.notificationRecipient,
      attemptedAt,
    };
  }

  const attachments = getEmailLogoAttachments();
  const hasLogos = attachments.length > 0;

  try {
    const rendered = renderLeadNotificationEmail(data, config, hasLogos);
    const info = await transporter.sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: config.notificationRecipient,
      replyTo: data.email?.trim() || config.fromEmail,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
      attachments,
    });

    console.log(
      `[EmailService] Admin lead notification accepted for #${data.reference} (${data.requestType}) to ${config.notificationRecipient} (Message-ID: ${info.messageId})`
    );

    return {
      status: "accepted",
      messageId: info.messageId,
      recipient: config.notificationRecipient,
      attemptedAt: new Date(),
    };
  } catch (err: unknown) {
    const safeError = err instanceof Error ? err.message : "SMTP transport failure";
    console.error(
      `[EmailService] Admin lead notification delivery failed for #${data.reference}: ${safeError}`
    );
    return {
      status: "failed",
      error: safeError,
      recipient: config.notificationRecipient,
      attemptedAt: new Date(),
    };
  }
}

/**
 * Dispatches a confirmation email to customer when a free quote is requested with an email address.
 */
export async function sendQuoteConfirmationEmail(
  data: QuoteConfirmationEmailData
): Promise<EmailSendResult> {
  const config = getEmailConfig();
  const transporter = getTransporter(config);
  const attemptedAt = new Date();

  if (!transporter) {
    return {
      status: "skipped",
      error: "SMTP service not configured in environment",
      recipient: data.email,
      attemptedAt,
    };
  }

  const attachments = getEmailLogoAttachments();
  const hasLogos = attachments.length > 0;

  try {
    const rendered = renderQuoteConfirmationEmail(data, config, hasLogos);
    const info = await transporter.sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: data.email,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
      attachments,
    });

    console.log(
      `[EmailService] Customer quote confirmation accepted for #${data.reference} to ${data.email} (Message-ID: ${info.messageId})`
    );

    return {
      status: "accepted",
      messageId: info.messageId,
      recipient: data.email,
      attemptedAt: new Date(),
    };
  } catch (err: unknown) {
    const safeError = err instanceof Error ? err.message : "SMTP transport failure";
    console.error(
      `[EmailService] Customer quote confirmation failed for #${data.reference}: ${safeError}`
    );
    return {
      status: "failed",
      error: safeError,
      recipient: data.email,
      attemptedAt: new Date(),
    };
  }
}

/**
 * Dispatches customer and admin emails for feedback and testimonial submissions.
 */
export async function sendFeedbackEmails(
  data: FeedbackEmailData
): Promise<{ adminNotification: EmailSendResult; customerConfirmation?: EmailSendResult }> {
  const config = getEmailConfig();
  const transporter = getTransporter(config);
  const attemptedAt = new Date();

  if (!transporter) {
    return {
      adminNotification: {
        status: "skipped",
        error: "SMTP service not configured in environment",
        recipient: config.notificationRecipient,
        attemptedAt,
      },
    };
  }

  const attachments = getEmailLogoAttachments();
  const hasLogos = attachments.length > 0;

  // 1. Send Admin Notification
  let adminResult: EmailSendResult;
  try {
    const rendered = renderAdminFeedbackNotificationEmail(data, config, hasLogos);
    const info = await transporter.sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: config.notificationRecipient,
      replyTo: data.email?.trim() || config.fromEmail,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
      attachments,
    });
    adminResult = {
      status: "accepted",
      messageId: info.messageId,
      recipient: config.notificationRecipient,
      attemptedAt: new Date(),
    };
  } catch (err: unknown) {
    adminResult = {
      status: "failed",
      error: err instanceof Error ? err.message : "SMTP transport failure",
      recipient: config.notificationRecipient,
      attemptedAt: new Date(),
    };
  }

  // 2. Send Customer Confirmation if customer email is provided
  let customerResult: EmailSendResult | undefined;
  if (data.email?.trim()) {
    try {
      const rendered = renderCustomerFeedbackConfirmationEmail(data, config, hasLogos);
      const info = await transporter.sendMail({
        from: `"${config.fromName}" <${config.fromEmail}>`,
        to: data.email.trim(),
        subject: rendered.subject,
        html: rendered.html,
        text: rendered.text,
        attachments,
      });
      customerResult = {
        status: "accepted",
        messageId: info.messageId,
        recipient: data.email.trim(),
        attemptedAt: new Date(),
      };
    } catch (err: unknown) {
      customerResult = {
        status: "failed",
        error: err instanceof Error ? err.message : "SMTP transport failure",
        recipient: data.email.trim(),
        attemptedAt: new Date(),
      };
    }
  }

  return {
    adminNotification: adminResult,
    customerConfirmation: customerResult,
  };
}
