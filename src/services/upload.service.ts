import { ENDPOINTS } from "@/constants/api";
import {
  MAX_UPLOAD_FILES,
  UPLOAD_FIELD_NAME,
  type UploadInjuredAreaPicsResponse,
} from "@/interfaces/upload";
import { apiClient } from "./axios";

/**
 * Multipart upload. All files go under the repeated field name `files`, capped
 * at 10 per request by multer. Returns absolute S3 URLs in send order.
 *
 * Content-Type is deliberately left unset so the browser adds the multipart
 * boundary itself.
 */
export const uploadInjuredAreaPics = async (
  files: File[]
): Promise<UploadInjuredAreaPicsResponse> => {
  const form = new FormData();
  files.slice(0, MAX_UPLOAD_FILES).forEach((file) => {
    form.append(UPLOAD_FIELD_NAME, file);
  });

  const { data } = await apiClient.post<UploadInjuredAreaPicsResponse>(
    ENDPOINTS.UPLOAD_INJURED_AREA_PICS,
    form,
    { headers: { "Content-Type": undefined } }
  );
  return data;
};
