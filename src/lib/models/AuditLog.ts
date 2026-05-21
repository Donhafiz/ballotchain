import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAuditLog extends Document {
  event: string;
  userId?: string;
  userEmail?: string;
  detail: string;
  ipAddress?: string;
  userAgent?: string;
  severity: "info" | "warning" | "high";
  metadata?: Record<string, any>;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    event: { type: String, required: true, index: true },
    userId: { type: String },
    userEmail: { type: String },
    detail: { type: String, required: true },
    ipAddress: { type: String },
    userAgent: { type: String },
    severity: { type: String, enum: ["info", "warning", "high"], default: "info" },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const AuditLog: Model<IAuditLog> = mongoose.models.AuditLog || mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);