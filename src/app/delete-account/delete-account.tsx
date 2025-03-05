"use client";

import { useState, Suspense } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { deleteAccount } from "./action/delete-account";
import type { DeleteAccountPayload } from "./action/delete-account";

function DeleteAccountForm() {
  const params = useSearchParams();
  const phoneNumber = params.get("phoneNumber");
  const platForm = params.get("platForm");

  const [formData, setFormData] = useState<{
    reason: string;
    otp: string;
  }>({
    reason: "",
    otp: "",
  });

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!phoneNumber || !platForm) return;

    const payload: DeleteAccountPayload = {
      phoneNumber: `+${phoneNumber.trim()}`,
      reason: formData.reason,
      otp: formData.otp,
      platForm,
    };

    deleteAccount(payload);
  };

  return (
    <div className='md:w-3/4 px-8 space-y-8 mx-auto'>
      {/* Reason of Leaving */}
      <form className='space-y-8'>
        <div className='space-y-2'>
          <Label className='font-semibold'>Please tell us why you&apos;re leaving</Label>
          <Select
            value={formData.reason}
            onValueChange={(value) => updateFormData("reason", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select a reason' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className='flex flex-col gap-1'>
                <SelectItem className='hover:font-semibold' value='privacy'>
                  Privacy Concerns
                </SelectItem>
                <SelectItem className='hover:font-semibold' value='not-using'>
                  Not using the app
                </SelectItem>
                <SelectItem className='hover:font-semibold' value='alternative'>
                  Found the alternative
                </SelectItem>
                <SelectItem className='hover:font-semibold' value='other'>
                  Other
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* OTP Input */}
        <div className='space-y-2'>
          <Label className='font-semibold'>Verify your identity</Label>
          <InputOTP
            value={formData.otp}
            onChange={(value) => updateFormData("otp", value)}
            className='outline'
            maxLength={6}
          >
            <InputOTPGroup className='gap-3 md:gap-6'>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </form>

      {/* CTA Buttons  */}
      <div className='flex justify-center gap-4'>
        <Button className='basis-1/2' variant='outline'>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className='basis-1/2'
          variant='destructive'
          disabled={!formData.reason || formData.otp.length < 6}
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
}

const DeleteAccount = () => {
  return (
    <Suspense fallback={<div className='p-8 text-center'>Loading...</div>}>
      <DeleteAccountForm />
    </Suspense>
  );
};

export default DeleteAccount;
