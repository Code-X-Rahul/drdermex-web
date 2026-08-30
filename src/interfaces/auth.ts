import type { ApiEnvelope } from "./api";

export interface GenerateOtpPayload {
  phoneNumber: string;
  countryCode: string;
  /** Backend spells this with a capital F. */
  platForm: string;
}

export interface GenerateOtpResponse extends ApiEnvelope {
  platForm: string;
}

export interface VerifyOtpPayload extends GenerateOtpPayload {
  otpCode: string;
}

/**
 * Verify has two outcomes:
 *  - existing account → `token` + `refreshToken`, user is logged in
 *  - no account yet   → `profileToken` only, must call users/create next
 */
export interface VerifyOtpResponse extends ApiEnvelope {
  token?: string;
  refreshToken?: string;
  profileToken?: string;
  type?: string;
  practitionerSubType?: string;
}

export interface RefreshTokenResponse extends ApiEnvelope {
  accessToken: string;
  refreshToken: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
