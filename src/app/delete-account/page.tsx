import PageCard from "@/components/wrappers/PageCard";
import { InfoIcon } from "lucide-react";
import DeleteAccount from "./delete-account";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dr. Dermx - Delete Account",
  description: "A Skin Health Revolution in India",
};

export default function Home() {
  return (
    <PageCard className='max-w-[640px] text-secondary'>
      {/* Heading */}
      <h1 className='text-center text-[32px] font-bold leading-[1.12] tracking-[-0.5px] text-ink sm:text-[40px]'>
        Delete Your Account
      </h1>

      {/* Alert  */}
      <div className='my-6 flex items-start gap-3 rounded-xl border border-rose/30 bg-rose/5 px-4 py-3'>
        <InfoIcon className='mt-0.5 size-5 shrink-0 text-rose' />
        <p className='text-sm font-semibold leading-6 text-rose'>
          Are you sure you want to delete your account? This action is permanent and cannot be
          undone.
        </p>
      </div>

      <DeleteAccount />
    </PageCard>
  );
}
