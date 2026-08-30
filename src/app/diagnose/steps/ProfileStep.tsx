"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import StepShell from "@/components/diagnose/StepShell";
import ErrorBanner from "@/components/diagnose/ErrorBanner";
import { useAuth } from "@/context/AuthContext";
import { useCreateUser, useUpdateUser } from "@/hooks/useUser";
import { useFlowNavigation } from "@/hooks/useFlowNavigation";
import type { Gender } from "@/interfaces/user";
import { clearSignupState, getSignupState } from "@/services/signupStorage";
import { cn } from "@/lib/utils";

const GENDERS: { value: Gender; label: string }[] = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

/**
 * Gender is a profile-level field, not a per-diagnosis one, and users/create
 * does not accept it — PUT users/update is the only way to set it. So a brand
 * new account always lands here once; a returning account with a gender on file
 * skips straight through.
 */
const ProfileStep = () => {
  const { goToStep, replaceStep } = useFlowNavigation();
  const { user, isAuthenticated, isLoadingUser, signIn } = useAuth();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const [signup] = useState(getSignupState);
  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender | "">("");

  const isNewAccount = Boolean(signup?.profileToken);
  const needsName = isNewAccount || !user?.name;
  const needsGender = isNewAccount || !user?.gender;

  // Prefill from whatever the account already has.
  useEffect(() => {
    if (user?.name) setName(user.name);
    if (user?.gender) setGender(user.gender);
  }, [user]);

  // Nothing to collect — don't make the user look at an empty form.
  useEffect(() => {
    if (isNewAccount || !isAuthenticated || isLoadingUser || !user) return;
    if (user.name && user.gender) {
      clearSignupState();
      replaceStep("upload");
    }
  }, [isNewAccount, isAuthenticated, isLoadingUser, user, replaceStep]);

  const isValid =
    (!needsName || name.trim().length > 1) && (!needsGender || gender !== "");

  /**
   * Run as one awaited sequence rather than nested mutate() callbacks, so the
   * navigation at the end cannot be lost if this component re-renders while the
   * requests are in flight.
   */
  const handleContinue = async () => {
    if (!isValid) return;

    try {
      if (isNewAccount && signup?.profileToken) {
        const created = await createUser.mutateAsync({
          payload: {
            name: name.trim(),
            mobileNumber: signup.phoneNumber,
            countryCode: signup.countryCode,
          },
          profileToken: signup.profileToken,
        });
        // Tokens are written synchronously, so the update below picks them up.
        signIn({
          accessToken: created.token,
          refreshToken: created.refreshToken,
        });
      }

      // users/create does not accept gender — this is the only way to set it.
      if (needsGender && gender !== "") {
        await updateUser.mutateAsync({
          gender,
          ...(needsName ? { name: name.trim() } : {}),
        });
      }

      clearSignupState();
      goToStep("upload");
    } catch {
      // Surfaced by the mutations' error state in the banner below.
    }
  };

  const isPending = createUser.isPending || updateUser.isPending;

  // An existing account is still being fetched — we don't yet know whether
  // there is anything to ask for. Rendering the loader here (rather than in
  // DiagnoseFlow) keeps this component mounted through its own requests.
  if (!isNewAccount && isAuthenticated && (isLoadingUser || !user)) {
    return (
      <div className='flex min-h-[60vh] items-center justify-center'>
        <div className='h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent' />
      </div>
    );
  }

  return (
    <StepShell
      title='About you'
      step='profile'
      footer={
        <Button
          className='w-full'
          disabled={!isValid || isPending}
          onClick={handleContinue}
        >
          {isPending ? "Saving..." : "Continue"}
        </Button>
      }
    >
      <div className='space-y-6 pt-2'>
        <p className='text-sm text-muted-foreground'>
          We use this to help the dermatologist review your case.
        </p>

        {needsName && (
          <div className='space-y-2'>
            <Label htmlFor='name' className='font-semibold'>
              Full name
            </Label>
            <Input
              id='name'
              autoComplete='name'
              placeholder='Your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className='space-y-2'>
          <Label className='font-semibold'>Gender</Label>
          <RadioGroup
            value={gender}
            onValueChange={(value) => setGender(value as Gender)}
            disabled={!needsGender}
          >
            {GENDERS.map((option) => (
              <label
                key={option.value}
                htmlFor={`gender-${option.value}`}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border bg-white p-4 transition-colors",
                  gender === option.value
                    ? "border-primary"
                    : "border-border hover:border-primary/40",
                  !needsGender && "cursor-not-allowed opacity-60"
                )}
              >
                <RadioGroupItem
                  id={`gender-${option.value}`}
                  value={option.value}
                />
                <span
                  className={cn(
                    "text-sm font-medium",
                    gender === option.value ? "text-primary" : "text-secondary"
                  )}
                >
                  {option.label}
                </span>
              </label>
            ))}
          </RadioGroup>
          {!needsGender && (
            <p className='text-xs text-muted-foreground'>
              Taken from your profile.
            </p>
          )}
        </div>

        <ErrorBanner
          message={createUser.error?.message ?? updateUser.error?.message}
        />
      </div>
    </StepShell>
  );
};

export default ProfileStep;
