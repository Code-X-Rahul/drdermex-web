import { ENDPOINTS } from "@/constants/api";
import type {
  CreateUserPayload,
  CreateUserResponse,
  GetUserResponse,
  UpdateUserPayload,
  UpdateUserResponse,
} from "@/interfaces/user";
import { apiClient } from "./axios";

export const getUser = async (): Promise<GetUserResponse> => {
  const { data } = await apiClient.get<GetUserResponse>(ENDPOINTS.USER_GET);
  return data;
};

/**
 * Authenticated with the short-lived profileToken returned by OTP verify for a
 * phone number that has no account yet — not with a normal access token.
 */
export const createUser = async (
  payload: CreateUserPayload,
  profileToken: string
): Promise<CreateUserResponse> => {
  const { data } = await apiClient.post<CreateUserResponse>(
    ENDPOINTS.USER_CREATE,
    payload,
    { headers: { Authorization: `Bearer ${profileToken}` } }
  );
  return data;
};

/** The only endpoint that accepts `gender` — users/create does not. */
export const updateUser = async (
  payload: UpdateUserPayload
): Promise<UpdateUserResponse> => {
  const { data } = await apiClient.put<UpdateUserResponse>(
    ENDPOINTS.USER_UPDATE,
    payload
  );
  return data;
};
