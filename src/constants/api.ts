/**
 * Deployment is a static export on GitHub Pages, so there is no server to read
 * runtime env from. The host lives here as a build-time constant.
 *
 * No trailing slash: every endpoint below supplies its own leading slash.
 */
export const API_BASE_URL = "https://dev.backend.drdermx.com";

const V1 = "/api/v1";
const V2 = "/api/v2";

export const ENDPOINTS = {
  // Auth
  OTP_GENERATE: `${V1}/otp/generate`,
  OTP_VERIFY: `${V1}/otp/verify`,
  REFRESH_TOKEN: `${V1}/refreshToken`,

  // User
  USER_CREATE: `${V1}/users/create`,
  USER_UPDATE: `${V1}/users/update`,
  USER_GET: `${V1}/users/get-user`,

  // Upload
  UPLOAD_INJURED_AREA_PICS: `${V1}/upload-patient/injured-area-pics`,

  // Diagnosis — note this one is v2
  UPSERT_IMAGE_DIAGNOSIS: `${V2}/diagnosis/upsertImageDiagnosis`,
} as const;

/** The platform discriminator the backend expects. Note the capital F. */
export const PLATFORM = "PATIENT_APP";

/**
 * Access tokens last 30 days and the refresh contract is unusual: the raw token
 * goes in a `refresh-token` header with no `Bearer` prefix, unlike every other
 * authenticated call.
 */
export const REFRESH_TOKEN_HEADER = "refresh-token";
