/** Shape most endpoints wrap their payload in. */
export interface ApiEnvelope {
  success: boolean;
  message?: string;
}

/**
 * Errors are not uniform across the backend — some responses omit `success`,
 * and at least one misspells the key as `mesage`. Treat every field as optional.
 */
export interface ApiErrorBody {
  success?: boolean;
  message?: string;
  mesage?: string;
  error?: string | { name?: string; message?: string };
}

/** Normalised error surfaced to the UI by the axios interceptor. */
export interface NormalisedApiError {
  status: number | null;
  message: string;
}
