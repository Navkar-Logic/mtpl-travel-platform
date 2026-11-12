import mongoose, { Schema, Document, Model } from "mongoose";

export type MigrationStatus = "pending" | "running" | "applied" | "rolled_back" | "failed";

export interface IMigrationLedger extends Document {
  migrationName: string;
  version: string;
  status: MigrationStatus;
  appliedAt?: Date;
  rolledBackAt?: Date;
  sourceInventoryHash: string;
  packageCount: number;
  mediaCount: number;
  insertedPackageSlugs: string[];
  updatedPackageSlugs: string[];
  insertedMediaKeys: string[];
  preMigrationSnapshotPath?: string;
  verificationResults?: Record<string, unknown>;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MigrationLedgerSchema = new Schema<IMigrationLedger>(
  {
    migrationName: {
      type: String,
      required: [true, "Migration name is required"],
      index: true,
      trim: true,
    },
    version: {
      type: String,
      required: [true, "Migration version is required"],
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "running", "applied", "rolled_back", "failed"],
      default: "pending",
      index: true,
    },
    appliedAt: {
      type: Date,
    },
    rolledBackAt: {
      type: Date,
    },
    sourceInventoryHash: {
      type: String,
      required: true,
      trim: true,
    },
    packageCount: {
      type: Number,
      required: true,
      min: 0,
    },
    mediaCount: {
      type: Number,
      required: true,
      min: 0,
    },
    insertedPackageSlugs: {
      type: [String],
      default: [],
    },
    updatedPackageSlugs: {
      type: [String],
      default: [],
    },
    insertedMediaKeys: {
      type: [String],
      default: [],
    },
    preMigrationSnapshotPath: {
      type: String,
      trim: true,
      default: "",
    },
    verificationResults: {
      type: Schema.Types.Mixed,
      default: null,
    },
    error: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const MigrationLedger: Model<IMigrationLedger> =
  (mongoose.models && mongoose.models.MigrationLedger)
    ? (mongoose.models.MigrationLedger as Model<IMigrationLedger>)
    : mongoose.model<IMigrationLedger>("MigrationLedger", MigrationLedgerSchema);

