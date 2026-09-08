"use client";

import { useState } from "react";
import { Camera, Cpu, Stethoscope, ClipboardCheck, TrendingUp, ScanFace, Video, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = {
  patients: {
    label: "Patients",
    steps: [
      { Icon: Camera, title: "Upload a photo", text: "Of the affected area, right from your phone." },
      { Icon: Cpu, title: "AI analysis", text: "A preliminary diagnosis in seconds." },
      { Icon: Stethoscope, title: "Dermatologist review", text: "An MCI-registered doctor verifies it." },
      { Icon: ClipboardCheck, title: "Treatment plan", text: "Prescription, routine, diet and yoga." },
      { Icon: TrendingUp, title: "Track evolution", text: "See your skin improve over time." },
    ],
  },
  professionals: {
    label: "Professionals",
    steps: [
      { Icon: ScanFace, title: "Capture & map", text: "Body-mapped photos with case history." },
      { Icon: Cpu, title: "Differential diagnosis", text: "AI shortlist with similar images." },
      { Icon: ClipboardCheck, title: "Verify & prescribe", text: "Confirm and issue a plan in-app." },
      { Icon: Video, title: "Teleconsult or in-clinic", text: "Video calls and appointment booking." },
      { Icon: UserRound, title: "Manage patients", text: "History, referrals and follow-ups." },
    ],
  },
} as const;

type TabKey = keyof typeof TABS;

const WhatYouGet = () => {
  const [tab, setTab] = useState<TabKey>("patients");
  const { steps } = TABS[tab];

  return (
    <section className='mx-auto max-w-[1400px] px-5 pt-24 sm:px-8 sm:pt-32 lg:px-10'>
      <div className='rounded-[28px] bg-cream p-6 sm:p-10'>
        <div className='inline-flex rounded-xl bg-sand p-1'>
          {(Object.keys(TABS) as TabKey[]).map((k) => (
            <button
              key={k}
              type='button'
              onClick={() => setTab(k)}
              className={cn(
                "rounded-lg px-6 py-2.5 text-[15px] font-bold uppercase tracking-wide transition sm:px-10",
                tab === k ? "bg-white text-ink shadow-sm" : "text-ink/55"
              )}
            >
              {TABS[k].label}
            </button>
          ))}
        </div>

        <h2 className='mt-8 text-[30px] font-bold leading-[1.12] tracking-[-0.5px] text-ink sm:text-[40px]'>
          What you get with DrDermx
        </h2>

        <div className='no-scrollbar mt-10 flex gap-6 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:gap-4'>
          {steps.map(({ Icon, title, text }, i) => (
            <div key={title} className='relative min-w-[200px] lg:min-w-0'>
              <div className='flex size-16 items-center justify-center rounded-2xl bg-white text-rose shadow-sm'>
                <Icon className='size-7' strokeWidth={2} />
              </div>
              <div className='relative mt-6 h-px w-full bg-ink/25'>
                <span className='absolute -top-[3px] left-0 size-[7px] rounded-full bg-ink' />
                {i === steps.length - 1 && <span className='absolute -top-[3px] right-0 size-[7px] rounded-full bg-ink' />}
              </div>
              <p className='mt-5 text-[20px] font-bold text-ink'>{title}</p>
              <p className='mt-1 pr-4 text-[15px] leading-6 text-ink/70'>{text}</p>
            </div>
          ))}
        </div>

        <p className='mt-10 text-[13px] text-ink/55'>
          *No appointment needed. Complex cases may still need an in-person visit.
        </p>
      </div>
    </section>
  );
};

export default WhatYouGet;
