"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import type { FlowStep } from "@/interfaces/flow";

export const stepHref = (step: FlowStep) => `/diagnose?step=${step}`;

/**
 * Steps are query params rather than route segments because the site is a
 * static export on GitHub Pages, where path segments would 404 on refresh.
 */
export const useFlowNavigation = () => {
  const router = useRouter();

  const goToStep = useCallback(
    (step: FlowStep) => {
      router.push(stepHref(step));
    },
    [router]
  );

  const replaceStep = useCallback(
    (step: FlowStep) => {
      router.replace(stepHref(step));
    },
    [router]
  );

  return { goToStep, replaceStep };
};
