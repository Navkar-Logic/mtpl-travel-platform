import mongoose, { Schema, Document, Model } from "mongoose";

export type MigrationStatus =
  | "pending"
  | "running"
  | "applied"
  | "rolling_back"
  | "rolled_back"
  | "failed";

export interface IMigrationChecksumSnapshot {
  packageCount: number;
  mediaCount: number;
  packagesDigest: string;
  mediaDigest: string;
}

export interface IDigestEntry {
  key: string;
  sha256: string;
}

export interface IMigrationLedger extends Document {
  migrationName: string;
  version: string;
  status: MigrationStatus;
  targetHost?: string;
  targetDatabase?: string;
  appliedAt?: Date;
  rollbackStartedAt?: Date;
  rolledBackAt?: Date;
  sourceInventoryHash: string;
  packageCount: number;
  mediaCount: number;
  parentAttemptLedgerIds?: string[];
  supersededByLedgerId?: string;
  rolledBackByLedgerId?: string;
  preExistingPackageSlugs?: string[];
  preExistingMediaKeys?: string[];
  insertedPackageSlugs: string[];
  updatedPackageSlugs: string[];
  skippedPackageSlugs: string[];
  insertedMediaKeys: string[];
  skippedMediaKeys: string[];
  ownedPackageSlugs?: string[];
  ownedMediaKeys?: string[];
  rollbackDeletedPackageSlugs?: string[];
  rollbackDeletedMediaKeys?: string[];
  preMigrationSnapshotPath?: string;
  preMigrationChecksums?: IMigrationChecksumSnapshot;
  postMigrationChecksums?: IMigrationChecksumSnapshot;
  migratedPackageDigests?: IDigestEntry[];
  migratedMediaDigests?: IDigestEntry[];
  ownedPackageDigests?: IDigestEntry[];
  ownedMediaDigests?: IDigestEntry[];
  discrepancies?: Record<string, unknown>;
  verificationResults?: Record<string, unknown>;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChecksumSnapshotSchema = new Schema<IMigrationChecksumSnapshot>(
  {
    packageCount: { type: Number, required: true, min: 0 },
    mediaCount: { type: Number, required: true, min: 0 },
    packagesDigest: { type: String, required: true, trim: true },
    mediaDigest: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const DigestEntrySchema = new Schema<IDigestEntry>(
  {
    key: { type: String, required: true, trim: true },
    sha256: { type: String, required: true, trim: true },
  },
  { _id: false }
);

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
      enum: ["pending", "running", "applied", "rolling_back", "rolled_back", "failed"],
      default: "pending",
      index: true,
    },
    targetHost: {
      type: String,
      trim: true,
      default: "",
    },
    targetDatabase: {
      type: String,
      trim: true,
      default: "",
    },
    appliedAt: {
      type: Date,
    },
    rollbackStartedAt: {
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
    parentAttemptLedgerIds: {
      type: [String],
      default: [],
    },
    supersededByLedgerId: {
      type: String,
      trim: true,
      default: "",
    },
    rolledBackByLedgerId: {
      type: String,
      trim: true,
      default: "",
    },
    preExistingPackageSlugs: {
      type: [String],
      default: [],
    },
    preExistingMediaKeys: {
      type: [String],
      default: [],
    },
    insertedPackageSlugs: {
      type: [String],
      default: [],
    },
    updatedPackageSlugs: {
      type: [String],
      default: [],
    },
    skippedPackageSlugs: {
      type: [String],
      default: [],
    },
    insertedMediaKeys: {
      type: [String],
      default: [],
    },
    skippedMediaKeys: {
      type: [String],
      default: [],
    },
    ownedPackageSlugs: {
      type: [String],
      default: [],
    },
    ownedMediaKeys: {
      type: [String],
      default: [],
    },
    rollbackDeletedPackageSlugs: {
      type: [String],
      default: [],
    },
    rollbackDeletedMediaKeys: {
      type: [String],
      default: [],
    },
    preMigrationSnapshotPath: {
      type: String,
      trim: true,
      default: "",
    },
    preMigrationChecksums: {
      type: ChecksumSnapshotSchema,
      default: undefined,
    },
    postMigrationChecksums: {
      type: ChecksumSnapshotSchema,
      default: undefined,
    },
    migratedPackageDigests: {
      type: [DigestEntrySchema],
      default: [],
    },
    migratedMediaDigests: {
      type: [DigestEntrySchema],
      default: [],
    },
    ownedPackageDigests: {
      type: [DigestEntrySchema],
      default: [],
    },
    ownedMediaDigests: {
      type: [DigestEntrySchema],
      default: [],
    },
    discrepancies: {
      type: Schema.Types.Mixed,
      default: null,
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

