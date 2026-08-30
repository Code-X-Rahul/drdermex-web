"use client";

import { useMutation } from "@tanstack/react-query";
import { generateOtp, verifyOtp } from "@/services/auth.service";
import type { NormalisedApiError } from "@/interfaces/api";
import type {
  GenerateOtpResponse,
  VerifyOtpResponse,
} from "@/interfaces/auth";

interface OtpIdentity {
  phoneNumber: string;
  countryCode: string;
}

export const useGenerateOtp = () =>
  useMutation<GenerateOtpResponse, NormalisedApiError, OtpIdentity>({
    mutationFn: generateOtp,
  });

export const useVerifyOtp = () =>
  useMutation<
    VerifyOtpResponse,
    NormalisedApiError,
    OtpIdentity & { otpCode: string }
  >({
    mutationFn: verifyOtp,
  });
