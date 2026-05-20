// ============================================
// CORE TYPE DEFINITIONS
// PLACEMENT: src/lib/types/index.ts
// ============================================

// ============ USER & AUTHENTICATION TYPES ============

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  ORG_ADMIN = 'ORG_ADMIN',
  ORG_MANAGER = 'ORG_MANAGER',
  ELECTION_OFFICER = 'ELECTION_OFFICER',
  VOTER = 'VOTER',
  OBSERVER = 'OBSERVER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  emailVerifiedAt?: Date;
  lastLogin?: Date;
  twoFactorEnabled: boolean;
  organizationId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  type: 'Bearer';
}

export interface AuthSession {
  user: User;
  token: AuthToken;
  expiresAt: Date;
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  organizationId?: string;
}

export interface PasswordResetPayload {
  email: string;
}

export interface PasswordResetConfirmPayload {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

// ============ ORGANIZATION TYPES ============

export enum OrganizationType {
  UNIVERSITY = 'UNIVERSITY',
  COMPANY = 'COMPANY',
  ASSOCIATION = 'ASSOCIATION',
  CLUB = 'CLUB',
  GOVERNMENT = 'GOVERNMENT',
  NGO = 'NGO',
  OTHER = 'OTHER',
}

export enum OrganizationStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED',
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  type: OrganizationType;
  status: OrganizationStatus;
  logo?: string;
  website?: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  totalElections: number;
  totalVoters: number;
  totalMembers: number;
  isVerified: boolean;
  subscriptionPlan?: 'FREE' | 'BASIC' | 'PROFESSIONAL' | 'ENTERPRISE';
  subscriptionExpiry?: Date;
  adminId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrganizationMember {
  id: string;
  organizationId: string;
  userId: string;
  role: 'ADMIN' | 'MANAGER' | 'MEMBER';
  joinedAt: Date;
  invitedBy?: string;
}

// ============ ELECTION TYPES ============

export enum ElectionStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  CLOSED = 'CLOSED',
  ARCHIVED = 'ARCHIVED',
}

export enum ElectionType {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  RANKED_CHOICE = 'RANKED_CHOICE',
  CUMULATIVE = 'CUMULATIVE',
}

export enum VotingMethod {
  ONLINE = 'ONLINE',
  IN_PERSON = 'IN_PERSON',
  HYBRID = 'HYBRID',
}

export interface Election {
  id: string;
  organizationId: string;
  title: string;
  description?: string;
  slug: string;
  status: ElectionStatus;
  type: ElectionType;
  votingMethod: VotingMethod;
  
  // Timing
  scheduledStartDate: Date;
  scheduledEndDate: Date;
  actualStartDate?: Date;
  actualEndDate?: Date;
  
  // Settings
  isPublic: boolean;
  allowAnonymousVoting: boolean;
  requireEmailVerification: boolean;
  allowMultipleVotes: boolean;
  maxVotesPerVoter: number;
  allowVoterComments: boolean;
  
  // Results
  publishResults: boolean;
  resultVisibility: 'IMMEDIATE' | 'AFTER_ELECTION' | 'MANUAL';
  showCandidatePhotos: boolean;
  
  // Access
  accessCodeRequired: boolean;
  accessCodes?: string[];
  invitedVotersOnly: boolean;
  
  // Statistics
  totalCandidates: number;
  totalVoters: number;
  totalVotes: number;
  turnoutPercentage: number;
  
