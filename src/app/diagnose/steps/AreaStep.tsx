"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import StepShell from "@/components/diagnose/StepShell";
import BodyPartSelector from "@/components/diagnose/BodyPartSelector";
import { useDiagnosisFlow } from "@/context/DiagnosisFlowContext";
import { useFlowNavigation } from "@/hooks/useFlowNavigation";
import { bodyPartLabel, sideOfBodyPart } from "@/constants/diagnosis";
import type { BodySide } from "@/interfaces/diagnosis";
import { cn } from "@/lib/utils";

const SIDES: { value: BodySide; label: string }[] = [
  { value: "front", label: "Front" },
  { value: "back", label: "Back" },
];

const AreaStep = () => {
  const { goToStep } = useFlowNavigation();
  const { draft, updateDraft } = useDiagnosisFlow();

  const toggleBodyPart = (id: string) => {
    const selected = draft.selectedBodyPartIds.includes(id)
      ? draft.selectedBodyPartIds.filter((partId) => partId !== id)
      : [...draft.selectedBodyPartIds, id];
    updateDraft({ selectedBodyPartIds: selected });
  };

  // Only the current side's parts are visible on the diagram, so the chip row
  // shows every selection to make cross-side picks discoverable.
  const selectedOnThisSide = draft.selectedBodyPartIds.filter(
    (id) => sideOfBodyPart(id) === draft.bodySide
  );

  return (
    <StepShell
      title='Select Affected Areas'
      step='area'
      onBack={() => goToStep("extent")}
      onCancel={() => goToStep("upload")}
      footer={
        <Button
          className='w-full'
          disabled={draft.selectedBodyPartIds.length === 0}
          onClick={() => goToStep("condition")}
        >
          Next
        </Button>
      }
    >
      <div className='space-y-4 pt-2'>
        <p className='text-sm text-muted-foreground'>
          Tap the affected area on the body to indicate its location.
        </p>

        <div className='flex overflow-hidden rounded-lg border border-secondary'>
          {SIDES.map((side) => (
            <button
              key={side.value}
              type='button'
              onClick={() => updateDraft({ bodySide: side.value })}
              aria-pressed={draft.bodySide === side.value}
              className={cn(
                "flex-1 py-2.5 text-sm font-semibold transition-colors",
                draft.bodySide === side.value
                  ? "bg-secondary text-white"
                  : "bg-white text-secondary hover:bg-muted"
              )}
            >
              {side.label}
            </button>
          ))}
        </div>

        <BodyPartSelector
          side={draft.bodySide}
          selectedIds={selectedOnThisSide}
          onToggle={toggleBodyPart}
        />

        {draft.selectedBodyPartIds.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {draft.selectedBodyPartIds.map((id) => (
              <button
                key={id}
                type='button'
                onClick={() => toggleBodyPart(id)}
                className='flex items-center gap-1.5 rounded-full border border-primary bg-primary/10 px-3 py-1.5 text-xs font-medium text-secondary transition-colors hover:bg-primary/20'
              >
                {bodyPartLabel(id)}
                <X className='h-3 w-3' />
              </button>
            ))}
          </div>
        )}
      </div>
    </StepShell>
  );
};

export default AreaStep;
