import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  description: String,
  votes: { type: Number, default: 0 },
});

const electionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  organization: { type: String, required: true },
  status: { type: String, enum: ["draft", "active", "completed", "archived"], default: "draft" },
  type: { type: String, enum: ["single_choice", "multiple_choice", "ranked_choice"], default: "single_choice" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  candidates: [candidateSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  totalVoters: { type: Number, default: 0 },
  totalVotes: { type: Number, default: 0 },
  isPublic: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Election || mongoose.model("Election", electionSchema);
