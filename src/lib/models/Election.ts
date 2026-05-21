import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICandidate {
  name: string;
  party?: string;
  bio?: string;
  image?: string;
  website?: string;
  platform?: string;
}

export interface IPosition {
  title: string;
  description?: string;
  candidates: ICandidate[];
}

export interface IElection extends Document {
  _id: string;
  title: string;
  description?: string;
  type: "single_choice" | "multiple_choice" | "ranked_choice" | "approval";
  status: "draft" | "scheduled" | "live" | "ended" | "archived";
  visibility: "private" | "organization" | "public";
  organizationId: string;
  createdBy: string;
  positions: IPosition[];
  voterEmails: string[];
  eligibleVoters: number;
  totalVotes: number;
  startDate: Date;
  endDate: Date;
  timezone: string;
  accessLink?: string;
  blockchainHash?: string;
  settings: {
    requireVerification: boolean;
    allowWriteIn: boolean;
    showLiveResults: boolean;
    anonymousVoting: boolean;
    twoFactorRequired: boolean;
    ipRestriction: boolean;
    sessionTimeout: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const CandidateSchema = new Schema<ICandidate>({
  name: { type: String, required: true },
  party: { type: String },
  bio: { type: String },
  image: { type: String },
  website: { type: String },
  platform: { type: String },
});

const PositionSchema = new Schema<IPosition>({
  title: { type: String, required: true },
  description: { type: String },
  candidates: [CandidateSchema],
});

const ElectionSchema = new Schema<IElection>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    type: { type: String, enum: ["single_choice", "multiple_choice", "ranked_choice", "approval"], default: "single_choice" },
    status: { type: String, enum: ["draft", "scheduled", "live", "ended", "archived"], default: "draft" },
    visibility: { type: String, enum: ["private", "organization", "public"], default: "private" },
    organizationId: { type: String, required: true },
    createdBy: { type: String, required: true },
    positions: [PositionSchema],
    voterEmails: [{ type: String }],
    eligibleVoters: { type: Number, default: 0 },
    totalVotes: { type: Number, default: 0 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    timezone: { type: String, default: "UTC" },
    accessLink: { type: String },
    blockchainHash: { type: String },
    settings: {
      requireVerification: { type: Boolean, default: true },
      allowWriteIn: { type: Boolean, default: false },
      showLiveResults: { type: Boolean, default: true },
      anonymousVoting: { type: Boolean, default: true },
      twoFactorRequired: { type: Boolean, default: false },
      ipRestriction: { type: Boolean, default: false },
      sessionTimeout: { type: Number, default: 30 },
    },
  },
  { timestamps: true }
);

export const Election: Model<IElection> = mongoose.models.Election || mongoose.model<IElection>("Election", ElectionSchema);