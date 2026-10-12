/**
 * Deployment is a static export on GitHub Pages, so there is no server to read
 * runtime env from. The host lives here as a build-time constant.
 *
 * No trailing slash: every endpoint below supplies its own leading slash.
 */
export const API_BASE_URL = "https://prod.backend.drdermx.com";

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

  // Payment — also v2
  CAPTURE_PAYMENT: `${V2}/payment/capturePayment`,
  VERIFY_PAYMENT: `${V2}/payment/verifyPayment`,
} as const;

/**
 * Public checkout key, safe to ship client-side (the secret stays server-only).
 * Same build-time-constant approach as API_BASE_URL — must be the live key of
 * the Razorpay account the prod backend creates orders with, so it has to move
 * in lockstep with API_BASE_URL.
 */
export const RAZORPAY_KEY_ID = "rzp_live_5c64itJCVDSXDj";

export const RAZORPAY_CHECKOUT_SCRIPT_URL =
  "https://checkout.razorpay.com/v1/checkout.js";

/** The platform discriminator the backend expects. Note the capital F. */
export const PLATFORM = "PATIENT_APP";

/**
 * Access tokens last 30 days and the refresh contract is unusual: the raw token
 * goes in a `refresh-token` header with no `Bearer` prefix, unlike every other
 * authenticated call.
 */
export const REFRESH_TOKEN_HEADER = "refresh-token";
