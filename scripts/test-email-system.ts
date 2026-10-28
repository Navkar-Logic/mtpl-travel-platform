/**
 * Comprehensive verification test suite for MTPL Standardized Transactional Email Subsystem.
 * 
 * Strict safety rules:
 * - 100% offline: Zero live SMTP connections, zero actual emails dispatched.
 * - Zero live database connections or mutations.
 * - Uses Nodemailer mock transporter to verify routing, inline CID attachments,
 *   action links, HTML escaping, and failure isolation.
 */
import "./mock-server-only.js";
import {
  escapeHtml,
  formatTelUrl,
  formatWhatsAppUrl,
  getHeaderLogoAttachment,
  getFooterLogoAttachment,
  getEmailLogoAttachments,
  getEmailConfig,
} from "../src/lib/email/config";
import {
  renderCustomerConfirmationEmail,
} from "../src/lib/email/templates/customer-confirmation";
import {
  renderCompanyNotificationEmail,
} from "../src/lib/email/templates/company-notification";
import {
  renderLeadNotificationEmail,
  LeadNotificationEmailData,
} from "../src/lib/email/templates/lead-notification";
import {
  renderQuoteConfirmationEmail,
  QuoteConfirmationEmailData,
} from "../src/lib/email/templates/quote-confirmation";
import {
  renderAdminFeedbackNotificationEmail,
  renderCustomerFeedbackConfirmationEmail,
  FeedbackEmailData,
} from "../src/lib/email/templates/feedback-notification";
import { setTestTransporter, resetTransporter } from "../src/lib/email/transport";
import {
  sendEnquiryEmails,
  sendLeadNotificationEmail,
  sendQuoteConfirmationEmail,
  sendFeedbackEmails,
} from "../src/lib/email/service";
import type { EnquiryEmailData } from "../src/lib/email/types";

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
    policyVersion: "2026.1",
  },
};

const sampleQuoteLeadData: LeadNotificationEmailData = {
  reference: "CB-54A559",
  requestType: "quote",
  name: "Sneha Deshmukh",
  phone: "+91 98220 54321",
  email: "sneha.d@example.com",
  tourType: "national",
  packageSlug: "mtpl-unlimited-maharashtra-5n-6d",
  packageName: "Unlimited Maharashtra",
  createdAt: new Date("2026-10-28T09:15:00Z"),
};

const sampleCallbackLeadData: LeadNotificationEmailData = {
  reference: "CB-102938",
  requestType: "callback",
  phone: "+91 77760 12345",
  tourType: "international",
  createdAt: new Date("2026-10-28T09:30:00Z"),
};

const sampleQuoteCustData: QuoteConfirmationEmailData = {
  reference: "CB-54A559",
  name: "Sneha Deshmukh",
  email: "sneha.d@example.com",
  phone: "+91 98220 54321",
  tourType: "national",
  packageSlug: "mtpl-unlimited-maharashtra-5n-6d",
  packageName: "Unlimited Maharashtra",
  createdAt: new Date("2026-10-28T09:15:00Z"),
};

const sampleFeedbackData: FeedbackEmailData = {
  reference: "FB-771829",
  customerName: "Vikram Singhania",
  email: "vikram.s@example.com",
  phone: "+91 94221 88990",
  rating: 5,
  feedbackText: "Outstanding arrangements for our Dubai family tour. The private transfers and desert safari were flawless!",
  destinationOrPackage: "Wonders of Dubai (5N/6D)",
  createdAt: new Date("2026-10-28T08:00:00Z"),
};

