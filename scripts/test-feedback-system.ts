/**
 * Comprehensive verification test suite for MTPL Customer Feedback Subsystem.
 * 
 * Strict safety rules:
 * - 100% offline: Zero live SMTP connections, zero actual emails dispatched.
 * - Zero live database connections or mutations.
 * - Uses Nodemailer mock transporter to verify email generation, HTML escaping,
 *   field validation, failure isolation, and duplicate mitigation.
 */
import "./mock-server-only.js";
import { feedbackSubmissionSchema } from "../src/lib/validations/feedback";
import {
  renderAdminFeedbackNotificationEmail,
  renderCustomerFeedbackConfirmationEmail,
  FeedbackEmailData,
} from "../src/lib/email/templates/feedback-notification";
import { getEmailConfig } from "../src/lib/email/config";
import { setTestTransporter, resetTransporter } from "../src/lib/email/transport";
import { sendFeedbackEmails } from "../src/lib/email/service";
import { getWebsiteTestimonials, allTestimonialRecords } from "../src/features/testimonials/data/testimonials";

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

async function runFeedbackTests() {
  console.log("==================================================================");
  console.log("MTPL Reviews & Feedback Subsystem — Complete Verification Suite");
  console.log("==================================================================");

  // -----------------------------------------------------------------------------
  // Test Suite 1: Testimonials Data Audit & Deduplication
  // -----------------------------------------------------------------------------
  console.log("\n1. Testing Testimonials Source Data & Deduplication:");

  assert(
    allTestimonialRecords.length === 29,
    `Total testimonial records in source manifest is exactly 29 (found: ${allTestimonialRecords.length}).`
  );

  const websiteReviews = getWebsiteTestimonials();
  assert(
    websiteReviews.length === 27,
    `Website reviews correctly excludes duplicate testimonial-022 and Deven Chauhan (testimonial-001), resulting in exactly 27 unique records (found: ${websiteReviews.length}).`
  );

  assert(
    !websiteReviews.some((r) => r.id === "testimonial-022"),
    "Deduplicated record testimonial-022 is excluded from website reviews."
  );

  assert(
    !websiteReviews.some((r) => r.id === "testimonial-001" || r.customerName === "Deven Chauhan"),
    "Deven Chauhan (testimonial-001) is excluded from website reviews per user specification."
  );

  const verifiedRatings = websiteReviews.filter(
    (r) => r.ratingStatus === "verified" && typeof r.rating === "number"
  );
  assert(
    verifiedRatings.length === 1 && verifiedRatings[0].id === "testimonial-021" && verifiedRatings[0].rating === 5,
    "Only genuinely verified ratings (Amit Jain: 5 stars) are displayed; zero fabricated ratings."
  );

  const unverifiedRatings = websiteReviews.filter((r) => r.ratingStatus === "not_present");
  assert(
    unverifiedRatings.length === 26,
    `Remaining 26 records accurately preserve unrated direct customer messages (found: ${unverifiedRatings.length}).`
  );

  // -----------------------------------------------------------------------------
  // Test Suite 2: Server-side Zod Validation
  // -----------------------------------------------------------------------------
  console.log("\n2. Testing Feedback Input Validation & Sanitization:");

  // Valid full submission
  const validFull = feedbackSubmissionSchema.safeParse({
    fullName: "Pooja Deshpande",
    email: "pooja.d@example.com",
    phone: "+91 98220 12345",
    packageOrService: "Kerala Backwaters & Munnar Holiday",
    feedback: "The houseboat experience in Alleppey was breathtaking. Driver was courteous and punctual throughout.",
  });
  assert(validFull.success, "Valid submission with all fields passes validation.");

  // Valid submission with optional fields omitted
  const validMinimal = feedbackSubmissionSchema.safeParse({
    fullName: "Aarav Sharma",
    email: "aarav@example.com",
    feedback: "Everything was perfectly arranged by MTPL for our honeymoon trip to Goa.",
  });
  assert(validMinimal.success, "Valid submission with optional phone and package omitted passes validation.");

  // Missing full name
  const missingName = feedbackSubmissionSchema.safeParse({
    fullName: " ",
    email: "test@example.com",
    feedback: "Great arrangements made by MTPL team.",
  });
  assert(!missingName.success, "Rejects submission when fullName is empty/whitespace.");

  // Name too short
  const shortName = feedbackSubmissionSchema.safeParse({
    fullName: "A",
    email: "test@example.com",
    feedback: "Great arrangements made by MTPL team.",
  });
  assert(!shortName.success, "Rejects submission when fullName is under 2 characters.");

  // Missing email
  const missingEmail = feedbackSubmissionSchema.safeParse({
    fullName: "Rajesh Kumar",
    email: "",
    feedback: "Great arrangements made by MTPL team.",
  });
  assert(!missingEmail.success, "Rejects submission when email is missing.");

  // Malformed email
  const invalidEmail = feedbackSubmissionSchema.safeParse({
    fullName: "Rajesh Kumar",
    email: "not-an-email",
    feedback: "Great arrangements made by MTPL team.",
  });
  assert(!invalidEmail.success, "Rejects submission when email format is invalid.");

  // Feedback too short (< 10 chars)
  const shortFeedback = feedbackSubmissionSchema.safeParse({
    fullName: "Rajesh Kumar",
    email: "rajesh@example.com",
    feedback: "Too short",
  });
  assert(!shortFeedback.success, "Rejects feedback under 10 characters.");

  // Oversized feedback (> 3000 chars)
  const oversizedFeedback = feedbackSubmissionSchema.safeParse({
    fullName: "Rajesh Kumar",
    email: "rajesh@example.com",
    feedback: "A".repeat(3001),
  });
  assert(!oversizedFeedback.success, "Rejects feedback exceeding 3,000 characters limit.");

  // Invalid phone format
  const invalidPhone = feedbackSubmissionSchema.safeParse({
    fullName: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "abc-xyz",
    feedback: "Great arrangements made by MTPL team.",
  });
  assert(!invalidPhone.success, "Rejects phone number containing non-phone characters.");

  // Honeypot spam bot check
  const honeypotBot = feedbackSubmissionSchema.safeParse({
    fullName: "Spam Bot",
    email: "spambot@example.com",
    feedback: "Buy crypto currency right now at cheap prices!",
    honeypot: "http://spam.example.com",
  });
  assert(!honeypotBot.success, "Fails validation when honeypot field is populated by bots.");

  // -----------------------------------------------------------------------------
  // Test Suite 3: Email Generation & HTML Escaping
  // -----------------------------------------------------------------------------
  console.log("\n3. Testing Customer Confirmation & Admin Notification Emails:");

  const config = getEmailConfig();

  const sampleFeedback: FeedbackEmailData = {
    reference: "FB-A1B2C3",
    customerName: "Vikram Singhania",
    email: "vikram.s@example.com",
    phone: "+91 94221 88990",
    packageOrService: "Wonders of Dubai (5N/6D)",
    feedback: "Outstanding arrangements for our Dubai family tour. The private transfers and desert safari were flawless!\n\nSpecial thanks to Tushar for monitoring our flight status.",
    createdAt: new Date("2026-10-28T10:30:00Z"),
  };

  // Customer Confirmation Email
  const customerEmail = renderCustomerFeedbackConfirmationEmail(sampleFeedback, config, true);
  assert(
    customerEmail.subject === "We’ve Received Your Feedback | Mishrikotkar Travels (Ref: #FB-A1B2C3)",
    `Customer subject matches specification: '${customerEmail.subject}'`
  );
  assert(
    customerEmail.html.includes("We’ve Received Your Feedback") || customerEmail.html.includes("FEEDBACK RECEIVED"),
    "Customer email includes clear feedback badge/title."
  );
  assert(
    customerEmail.html.includes("Vikram Singhania"),
    "Customer confirmation contains personalized customer name."
  );
  assert(
    customerEmail.html.includes("FB-A1B2C3"),
    "Customer confirmation includes unique reference code FB-A1B2C3."
  );
  assert(
    customerEmail.html.includes("cid:mtpl-desktop-logo") && customerEmail.html.includes("cid:mtpl-footer-logo"),
    "Customer confirmation contains branded inline header and footer logos."
  );
  assert(
    customerEmail.html.includes('width="360" height="169"'),
    "Customer confirmation footer logo banner uses enlarged 360x169 dimensions."
  );
  assert(
    !customerEmail.html.includes("within 24 hours"),
    "Customer confirmation does not make unapproved resolution promises."
  );
  assert(
    customerEmail.text.includes("FB-A1B2C3") && customerEmail.text.includes("Mishrikotkar Travels"),
    "Plain-text version contains structured reference and brand."
  );

  // Admin Notification Email
  const adminEmail = renderAdminFeedbackNotificationEmail(sampleFeedback, config, true);
  assert(
    adminEmail.subject === "New Customer Feedback — MTPL | Reference #FB-A1B2C3",
    `Admin subject matches specification: '${adminEmail.subject}'`
  );
  assert(
    adminEmail.html.includes("CUSTOMER FEEDBACK"),
    "Admin notification contains clear status badge."
  );
  assert(
    adminEmail.html.includes("Vikram Singhania") &&
    adminEmail.html.includes("vikram.s@example.com") &&
    adminEmail.html.includes("+91 94221 88990"),
    "Admin notification includes all customer contact details."
  );
  assert(
    adminEmail.html.includes("Wonders of Dubai (5N/6D)"),
    "Admin notification includes package/service detail."
  );
  assert(
    adminEmail.html.includes("Outstanding arrangements for our Dubai family tour"),
    "Admin notification includes full unedited customer feedback comments."
  );

  // Malicious HTML Injection Escaping Check
  const xssFeedback: FeedbackEmailData = {
    reference: "FB-XSS001",
    customerName: '<script>alert("XSS")</script> Hacker',
    email: "hacker@example.com",
    feedback: '<b onmouseover="alert(1)">Injected Bold</b> & "quotes" \'apostrophe\'',
  };
  const escapedAdminEmail = renderAdminFeedbackNotificationEmail(xssFeedback, config, true);
  assert(
    !escapedAdminEmail.html.includes("<script>") &&
    escapedAdminEmail.html.includes("&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;"),
    "Admin notification safely escapes malicious customer name script tags."
  );
  assert(
    !escapedAdminEmail.html.includes('onmouseover="alert(1)"') &&
    escapedAdminEmail.html.includes("&lt;b onmouseover=&quot;alert(1)&quot;&gt;Injected Bold&lt;/b&gt;"),
    "Admin notification safely escapes malicious HTML attributes in customer feedback."
  );

  // -----------------------------------------------------------------------------
  // Test Suite 4: Mock Email Dispatch & Decoupled Routing
  // -----------------------------------------------------------------------------
  console.log("\n4. Testing Mock Email Dispatch & Failure Isolation:");

  interface MockMailRecord {
    from: string;
    to: string;
    replyTo?: string;
    subject: string;
    html: string;
    text: string;
  }

  const dispatchedMails: MockMailRecord[] = [];

  const mockTransporter: unknown = {
    sendMail: async (opts: MockMailRecord) => {
      dispatchedMails.push(opts);
      return {
        messageId: `<mock-feedback-${Date.now()}-${dispatchedMails.length}@mishrikotkartravels.com>`,
        response: "250 2.0.0 OK (mocked)",
      };
    },
  };

  setTestTransporter(mockTransporter as Parameters<typeof setTestTransporter>[0]);

  try {
    const result = await sendFeedbackEmails(sampleFeedback);

    assert(
      result.adminNotification.status === "accepted",
      "Admin notification email was accepted by mock transport."
    );
    assert(
      result.customerConfirmation?.status === "accepted",
      "Customer confirmation email was accepted by mock transport."
    );
    assert(
      dispatchedMails.length === 2,
      `Exactly 2 emails were dispatched (Admin & Customer). Count: ${dispatchedMails.length}.`
    );

    const adminSent = dispatchedMails[0];
    const customerSent = dispatchedMails[1];

    assert(
      adminSent.to === config.notificationRecipient,
      `Admin email was routed to internal recipient: ${adminSent.to}`
    );
    assert(
      adminSent.replyTo === sampleFeedback.email,
      `Admin email replyTo is safely set to customer email: ${adminSent.replyTo}`
    );
    assert(
      customerSent.to === sampleFeedback.email,
      `Customer email was routed to customer address: ${customerSent.to}`
    );
  } finally {
    resetTransporter();
  }

  // Failure Isolation: Customer SMTP error does not crash service
  const failingTransporter: unknown = {
    sendMail: async (opts: MockMailRecord) => {
      if (opts.to.includes("failing-customer")) {
        throw new Error("Simulated customer SMTP bounce: mailbox not found");
      }
      return {
        messageId: `<mock-admin-ok-${Date.now()}@mishrikotkartravels.com>`,
        response: "250 OK",
      };
    },
  };

  setTestTransporter(failingTransporter as Parameters<typeof setTestTransporter>[0]);

  try {
    const resilientResult = await sendFeedbackEmails({
      ...sampleFeedback,
      email: "failing-customer@example.com",
    });

    assert(
      resilientResult.adminNotification.status === "accepted",
      "Admin notification STILL succeeds even when customer delivery fails."
    );
    assert(
      resilientResult.customerConfirmation?.status === "failed",
      "Customer confirmation reports 'failed' with isolated error capture."
    );
  } finally {
    resetTransporter();
  }

  // -----------------------------------------------------------------------------
  // Test Summary
  // -----------------------------------------------------------------------------
  console.log("\n==================================================================");
  console.log(`Feedback Test Execution Finished: ${passedCount} PASSED, ${failedCount} FAILED.`);
  console.log("==================================================================");

  if (failedCount > 0) {
    process.exit(1);
  }
}

runFeedbackTests().catch((err) => {
  console.error("Test execution aborted:", err);
  process.exit(1);
});
