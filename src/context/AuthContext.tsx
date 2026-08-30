"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/useUser";
import { queryKeys } from "@/hooks/queryKeys";
import {
  clearTokens,
  getAccessToken,
  setTokens,
} from "@/services/tokenStorage";
import type { AuthTokens } from "@/interfaces/auth";
import type { User } from "@/interfaces/user";

interface AuthContextValue {
  /** Null until the first client render resolves — see isReady. */
  user: User | null;
  isAuthenticated: boolean;
  /** False while localStorage has not been read yet, to avoid a redirect flash. */
  isReady: boolean;
  isLoadingUser: boolean;
  signIn: (tokens: AuthTokens) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [hasToken, setHasToken] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // localStorage is only available after mount; reading it during render would
  // desync the prerendered markup.
  useEffect(() => {
    setHasToken(Boolean(getAccessToken()));
    setIsReady(true);
  }, []);

  const { data, isLoading } = useCurrentUser(hasToken && isReady);

  const signIn = useCallback((tokens: AuthTokens) => {
    setTokens(tokens);
    setHasToken(true);
  }, []);

  const signOut = useCallback(() => {
    clearTokens();
    setHasToken(false);
    queryClient.removeQueries({ queryKey: queryKeys.currentUser });
  }, [queryClient]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: data?.user ?? null,
      isAuthenticated: hasToken,
      isReady,
      isLoadingUser: isLoading,
      signIn,
      signOut,
    }),
    [data, hasToken, isReady, isLoading, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
