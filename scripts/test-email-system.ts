/**
 * Comprehensive verification test suite for MTPL Enquiry Email Subsystem.
 * 
 * Strict safety rules:
 * - Completely offline: Zero live SMTP connections, zero actual emails sent.
 * - Zero live database connections or mutations.
 * - Uses Nodemailer mock transporter to verify routing, CID logo attachments,
 *   action links, HTML escaping, and independent failure isolation.
 */
import {
  escapeHtml,
  formatTelUrl,
  formatWhatsAppUrl,
  getLogoAttachment,
  getEmailConfig,
} from "../src/lib/email/config";
import {
  renderCustomerConfirmationEmail,
} from "../src/lib/email/templates/customer-confirmation";
import {
  renderCompanyNotificationEmail,
} from "../src/lib/email/templates/company-notification";
import { setTestTransporter, resetTransporter } from "../src/lib/email/transport";
import { sendEnquiryEmails } from "../src/lib/email/service";
import type { EnquiryEmailData } from "../src/lib/email/types";
import { Enquiry } from "../src/models/enquiry";
import { CURRENT_POLICY_VERSION } from "../src/lib/validations/enquiry";

let passedCount = 0;
let failedCount = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passedCount++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failedCount++;
  }
}

const sampleEnquiryData: EnquiryEmailData = {
  id: "67890abcdef1234567890123",
  reference: "MTPL-890123",
  fullName: "Rajesh Sharma",
  companyName: "Sharma Logistics Ltd.",
  email: "rajesh.sharma@example.com",
  phone: "+91 98230 12345",
  travelType: "domestic",
  destination: "Himachal Pradesh",
  travelDate: "2026-11-15",
  returnDate: "2026-11-21",
  travellers: 4,
  budget: "₹1,50,000",
  message: "Looking for family package covering Shimla and Manali with 4-star hotels.",
  source: "package",
  packageSlug: "mtpl-best-of-himachal-5n-6d",
  createdAt: new Date("2026-10-15T10:30:00Z"),
  consentDetails: {
    accuracyConfirmed: true,
    communicationConsent: true,
    privacyAcknowledged: true,
    bookingDisclaimerAcknowledged: true,
    termsAcknowledged: true,
    acceptedAt: new Date("2026-10-15T10:30:00Z"),
    policyVersion: CURRENT_POLICY_VERSION,
  },
};

