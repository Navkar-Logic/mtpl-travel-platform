import "server-only";
import { getEmailConfig, getLogoAttachment } from "./config";
import { getTransporter } from "./transport";
import { renderCustomerConfirmationEmail } from "./templates/customer-confirmation";
import { renderCompanyNotificationEmail } from "./templates/company-notification";
import type {
  EmailSendResult,
  EnquiryEmailData,
  EnquiryEmailDispatchResult,
} from "./types";

/**
 * Orchestrates sending customer confirmation and company notification emails.
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

  // 2. Prepare logo attachment if present on filesystem
  const logo = getLogoAttachment();
  const attachments =
    logo.exists && logo.path
      ? [
          {
            filename: logo.filename,
            path: logo.path,
            cid: logo.cid,
          },
        ]
      : [];

  // 3. Attempt Customer Confirmation
  let customerResult: EmailSendResult;
  try {
    const rendered = renderCustomerConfirmationEmail(data, config, logo.exists);
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
    const rendered = renderCompanyNotificationEmail(data, config, logo.exists);
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
