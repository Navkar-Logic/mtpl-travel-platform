import "./mock-server-only.js";
import fs from "fs";
import path from "path";
import { getEmailConfig } from "../src/lib/email/config";
import { renderLeadNotificationEmail, LeadNotificationEmailData } from "../src/lib/email/templates/lead-notification";
import { renderCompanyNotificationEmail } from "../src/lib/email/templates/company-notification";
import { renderCustomerConfirmationEmail } from "../src/lib/email/templates/customer-confirmation";
import { renderQuoteConfirmationEmail, QuoteConfirmationEmailData } from "../src/lib/email/templates/quote-confirmation";
import { renderAdminFeedbackNotificationEmail, renderCustomerFeedbackConfirmationEmail, FeedbackEmailData } from "../src/lib/email/templates/feedback-notification";
import type { EnquiryEmailData } from "../src/lib/email/types";

const config = getEmailConfig();

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

function previewHtml(html: string): string {
  // Replace CID attachments with local web-accessible paths for direct browser viewing
  return html
    .replace(/cid:mtpl-desktop-logo/g, "/assets/mtpl-desktop-logo.png")
    .replace(/cid:mtpl-footer-logo/g, "/assets/mtpl-footer-logo.png");
}

const outDir = path.join(process.cwd(), "public", "email-previews");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const previews = [
  {
    name: "1-quote-lead-admin.html",
    render: () => renderLeadNotificationEmail(sampleQuoteLeadData, config),
  },
  {
    name: "2-callback-lead-admin.html",
    render: () => renderLeadNotificationEmail(sampleCallbackLeadData, config),
  },
  {
    name: "3-enquiry-company-admin.html",
    render: () => renderCompanyNotificationEmail(sampleEnquiryData, config),
  },
  {
    name: "4-enquiry-confirmation-customer.html",
    render: () => renderCustomerConfirmationEmail(sampleEnquiryData, config),
  },
  {
    name: "5-quote-confirmation-customer.html",
    render: () => renderQuoteConfirmationEmail(sampleQuoteCustData, config),
  },
  {
    name: "6-feedback-notification-admin.html",
    render: () => renderAdminFeedbackNotificationEmail(sampleFeedbackData, config),
  },
  {
    name: "7-feedback-confirmation-customer.html",
    render: () => renderCustomerFeedbackConfirmationEmail(sampleFeedbackData, config),
  },
];

for (const p of previews) {
  const rendered = p.render();
  const fileContent = previewHtml(rendered.html);
  fs.writeFileSync(path.join(outDir, p.name), fileContent, "utf-8");
  console.log(`Generated preview: ${p.name}`);
}

console.log("All previews generated in public/email-previews/");
