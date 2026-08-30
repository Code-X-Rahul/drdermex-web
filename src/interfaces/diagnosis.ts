import type { ApiEnvelope } from "./api";
import type { Gender } from "./user";

export type BodySide = "front" | "back";

export type DiagnosisStatus =
  | "IN_PROCESS"
  | "ASSIGNED"
  | "BUNDLE_SELECTED"
  | "SHIPPED"
  | "DELIVERED"
  | "RESUME_SUBMISSION"
  | "DIAGNOSIS_DONE";

/**
 * Free-form JSON on the backend. The keys are the mobile app's convention and
 * are what it reads back when resuming — see CONDITION_MAP_KEYS.
 * Booleans are sent as the strings "true"/"false", matching the app.
 */
export interface ConditionMap {
  "condition duration"?: string;
  Does_it_itch?: string;
  Do_you_have_a_fever?: string;
}

export interface UpsertImageDiagnosisPayload {
  /** Absolute S3 URLs from the upload step. */
  photoUrls: string[];
  description?: string;
  /**
   * Present → update, absent → create. The create branch silently DROPS every
   * questionnaire field below, so a full submit is always two calls.
   */
  imageDiagnosisId?: number;
  /**
   * Despite the name these are body-part label strings, not photo URLs.
   */
  affectedAreaPhotos?: string[];
  howMuchBodyAffected?: string;
  bodyLocation?: string;
  gender?: Gender;
  conditionMap?: ConditionMap;
}

export interface ImageDiagnosis {
  id: number;
  photoUrls: string[];
  description: string | null;
  affectedAreaPhotos: string[];
  conditionMap: ConditionMap | null;
  howMuchBodyAffected: string | null;
  bodyLocation: string | null;
  gender: Gender | null;
  status: DiagnosisStatus;
  paymentAmount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpsertImageDiagnosisResponse extends ApiEnvelope {
  data: ImageDiagnosis;
}

/** Everything the wizard accumulates before it is shaped into a payload. */
export interface DiagnosisDraft {
  photoUrls: string[];
  description: string;
  consentGiven: boolean;
  howMuchBodyAffected: string;
  selectedBodyPartIds: string[];
  bodySide: BodySide;
  conditionDuration: string;
  doesItItch: boolean;
  hasFever: boolean;
  /** Set once the create call returns, so a resumed submit updates in place. */
  imageDiagnosisId: number | null;
}
