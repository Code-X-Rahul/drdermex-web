import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { API_BASE_URL, ENDPOINTS, REFRESH_TOKEN_HEADER } from "@/constants/api";
import type { ApiErrorBody, NormalisedApiError } from "@/interfaces/api";
import type { RefreshTokenResponse } from "@/interfaces/auth";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "./tokenStorage";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

/** Endpoints that must not carry an access token. */
const UNAUTHENTICATED = [ENDPOINTS.OTP_GENERATE, ENDPOINTS.OTP_VERIFY];

/**
 * users/create is authenticated with the short-lived profileToken from OTP
 * verify rather than a normal access token, so callers pass it explicitly and
 * we leave any pre-set Authorization header alone.
 */
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const url = config.url ?? "";
  if (UNAUTHENTICATED.some((endpoint) => url.startsWith(endpoint))) {
    return config;
  }
  if (config.headers.Authorization) return config;

  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

type RetriableConfig = AxiosRequestConfig & { _retried?: boolean };

/**
 * A single in-flight refresh shared by every request that 401s at once, so a
 * burst of parallel calls doesn't fire N refreshes and revoke each other's
 * tokens (the backend revokes prior tokens on each issue).
 */
let refreshInFlight: Promise<string | null> | null = null;

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    // Unusual contract: the raw token goes in a `refresh-token` header with no
    // `Bearer` prefix, unlike every other authenticated call.
    const { data } = await axios.post<RefreshTokenResponse>(
      `${API_BASE_URL}${ENDPOINTS.REFRESH_TOKEN}`,
      null,
      { headers: { [REFRESH_TOKEN_HEADER]: refreshToken } }
    );
    if (!data?.accessToken || !data?.refreshToken) return null;
    setTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
    return data.accessToken;
  } catch {
    return null;
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorBody>) => {
    const config = error.config as RetriableConfig | undefined;
    const status = error.response?.status ?? null;

    const isRefreshable =
      status === 401 &&
      config &&
      !config._retried &&
      !config.url?.startsWith(ENDPOINTS.REFRESH_TOKEN);

    if (isRefreshable) {
      config._retried = true;
      refreshInFlight ??= refreshAccessToken().finally(() => {
        refreshInFlight = null;
      });
      const token = await refreshInFlight;

      if (token) {
        config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
        return apiClient(config);
      }
      // Refresh failed — the session is genuinely gone.
      clearTokens();
    }

    return Promise.reject(toNormalisedError(error));
  }
);

/**
 * Error bodies are inconsistent across the backend: some omit `success`, at
 * least one misspells `message` as `mesage`, and `error` is sometimes a string
 * and sometimes an object. Collapse all of that into one shape for the UI.
 */
export const toNormalisedError = (
  error: AxiosError<ApiErrorBody>
): NormalisedApiError => {
  const body = error.response?.data;
  const nested =
    typeof body?.error === "string" ? body.error : body?.error?.message;

  return {
    status: error.response?.status ?? null,
    message:
      body?.message ||
      body?.mesage ||
      nested ||
      error.message ||
      "Something went wrong. Please try again.",
  };
};

export const isApiError = (value: unknown): value is NormalisedApiError =>
  typeof value === "object" &&
  value !== null &&
  "message" in value &&
  "status" in value;
