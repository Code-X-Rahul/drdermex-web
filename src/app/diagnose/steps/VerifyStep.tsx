"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import StepShell from "@/components/diagnose/StepShell";
import ErrorBanner from "@/components/diagnose/ErrorBanner";
import { useAuth } from "@/context/AuthContext";
import { useGenerateOtp, useVerifyOtp } from "@/hooks/useAuth";
import { useFlowNavigation } from "@/hooks/useFlowNavigation";
import { getSignupState, setSignupState } from "@/services/signupStorage";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

const VerifyStep = () => {
  const { goToStep, replaceStep } = useFlowNavigation();
  const { signIn } = useAuth();
  const verifyOtp = useVerifyOtp();
  const generateOtp = useGenerateOtp();

  const [otp, setOtp] = useState("");
  const [identity, setIdentity] = useState(getSignupState);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  // A direct visit to ?step=verify has no identity to verify against.
  useEffect(() => {
    if (!identity) replaceStep("login");
  }, [identity, replaceStep]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  if (!identity) return null;

  const handleVerify = (code: string) => {
    verifyOtp.mutate(
      { ...identity, otpCode: code },
      {
        onSuccess: (data) => {
          // Existing account → tokens come back and we're logged in.
          if (data.token && data.refreshToken) {
            signIn({
              accessToken: data.token,
              refreshToken: data.refreshToken,
            });
            // The profile step decides for itself whether it can be skipped.
            goToStep("profile");
            return;
          }

          // No account yet → carry the profileToken into the profile step,
          // which collects a name and calls users/create with it.
          if (data.profileToken) {
            setSignupState({ ...identity, profileToken: data.profileToken });
            setIdentity({ ...identity, profileToken: data.profileToken });
            goToStep("profile");
          }
        },
      }
    );
  };

  const handleResend = () => {
    generateOtp.mutate(identity, {
      onSuccess: () => {
        setSecondsLeft(RESEND_SECONDS);
        setOtp("");
      },
    });
  };

  return (
    <StepShell
      title='Verify your number'
      step='verify'
      onBack={() => goToStep("login")}
      footer={
        <Button
          className='w-full'
          disabled={otp.length < OTP_LENGTH || verifyOtp.isPending}
          onClick={() => handleVerify(otp)}
        >
          {verifyOtp.isPending ? "Verifying..." : "Verify"}
        </Button>
      }
    >
      <div className='space-y-6 pt-2'>
        <p className='text-sm text-muted-foreground'>
          Enter the 6-digit code sent to +{identity.countryCode}{" "}
          {identity.phoneNumber}.
        </p>

        <div className='flex justify-center'>
          <InputOTP
            maxLength={OTP_LENGTH}
            value={otp}
            onChange={(value) => {
              setOtp(value);
              if (value.length === OTP_LENGTH) handleVerify(value);
            }}
          >
            <InputOTPGroup>
              {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className='text-center text-sm'>
          {secondsLeft > 0 ? (
            <span className='text-muted-foreground'>
              Resend code in {secondsLeft}s
            </span>
          ) : (
            <button
              type='button'
              onClick={handleResend}
              disabled={generateOtp.isPending}
              className='font-medium text-primary underline-offset-4 hover:underline disabled:opacity-50'
            >
              {generateOtp.isPending ? "Sending..." : "Resend code"}
            </button>
          )}
        </div>

        <ErrorBanner
          message={verifyOtp.error?.message ?? generateOtp.error?.message}
        />
      </div>
    </StepShell>
  );
};

export default VerifyStep;