  // Moderation
  requiresApproval: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  
  // Metadata
  banner?: string;
  featured: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ElectionCandidate {
  id: string;
  electionId: string;
  name: string;
  email?: string;
  phone?: string;
  photo?: string;
  bio?: string;
  position?: string;
  platform?: string;
  voteCount: number;
  percentage: number;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============ VOTER TYPES ============

export enum VoterStatus {
  INVITED = 'INVITED',
  VERIFIED = 'VERIFIED',
  VOTED = 'VOTED',
  ABSTAINED = 'ABSTAINED',
  DISQUALIFIED = 'DISQUALIFIED',
}

export interface ElectionVoter {
  id: string;
  electionId: string;
  voterId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  status: VoterStatus;
  accessCode?: string;
  invitedAt: Date;
  invitedBy: string;
  votedAt?: Date;
  ipAddress?: string;
  fingerprint?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VoterImportPayload {
  electionId: string;
  voters: {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    studentId?: string;
  }[];
}

// ============ VOTE TYPES ============

export enum VoteStatus {
  SUBMITTED = 'SUBMITTED',
  CONFIRMED = 'CONFIRMED',
  COUNTED = 'COUNTED',
  CHALLENGED = 'CHALLENGED',
  VERIFIED = 'VERIFIED',
}

export interface Vote {
  id: string;
  electionId: string;
  voterId: string;
  voterEmail: string;
  candidateId?: string;
  candidateIds?: string[]; // For multiple choice
  rank?: Record<string, number>; // For ranked choice
  choices: {
    candidateId: string;
    rank?: number;
    weight?: number;
  }[];
  status: VoteStatus;
  isAnonymous: boolean;
  weight: number; // For cumulative voting
  ipAddress?: string;
  fingerprint?: string;
  encryptedVote?: string;
  encryptionKey?: string;
  blockchainHash?: string;
  timestamp: Date;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface VoteSubmissionPayload {
  electionId: string;
  choices: {
    candidateId: string;
    rank?: number;
    weight?: number;
  }[];
  isAnonymous?: boolean;
}

// ============ RESULTS TYPES ============

export interface ElectionResults {
  electionId: string;
  title: string;
  type: ElectionType;
  status: ElectionStatus;
  totalVotes: number;
  totalVoters: number;
  turnoutPercentage: number;
  candidates: CandidateResults[];
  winner?: CandidateResults;
  winners?: CandidateResults[];
  generatedAt: Date;
}

export interface CandidateResults {
  candidateId: string;
  name: string;
  photo?: string;
  voteCount: number;
  percentage: number;
  rank: number;
  roundResults?: RoundResults[]; // For ranked choice
}

export interface RoundResults {
  round: number;
  candidateId: string;
  voteCount: number;
  percentage: number;
  eliminated: boolean;
}

export interface VoteStatistics {
  totalVotes: number;
  totalVoters: number;
  totalInvited: number;
  turnoutPercentage: number;
  blankVotes: number;
  invalidVotes: number;
  timeToFirstVote: number; // in minutes
  averageVotingTime: number; // in minutes
  peakVotingHour: number;
  votesByHour: Record<number, number>;
  votesByDay: Record<string, number>;
}

// ============ ANALYTICS TYPES ============

export interface DashboardMetrics {
  activeElections: number;
  totalElections: number;
  totalVoters: number;
  totalVotes: number;
  averageTurnout: number;
  topCandidate: CandidateResults;
  recentActivity: ActivityLog[];
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details?: Record<string, any>;
  ipAddress?: string;
  timestamp: Date;
}

// ============ PAGINATION & API TYPES ============

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  timestamp: Date;
  path?: string;
}

export interface ApiError {
  code: string;
  message: string;
  statusCode: number;
  details?: Record<string, any>;
  timestamp: Date;
}

// ============ PERMISSION TYPES ============

export enum Permission {
  // Election Management
  VIEW_ELECTIONS = 'VIEW_ELECTIONS',
  CREATE_ELECTION = 'CREATE_ELECTION',
  EDIT_ELECTION = 'EDIT_ELECTION',
  DELETE_ELECTION = 'DELETE_ELECTION',
  MANAGE_CANDIDATES = 'MANAGE_CANDIDATES',
  MANAGE_VOTERS = 'MANAGE_VOTERS',
  START_ELECTION = 'START_ELECTION',
  END_ELECTION = 'END_ELECTION',
  PAUSE_ELECTION = 'PAUSE_ELECTION',
  
  // Voting
  VOTE = 'VOTE',
  VIEW_RESULTS = 'VIEW_RESULTS',
  EXPORT_RESULTS = 'EXPORT_RESULTS',
  
  // User Management
  MANAGE_USERS = 'MANAGE_USERS',
  MANAGE_ROLES = 'MANAGE_ROLES',
  
  // Organization
  MANAGE_ORGANIZATION = 'MANAGE_ORGANIZATION',
  MANAGE_MEMBERS = 'MANAGE_MEMBERS',
  VIEW_ANALYTICS = 'VIEW_ANALYTICS',
  
  // System
  MANAGE_SYSTEM = 'MANAGE_SYSTEM',
  VIEW_AUDIT_LOG = 'VIEW_AUDIT_LOG',
  MANAGE_SETTINGS = 'MANAGE_SETTINGS',
}

// ============ RESPONSE TYPES ============

export interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
}

// ============ EXPORT ============

export type AnyUser = User;
export type AnyOrganization = Organization;
export type AnyElection = Election;
export type AnyVote = Vote;
export type AnyResponse<T> = ApiResponse<T>;