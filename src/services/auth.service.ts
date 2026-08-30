import { ENDPOINTS, PLATFORM } from "@/constants/api";
import type {
  GenerateOtpPayload,
  GenerateOtpResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "@/interfaces/auth";
import { apiClient } from "./axios";

export const generateOtp = async (
  payload: Omit<GenerateOtpPayload, "platForm">
): Promise<GenerateOtpResponse> => {
  const { data } = await apiClient.post<GenerateOtpResponse>(
    ENDPOINTS.OTP_GENERATE,
    { ...payload, platForm: PLATFORM }
  );
  return data;
};

export const verifyOtp = async (
  payload: Omit<VerifyOtpPayload, "platForm">
): Promise<VerifyOtpResponse> => {
  const { data } = await apiClient.post<VerifyOtpResponse>(
    ENDPOINTS.OTP_VERIFY,
    { ...payload, platForm: PLATFORM }
  );
  return data;
};
