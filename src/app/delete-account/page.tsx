import MainWrapper from "@/components/wrappers/MainWrapper";
import { InfoIcon } from "lucide-react";
import DeleteAccount from "./delete-account";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dr. Dermx - Delete Account",
  description: "A Skin Health Revolution in India",
};

export default function Home() {
  return (
    <>
      <MainWrapper className='shadow-md text-secondary'>
        <div className='px-4 md:px-8 py-4 md:py-20 md:w-3/4 mx-auto'>
          {/* Heading */}
          <h1 className='text-secondary text-2xl font-semibold text-center'>Delete Your Account</h1>

          {/* Alert  */}

          <div className='flex items-center rounded-sm justify-center gap-2 px-8 py-2 my-4 mx-4 md:mx-0 bg-destructive-foreground border-destructive border-[1px]'>
            <InfoIcon className='size-4 text-destructive' />
            <p className='text-destructive font-semibold text-xs'>
              Are you sure you want to delete your account? This action is permanent and cannot be
              undone.
            </p>
          </div>

          <DeleteAccount />
        </div>
      </MainWrapper>
    </>
  );
}
