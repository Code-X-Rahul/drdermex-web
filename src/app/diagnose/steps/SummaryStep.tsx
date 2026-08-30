"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import StepShell from "@/components/diagnose/StepShell";
import ErrorBanner from "@/components/diagnose/ErrorBanner";
import { useAuth } from "@/context/AuthContext";
import { useDiagnosisFlow } from "@/context/DiagnosisFlowContext";
import { useSubmitDiagnosis } from "@/hooks/useDiagnosis";
import { useFlowNavigation } from "@/hooks/useFlowNavigation";
import { bodyPartLabel } from "@/constants/diagnosis";

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className='flex items-center justify-between gap-4 border-b border-border/60 px-4 py-3.5 last:border-b-0'>
    <span className='text-sm text-secondary'>{label}</span>
    <span className='text-right text-sm font-medium text-primary'>
      {value || "—"}
    </span>
  </div>
);

const SummaryStep = () => {
  const { goToStep } = useFlowNavigation();
  const { draft, updateDraft } = useDiagnosisFlow();
  const { user } = useAuth();
  const submitDiagnosis = useSubmitDiagnosis();

  const locationLabels = draft.selectedBodyPartIds
    .map(bodyPartLabel)
    .join(", ");

  const handleSubmit = () => {
    submitDiagnosis.mutate(
      { draft, gender: user?.gender ?? null },
      {
        onSuccess: (data) => {
          // Keep the id so a resubmit updates the same row instead of
          // creating a duplicate draft.
          updateDraft({ imageDiagnosisId: data.data.id });
          goToStep("done");
        },
      }
    );
  };

  return (
    <StepShell
      title='Issue Details'
      step='summary'
      onBack={() => goToStep("condition")}
      onCancel={() => goToStep("upload")}
      footer={
        <Button
          className='w-full'
          disabled={submitDiagnosis.isPending}
          onClick={handleSubmit}
        >
          {submitDiagnosis.isPending ? "Submitting..." : "Submit"}
        </Button>
      }
    >
      <div className='space-y-4 pt-2'>
        {draft.photoUrls.length > 0 && (
          <div className='flex items-center gap-3 rounded-lg border border-border bg-white p-3'>
            <div className='relative h-16 w-16 shrink-0 overflow-hidden rounded-md'>
              <Image
                src={draft.photoUrls[0]}
                alt='Your concern'
                fill
                sizes='64px'
                className='object-cover'
                unoptimized
              />
            </div>
            <span className='flex-1 text-sm font-semibold text-secondary'>
              {locationLabels || "Your photos"}
            </span>
            <span className='text-xs text-muted-foreground'>
              {draft.photoUrls.length} photo
              {draft.photoUrls.length > 1 ? "s" : ""}
            </span>
          </div>
        )}

        <div className='rounded-lg border border-border bg-white'>
          <SummaryRow label='Affected Area' value={draft.howMuchBodyAffected} />
          <SummaryRow label='Affected Location' value={locationLabels} />
          <SummaryRow label='Duration' value={draft.conditionDuration} />
          <SummaryRow
            label='Does it itch?'
            value={draft.doesItItch ? "Yes" : "No"}
          />
          <SummaryRow
            label='Do you have a fever?'
            value={draft.hasFever ? "Yes" : "No"}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='additional' className='font-semibold'>
            Additional Details
          </Label>
          <Textarea
            id='additional'
            rows={5}
            placeholder='Anything else the dermatologist should know?'
            value={draft.description}
            onChange={(e) => updateDraft({ description: e.target.value })}
          />
        </div>

        <ErrorBanner message={submitDiagnosis.error?.message} />
      </div>
    </StepShell>
  );
};

export default SummaryStep;
