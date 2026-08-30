"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getUser, updateUser } from "@/services/user.service";
import type { NormalisedApiError } from "@/interfaces/api";
import type {
  CreateUserPayload,
  CreateUserResponse,
  GetUserResponse,
  UpdateUserPayload,
  UpdateUserResponse,
} from "@/interfaces/user";
import { queryKeys } from "./queryKeys";

export const useCurrentUser = (enabled: boolean) =>
  useQuery<GetUserResponse, NormalisedApiError>({
    queryKey: queryKeys.currentUser,
    queryFn: getUser,
    enabled,
    staleTime: 5 * 60 * 1000,
    // The interceptor already refreshes once on 401; a retry here would only
    // repeat a genuinely dead session.
    retry: false,
  });

export const useCreateUser = () =>
  useMutation<
    CreateUserResponse,
    NormalisedApiError,
    { payload: CreateUserPayload; profileToken: string }
  >({
    mutationFn: ({ payload, profileToken }) => createUser(payload, profileToken),
  });

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateUserResponse, NormalisedApiError, UpdateUserPayload>({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
    },
  });
};
