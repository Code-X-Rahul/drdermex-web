"use client";

import { useMutation } from "@tanstack/react-query";
import { submitDiagnosis } from "@/services/diagnosis.service";
import { uploadInjuredAreaPics } from "@/services/upload.service";
import type { NormalisedApiError } from "@/interfaces/api";
import type {
  DiagnosisDraft,
  UpsertImageDiagnosisResponse,
} from "@/interfaces/diagnosis";
import type { UploadInjuredAreaPicsResponse } from "@/interfaces/upload";
import type { Gender } from "@/interfaces/user";

export const useUploadPhotos = () =>
  useMutation<UploadInjuredAreaPicsResponse, NormalisedApiError, File[]>({
    mutationFn: uploadInjuredAreaPics,
  });

/** Runs the create-then-update pair; see submitDiagnosis for why it is two calls. */
export const useSubmitDiagnosis = () =>
  useMutation<
    UpsertImageDiagnosisResponse,
    NormalisedApiError,
    { draft: DiagnosisDraft; gender: Gender | null }
  >({
    mutationFn: ({ draft, gender }) => submitDiagnosis(draft, gender),
  });
