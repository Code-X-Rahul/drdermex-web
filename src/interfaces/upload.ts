import type { ApiEnvelope } from "./api";

export interface UploadInjuredAreaPicsResponse extends ApiEnvelope {
  /** Absolute S3 URLs, in the same order the files were sent. */
  files: string[];
  pathPrefix: string;
}

/** Backend accepts at most 10 files per request under the field name `files`. */
export const MAX_UPLOAD_FILES = 10;

export const UPLOAD_FIELD_NAME = "files";
