import type { AuthTokens } from "@/interfaces/auth";

const ACCESS_TOKEN_KEY = "drdermx.accessToken";
const REFRESH_TOKEN_KEY = "drdermx.refreshToken";

/**
 * Plain module-level accessors rather than a hook: the axios interceptor needs
 * the token synchronously, outside of React. AuthContext reads and writes
 * through here so the two never drift.
 *
 * Every access is guarded — the static export prerenders in Node at build time,
 * where `window` does not exist, and browsers can throw on storage access in
 * private mode.
 */
const read = (key: string): string | null => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const write = (key: string, value: string | null) => {
  if (typeof window === "undefined") return;
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable — the session simply won't persist */
  }
};

export const getAccessToken = () => read(ACCESS_TOKEN_KEY);
export const getRefreshToken = () => read(REFRESH_TOKEN_KEY);

export const setTokens = ({ accessToken, refreshToken }: AuthTokens) => {
  write(ACCESS_TOKEN_KEY, accessToken);
  write(REFRESH_TOKEN_KEY, refreshToken);
};

export const clearTokens = () => {
  write(ACCESS_TOKEN_KEY, null);
  write(REFRESH_TOKEN_KEY, null);
};

export const hasSession = () => Boolean(getAccessToken());
