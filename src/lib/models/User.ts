import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "super_admin" | "election_manager" | "organization_admin" | "viewer" | "voter" | "candidate";
  organizationId?: string;
  status: "active" | "suspended" | "invited";
  verified: boolean;
  twoFactorEnabled: boolean;
  lastLogin?: Date;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["super_admin", "election_manager", "organization_admin", "viewer", "voter", "candidate"], default: "voter" },
    organizationId: { type: String },
    status: { type: String, enum: ["active", "suspended", "invited"], default: "active" },
    verified: { type: Boolean, default: false },
    twoFactorEnabled: { type: Boolean, default: false },
    lastLogin: { type: Date },
    refreshToken: { type: String, select: false },
  },
  { timestamps: true }
);

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);