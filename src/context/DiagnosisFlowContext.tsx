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
import type { DiagnosisDraft } from "@/interfaces/diagnosis";

const DRAFT_STORAGE_KEY = "drdermx.diagnosisDraft";

export const EMPTY_DRAFT: DiagnosisDraft = {
  photoUrls: [],
  description: "",
  consentGiven: false,
  howMuchBodyAffected: "",
  selectedBodyPartIds: [],
  bodySide: "front",
  conditionDuration: "",
  doesItItch: false,
  hasFever: false,
  imageDiagnosisId: null,
};

interface DiagnosisFlowContextValue {
  draft: DiagnosisDraft;
  /** True once the persisted draft has been read, to avoid rendering stale defaults. */
  isHydrated: boolean;
  updateDraft: (patch: Partial<DiagnosisDraft>) => void;
  resetDraft: () => void;
}

const DiagnosisFlowContext = createContext<DiagnosisFlowContextValue | null>(
  null
);

const readStoredDraft = (): DiagnosisDraft | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;
    // Spread over the defaults so a draft written by an older build that lacks
    // a newer field still hydrates instead of throwing.
    return { ...EMPTY_DRAFT, ...(JSON.parse(raw) as Partial<DiagnosisDraft>) };
  } catch {
    return null;
  }
};

/**
 * The draft is mirrored to sessionStorage on every change. This is not
 * optional: navigation between steps is a query-param change, so a hard
 * refresh mid-flow would otherwise discard everything the user has entered.
 */
export const DiagnosisFlowProvider = ({ children }: { children: ReactNode }) => {
  const [draft, setDraft] = useState<DiagnosisDraft>(EMPTY_DRAFT);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredDraft();
    if (stored) setDraft(stored);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    } catch {
      /* storage unavailable — the draft just won't survive a refresh */
    }
  }, [draft, isHydrated]);

  const updateDraft = useCallback((patch: Partial<DiagnosisDraft>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetDraft = useCallback(() => {
    setDraft(EMPTY_DRAFT);
    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      /* nothing to clean up */
    }
  }, []);

  const value = useMemo(
    () => ({ draft, isHydrated, updateDraft, resetDraft }),
    [draft, isHydrated, updateDraft, resetDraft]
  );

  return (
    <DiagnosisFlowContext.Provider value={value}>
      {children}
    </DiagnosisFlowContext.Provider>
  );
};

export const useDiagnosisFlow = () => {
  const context = useContext(DiagnosisFlowContext);
  if (!context) {
    throw new Error(
      "useDiagnosisFlow must be used within a DiagnosisFlowProvider"
    );
  }
  return context;
};
