"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useDiagnosisFlow } from "@/context/DiagnosisFlowContext";
import { useFlowNavigation } from "@/hooks/useFlowNavigation";
import { isFlowStep, type FlowStep } from "@/interfaces/flow";
import type { DiagnosisDraft } from "@/interfaces/diagnosis";
import { getSignupState } from "@/services/signupStorage";
import LoginStep from "./steps/LoginStep";
import VerifyStep from "./steps/VerifyStep";
import ProfileStep from "./steps/ProfileStep";
import UploadStep from "./steps/UploadStep";
import ExtentStep from "./steps/ExtentStep";
import AreaStep from "./steps/AreaStep";
import ConditionStep from "./steps/ConditionStep";
import SummaryStep from "./steps/SummaryStep";
import PaymentStep from "./steps/PaymentStep";
import DoneStep from "./steps/DoneStep";

const STEP_COMPONENTS: Record<FlowStep, () => React.JSX.Element | null> = {
  login: LoginStep,
  verify: VerifyStep,
  profile: ProfileStep,
  upload: UploadStep,
  extent: ExtentStep,
  area: AreaStep,
  condition: ConditionStep,
  summary: SummaryStep,
  payment: PaymentStep,
  done: DoneStep,
};

const PUBLIC_STEPS: FlowStep[] = ["login", "verify"];

/**
 * Prerequisites for each questionnaire step, so a deep link or a stale
 * sessionStorage draft can't drop someone into a step whose inputs are missing.
 * Returns the step they should be sent to instead, or null if the request is fine.
 */
const missingPrerequisite = (
  step: FlowStep,
  draft: DiagnosisDraft
): FlowStep | null => {
  const hasPhotos = draft.photoUrls.length > 0;

  switch (step) {
    case "extent":
      return hasPhotos ? null : "upload";
    case "area":
      return draft.howMuchBodyAffected ? null : "extent";
    case "condition":
      return draft.selectedBodyPartIds.length > 0 ? null : "area";
    case "summary":
      return hasPhotos ? null : "upload";
    case "payment":
      return draft.imageDiagnosisId !== null ? null : "upload";
    default:
      return null;
  }
};

const FlowLoader = () => (
  <div className='flex min-h-[60vh] items-center justify-center'>
    <div className='h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent' />
  </div>
);

const DiagnoseFlow = () => {
  const searchParams = useSearchParams();
  const { isAuthenticated, isReady } = useAuth();
  const { draft, isHydrated } = useDiagnosisFlow();
  const { replaceStep } = useFlowNavigation();

  const requested = searchParams.get("step");
  const hasExplicitStep = isFlowStep(requested);
  const step: FlowStep = hasExplicitStep ? requested : "login";

  const settled = isReady && isHydrated;
  const isPublicStep = PUBLIC_STEPS.includes(step);

  useEffect(() => {
    if (!settled) return;

    // A number with no account yet holds only the short-lived profileToken, so
    // it is not "authenticated" — but the profile step is exactly where that
    // token gets exchanged for an account via users/create. Let it through.
    const isCreatingAccount =
      step === "profile" && Boolean(getSignupState()?.profileToken);

    // No session — everything past the auth steps is off limits.
    if (!isAuthenticated && !isPublicStep && !isCreatingAccount) {
      replaceStep("login");
      return;
    }

    // A bare /diagnose visit from a signed-in user resumes where they left off.
    // An explicit ?step=login is deliberate — someone switching accounts, or
    // testing the auth flow — so don't hijack it.
    if (isAuthenticated && isPublicStep && !hasExplicitStep) {
      replaceStep("profile");
      return;
    }

    // `done` stays reachable after the draft is cleared on handoff.
    if (isAuthenticated && step !== "done") {
      const redirect = missingPrerequisite(step, draft);
      if (redirect) replaceStep(redirect);
    }
  }, [
    settled,
    isAuthenticated,
    isPublicStep,
    hasExplicitStep,
    step,
    draft,
    replaceStep,
  ]);

  // Only gate on storage being read. Deliberately NOT gating on the profile
  // fetch: doing so unmounts ProfileStep the moment it signs a new account in,
  // and React Query discards a mutation's callbacks on unmount — which silently
  // dropped the navigation after users/create. ProfileStep renders its own
  // loading state instead, so it stays mounted while its own calls are running.
  if (!settled) {
    return <FlowLoader />;
  }

  const StepComponent = STEP_COMPONENTS[step];
  return <StepComponent />;
};

export default DiagnoseFlow;
