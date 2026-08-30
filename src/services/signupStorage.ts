/**
 * Carries the identity being verified across the login → verify → profile
 * steps, including the short-lived profileToken issued when OTP verification
 * finds no existing account.
 *
 * Kept in sessionStorage rather than React state so a refresh mid-signup does
 * not strand the user on a step whose prerequisites have vanished.
 */
const SIGNUP_KEY = "drdermx.signup";

export interface SignupState {
  phoneNumber: string;
  countryCode: string;
  /** Present only for a phone number with no account yet. */
  profileToken?: string;
}

export const getSignupState = (): SignupState | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(SIGNUP_KEY);
    return raw ? (JSON.parse(raw) as SignupState) : null;
  } catch {
    return null;
  }
};

export const setSignupState = (state: SignupState) => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(SIGNUP_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable */
  }
};

export const clearSignupState = () => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(SIGNUP_KEY);
  } catch {
    /* nothing to clean up */
  }
};
