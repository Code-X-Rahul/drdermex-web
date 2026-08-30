import { ENDPOINTS } from "@/constants/api";
import {
  CONDITION_MAP_KEYS,
  bodyPartLabel,
  formatBodyLocation,
} from "@/constants/diagnosis";
import type {
  DiagnosisDraft,
  UpsertImageDiagnosisPayload,
  UpsertImageDiagnosisResponse,
} from "@/interfaces/diagnosis";
import type { Gender } from "@/interfaces/user";
import { apiClient } from "./axios";

export const upsertImageDiagnosis = async (
  payload: UpsertImageDiagnosisPayload
): Promise<UpsertImageDiagnosisResponse> => {
  const { data } = await apiClient.post<UpsertImageDiagnosisResponse>(
    ENDPOINTS.UPSERT_IMAGE_DIAGNOSIS,
    payload
  );
  return data;
};

/** Booleans travel as the strings "true"/"false", matching the mobile app. */
const toWireBool = (value: boolean) => String(value);

export const buildQuestionnairePayload = (
  draft: DiagnosisDraft,
  imageDiagnosisId: number,
  gender: Gender | null
): UpsertImageDiagnosisPayload => ({
  imageDiagnosisId,
  photoUrls: draft.photoUrls,
  description: draft.description,
  affectedAreaPhotos: draft.selectedBodyPartIds.map(bodyPartLabel),
  bodyLocation: formatBodyLocation(draft.selectedBodyPartIds, draft.bodySide),
  howMuchBodyAffected: draft.howMuchBodyAffected,
  ...(gender ? { gender } : {}),
  conditionMap: {
    [CONDITION_MAP_KEYS.DURATION]: draft.conditionDuration,
    [CONDITION_MAP_KEYS.ITCH]: toWireBool(draft.doesItItch),
    [CONDITION_MAP_KEYS.FEVER]: toWireBool(draft.hasFever),
  },
});

/**
 * Submitting is always TWO calls. The create branch of upsertImageDiagnosis
 * persists only photoUrls/description and silently drops every questionnaire
 * field, so we create to obtain an id and then update with the answers.
 *
 * The resulting row sits at status RESUME_SUBMISSION until payment is taken in
 * the mobile app, which is exactly the handoff this flow relies on.
 */
export const submitDiagnosis = async (
  draft: DiagnosisDraft,
  gender: Gender | null
): Promise<UpsertImageDiagnosisResponse> => {
  let diagnosisId = draft.imageDiagnosisId;

  if (diagnosisId === null) {
    const created = await upsertImageDiagnosis({
      photoUrls: draft.photoUrls,
      description: draft.description,
    });
    diagnosisId = created.data.id;
  }

  return upsertImageDiagnosis(
    buildQuestionnairePayload(draft, diagnosisId, gender)
  );
};
