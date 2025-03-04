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

const DeleteAccount = () => {
  return (
    <>
      <div className='md:w-3/4 px-8 flex flex-col gap-8 mx-auto'>
        {/* Reason of Leaving */}
        <div className='space-y-2'>
          <Label className='font-semibold'>Please tell us why you&apos;re leaving</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Select a reason' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className='flex flex-col gap-1'>
                <SelectItem className='hover:font-semibold' value='apple'>
                  Privacy Concerns
                </SelectItem>
                <SelectItem className='hover:font-semibold' value='banana'>
                  Not using the app
                </SelectItem>
                <SelectItem className='hover:font-semibold' value='blueberry'>
                  Found the alternative
                </SelectItem>
                <SelectItem className='hover:font-semibold' value='grapes'>
                  Other
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* OTP Input */}
        <div className='space-y-2'>
          <Label className='font-semibold'>Verify your identity</Label>
          <InputOTP className='outline' maxLength={6}>
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

        {/* CTA Buttons  */}
        <div className='flex justify-center gap-4'>
          <Button className='basis-1/2' variant='outline'>
            Cancel
          </Button>
          <Button className='basis-1/2' variant='destructive'>
            Delete Account
          </Button>
        </div>
      </div>
    </>
  );
};

export default DeleteAccount;
