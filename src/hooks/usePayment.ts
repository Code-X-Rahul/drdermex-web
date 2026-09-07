"use client";

import { useMutation } from "@tanstack/react-query";
import {
  captureImageDiagnosisPayment,
  verifyImageDiagnosisPayment,
} from "@/services/payment.service";
import type { NormalisedApiError } from "@/interfaces/api";
import type {
  CapturePaymentResponse,
  VerifyPaymentPayload,
  VerifyPaymentResponse,
} from "@/interfaces/payment";

export const useCaptureImageDiagnosisPayment = () =>
  useMutation<CapturePaymentResponse, NormalisedApiError, void>({
    mutationFn: captureImageDiagnosisPayment,
  });

export const useVerifyImageDiagnosisPayment = () =>
  useMutation<VerifyPaymentResponse, NormalisedApiError, VerifyPaymentPayload>({
    mutationFn: verifyImageDiagnosisPayment,
  });