async function runEmailTests() {
  console.log("==================================================================");
  console.log("MTPL Transactional Email Subsystem — Complete Verification Suite");
  console.log("==================================================================");

  const config = getEmailConfig();

  // -----------------------------------------------------------------------------
  // Test Suite 1: Phone & Action Link Formatting
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
  assert(
    formatWhatsAppUrl("+91 98230 12345") === "https://wa.me/919823012345",
    "formatWhatsAppUrl formats '+91 ...' without '+' or spaces: https://wa.me/919823012345"
  );
  assert(
    formatWhatsAppUrl("9823012345") === "https://wa.me/919823012345",
    "formatWhatsAppUrl prepends '91' country code to 10-digit Indian mobile: https://wa.me/919823012345"
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
  // Test Suite 3: Logo Attachments & Content-ID Embedding
  // -----------------------------------------------------------------------------
  console.log("\n3. Testing Logo Attachments & Content-ID Embedding:");

  const headerLogo = getHeaderLogoAttachment();
  assert(
    headerLogo.filename === "mtpl-desktop-logo.png" && headerLogo.cid === "mtpl-desktop-logo",
    "Header logo metadata configured with CID 'mtpl-desktop-logo'."
  );
  assert(
    headerLogo.exists && typeof headerLogo.path === "string",
    `Header logo exists on disk: ${headerLogo.path}`
  );

  const footerLogo = getFooterLogoAttachment();
  assert(
    footerLogo.filename === "mtpl-footer-logo.png" && footerLogo.cid === "mtpl-footer-logo",
    "Footer logo metadata configured with CID 'mtpl-footer-logo'."
  );
  assert(
    footerLogo.exists && typeof footerLogo.path === "string",
    `Footer logo exists on disk: ${footerLogo.path}`
  );

  const attachments = getEmailLogoAttachments();
  assert(
    attachments.length === 2 &&
    attachments.some(a => a.cid === "mtpl-desktop-logo") &&
    attachments.some(a => a.cid === "mtpl-footer-logo"),
    "getEmailLogoAttachments returns both inline attachments with matching CIDs."
  );

  // -----------------------------------------------------------------------------
  // Test Suite 4: New Free Quote Request Email (Reference Implementation)
  // -----------------------------------------------------------------------------
  console.log("\n4. Testing New Free Quote Request (Admin Lead Notification):");

  const quoteLeadEmail = renderLeadNotificationEmail(sampleQuoteLeadData, config, true);

  assert(
    quoteLeadEmail.subject.includes("New Free Quote Request") &&
    quoteLeadEmail.subject.includes("#CB-54A559") &&
    quoteLeadEmail.subject.includes("Sneha Deshmukh"),
    "Subject contains real reference code #CB-54A559 and customer name."
  );
  assert(
    quoteLeadEmail.html.includes("background-color: #FFFFFF;") &&
    quoteLeadEmail.html.includes("src=\"cid:mtpl-desktop-logo\"") &&
    quoteLeadEmail.html.includes("width=\"100\" height=\"110\""),
    "White header contains centered desktop logo with preserved proportions (100x110)."
  );
  assert(
    !quoteLeadEmail.html.includes("#1E3A8A") && !quoteLeadEmail.html.includes("#0284c7"),
    "Oversized navy/blue header styling is completely eliminated."
  );
  assert(
    quoteLeadEmail.html.includes("FREE QUOTE REQUEST") &&
    quoteLeadEmail.html.includes("New Free Quote Request"),
    "Includes clean, restrained status badge and heading."
  );
  assert(
    quoteLeadEmail.html.includes("A new customer enquiry has been received"),
    "Includes concise introductory message."
  );
  assert(
    quoteLeadEmail.html.includes("Unlimited Maharashtra") &&
    quoteLeadEmail.html.includes("National (Discover India)") &&
    quoteLeadEmail.html.includes("sneha.d@example.com") &&
    quoteLeadEmail.html.includes("+91 98220 54321"),
    "Structured lead details cleanly render all customer fields."
  );
  assert(
    quoteLeadEmail.html.includes('href="tel:+919822054321"') &&
    quoteLeadEmail.html.includes('href="https://wa.me/919822054321"') &&
    quoteLeadEmail.html.includes("mailto:sneha.d%40example.com"),
    "Action links for phone, WhatsApp, and email are valid and functional."
  );
  assert(
    quoteLeadEmail.html.includes("Action Required") &&
    !quoteLeadEmail.html.includes("within 24 hours"),
    "Subtle next-step panel replaces heavy dark-blue bar without unapproved 24h promises."
  );
  assert(
    quoteLeadEmail.html.includes("src=\"cid:mtpl-footer-logo\"") &&
    quoteLeadEmail.html.includes("width=\"360\" height=\"169\"") &&
    quoteLeadEmail.html.includes("Mishrikotkar Travels Pvt. Ltd. (MTPL)") &&
    quoteLeadEmail.html.includes("IATA Accredited Agency (No. 14344864)"),
    "Footer contains embedded mtpl-footer-logo.png and verified company credentials."
  );
  assert(
    quoteLeadEmail.text.includes("MISHRIKOTKAR TRAVELS PVT. LTD. (MTPL)") &&
    quoteLeadEmail.text.includes("Reference Code: #CB-54A559") &&
    quoteLeadEmail.text.includes("Unlimited Maharashtra"),
    "Plain-text version contains complete structured representation."
  );

  // -----------------------------------------------------------------------------
  // Test Suite 5: Callback Request Email (Missing Optional Fields Test)
  // -----------------------------------------------------------------------------
  console.log("\n5. Testing Callback Request with Missing Optional Fields:");

  const callbackLeadEmail = renderLeadNotificationEmail(sampleCallbackLeadData, config, true);

  assert(
    callbackLeadEmail.subject.includes("New Callback Request") &&
    callbackLeadEmail.subject.includes("#CB-102938"),
    "Subject includes reference code and request type."
  );
  assert(
    callbackLeadEmail.html.includes("Not provided") &&
    callbackLeadEmail.html.includes("Not requested (Callback)") &&
    callbackLeadEmail.html.includes("General Website Request"),
    "Gracefully renders 'Not provided' and 'Not requested' for missing optional fields."
  );
  assert(
    !callbackLeadEmail.html.includes("Reply by Email"),
    "Reply by Email action button is omitted when no customer email address is provided."
  );
  assert(
    callbackLeadEmail.html.includes('href="tel:+917776012345"') &&
    callbackLeadEmail.html.includes('href="https://wa.me/917776012345"'),
    "Phone and WhatsApp action buttons render for callback phone number."
  );

  // -----------------------------------------------------------------------------
  // Test Suite 6: Customer Enquiry Confirmation Email
  // -----------------------------------------------------------------------------
  console.log("\n6. Testing Customer Enquiry Confirmation Template:");

  const custEnquiryEmail = renderCustomerConfirmationEmail(sampleEnquiryData, config, true);

  assert(
    custEnquiryEmail.subject.includes("Enquiry Received") &&
    custEnquiryEmail.subject.includes("MTPL-890123"),
    "Customer subject contains reference and welcoming subject."
  );
  assert(
    custEnquiryEmail.html.includes("Hello <strong>Rajesh Sharma</strong>"),
    "Customer greeting is personalized and warm."
  );
  assert(
    custEnquiryEmail.html.includes("src=\"cid:mtpl-desktop-logo\"") &&
    custEnquiryEmail.html.includes("src=\"cid:mtpl-footer-logo\""),
    "Customer email includes both header and footer logos via CID."
  );
  assert(
    custEnquiryEmail.html.includes("does not constitute a confirmed ticket, hotel booking, or tariff lock"),
    "Mandatory booking & tariff disclaimer is clearly visible."
  );
  assert(
    custEnquiryEmail.html.includes("What Happens Next?"),
    "Reassuring operational next-steps are included for the traveller."
  );
  assert(
    custEnquiryEmail.text.includes("MISHRIKOTKAR TRAVELS PVT. LTD. (MTPL)") &&
    custEnquiryEmail.text.includes("Reference Code: #MTPL-890123"),
    "Plain-text customer email is complete and readable."
  );

  // -----------------------------------------------------------------------------
  // Test Suite 6b: Admin Detailed Enquiry Notification Template
  // -----------------------------------------------------------------------------
  console.log("\n6b. Testing Admin Detailed Enquiry Notification Template:");

  const companyNotifEmail = renderCompanyNotificationEmail(sampleEnquiryData, config, true);

  assert(
    companyNotifEmail.subject.includes("[New Lead]") &&
    companyNotifEmail.subject.includes("MTPL-890123") &&
    companyNotifEmail.subject.includes("Rajesh Sharma"),
    "Company notification subject contains reference and customer name."
  );
  assert(
    companyNotifEmail.html.includes("Customer Planning Notes / Message") &&
    companyNotifEmail.html.includes("System Metadata &amp; Compliance Audit Stamp"),
    "Separates customer travel notes and compliance audit stamp."
  );
  assert(
    companyNotifEmail.html.includes("src=\"cid:mtpl-desktop-logo\"") &&
    companyNotifEmail.html.includes("src=\"cid:mtpl-footer-logo\""),
    "Company notification includes both header and footer logos via CID."
  );
  assert(
    companyNotifEmail.html.includes('href="tel:+919823012345"') &&
    companyNotifEmail.html.includes('href="https://wa.me/919823012345"'),
    "Company notification includes working call and WhatsApp action buttons."
  );

  // -----------------------------------------------------------------------------
  // Test Suite 7: Customer Free Quote Confirmation Email
  // -----------------------------------------------------------------------------
  console.log("\n7. Testing Customer Free Quote Confirmation Template:");

  const quoteCustEmail = renderQuoteConfirmationEmail(sampleQuoteCustData, config, true);

  assert(
    quoteCustEmail.subject.includes("Quote Request Received") &&
    quoteCustEmail.subject.includes("CB-54A559"),
    "Quote confirmation subject includes reference and clear title."
  );
  assert(
    quoteCustEmail.html.includes("Sneha Deshmukh") &&
    quoteCustEmail.html.includes("Unlimited Maharashtra"),
    "Displays customer name and selected package interest."
  );
  assert(
    quoteCustEmail.html.includes("src=\"cid:mtpl-desktop-logo\"") &&
    quoteCustEmail.html.includes("src=\"cid:mtpl-footer-logo\""),
    "Customer quote confirmation includes both header and footer logos."
  );
  assert(
    quoteCustEmail.html.includes("FREE QUOTE CONFIRMATION"),
    "Includes appropriate customer-facing status badge."
  );

  // -----------------------------------------------------------------------------
  // Test Suite 8: Feedback Emails (Admin Notification & Customer Confirmation)
  // -----------------------------------------------------------------------------
  console.log("\n8. Testing Customer & Admin Feedback Templates:");

  const adminFeedbackEmail = renderAdminFeedbackNotificationEmail(sampleFeedbackData, config, true);
  assert(
    adminFeedbackEmail.subject.includes("New Customer Feedback — MTPL") &&
    adminFeedbackEmail.subject.includes("Reference #FB-771829"),
    "Admin feedback subject contains MTPL branding and reference."
  );
  assert(
    adminFeedbackEmail.html.includes("Outstanding arrangements for our Dubai family tour"),
    "Admin feedback email displays full unedited customer feedback."
  );

  const custFeedbackEmail = renderCustomerFeedbackConfirmationEmail(sampleFeedbackData, config, true);
  assert(
    custFeedbackEmail.subject.includes("We’ve Received Your Feedback") &&
    custFeedbackEmail.subject.includes("FB-771829"),
    "Customer feedback acknowledgement has warm subject and reference."
  );
  assert(
    custFeedbackEmail.html.includes("Hello <strong>Vikram Singhania</strong>"),
    "Customer feedback greeting is personalized."
  );

  // -----------------------------------------------------------------------------
  // Test Suite 9: Mock Email Dispatch & Recipient Routing
  // -----------------------------------------------------------------------------
  console.log("\n9. Testing Mock Email Dispatch & Routing (100% Offline):");

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
    sendMail: async (options: MockMailCall) => {
      capturedMails.push(options);
      return {
        messageId: `<mock-${Date.now()}-${capturedMails.length}@mishrikotkartravels.com>`,
        response: "250 2.0.0 OK (mocked)",
      };
    },
  };

  setTestTransporter(mockTransporter as Parameters<typeof setTestTransporter>[0]);

  try {
    // 1. Dispatch enquiry emails
    const enquiryResult = await sendEnquiryEmails(sampleEnquiryData);
    assert(
      enquiryResult.overallSuccess === true,
      "sendEnquiryEmails completed with overallSuccess=true."
    );
    assert(
      capturedMails.length === 2,
      "2 emails captured: customer confirmation and company notification."
    );

    const sentCustomerMail = capturedMails.find(m => m.to === sampleEnquiryData.email);
    assert(
      Boolean(
        sentCustomerMail !== undefined &&
        sentCustomerMail.attachments?.some(a => a.cid === "mtpl-footer-logo")
      ),
      "Customer confirmation sent to customer email with inline footer logo attachment."
    );

    const sentCompanyMail = capturedMails.find(m => m.to === config.notificationRecipient);
    assert(
      Boolean(
        sentCompanyMail !== undefined &&
        sentCompanyMail.replyTo === sampleEnquiryData.email &&
        sentCompanyMail.attachments?.some(a => a.cid === "mtpl-footer-logo")
      ),
      "Company notification sent to admin recipient with replyTo set to customer."
    );

    // 2. Dispatch admin lead notification
    const leadResult = await sendLeadNotificationEmail(sampleQuoteLeadData);
    assert(
      leadResult.status === "accepted",
      "sendLeadNotificationEmail successfully accepted by mock transport."
    );

    // 3. Dispatch customer quote confirmation
    const quoteResult = await sendQuoteConfirmationEmail(sampleQuoteCustData);
    assert(
      quoteResult.status === "accepted",
      "sendQuoteConfirmationEmail successfully accepted by mock transport."
    );

    // 4. Dispatch feedback emails
    const feedbackResult = await sendFeedbackEmails(sampleFeedbackData);
    assert(
      feedbackResult.adminNotification.status === "accepted" &&
      feedbackResult.customerConfirmation?.status === "accepted",
      "sendFeedbackEmails successfully sent both admin and customer emails."
    );
  } finally {
    resetTransporter();
  }

  // -----------------------------------------------------------------------------
  // Test Suite 10: Complete Failure Isolation
  // -----------------------------------------------------------------------------
  console.log("\n10. Testing Failure Isolation (Customer error never breaks company email):");

  const failingMockTransporter: unknown = {
    sendMail: async (options: MockMailCall) => {
      if (options.to === sampleEnquiryData.email) {
        throw new Error("Simulated customer SMTP mailbox full");
      }
      return {
        messageId: "<mock-company-success@mishrikotkartravels.com>",
        response: "250 OK (mocked)",
      };
    },
  };

  setTestTransporter(failingMockTransporter as Parameters<typeof setTestTransporter>[0]);

  try {
    const isolatedResult = await sendEnquiryEmails(sampleEnquiryData);
    assert(
      isolatedResult.customerConfirmation.status === "failed",
      "Customer confirmation correctly reports 'failed'."
    );
    assert(
      isolatedResult.companyNotification.status === "accepted",
      "Company notification STILL succeeds (isolated failure resilience)."
    );
  } finally {
    resetTransporter();
  }

  // -----------------------------------------------------------------------------
  // Summary
  // -----------------------------------------------------------------------------
  console.log("\n==================================================================");
  console.log(`Test Execution Finished: ${passedCount} PASSED, ${failedCount} FAILED.`);
  console.log("==================================================================");

  if (failedCount > 0) {
    process.exit(1);
  }
}

runEmailTests().catch((err) => {
  console.error("Test execution threw an unhandled exception:", err);
  process.exit(1);
});
