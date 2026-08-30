"use client";

import { Button } from "@/components/ui/button";
import StepShell from "@/components/diagnose/StepShell";
import { useDiagnosisFlow } from "@/context/DiagnosisFlowContext";
import { useFlowNavigation } from "@/hooks/useFlowNavigation";
import { AFFECTED_EXTENT_OPTIONS } from "@/constants/diagnosis";
import { cn } from "@/lib/utils";

const ExtentStep = () => {
  const { goToStep } = useFlowNavigation();
  const { draft, updateDraft } = useDiagnosisFlow();

  return (
    <StepShell
      title='Affected Area'
      step='extent'
      onBack={() => goToStep("upload")}
      onCancel={() => goToStep("upload")}
      footer={
        <Button
          className='w-full'
          disabled={!draft.howMuchBodyAffected}
          onClick={() => goToStep("area")}
        >
          Next
        </Button>
      }
    >
      <div className='space-y-4 pt-2'>
        <h2 className='text-base font-semibold text-secondary'>
          How much of the body is affected?
        </h2>

        <div className='space-y-3'>
          {AFFECTED_EXTENT_OPTIONS.map((option) => {
            const isSelected = draft.howMuchBodyAffected === option.value;
            return (
              <button
                key={option.value}
                type='button'
                onClick={() =>
                  updateDraft({ howMuchBodyAffected: option.value })
                }
                aria-pressed={isSelected}
                className={cn(
                  "flex w-full items-center gap-4 rounded-lg border bg-white p-4 text-left transition-colors",
                  isSelected
                    ? "border-primary"
                    : "border-border hover:border-primary/40"
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                    isSelected ? "border-primary" : "border-input"
                  )}
                >
                  {isSelected && (
                    <span className='h-2.5 w-2.5 rounded-full bg-primary' />
                  )}
                </span>
                <span>
                  <span className='block text-sm font-semibold text-secondary'>
                    {option.value}
                  </span>
                  <span className='block text-xs text-muted-foreground'>
                    {option.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </StepShell>
  );
};

export default ExtentStep;
