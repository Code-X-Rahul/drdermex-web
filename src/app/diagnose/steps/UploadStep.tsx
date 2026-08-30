"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Camera, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import StepShell from "@/components/diagnose/StepShell";
import ErrorBanner from "@/components/diagnose/ErrorBanner";
import { useDiagnosisFlow } from "@/context/DiagnosisFlowContext";
import { useUploadPhotos } from "@/hooks/useDiagnosis";
import { useFlowNavigation } from "@/hooks/useFlowNavigation";
import { MAX_UPLOAD_FILES } from "@/interfaces/upload";

const DESCRIPTION_PLACEHOLDER = `Example:
1. Increased hair fall in last 1 month
2. Scalp itching
3. Red spots spreading on arms
4. Difficulty sleeping at night`;

const UploadStep = () => {
  const { goToStep } = useFlowNavigation();
  const { draft, updateDraft } = useDiagnosisFlow();
  const uploadPhotos = useUploadPhotos();

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Object URLs must be revoked or the blobs leak for the life of the tab.
  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach(URL.revokeObjectURL);
  }, [files]);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    setFiles((prev) =>
      [...prev, ...Array.from(incoming)].slice(0, MAX_UPLOAD_FILES)
    );
  };

  const removeFile = (index: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== index));

  // Already-uploaded photos count too, so going back and forward doesn't force
  // a re-pick.
  const hasPhotos = files.length > 0 || draft.photoUrls.length > 0;
  const canContinue = hasPhotos && draft.consentGiven;

  const handleContinue = () => {
    if (!canContinue) return;

    if (files.length === 0) {
      goToStep("extent");
      return;
    }

    uploadPhotos.mutate(files, {
      onSuccess: (data) => {
        updateDraft({ photoUrls: [...draft.photoUrls, ...data.files] });
        setFiles([]);
        goToStep("extent");
      },
    });
  };

  return (
    <StepShell
      title='Show Us Your Concern'
      step='upload'
      onCancel={() => goToStep("login")}
      footer={
        <Button
          className='w-full'
          disabled={!canContinue || uploadPhotos.isPending}
          onClick={handleContinue}
        >
          {uploadPhotos.isPending ? "Uploading..." : "Continue"}
        </Button>
      }
    >
      <div className='space-y-6 pt-2'>
        <div className='grid grid-cols-2 gap-3'>
          <button
            type='button'
            onClick={() => cameraInputRef.current?.click()}
            className='flex flex-col items-center gap-2 rounded-lg border border-primary/40 bg-white p-6 transition-colors hover:border-primary'
          >
            <Camera className='h-6 w-6 text-primary' />
            <span className='text-sm font-medium text-secondary'>
              Take Photos
            </span>
          </button>
          <button
            type='button'
            onClick={() => galleryInputRef.current?.click()}
            className='flex flex-col items-center gap-2 rounded-lg border border-primary/40 bg-white p-6 transition-colors hover:border-primary'
          >
            <ImagePlus className='h-6 w-6 text-primary' />
            <span className='text-sm font-medium text-secondary'>
              Upload Photos
            </span>
          </button>
        </div>

        <input
          ref={cameraInputRef}
          type='file'
          accept='image/*'
          capture='environment'
          className='hidden'
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <input
          ref={galleryInputRef}
          type='file'
          accept='image/*'
          multiple
          className='hidden'
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />

        {(previews.length > 0 || draft.photoUrls.length > 0) && (
          <div className='flex flex-wrap gap-2'>
            {draft.photoUrls.map((url) => (
              <div
                key={url}
                className='relative h-20 w-20 overflow-hidden rounded-md border border-border'
              >
                <Image
                  src={url}
                  alt='Uploaded concern'
                  fill
                  sizes='80px'
                  className='object-cover'
                  unoptimized
                />
              </div>
            ))}
            {previews.map((url, index) => (
              <div
                key={url}
                className='relative h-20 w-20 overflow-hidden rounded-md border border-border'
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Selected photo ${index + 1}`}
                  className='h-full w-full object-cover'
                />
                <button
                  type='button'
                  onClick={() => removeFile(index)}
                  aria-label={`Remove photo ${index + 1}`}
                  className='absolute right-0.5 top-0.5 rounded-full bg-black/60 p-0.5 text-white'
                >
                  <X className='h-3 w-3' />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className='space-y-2'>
          <Label htmlFor='description' className='font-semibold'>
            What are you experiencing?
          </Label>
          <Textarea
            id='description'
            rows={6}
            placeholder={DESCRIPTION_PLACEHOLDER}
            value={draft.description}
            onChange={(e) => updateDraft({ description: e.target.value })}
          />
        </div>

        <div className='space-y-3 rounded-lg border border-border bg-white p-4'>
          <div className='flex items-start gap-3'>
            <Checkbox
              id='consent'
              checked={draft.consentGiven}
              onCheckedChange={(checked) =>
                updateDraft({ consentGiven: checked === true })
              }
            />
            <Label
              htmlFor='consent'
              className='cursor-pointer text-sm font-medium leading-snug'
            >
              I consent to all terms of image capture and use
            </Label>
          </div>
          <p className='text-xs leading-5 text-muted-foreground'>
            By checking this box, you agree to the capture and storage of your
            images for medical purposes, their anonymized use in research and
            education, and potential use in marketing materials.
          </p>
        </div>

        <ErrorBanner message={uploadPhotos.error?.message} />
      </div>
    </StepShell>
  );
};

export default UploadStep;
