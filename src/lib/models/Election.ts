import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICandidate {
  name: string;
  description: string;
  image?: string;
  position: string;
}

export interface IElection extends Document {
  title: string;
  description: string;
  organization: string;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'archived';
  type: 'single_choice' | 'multiple_choice' | 'ranked_choice';
  startDate: Date;
  endDate: Date;
  candidates: ICandidate[];
  createdBy: mongoose.Types.ObjectId;
  totalVoters: number;
  totalVotes: number;
  isPublic: boolean;
  accessCode?: string;
}

const candidateSchema = new Schema<ICandidate>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  position: { type: String, required: true },
});

const electionSchema = new Schema<IElection>(
  {
    title: {
      type: String,
      required: [true, 'Election title is required'],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: [true, 'Election description is required'],
      maxlength: 5000,
    },
    organization: {
      type: String,
      required: [true, 'Organization is required'],
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'paused', 'completed', 'archived'],
      default: 'draft',
    },
    type: {
      type: String,
      enum: ['single_choice', 'multiple_choice', 'ranked_choice'],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    candidates: [candidateSchema],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    totalVoters: {
      type: Number,
      default: 0,
    },
    totalVotes: {
      type: Number,
      default: 0,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    accessCode: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

electionSchema.index({ status: 1, startDate: 1 });
electionSchema.index({ organization: 1 });
electionSchema.index({ createdBy: 1 });

const Election: Model<IElection> = mongoose.models.Election || mongoose.model<IElection>('Election', electionSchema);

export default Election;