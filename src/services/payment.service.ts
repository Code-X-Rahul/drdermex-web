import { ENDPOINTS } from "@/constants/api";
import {
  IMAGE_DIAGNOSIS_PAYMENT_TYPE,
  type CapturePaymentResponse,
  type VerifyPaymentPayload,
  type VerifyPaymentResponse,
} from "@/interfaces/payment";
import { apiClient } from "./axios";

export const captureImageDiagnosisPayment =
  async (): Promise<CapturePaymentResponse> => {
    const { data } = await apiClient.post<CapturePaymentResponse>(
      ENDPOINTS.CAPTURE_PAYMENT,
      { paymentType: IMAGE_DIAGNOSIS_PAYMENT_TYPE }
    );
    return data;
  };

export const verifyImageDiagnosisPayment = async (
  payload: VerifyPaymentPayload
): Promise<VerifyPaymentResponse> => {
  const { data } = await apiClient.post<VerifyPaymentResponse>(
    ENDPOINTS.VERIFY_PAYMENT,
    { paymentType: IMAGE_DIAGNOSIS_PAYMENT_TYPE, ...payload }
  );
  return data;
};
