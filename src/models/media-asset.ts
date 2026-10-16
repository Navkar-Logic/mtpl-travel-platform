import mongoose, { Schema, Document, Model } from "mongoose";

export type FileVisibility = "public" | "private";
export type FileCategory = "images" | "documents" | "other";

export interface IMediaAsset extends Document {
  storageKey: string;
  originalFilename: string;
  mimeType: string;
  sizeBytes: number;
  category: FileCategory;
  visibility: FileVisibility;
  altText?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MediaAssetSchema = new Schema<IMediaAsset>(
  {
    storageKey: {
      type: String,
      required: [true, "Storage key is required"],
      unique: true,
      index: true,
      trim: true,
    },
    originalFilename: {
      type: String,
      required: [true, "Original filename is required"],
      trim: true,
    },
    mimeType: {
      type: String,
      required: [true, "MIME type is required"],
      trim: true,
    },
    sizeBytes: {
      type: Number,
      required: [true, "File size in bytes is required"],
      min: [0, "File size cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "File category is required"],
      enum: ["images", "documents", "other"],
    },
    visibility: {
      type: String,
      required: [true, "File visibility is required"],
      enum: ["public", "private"],
      default: "public",
    },
    altText: {
      type: String,
      trim: true,
      maxlength: [300, "Alt text cannot exceed 300 characters"],
    },
  },
  {
    timestamps: true,
  }
);

export const MediaAsset: Model<IMediaAsset> =
  (mongoose.models && mongoose.models.MediaAsset)
    ? (mongoose.models.MediaAsset as Model<IMediaAsset>)
    : mongoose.model<IMediaAsset>("MediaAsset", MediaAssetSchema);
