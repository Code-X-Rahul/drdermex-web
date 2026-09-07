import type { ApiEnvelope } from "./api";

/** Always "IMAGE_DIAGNOSIS" here — this flow never buys anything else. */
export const IMAGE_DIAGNOSIS_PAYMENT_TYPE = "IMAGE_DIAGNOSIS" as const;

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
}

export interface CapturePaymentResponse extends ApiEnvelope {
  /** Null when the diagnosis is free (see isImageDiagnosisFree) or fully coupon-covered. */
  order: RazorpayOrder | null;
  walletOnly?: boolean;
  walletDeductionAmount?: number;
  /** True when the user's free-trial quota covers this diagnosis — no checkout needed. */
  isImageDiagnosisFree?: boolean;
  currency?: string;
}

export interface RazorpaySuccessResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyPaymentPayload extends Partial<RazorpaySuccessResponse> {
  imageDiagnoseId: number;
}

export interface VerifyPaymentResponse extends ApiEnvelope {
  data?: unknown;
  isImageDiagnosisFree?: boolean;
}
