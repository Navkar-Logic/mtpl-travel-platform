import mongoose, { Schema, Document, Model } from "mongoose";
import { databaseConfig } from "@/config/database";

export interface ICallbackRequest extends Document {
  phone: string;
  name?: string;
  email?: string;
  tourType?: string;
  packageSlug?: string;
  packageName?: string;
  requestType: string;
  source: string;
  status: "NEW" | "CONTACTED" | "RESOLVED" | "SPAM";
  createdAt: Date;
  updatedAt: Date;
}

const CallbackRequestSchema = new Schema<ICallbackRequest>(
  {
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      maxlength: [25, "Phone number cannot exceed 25 characters"],
    },
    name: {
      type: String,
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
      default: "",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [120, "Email cannot exceed 120 characters"],
      default: "",
    },
    tourType: {
      type: String,
      trim: true,
      default: "",
    },
    packageSlug: {
      type: String,
      trim: true,
      maxlength: [100, "Package slug cannot exceed 100 characters"],
    },
    packageName: {
      type: String,
      trim: true,
      maxlength: [200, "Package name cannot exceed 200 characters"],
    },
    requestType: {
      type: String,
      required: true,
      default: "callback",
    },
    source: {
      type: String,
      required: true,
      default: "package",
    },
    status: {
      type: String,
      required: true,
      enum: ["NEW", "CONTACTED", "RESOLVED", "SPAM"],
      default: "NEW",
    },
  },
  {
    ...databaseConfig.defaultSchemaOptions,
  }
);

// Performance & Query Indexes
CallbackRequestSchema.index({ createdAt: -1 });
CallbackRequestSchema.index({ phone: 1 });
CallbackRequestSchema.index({ status: 1 });
CallbackRequestSchema.index({ packageSlug: 1 });

export const CallbackRequest: Model<ICallbackRequest> =
  (mongoose.models?.CallbackRequest as Model<ICallbackRequest>) ||
  mongoose.model<ICallbackRequest>("CallbackRequest", CallbackRequestSchema);

