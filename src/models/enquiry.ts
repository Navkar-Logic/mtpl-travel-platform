import mongoose, { Schema, Document, Model } from "mongoose";
import { databaseConfig } from "@/config/database";
import type { EnquirySource, EnquiryStatus, TravelType } from "@/types/enquiry";

export interface IEnquiryConsentDetails {
  accuracyConfirmed: boolean;
  communicationConsent: boolean;
  privacyAcknowledged: boolean;
  bookingDisclaimerAcknowledged: boolean;
  termsAcknowledged: boolean;
  acceptedAt: Date;
  policyVersion: string;
}

export interface IEnquiryEmailAudit {
  customerEmailStatus?: "accepted" | "failed" | "skipped" | "delayed";
  customerEmailAttemptedAt?: Date;
  customerMessageId?: string;
  companyEmailStatus?: "accepted" | "failed" | "skipped" | "delayed";
  companyEmailAttemptedAt?: Date;
  companyMessageId?: string;
}

export interface IEnquiry extends Document {
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  travelType?: TravelType;
  destination?: string;
  travelDate?: string;
  returnDate?: string;
  travellers?: number;
  budget?: string;
  message: string;
  source: EnquirySource;
  packageSlug?: string;
  destinationSlug?: string;
  offerSlug?: string;
  serviceId?: string;
  consentAccepted: boolean;
  consentDetails?: IEnquiryConsentDetails;
  emailAudit?: IEnquiryEmailAudit;
  status: EnquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [100, "Full name cannot exceed 100 characters"],
    },
    companyName: {
      type: String,
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
      maxlength: [100, "Email cannot exceed 100 characters"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      maxlength: [20, "Phone number cannot exceed 20 characters"],
    },
    travelType: {
      type: String,
      trim: true,
      enum: ["domestic", "international", "corporate", "holidays-visas", "group-custom", "other"],
    },
    destination: {
      type: String,
      trim: true,
      maxlength: [100, "Destination cannot exceed 100 characters"],
    },
    travelDate: {
      type: String,
      trim: true,
    },
    returnDate: {
      type: String,
      trim: true,
    },
    travellers: {
      type: Number,
      min: [1, "Must have at least 1 traveller"],
      max: [999, "Exceeded maximum traveller count"],
    },
    budget: {
      type: String,
      trim: true,
      maxlength: [50, "Budget cannot exceed 50 characters"],
    },
    message: {
      type: String,
      required: [true, "Trip planning message is required"],
      trim: true,
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
    source: {
      type: String,
      required: [true, "Enquiry source is required"],
      enum: ["general", "package", "destination", "offer", "service"],
      default: "general",
    },
    packageSlug: {
      type: String,
      trim: true,
      maxlength: [100, "Package slug cannot exceed 100 characters"],
    },
    destinationSlug: {
      type: String,
      trim: true,
      maxlength: [100, "Destination slug cannot exceed 100 characters"],
    },
    offerSlug: {
      type: String,
      trim: true,
      maxlength: [100, "Offer slug cannot exceed 100 characters"],
    },
    serviceId: {
      type: String,
      trim: true,
      maxlength: [100, "Service ID cannot exceed 100 characters"],
    },
    consentAccepted: {
      type: Boolean,
      required: [true, "Customer consent acceptance is required"],
      validate: {
        validator: function (v: unknown) {
          return v === true;
        },
        message: "Customer consent acceptance must be explicitly true",
      },
    },
    consentDetails: {
      type: new Schema(
        {
          accuracyConfirmed: {
            type: Boolean,
            required: [true, "Accuracy confirmation is required"],
            validate: {
              validator: (v: unknown) => v === true,
              message: "Accuracy confirmation declaration must be true",
            },
          },
          communicationConsent: {
            type: Boolean,
            required: [true, "Communication consent is required"],
            validate: {
              validator: (v: unknown) => v === true,
              message: "Communication consent declaration must be true",
            },
          },
          privacyAcknowledged: {
            type: Boolean,
            required: [true, "Privacy policy acknowledgement is required"],
            validate: {
              validator: (v: unknown) => v === true,
              message: "Privacy policy acknowledgement declaration must be true",
            },
          },
          bookingDisclaimerAcknowledged: {
            type: Boolean,
            required: [true, "Booking disclaimer acknowledgement is required"],
            validate: {
              validator: (v: unknown) => v === true,
              message: "Booking disclaimer acknowledgement declaration must be true",
            },
          },
          termsAcknowledged: {
            type: Boolean,
            required: [true, "Terms and disclaimer acknowledgement is required"],
            validate: {
              validator: (v: unknown) => v === true,
              message: "Terms and disclaimer acknowledgement declaration must be true",
            },
          },
          acceptedAt: {
            type: Date,
            required: [true, "Consent acceptance timestamp is required"],
          },
          policyVersion: {
            type: String,
            required: [true, "Policy version identifier is required"],
            trim: true,
          },
        },
        { _id: false }
      ),
      required: function (this: IEnquiry) {
        return this.isNew;
      },
    },
    emailAudit: {
      type: new Schema(
        {
          customerEmailStatus: {
            type: String,
            enum: ["accepted", "failed", "skipped", "delayed"],
          },
          customerEmailAttemptedAt: {
            type: Date,
          },
          customerMessageId: {
            type: String,
            trim: true,
          },
          companyEmailStatus: {
            type: String,
            enum: ["accepted", "failed", "skipped", "delayed"],
          },
          companyEmailAttemptedAt: {
            type: Date,
          },
          companyMessageId: {
            type: String,
            trim: true,
          },
        },
        { _id: false }
      ),
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: ["NEW", "CONTACTED", "IN_PROGRESS", "CONVERTED", "CLOSED", "SPAM"],
      default: "NEW",
    },
  },
  {
    ...databaseConfig.defaultSchemaOptions,
  }
);

// Performance & Query Indexes
EnquirySchema.index({ createdAt: -1 });
EnquirySchema.index({ status: 1 });
EnquirySchema.index({ email: 1 });
EnquirySchema.index({ phone: 1 });

if (process.env.NODE_ENV === "development" && mongoose.models && mongoose.models.Enquiry) {
  delete (mongoose.models as Record<string, unknown>).Enquiry;
}

export const Enquiry: Model<IEnquiry> =
  (mongoose.models && mongoose.models.Enquiry)
    ? (mongoose.models.Enquiry as Model<IEnquiry>)
    : mongoose.model<IEnquiry>("Enquiry", EnquirySchema);
