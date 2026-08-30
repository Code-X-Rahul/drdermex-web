"use client";

import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { PROGRESS_STEPS, type FlowStep } from "@/interfaces/flow";
import { cn } from "@/lib/utils";

interface StepShellProps {
  title: string;
  step: FlowStep;
  onBack?: () => void;
  onCancel?: () => void;
  /** Sticky footer content — typically the primary CTA. */
  footer?: ReactNode;
  children: ReactNode;
}

const StepProgress = ({ step }: { step: FlowStep }) => {
  const index = PROGRESS_STEPS.indexOf(step);
  if (index === -1) return null;

  return (
    <div
      className='flex gap-1.5 px-4 pb-3'
      role='progressbar'
      aria-valuenow={index + 1}
      aria-valuemin={1}
      aria-valuemax={PROGRESS_STEPS.length}
      aria-label={`Step ${index + 1} of ${PROGRESS_STEPS.length}`}
    >
      {PROGRESS_STEPS.map((progressStep, i) => (
        <span
          key={progressStep}
          className={cn(
            "h-1 flex-1 rounded-full transition-colors",
            i <= index ? "bg-primary" : "bg-primary/20"
          )}
        />
      ))}
    </div>
  );
};

const StepShell = ({
  title,
  step,
  onBack,
  onCancel,
  footer,
  children,
}: StepShellProps) => (
  <div className='mx-auto flex min-h-[100dvh] w-full max-w-md flex-col bg-white'>
    <header className='sticky top-0 z-10 bg-white pt-4'>
      <div className='flex items-center gap-2 px-4 pb-3'>
        {onBack ? (
          <button
            type='button'
            onClick={onBack}
            aria-label='Go back'
            className='-ml-2 rounded-md p-2 text-secondary transition-colors hover:bg-muted'
          >
            <ChevronLeft className='h-5 w-5' />
          </button>
        ) : (
          <span className='w-1' />
        )}
        <h1 className='flex-1 text-lg font-semibold text-secondary'>{title}</h1>
        {onCancel && (
          <button
            type='button'
            onClick={onCancel}
            className='rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-secondary'
          >
            Cancel
          </button>
        )}
      </div>
      <StepProgress step={step} />
    </header>

    <motion.main
      key={step}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className='flex-1 px-4 pb-6'
    >
      {children}
    </motion.main>

    {footer && (
      <footer className='sticky bottom-0 border-t border-border/40 bg-white px-4 py-4'>
        {footer}
      </footer>
    )}
  </div>
);

export default StepShell;
