import mongoose, { Schema, Document, Model } from "mongoose";
import { databaseConfig } from "@/config/database";
import type { EmailDeliveryStatus } from "@/lib/email/types";

export interface IFeedbackEmailAudit {
  adminEmailStatus?: EmailDeliveryStatus;
  customerEmailStatus?: EmailDeliveryStatus;
  adminAttemptedAt?: Date;
  customerAttemptedAt?: Date;
  error?: string;
}

export interface IFeedback extends Document {
  fullName: string;
  email: string;
  phone?: string;
  packageOrService?: string;
  feedback: string;
  reference: string;
  status: "NEW" | "REVIEWED" | "PUBLISHED" | "ARCHIVED" | "SPAM";
  emailAudit?: IFeedbackEmailAudit;
  createdAt: Date;
  updatedAt: Date;
}

const FeedbackSchema = new Schema<IFeedback>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [100, "Full name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
      maxlength: [120, "Email cannot exceed 120 characters"],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [25, "Phone number cannot exceed 25 characters"],
      default: "",
    },
    packageOrService: {
      type: String,
      trim: true,
      maxlength: [200, "Package or service cannot exceed 200 characters"],
      default: "",
    },
    feedback: {
      type: String,
      required: [true, "Feedback message is required"],
      trim: true,
      maxlength: [3000, "Feedback text cannot exceed 3,000 characters"],
    },
    reference: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["NEW", "REVIEWED", "PUBLISHED", "ARCHIVED", "SPAM"],
      default: "NEW",
    },
    emailAudit: {
      adminEmailStatus: { type: String, enum: ["accepted", "failed", "skipped", "delayed"] },
      customerEmailStatus: { type: String, enum: ["accepted", "failed", "skipped", "delayed"] },
      adminAttemptedAt: { type: Date },
      customerAttemptedAt: { type: Date },
      error: { type: String },
    },
  },
  {
    ...databaseConfig.defaultSchemaOptions,
  }
);

// Performance & Query Indexes
FeedbackSchema.index({ createdAt: -1 });
FeedbackSchema.index({ email: 1 });
FeedbackSchema.index({ reference: 1 });
FeedbackSchema.index({ status: 1 });

export const Feedback: Model<IFeedback> =
  (mongoose.models?.Feedback as Model<IFeedback>) ||
  mongoose.model<IFeedback>("Feedback", FeedbackSchema);
