import { Suspense } from "react";
import type { Metadata } from "next";
import { DiagnosisFlowProvider } from "@/context/DiagnosisFlowContext";
import DiagnoseFlow from "./DiagnoseFlow";

export const metadata: Metadata = {
  title: "Start your Diagnosis | DrDermx",
  description:
    "Share photos and a few details about your skin or hair concern to get a personalised diagnosis.",
};

/**
 * Steps are driven by a `?step=` query param rather than route segments: the
 * site is a static export on GitHub Pages, where a path segment would 404 on
 * refresh or direct visit.
 *
 * The local Suspense boundary is what lets DiagnoseFlow call useSearchParams
 * under `output: "export"` — the root layout has a global one too, but this
 * gives a styled fallback instead of its bare "Loading..." text.
 */
const DiagnosePage = () => (
  <Suspense
    fallback={
      <div className='flex min-h-[60vh] items-center justify-center'>
        <div className='h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent' />
      </div>
    }
  >
    <DiagnosisFlowProvider>
      <DiagnoseFlow />
    </DiagnosisFlowProvider>
  </Suspense>
);

export default DiagnosePage;
