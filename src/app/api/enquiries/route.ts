import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Enquiry } from "@/models/enquiry";
import { enquirySchema, CURRENT_POLICY_VERSION } from "@/lib/validations/enquiry";
import { sendEnquiryEmails } from "@/lib/email";
import type { EnquiryEmailData, EnquiryEmailDispatchResult } from "@/lib/email/types";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot spam check - silent discard for bots
    if (body.honeypot) {
      return NextResponse.json({ success: true, message: "Enquiry received." }, { status: 200 });
    }

    const validatedData = enquirySchema.parse(body);

    await connectToDatabase();

    // Server-side authoritative consent audit stamping
    // Client-provided timestamps and version numbers are not trusted
    const serverConsentTimestamp = new Date();
    const serverPolicyVersion = CURRENT_POLICY_VERSION;

    const newEnquiry = new Enquiry({
      fullName: validatedData.fullName,
      companyName: validatedData.companyName,
      email: validatedData.email,
      phone: validatedData.phone,
      travelType: validatedData.travelType,
      destination: validatedData.destination,
      travelDate: validatedData.travelDate,
      returnDate: validatedData.returnDate,
      travellers: validatedData.travellers,
      budget: validatedData.budget,
      message: validatedData.message,
      source: validatedData.source,
      packageSlug: validatedData.packageSlug,
      destinationSlug: validatedData.destinationSlug,
      offerSlug: validatedData.offerSlug,
      serviceId: validatedData.serviceId,
      consentAccepted: true,
      consentDetails: {
        accuracyConfirmed: validatedData.declarations.accuracyConfirmed,
        communicationConsent: validatedData.declarations.communicationConsent,
        privacyAcknowledged: validatedData.declarations.privacyAcknowledged,
        bookingDisclaimerAcknowledged: validatedData.declarations.bookingDisclaimerAcknowledged,
        termsAcknowledged: validatedData.declarations.termsAcknowledged,
        acceptedAt: serverConsentTimestamp,
        policyVersion: serverPolicyVersion,
      },
      status: "NEW",
    });

    // 1. Mandatory persistence first: Enquiry must be safely in MongoDB before any email attempts
    const savedEnquiry = await newEnquiry.save();

    // 2. Stable human-readable reference derived from saved document
    const enquiryReference = `MTPL-${savedEnquiry._id.toString().slice(-6).toUpperCase()}`;

    // 3. Prepare decoupled email data
    const emailData: EnquiryEmailData = {
      id: savedEnquiry._id.toString(),
      reference: enquiryReference,
      fullName: savedEnquiry.fullName,
      companyName: savedEnquiry.companyName,
      email: savedEnquiry.email,
      phone: savedEnquiry.phone,
      travelType: savedEnquiry.travelType,
      destination: savedEnquiry.destination,
      travelDate: savedEnquiry.travelDate,
      returnDate: savedEnquiry.returnDate,
      travellers: savedEnquiry.travellers,
      budget: savedEnquiry.budget,
      message: savedEnquiry.message,
      source: savedEnquiry.source,
      packageSlug: savedEnquiry.packageSlug,
      destinationSlug: savedEnquiry.destinationSlug,
      offerSlug: savedEnquiry.offerSlug,
      serviceId: savedEnquiry.serviceId,
      createdAt: savedEnquiry.createdAt,
      consentDetails: savedEnquiry.consentDetails,
    };

    // 4. Attempt email dispatches with complete failure isolation
    let dispatchResult: EnquiryEmailDispatchResult | null = null;
    try {
      dispatchResult = await sendEnquiryEmails(emailData);

      // Record safe delivery status on the persisted document
      if (dispatchResult) {
        await Enquiry.updateOne(
          { _id: savedEnquiry._id },
          {
            $set: {
              emailAudit: {
                customerEmailStatus: dispatchResult.customerConfirmation.status,
                customerEmailAttemptedAt: dispatchResult.customerConfirmation.attemptedAt,
                customerMessageId: dispatchResult.customerConfirmation.messageId,
                companyEmailStatus: dispatchResult.companyNotification.status,
                companyEmailAttemptedAt: dispatchResult.companyNotification.attemptedAt,
                companyMessageId: dispatchResult.companyNotification.messageId,
              },
            },
          }
        ).catch((dbErr) => {
          console.warn(
            "[EnquiriesAPI] Non-critical delivery audit update skipped:",
            dbErr instanceof Error ? dbErr.message : "DB update error"
          );
        });
      }
    } catch (emailErr) {
      console.error(
        "[EnquiriesAPI] Email dispatch exception:",
        emailErr instanceof Error ? emailErr.message : "Unknown error"
      );
    }

    // 5. Truthful response indicating reception and realistic email status
    const customerAccepted = dispatchResult?.customerConfirmation.status === "accepted";
    const responseMessage = customerAccepted
      ? "Your enquiry has been successfully recorded. An MTPL travel specialist will contact you shortly."
      : "Your enquiry has been received and saved. Our travel team has been notified, though email confirmation may be delayed.";

    return NextResponse.json(
      {
        success: true,
        message: responseMessage,
        enquiryId: savedEnquiry._id,
        reference: enquiryReference,
        delivery: {
          customerConfirmation: dispatchResult?.customerConfirmation.status || "delayed",
          companyNotification: dispatchResult?.companyNotification.status || "delayed",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please verify your submission.",
          errors: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    // Safe error logging without credentials
    const safeError = error instanceof Error ? error.message : "Unknown database error";
    console.error("Enquiry submission error:", safeError);

    return NextResponse.json(
      {
        success: false,
        message: "We encountered a temporary issue recording your enquiry. Please contact us directly or try again.",
      },
      { status: 500 }
    );
  }
}