async function runEmailTests() {
  console.log("==================================================================");
  console.log("MTPL Enquiry Email Subsystem — Verification Test Suite (Offline)");
  console.log("==================================================================");

  // -----------------------------------------------------------------------------
  // Test Suite 1: Phone, Tel, and WhatsApp Formatting
  // -----------------------------------------------------------------------------
  console.log("\n1. Testing Phone & Direct Action Link Formatting:");

  assert(
    formatTelUrl("+91 98230 12345") === "tel:+919823012345",
    "formatTelUrl correctly strips whitespace and preserves international '+': tel:+919823012345"
  );
  assert(
    formatTelUrl("0712-2540000") === "tel:07122540000",
    "formatTelUrl strips dashes: tel:07122540000"
  );

  // WhatsApp international link formatting (strictly digits only, no '+', no spaces)
  assert(
    formatWhatsAppUrl("+91 98230 12345") === "https://wa.me/919823012345",
    "formatWhatsAppUrl formats international '+91 ...' without '+' or spaces: https://wa.me/919823012345"
  );
  assert(
    formatWhatsAppUrl("9823012345") === "https://wa.me/919823012345",
    "formatWhatsAppUrl prepends '91' country code to 10-digit Indian mobile: https://wa.me/919823012345"
  );
  assert(
    formatWhatsAppUrl("09823012345") === "https://wa.me/919823012345",
    "formatWhatsAppUrl handles leading 0 on Indian mobile: https://wa.me/919823012345"
  );
  assert(
    formatWhatsAppUrl("1234") === null,
    "formatWhatsAppUrl rejects implausible short numbers (<8 digits)"
  );

  // -----------------------------------------------------------------------------
  // Test Suite 2: HTML Escaping & Injection Protection
  // -----------------------------------------------------------------------------
  console.log("\n2. Testing HTML Escaping & Sanitization:");

  const maliciousPayload = '<script>alert("XSS")</script> & "quotes" \'apostrophe\'';
  const escaped = escapeHtml(maliciousPayload);
  assert(
    !escaped.includes("<script>") &&
    escaped.includes("&lt;script&gt;") &&
    escaped.includes("&quot;") &&
    escaped.includes("&#39;") &&
    escaped.includes("&amp;"),
    "escapeHtml safely sanitizes tags, quotes, and ampersands."
  );

  // -----------------------------------------------------------------------------
  // Test Suite 3: Local Logo Attachment Resolution
  // -----------------------------------------------------------------------------
  console.log("\n3. Testing Local Logo Resolution (CID Embedding):");

  const logo = getLogoAttachment();
  assert(
    logo.filename === "mtpl-logo.png" && logo.cid === "mtpl-logo",
    "Logo attachment metadata configured with CID 'mtpl-logo'."
  );
  assert(
    logo.exists && typeof logo.path === "string",
    `Local logo verified on disk at: ${logo.path}`
  );

  // -----------------------------------------------------------------------------
  // Test Suite 4: Customer Confirmation Email Template
  // -----------------------------------------------------------------------------
  console.log("\n4. Testing Customer Confirmation Template:");

  const config = getEmailConfig();
  const customerEmail = renderCustomerConfirmationEmail(sampleEnquiryData, config, logo.exists);

  assert(
    customerEmail.subject.includes("MTPL-890123") &&
    customerEmail.subject.includes("Mishrikotkar Travels"),
    "Subject includes reference #MTPL-890123 and company name."
  );
  assert(
    customerEmail.html.includes("cid:mtpl-logo"),
    "HTML includes Content-ID logo reference <img src='cid:mtpl-logo'..."
  );
  assert(
    customerEmail.html.includes("Hello Rajesh Sharma"),
    "HTML includes personalized customer greeting."
  );
  assert(
    customerEmail.html.includes("Himachal Pradesh") &&
    customerEmail.html.includes("Shimla and Manali"),
    "HTML includes trip summary details and customer planning message."
  );
  assert(
    customerEmail.html.includes("does not constitute a confirmed booking"),
    "HTML includes mandatory booking & tariff disclaimer."
  );
  assert(
    customerEmail.html.includes("support@mishrikotkartravels.com"),
    "HTML includes MTPL support contact email."
  );
  assert(
    customerEmail.text.includes("ENQUIRY CONFIRMATION: #MTPL-890123") &&
    customerEmail.text.includes("IMPORTANT DISCLAIMER:"),
    "Plain-text version contains full text summary, reference, and disclaimer."
  );

  // Verify escaping in customer email
  const xssEnquiryData: EnquiryEmailData = {
    ...sampleEnquiryData,
    fullName: "Jane <script>alert('xss')</script>",
    message: 'Test with "quotes" & <tags>',
  };
  const xssCustomerEmail = renderCustomerConfirmationEmail(xssEnquiryData, config, logo.exists);
  assert(
    !xssCustomerEmail.html.includes("<script>") &&
    xssCustomerEmail.html.includes("&lt;script&gt;"),
    "Customer template escapes customer-provided name against XSS."
  );
  assert(
    xssCustomerEmail.html.includes("&quot;quotes&quot; &amp; &lt;tags&gt;"),
    "Customer template escapes special characters in trip planning message."
  );

  // -----------------------------------------------------------------------------
  // Test Suite 5: Company Notification Email Template
  // -----------------------------------------------------------------------------
  console.log("\n5. Testing Company Notification Template:");

  const companyEmail = renderCompanyNotificationEmail(sampleEnquiryData, config, logo.exists);

  assert(
    companyEmail.subject.includes("#MTPL-890123") &&
    companyEmail.subject.includes("Rajesh Sharma"),
    "Company notification subject contains reference and customer name."
  );
  assert(
    companyEmail.html.includes("Customer-Provided Information") &&
    companyEmail.html.includes("System Metadata &amp; Audit Stamp"),
    "Visual distinction clearly separates customer-provided data from system metadata."
  );
  assert(
    companyEmail.html.includes('href="tel:+919823012345"'),
    "Includes clickable tel: link directly to customer's phone number."
  );
  assert(
    companyEmail.html.includes('href="https://wa.me/919823012345"'),
    "Includes direct WhatsApp link with customer's international formatted number (no '+')."
  );
  assert(
    companyEmail.html.includes("mailto:rajesh.sharma%40example.com"),
    "Includes clickable mailto: link to customer's email address."
  );
  assert(
    companyEmail.html.includes("5/5 Mandatory Declarations Verified"),
    "Includes authoritative consent audit stamp verification in system metadata."
  );
  assert(
    companyEmail.html.includes("67890abcdef1234567890123"),
    "Includes MongoDB ObjectId in system audit metadata."
  );

  // -----------------------------------------------------------------------------
  // Test Suite 6: Mock Email Dispatch & Routing
  // -----------------------------------------------------------------------------
  console.log("\n6. Testing Mock Email Dispatch & Recipient Routing:");

  interface MockMailCall {
    from: string;
    to: string;
    replyTo?: string;
    subject: string;
    html: string;
    text: string;
    attachments?: Array<{ filename: string; path?: string; cid?: string }>;
  }

  const capturedMails: MockMailCall[] = [];

  const mockTransporter: unknown = {
    sendMail: async (mailOptions: MockMailCall) => {
      capturedMails.push(mailOptions);
      return {
        messageId: `<mock-${Date.now()}-${capturedMails.length}@mishrikotkartravels.com>`,
        accepted: [mailOptions.to],
        rejected: [],
      };
    },
  };

  setTestTransporter(mockTransporter as Parameters<typeof setTestTransporter>[0]);

  const dispatchResult = await sendEnquiryEmails(sampleEnquiryData);

  assert(
    dispatchResult.overallSuccess === true,
    "sendEnquiryEmails returns overallSuccess === true when both emails are accepted."
  );
  assert(
    dispatchResult.customerConfirmation.status === "accepted" &&
    typeof dispatchResult.customerConfirmation.messageId === "string",
    "Customer confirmation status is 'accepted' with valid messageId."
  );
  assert(
    dispatchResult.companyNotification.status === "accepted" &&
    typeof dispatchResult.companyNotification.messageId === "string",
    "Company notification status is 'accepted' with valid messageId."
  );
  assert(capturedMails.length === 2, "Transporter received exactly 2 outgoing email dispatches.");

  // Inspect customer mail call
  const sentCustomerMail = capturedMails[0];
  assert(
    sentCustomerMail.to === "rajesh.sharma@example.com",
    `Customer confirmation sent to customer's email: ${sentCustomerMail.to}`
  );
  assert(
    sentCustomerMail.from.includes("support@mishrikotkartravels.com"),
    `Customer confirmation sent from official MTPL sender: ${sentCustomerMail.from}`
  );
  assert(
    Array.isArray(sentCustomerMail.attachments) &&
    sentCustomerMail.attachments.some((a) => a.cid === "mtpl-logo"),
    "Customer confirmation includes CID 'mtpl-logo' attachment."
  );

  // Inspect company mail call
  const sentCompanyMail = capturedMails[1];
  assert(
    sentCompanyMail.to === config.notificationRecipient,
    `Company notification sent to configured support recipient: ${sentCompanyMail.to}`
  );
  assert(
    sentCompanyMail.replyTo === "rajesh.sharma@example.com",
    `Company notification sets replyTo directly to customer: ${sentCompanyMail.replyTo}`
  );
  assert(
    Array.isArray(sentCompanyMail.attachments) &&
    sentCompanyMail.attachments.some((a) => a.cid === "mtpl-logo"),
    "Company notification includes CID 'mtpl-logo' attachment."
  );

  // -----------------------------------------------------------------------------
  // Test Suite 7: Failure Isolation Between Customer & Company Emails
  // -----------------------------------------------------------------------------
  console.log("\n7. Testing Independent Failure Isolation:");

  // Scenario A: Customer email throws error (e.g. SMTP rejected recipient address)
  const failingCustomerTransporter: unknown = {
    sendMail: async (mailOptions: MockMailCall) => {
      if (mailOptions.to.includes("failing.customer")) {
        throw new Error("SMTP 550: User mailbox not found");
      }
      return {
        messageId: `<mock-company-success@mishrikotkartravels.com>`,
        accepted: [mailOptions.to],
        rejected: [],
      };
    },
  };

  setTestTransporter(failingCustomerTransporter as Parameters<typeof setTestTransporter>[0]);

  const failingCustomerData: EnquiryEmailData = {
    ...sampleEnquiryData,
    email: "failing.customer@example.com",
  };

  const isolatedResultA = await sendEnquiryEmails(failingCustomerData);

  assert(
    isolatedResultA.customerConfirmation.status === "failed" &&
    Boolean(isolatedResultA.customerConfirmation.error?.includes("User mailbox not found")),
    "Customer email failure is cleanly captured with error description."
  );
  assert(
    isolatedResultA.companyNotification.status === "accepted",
    "Company notification STILL succeeds when customer confirmation email fails! (Independent isolation verified)"
  );
  assert(
    isolatedResultA.overallSuccess === false,
    "overallSuccess correctly flags false when any dispatch fails."
  );

  // Scenario B: Company email throws error
  const failingCompanyTransporter: unknown = {
    sendMail: async (mailOptions: MockMailCall) => {
      if (mailOptions.to === config.notificationRecipient) {
        throw new Error("SMTP 451: Internal notification mailbox temporarily full");
      }
      return {
        messageId: `<mock-cust-success@mishrikotkartravels.com>`,
        accepted: [mailOptions.to],
        rejected: [],
      };
    },
  };

  setTestTransporter(failingCompanyTransporter as Parameters<typeof setTestTransporter>[0]);

  const isolatedResultB = await sendEnquiryEmails(sampleEnquiryData);

  assert(
    isolatedResultB.customerConfirmation.status === "accepted",
    "Customer confirmation succeeds even if internal company notification fails."
  );
  assert(
    isolatedResultB.companyNotification.status === "failed",
    "Company notification failure cleanly recorded without crashing process."
  );

  // -----------------------------------------------------------------------------
  // Test Suite 8: Missing SMTP Configuration Mode
  // -----------------------------------------------------------------------------
  console.log("\n8. Testing Missing / Unconfigured SMTP Mode:");

  // Reset to default transporter with unconfigured env (or empty transport)
  resetTransporter();

  const unconfiguredResult = await sendEnquiryEmails(sampleEnquiryData);

  assert(
    unconfiguredResult.customerConfirmation.status === "skipped" &&
    unconfiguredResult.companyNotification.status === "skipped",
    "When SMTP is unconfigured, returns status 'skipped' without throwing exceptions."
  );
  assert(
    unconfiguredResult.overallSuccess === false,
    "Returns overallSuccess: false when SMTP is not configured."
  );

  // -----------------------------------------------------------------------------
  // Test Suite 9: Schema Invariance & Model Consent Preservation
  // -----------------------------------------------------------------------------
  console.log("\n9. Testing Enquiry Model Invariance & Consent Preservation:");

  const testDoc = new Enquiry({
    fullName: "Pooja Verma",
    email: "pooja.verma@example.com",
    phone: "+91 9876543210",
    travelType: "domestic",
    destination: "Kashmir",
    message: "Planning a 5-day family vacation in Srinagar and Gulmarg.",
    source: "package",
    packageSlug: "scenic-kashmir-5n-6d",
    consentAccepted: true,
    consentDetails: {
      accuracyConfirmed: true,
      communicationConsent: true,
      privacyAcknowledged: true,
      bookingDisclaimerAcknowledged: true,
      termsAcknowledged: true,
      acceptedAt: new Date(),
      policyVersion: CURRENT_POLICY_VERSION,
    },
    emailAudit: {
      customerEmailStatus: "accepted",
      customerEmailAttemptedAt: new Date(),
      customerMessageId: "<test-msg-id@mishrikotkartravels.com>",
      companyEmailStatus: "accepted",
      companyEmailAttemptedAt: new Date(),
      companyMessageId: "<test-company-msg-id@mishrikotkartravels.com>",
    },
  });

  const docErr = testDoc.validateSync();
  assert(!docErr, "Enquiry model with emailAudit subdocument passes Mongoose validation.");

  const docWithoutAudit = new Enquiry({
    fullName: "Pooja Verma",
    email: "pooja.verma@example.com",
    phone: "+91 9876543210",
    travelType: "domestic",
    destination: "Kashmir",
    message: "Planning a 5-day family vacation in Srinagar and Gulmarg.",
    source: "package",
    packageSlug: "scenic-kashmir-5n-6d",
    consentAccepted: true,
    consentDetails: {
      accuracyConfirmed: true,
      communicationConsent: true,
      privacyAcknowledged: true,
      bookingDisclaimerAcknowledged: true,
      termsAcknowledged: true,
      acceptedAt: new Date(),
      policyVersion: CURRENT_POLICY_VERSION,
    },
  });

  const docWithoutAuditErr = docWithoutAudit.validateSync();
  assert(
    !docWithoutAuditErr,
    "Enquiry model without emailAudit remains completely backward-compatible."
  );

  // -----------------------------------------------------------------------------
  // Summary
  // -----------------------------------------------------------------------------
  console.log("\n==================================================================");
  console.log(`Email Subsystem Verification: ${passedCount} PASSED, ${failedCount} FAILED`);
  console.log("==================================================================");

  if (failedCount > 0) {
    process.exit(1);
  }
}

runEmailTests().catch((err) => {
  console.error("Test execution encountered an error:", err);
  process.exit(1);
});
