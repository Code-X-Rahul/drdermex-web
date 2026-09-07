"use client";

import { useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import StepShell from "@/components/diagnose/StepShell";
import ErrorBanner from "@/components/diagnose/ErrorBanner";
import { useAuth } from "@/context/AuthContext";
import { useDiagnosisFlow } from "@/context/DiagnosisFlowContext";
import { useFlowNavigation } from "@/hooks/useFlowNavigation";
import {
  useCaptureImageDiagnosisPayment,
  useVerifyImageDiagnosisPayment,
} from "@/hooks/usePayment";
import { RAZORPAY_KEY_ID } from "@/constants/api";
import { loadRazorpayScript, openRazorpayCheckout } from "@/lib/razorpay";
import type { RazorpaySuccessResponse } from "@/interfaces/payment";

const formatAmount = (paise: number, currency: string) => {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(paise / 100);
  } catch {
    return `${(paise / 100).toFixed(0)} ${currency}`;
  }
};

/**
 * Follows on from SummaryStep: the diagnosis row already exists
 * (draft.imageDiagnosisId), and this step is what unlocks it — capture an
 * order, take payment via Razorpay checkout, then verify.
 *
 * A user with free trials left has nothing to check out (capture returns
 * isImageDiagnosisFree instead of an order), but verify is still gated on an
 * explicit tap here — auto-calling it made the whole step flash by
 * unnoticed, which read as "payment didn't happen" rather than "this one's
 * free."
 */
const PaymentStep = () => {
  const { goToStep } = useFlowNavigation();
  const { draft } = useDiagnosisFlow();
  const { user } = useAuth();
  const capturePayment = useCaptureImageDiagnosisPayment();
  const verifyPayment = useVerifyImageDiagnosisPayment();

  const imageDiagnoseId = draft.imageDiagnosisId;

  const runVerify = (response?: RazorpaySuccessResponse) => {
    if (imageDiagnoseId === null) return;
    verifyPayment.mutate(
      { imageDiagnoseId, ...response },
      { onSuccess: () => goToStep("done") }
    );
  };

  const runCapture = () => {
    capturePayment.mutate(undefined);
  };

  // Fires once per diagnosis id. A failed capture leaves isError set, which
  // this condition excludes, so it won't retry on its own — the Try Again
  // button below calls runCapture explicitly instead.
  useEffect(() => {
    if (imageDiagnoseId === null) return;
    if (capturePayment.isPending || capturePayment.isSuccess || capturePayment.isError) {
      return;
    }
    runCapture();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageDiagnoseId]);

  const order = capturePayment.data?.order;
  const isFreeOrCovered = capturePayment.isSuccess && !order;

  const handlePay = async () => {
    if (!order) return;

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) return;

    openRazorpayCheckout({
      key: RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "DrDermx",
      description: "Image diagnosis payment",
      order_id: order.id,
      prefill: {
        name: user?.name ?? undefined,
        contact: user?.mobileNumber ?? undefined,
        email: user?.email ?? undefined,
      },
      theme: { color: "#ff9ba8" },
      handler: (response) => runVerify(response),
    });
  };

  const isPreparing = capturePayment.isPending;
  const isConfirmingFree = verifyPayment.isPending && isFreeOrCovered;
  const isCheckingOut = verifyPayment.isPending && !isConfirmingFree;

  const captureFailed = capturePayment.isError;
  const freeConfirmFailed = isFreeOrCovered && verifyPayment.isError;

  return (
    <StepShell title='Payment' step='payment'>
      <div className='flex min-h-[70vh] flex-col justify-between pt-2'>
        <div className='space-y-6'>
          <div className='space-y-3 rounded-lg border border-border bg-white p-5 text-center'>
            <ShieldCheck className='mx-auto h-8 w-8 text-primary' />
            <h2 className='text-lg font-semibold text-secondary'>
              Unlock Your Personalised Diagnosis
            </h2>
            {order ? (
              <p className='text-sm text-primary'>
                {formatAmount(order.amount, order.currency)} for a detailed
                analysis of your case
              </p>
            ) : isFreeOrCovered ? (
              <p className='text-sm text-primary'>
                No charge — this diagnosis is covered by your free trial.
              </p>
            ) : (
              <p className='text-sm text-muted-foreground'>
                {isPreparing ? "Preparing your diagnosis..." : "Ready to proceed."}
              </p>
            )}
            <ul className='space-y-1.5 text-left text-sm text-muted-foreground'>
              <li>Receive a highly accurate diagnosis</li>
              <li>Results within minutes of payment</li>
              <li>Expert-level insights and recommendations</li>
            </ul>
          </div>

          <ErrorBanner
            message={capturePayment.error?.message ?? verifyPayment.error?.message}
          />
        </div>

        {(captureFailed || freeConfirmFailed) && (
          <Button
            className='w-full'
            onClick={() => (captureFailed ? runCapture() : runVerify())}
          >
            Try Again
          </Button>
        )}

        {order && (
          <Button
            className='w-full'
            disabled={isCheckingOut}
            onClick={handlePay}
          >
            {isCheckingOut
              ? "Verifying payment..."
              : `Pay ${formatAmount(order.amount, order.currency)} & Proceed`}
          </Button>
        )}

        {isFreeOrCovered && !freeConfirmFailed && (
          <Button
            className='w-full'
            disabled={isConfirmingFree}
            onClick={() => runVerify()}
          >
            {isConfirmingFree ? "Confirming..." : "Continue — no charge"}
          </Button>
        )}
      </div>
    </StepShell>
  );
};

export default PaymentStep;
