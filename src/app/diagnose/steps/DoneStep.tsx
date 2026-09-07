"use client";

import Link from "next/link";
import { CheckCircle2, Lightbulb, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDiagnosisFlow } from "@/context/DiagnosisFlowContext";

const BENEFITS = [
  {
    icon: CheckCircle2,
    title: "Accurate Results",
    description: "Receive a highly accurate diagnosis.",
  },
  {
    icon: Timer,
    title: "Quick Processing",
    description: "Get your results within minutes.",
  },
  {
    icon: Lightbulb,
    title: "Expert Insights",
    description: "Expert-level insights and recommendations.",
  },
];

/**
 * Reached only after PaymentStep verifies payment (or the free trial covers
 * it) — the diagnosis is now in process server-side. Full results still
 * surface in the DrDermx app, so this step hands off there.
 */
const DoneStep = () => {
  const { resetDraft } = useDiagnosisFlow();

  return (
    <div className='mx-auto flex min-h-[100dvh] w-full max-w-md flex-col bg-white px-6 pb-8 pt-16'>
      <div className='flex flex-1 flex-col'>
        <div className='space-y-3 text-center'>
          <h1 className='text-2xl font-bold text-secondary'>You&apos;re all set</h1>
          <p className='text-sm text-muted-foreground'>
            Continue in the DrDermx app to track your personalised diagnosis.
          </p>
        </div>

        <div className='mt-10 space-y-6'>
          {BENEFITS.map(({ icon: Icon, title, description }) => (
            <div key={title} className='flex items-start gap-4'>
              <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10'>
                <Icon className='h-5 w-5 text-primary' />
              </span>
              <span>
                <span className='block text-base font-semibold text-secondary'>{title}</span>
                <span className='block text-sm text-muted-foreground'>{description}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className='space-y-3 pt-8'>
        {/* /download already handles device sniffing and store redirects. */}
        <Button asChild className='w-full'>
          <Link href='/download' onClick={resetDraft}>
            Continue in the App
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DoneStep;
