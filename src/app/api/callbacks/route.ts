import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { connectToDatabase } from "@/lib/db/mongoose";
import { CallbackRequest } from "@/models/callback";
import { callbackRequestSchema } from "@/lib/validations/callback";
import { sendLeadNotificationEmail, sendQuoteConfirmationEmail } from "@/lib/email/service";
import { z } from "zod";

function saveBackupCallback(record: {
  phone: string;
  name?: string;
  email?: string;
  tourType?: string;
  requestType?: string;
  packageSlug?: string;
  packageName?: string;
  createdAt: string;
  reference: string;
}) {
  try {
    const dir = path.join(process.cwd(), "storage");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, "callbacks-backup.json");
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
    console.error("[CallbacksAPI] Failed to record backup callback:", fsErr);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot spam check - silent discard for bots
    if (body.honeypot) {
      return NextResponse.json(
        {
          success: true,
          message: "Thank you! Your request has been received. Our team will contact you within 24 hours.",
        },
        { status: 200 }
      );
    }

    const validatedData = callbackRequestSchema.parse(body);
    const requestType = validatedData.requestType || "callback";

    let reference = "";

    try {
      await connectToDatabase();

      // Basic duplicate & spam mitigation (within last 60 seconds)
      const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
      const existingRecent = await CallbackRequest.findOne({
        phone: validatedData.phone,
        requestType,
        createdAt: { $gte: oneMinuteAgo },
      }).lean();

      if (existingRecent) {
        const existingRef = `CB-${existingRecent._id.toString().slice(-6).toUpperCase()}`;
        return NextResponse.json(
          {
            success: true,
            message:
              requestType === "quote"
                ? "Thank you! Your quote request has been received. Our team will contact you within 24 hours."
                : "Thank you! Your callback request has been received. Our team will call you back within 24 hours.",
            reference: existingRef,
            requestType,
          },
          { status: 200 }
        );
      }

      const newCallback = new CallbackRequest({
        phone: validatedData.phone,
        name: validatedData.name || "",
        email: validatedData.email || "",
        tourType: validatedData.tourType || "",
        packageSlug: validatedData.packageSlug || "",
        packageName: validatedData.packageName || "",
        requestType,
        source: validatedData.packageSlug ? "package" : "website_rail",
        status: "NEW",
      });

      const savedCallback = await newCallback.save();
      reference = `CB-${savedCallback._id.toString().slice(-6).toUpperCase()}`;
    } catch (dbError) {
      console.warn(
        "[CallbacksAPI] Primary database delayed or unreachable; recording to resilient fallback:",
        dbError instanceof Error ? dbError.message : "DB error"
      );

      // Generate reference ID and record to persistent fallback ledger
      const fallbackSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
      reference = `CB-${fallbackSuffix}`;

      saveBackupCallback({
        phone: validatedData.phone,
        name: validatedData.name || "",
        email: validatedData.email || "",
        tourType: validatedData.tourType || "",
        requestType,
        packageSlug: validatedData.packageSlug || "",
        packageName: validatedData.packageName || "",
        createdAt: new Date().toISOString(),
        reference,
      });
    }

    // Dispatch admin lead notification email
    try {
      await sendLeadNotificationEmail({
        reference,
        requestType,
        name: validatedData.name,
        phone: validatedData.phone,
        email: validatedData.email,
        tourType: validatedData.tourType,
        packageSlug: validatedData.packageSlug,
        packageName: validatedData.packageName,
        createdAt: new Date(),
      });
    } catch (emailErr) {
      console.error("[CallbacksAPI] Admin email dispatch failed:", emailErr);
    }

    // Dispatch customer confirmation email if customer provided an email address
    if (requestType === "quote" && validatedData.email?.trim()) {
      try {
        await sendQuoteConfirmationEmail({
          reference,
          name: validatedData.name,
          email: validatedData.email.trim(),
          phone: validatedData.phone,
          tourType: validatedData.tourType,
          packageSlug: validatedData.packageSlug,
          packageName: validatedData.packageName,
          createdAt: new Date(),
        });
      } catch (custEmailErr) {
        console.error("[CallbacksAPI] Customer quote confirmation email dispatch failed:", custEmailErr);
      }
    }

    const successMessage =
      requestType === "quote"
        ? "Thank you! Your quote request has been received. Our team will contact you within 24 hours."
        : "Thank you! Your callback request has been received. Our team will call you back within 24 hours.";

    return NextResponse.json(
      {
        success: true,
        message: successMessage,
        reference,
        requestType,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: error.issues[0]?.message || "Validation failed. Please verify your phone number.",
          errors: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    const safeError = error instanceof Error ? error.message : "Unknown error";
    console.error("[CallbacksAPI] Callback submission error:", safeError);

    return NextResponse.json(
      {
        success: false,
        message: "We encountered a temporary issue recording your callback request. Please call us directly or try again.",
      },
      { status: 500 }
    );
  }
}
