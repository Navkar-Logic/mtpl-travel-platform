import mongoose, { Schema, Document, Model } from "mongoose";

export type PackageCategory = "national" | "international";
export type PackageStatus = "published" | "draft" | "archived";
export type PackageValidityStatus = "verified" | "confirmation_required";
export type PackageCurrency = "INR" | "USD";

export interface IItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface IAccommodationData {
  headers: string[];
  rows: string[][];
}

export interface IPackageCostTable {
  title?: string;
  currency?: string;
  headers: string[];
  rows: string[][];
}

export interface IPackage extends Document {
  packageId?: string;
  sourceOrder?: number;
  slug: string;
  title: string;
  destination: string;
  category: PackageCategory;
  duration: string;
  nights: number;
  days: number;
  shortDescription: string;
  overview?: string;
  heroImage: string;
  pdfDownloadKey?: string;
  pdfOriginalFilename?: string;
  numericPrice?: number;
  priceDisplay: string;
  pricingBasis?: string;
  currency: PackageCurrency;
  isPriceOnRequest: boolean;
  validityNotice?: string;
  validityDisplay?: string;
  validityStatus: PackageValidityStatus;
  featured: boolean;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: IItineraryDay[];
  whatsAppHref?: string;
  accommodations?: IAccommodationData | null;
  costTables: IPackageCostTable[];
  status: PackageStatus;
  createdBy?: string;
  updatedBy?: string | null;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ItineraryDaySchema = new Schema<IItineraryDay>(
  {
    day: {
      type: Number,
      required: [true, "Itinerary day number is required"],
      min: [1, "Day number must be at least 1"],
    },
    title: {
      type: String,
      required: [true, "Itinerary day title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Itinerary day description is required"],
      trim: true,
    },
  },
  { _id: false }
);

const AccommodationSchema = new Schema<IAccommodationData>(
  {
    headers: {
      type: [String],
      default: [],
    },
    rows: {
      type: [[String]],
      default: [],
    },
  },
  { _id: false }
);

const CostTableSchema = new Schema<IPackageCostTable>(
  {
    title: {
      type: String,
      trim: true,
      default: "",
    },
    currency: {
      type: String,
      trim: true,
      default: "",
    },
    headers: {
      type: [String],
      default: [],
    },
    rows: {
      type: [[String]],
      default: [],
    },
  },
  { _id: false }
);

const PackageSchema = new Schema<IPackage>(
  {
    packageId: {
      type: String,
      trim: true,
      index: { sparse: true },
    },
    sourceOrder: {
      type: Number,
      min: [0, "Source order cannot be negative"],
      index: true,
    },
    slug: {
      type: String,
      required: [true, "Package slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: [true, "Package title is required"],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, "Package destination is required"],
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, "Package category is required"],
      enum: {
        values: ["national", "international"],
        message: "Category must be either 'national' or 'international'",
      },
      index: true,
    },
    duration: {
      type: String,
      required: [true, "Package duration is required"],
      trim: true,
    },
    nights: {
      type: Number,
      required: [true, "Number of nights is required"],
      min: [0, "Nights cannot be negative"],
    },
    days: {
      type: Number,
      required: [true, "Number of days is required"],
      min: [1, "Days must be at least 1"],
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
    },
    overview: {
      type: String,
      trim: true,
      default: "",
    },
    heroImage: {
      type: String,
      required: [true, "Hero image path is required"],
      trim: true,
    },
    pdfDownloadKey: {
      type: String,
      trim: true,
      default: "",
    },
    pdfOriginalFilename: {
      type: String,
      trim: true,
      default: "",
    },
    numericPrice: {
      type: Number,
      min: [0, "Numeric price cannot be negative"],
    },
    priceDisplay: {
      type: String,
      required: [true, "Price display string is required"],
      trim: true,
    },
    pricingBasis: {
      type: String,
      trim: true,
      default: "",
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      enum: {
        values: ["INR", "USD"],
        message: "Currency must be either 'INR' or 'USD'",
      },
    },
    isPriceOnRequest: {
      type: Boolean,
      default: false,
    },
    validityNotice: {
      type: String,
      trim: true,
      default: "",
    },
    validityDisplay: {
      type: String,
      trim: true,
      default: "",
    },
    validityStatus: {
      type: String,
      enum: {
        values: ["verified", "confirmation_required"],
        message: "Validity status must be 'verified' or 'confirmation_required'",
      },
      default: "verified",
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    highlights: {
      type: [String],
      default: [],
    },
    inclusions: {
      type: [String],
      default: [],
    },
    exclusions: {
      type: [String],
      default: [],
    },
    itinerary: {
      type: [ItineraryDaySchema],
      default: [],
      validate: {
        validator: function (itinerary: IItineraryDay[]) {
          return Array.isArray(itinerary) && itinerary.length > 0;
        },
        message: "Package must contain at least one itinerary day",
      },
    },
    whatsAppHref: {
      type: String,
      trim: true,
      default: "",
    },
    accommodations: {
      type: AccommodationSchema,
      default: null,
    },
    costTables: {
      type: [CostTableSchema],
      default: [],
    },
    status: {
      type: String,
      enum: {
        values: ["published", "draft", "archived"],
        message: "Status must be 'published', 'draft', or 'archived'",
      },
      default: "published",
      index: true,
    },
    createdBy: {
      type: String,
      trim: true,
      default: "system-migration",
    },
    updatedBy: {
      type: String,
      trim: true,
      default: null,
    },
    seoTitle: {
      type: String,
      trim: true,
      default: "",
    },
    seoDescription: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for optimal catalogue filtering and querying
PackageSchema.index({ status: 1, category: 1, destination: 1 });
PackageSchema.index({ status: 1, featured: 1 });
PackageSchema.index({ status: 1, numericPrice: 1 });

export const PackageModel: Model<IPackage> =
  (mongoose.models && mongoose.models.Package)
    ? (mongoose.models.Package as Model<IPackage>)
    : mongoose.model<IPackage>("Package", PackageSchema);

