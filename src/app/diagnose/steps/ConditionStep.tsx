"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import StepShell from "@/components/diagnose/StepShell";
import { useAuth } from "@/context/AuthContext";
import { useDiagnosisFlow } from "@/context/DiagnosisFlowContext";
import { useFlowNavigation } from "@/hooks/useFlowNavigation";
import { CONDITION_DURATION_OPTIONS } from "@/constants/diagnosis";
import { cn } from "@/lib/utils";

const GENDER_LABELS: Record<string, string> = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",
};

const ConditionStep = () => {
  const { goToStep } = useFlowNavigation();
  const { draft, updateDraft } = useDiagnosisFlow();
  const { user } = useAuth();

  const skip = () => {
    updateDraft({ conditionDuration: "", doesItItch: false, hasFever: false });
    goToStep("summary");
  };

  return (
    <StepShell
      title='Condition Details'
      step='condition'
      onBack={() => goToStep("area")}
      onCancel={() => goToStep("upload")}
      footer={
        <div className='flex items-center gap-4'>
          <button
            type='button'
            onClick={skip}
            className='px-2 text-sm font-medium text-muted-foreground transition-colors hover:text-secondary'
          >
            Skip
          </button>
          <Button
            className='flex-1'
            disabled={!draft.conditionDuration}
            onClick={() => goToStep("summary")}
          >
            Next
          </Button>
        </div>
      }
    >
      <div className='space-y-6 pt-2'>
        <div className='space-y-3'>
          <h2 className='text-base font-semibold text-secondary'>
            How long have you had this condition?
          </h2>
          <div className='space-y-3'>
            {CONDITION_DURATION_OPTIONS.map((option) => {
              const isSelected = draft.conditionDuration === option;
              return (
                <button
                  key={option}
                  type='button'
                  onClick={() => updateDraft({ conditionDuration: option })}
                  aria-pressed={isSelected}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg border bg-white p-4 text-left transition-colors",
                    isSelected ? "border-primary" : "border-border hover:border-primary/40"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                      isSelected ? "border-primary" : "border-input"
                    )}
                  >
                    {isSelected && <span className='h-2.5 w-2.5 rounded-full bg-primary' />}
                  </span>
                  <span className='text-sm font-medium text-secondary'>{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className='space-y-3'>
          <div className='flex items-center justify-between rounded-lg border border-border bg-white p-4'>
            <Label htmlFor='itch' className='text-sm font-medium'>
              Does it itch?
            </Label>
            <Switch
              id='itch'
              checked={draft.doesItItch}
              onCheckedChange={(checked) => updateDraft({ doesItItch: checked })}
            />
          </div>
          <div className='flex items-center justify-between rounded-lg border border-border bg-white p-4'>
            <Label htmlFor='fever' className='text-sm font-medium'>
              Do you have a fever?
            </Label>
            <Switch
              id='fever'
              checked={draft.hasFever}
              onCheckedChange={(checked) => updateDraft({ hasFever: checked })}
            />
          </div>
        </div>

        {user?.gender && (
          <div className='space-y-2'>
            <h2 className='text-base font-semibold text-secondary'>Gender</h2>
            <div className='flex items-center justify-between rounded-lg border border-border bg-muted/40 p-4'>
              <span className='text-sm font-medium text-secondary'>
                {GENDER_LABELS[user.gender] ?? user.gender}
              </span>
            </div>
          </div>
        )}
      </div>
    </StepShell>
  );
};

export default ConditionStep;
