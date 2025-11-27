export enum ViolationType {
  PROFANITY = 'PROFANITY',
  EXTERNAL_INFO_REQUEST = 'EXTERNAL_INFO_REQUEST'
}

export enum ViolationSeverity {
  WARNING = 'WARNING',
  SUSPENSION = 'SUSPENSION',
  PERMANENT_BAN = 'PERMANENT_BAN'
}

export interface ViolationRecord {
  userId: string;
  violationType: ViolationType;
  severity: ViolationSeverity;
  content: string;
  createdAt: Date;
  expiresAt?: Date;
}