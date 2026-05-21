import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVote extends Document {
  _id: string;
  electionId: string;
  positionTitle: string;
  candidateName: string;
  voterEmail: string;
  voterId?: string;
  receipt: string;
  blockNumber?: string;
  transactionHash?: string;
  status: "pending" | "confirmed" | "anchored";
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

const VoteSchema = new Schema<IVote>(
  {
    electionId: { type: String, required: true, index: true },
    positionTitle: { type: String, required: true },
    candidateName: { type: String, required: true },
    voterEmail: { type: String, required: true },
    voterId: { type: String },
    receipt: { type: String, required: true, unique: true },
    blockNumber: { type: String },
    transactionHash: { type: String },
    status: { type: String, enum: ["pending", "confirmed", "anchored"], default: "pending" },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true }
);

export const Vote: Model<IVote> = mongoose.models.Vote || mongoose.model<IVote>("Vote", VoteSchema);