"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StepShell from "@/components/diagnose/StepShell";
import ErrorBanner from "@/components/diagnose/ErrorBanner";
import { useAuth } from "@/context/AuthContext";
import { useGenerateOtp } from "@/hooks/useAuth";
import { useFlowNavigation } from "@/hooks/useFlowNavigation";
import { clearSignupState, setSignupState } from "@/services/signupStorage";

const COUNTRY_CODES = [
  { code: "91", label: "🇮🇳 +91" },
  { code: "1", label: "🇺🇸 +1" },
  { code: "44", label: "🇬🇧 +44" },
  { code: "971", label: "🇦🇪 +971" },
];

const LoginStep = () => {
  const { goToStep } = useFlowNavigation();
  const { isAuthenticated, user, signOut } = useAuth();
  const generateOtp = useGenerateOtp();

  const [countryCode, setCountryCode] = useState("91");
  const [phoneNumber, setPhoneNumber] = useState("");

  const isValid = phoneNumber.trim().length >= 6;

  const handleSubmit = () => {
    if (!isValid) return;
    const trimmed = phoneNumber.trim();

    generateOtp.mutate(
      { phoneNumber: trimmed, countryCode },
      {
        onSuccess: () => {
          setSignupState({ phoneNumber: trimmed, countryCode });
          goToStep("verify");
        },
      }
    );
  };

  return (
    <StepShell
      title='Start your Diagnosis'
      step='login'
      footer={
        <Button
          className='w-full'
          disabled={!isValid || generateOtp.isPending}
          onClick={handleSubmit}
        >
          {generateOtp.isPending ? "Sending OTP..." : "Continue"}
        </Button>
      }
    >
      <div className='space-y-6 pt-2'>
        {/* Reachable via an explicit ?step=login while a session is still
            active — offer both resuming and switching accounts. */}
        {isAuthenticated && (
          <div className='space-y-3 rounded-lg border border-border bg-muted/40 p-4'>
            <p className='text-sm text-secondary'>
              You&apos;re already signed in
              {user?.mobileNumber ? ` as ${user.mobileNumber}` : ""}.
            </p>
            <div className='flex flex-wrap gap-2'>
              <Button size='sm' onClick={() => goToStep("profile")}>
                Continue
              </Button>
              <Button
                size='sm'
                variant='outline'
                onClick={() => {
                  signOut();
                  clearSignupState();
                }}
              >
                Use a different number
              </Button>
            </div>
          </div>
        )}

        <p className='text-sm text-muted-foreground'>
          Enter your mobile number and we&apos;ll send you a one-time password
          to verify it.
        </p>

        <div className='space-y-2'>
          <Label htmlFor='phone' className='font-semibold'>
            Mobile number
          </Label>
          <div className='flex gap-2'>
            <Select value={countryCode} onValueChange={setCountryCode}>
              <SelectTrigger className='w-28 shrink-0'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COUNTRY_CODES.map(({ code, label }) => (
                  <SelectItem key={code} value={code}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id='phone'
              type='tel'
              inputMode='numeric'
              autoComplete='tel'
              placeholder='Mobile number'
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))
              }
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>
        </div>

        <ErrorBanner message={generateOtp.error?.message} />
      </div>
    </StepShell>
  );
};

export default LoginStep;
