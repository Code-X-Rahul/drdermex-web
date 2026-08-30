import type { ApiEnvelope } from "./api";

export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface ImageDiagnosisFreeTrial {
  freeTrialsUsed: number;
  freeTrialsLeft: number;
  totalFreeTrials: number;
  isFreeTrialEligible: boolean;
  freeTrialPromoHideCount: number;
  maxFreeTrialPromoShows: number;
  shouldShowPromo: boolean;
}

/** Only the fields this flow actually reads. The API returns far more. */
export interface User {
  id: number;
  name: string | null;
  email: string | null;
  mobileNumber: string | null;
  countryCode: string | null;
  gender: Gender | null;
  /** Returned pre-formatted as DD/MM/YYYY, not ISO. */
  dateOfBirth: string | null;
  profilePicture: string | null;
  IsoCode: string;
  currency: string;
  role: string;
}

export interface GetUserResponse extends ApiEnvelope {
  user: User;
  profileCompleted: string;
  imageDiagnosisFreeTrial: ImageDiagnosisFreeTrial;
}

/** Sent with the short-lived profileToken, not a normal access token. */
export interface CreateUserPayload {
  name: string;
  mobileNumber: string;
  countryCode: string;
  email?: string;
  profilePicture?: string;
}

export interface CreateUserResponse extends ApiEnvelope {
  user: User;
  token: string;
  refreshToken: string;
}

/** Gender is not accepted by users/create, so it can only be set here. */
export interface UpdateUserPayload {
  name?: string;
  gender?: Gender;
  dateOfBirth?: string;
  email?: string;
}

export interface UpdateUserResponse extends ApiEnvelope {
  user?: User;
}
