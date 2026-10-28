import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Feedback } from "@/models/feedback";
import { feedbackSubmissionSchema } from "@/lib/validations/feedback";
import { sendFeedbackEmails } from "@/lib/email/service";
import type { EmailDeliveryStatus } from "@/lib/email/types";
import { z } from "zod";

function saveBackupFeedback(record: {
  fullName: string;
  email: string;
  phone?: string;
  packageOrService?: string;
  feedback: string;
  reference: string;
  createdAt: string;
}) {
  try {
    const dir = path.join(process.cwd(), "storage");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, "feedback-backup.json");
    let existing: unknown[] = [];
    if (fs.existsSync(filePath)) {
      try {
        existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      } catch {
        existing = [];
      }
    }
    existing.push(record);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf-8");
  } catch (fsErr) {
    console.error("[FeedbackAPI] Failed to record backup feedback:", fsErr);
  }
}

export async function POST(req: Request) {
  try {
    // 1. Request size limit validation (max 100KB body)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 100 * 1024) {
      return NextResponse.json(
        { success: false, error: "Payload exceeds maximum allowed size (100KB)." },
        { status: 413 }
      );
    }

    const body = await req.json();

    // 2. Honeypot spam check - silent discard for automated spam bots
    if (body.honeypot) {
      return NextResponse.json(
        {
          success: true,
          message: "Thank you for your feedback! Your message has been received.",
          reference: `FB-${crypto.randomBytes(3).toString("hex").toUpperCase()}`,
        },
        { status: 200 }
      );
    }

    // 3. Strict server-side Zod validation
    const validatedData = feedbackSubmissionSchema.parse(body);

    let reference = "";
    let savedDocumentId: string | null = null;
    let savedCreatedAt = new Date();

    try {
      await connectToDatabase();

      // 4. Rate-limiting & duplicate submission mitigation (within last 60 seconds)
      const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
      const existingRecent = await Feedback.findOne({
        email: validatedData.email.toLowerCase(),
        createdAt: { $gte: oneMinuteAgo },
      }).lean();

      if (existingRecent) {
        return NextResponse.json(
          {
            success: true,
            message: "Thank you! Your feedback has already been received.",
            reference: existingRecent.reference,
          },
          { status: 200 }
        );
      }

      // Generate reference from timestamp hex
      const generatedRef = `FB-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;

      const newFeedback = new Feedback({
        fullName: validatedData.fullName,
        email: validatedData.email.toLowerCase(),
        phone: validatedData.phone || "",
        packageOrService: validatedData.packageOrService || "",
        feedback: validatedData.feedback,
        reference: generatedRef,
        status: "NEW",
      });

      const savedFeedback = await newFeedback.save();
      reference = savedFeedback.reference;
      savedDocumentId = savedFeedback._id.toString();
      savedCreatedAt = savedFeedback.createdAt;
    } catch (dbError) {
      console.error("[FeedbackAPI] Database error during persistence:", dbError);

      // Graceful offline fallback: store safely in local filesystem storage
      reference = `FB-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
      saveBackupFeedback({
        fullName: validatedData.fullName,
        email: validatedData.email.toLowerCase(),
        phone: validatedData.phone || "",
        packageOrService: validatedData.packageOrService || "",
        feedback: validatedData.feedback,
        reference,
        createdAt: new Date().toISOString(),
      });
    }

    // 5. Decoupled email dispatches (isolated failure resilience)
    // Email failure NEVER fails or discards successfully persisted feedback
    let emailAuditResult: {
      adminEmailStatus: EmailDeliveryStatus;
      customerEmailStatus?: EmailDeliveryStatus;
      error?: string;
    } = {
      adminEmailStatus: "skipped",
    };

    try {
      const dispatchResult = await sendFeedbackEmails({
        reference,
        customerName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone || undefined,
        feedbackText: validatedData.feedback,
        destinationOrPackage: validatedData.packageOrService || undefined,
        createdAt: savedCreatedAt,
      });

      emailAuditResult = {
        adminEmailStatus: dispatchResult.adminNotification.status,
        customerEmailStatus: dispatchResult.customerConfirmation?.status,
        error: dispatchResult.adminNotification.error || dispatchResult.customerConfirmation?.error,
      };

      // Safely update audit stamp on persisted document if DB is active
      if (savedDocumentId) {
        try {
          await Feedback.updateOne(
            { _id: savedDocumentId },
            {
              $set: {
                emailAudit: {
                  adminEmailStatus: dispatchResult.adminNotification.status,
                  customerEmailStatus: dispatchResult.customerConfirmation?.status,
                  adminAttemptedAt: dispatchResult.adminNotification.attemptedAt,
                  customerAttemptedAt: dispatchResult.customerConfirmation?.attemptedAt,
                  error: emailAuditResult.error,
                },
              },
            }
          );
        } catch (auditErr) {
          console.error("[FeedbackAPI] Failed to record email audit stamp:", auditErr);
        }
      }
    } catch (emailErr) {
      console.error("[FeedbackAPI] Unhandled error during feedback email dispatch:", emailErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your feedback! Your message has been received.",
        reference,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    console.error("[FeedbackAPI] Internal server error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while submitting your feedback. Please try again.",
      },
      { status: 500 }
    );
  }
}
