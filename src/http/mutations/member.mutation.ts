import { AxiosError } from "axios";

import { CreateMember } from "@/lib/toast-texts";

import { MEMBERS_QUERY_KEYS } from "../queries/member.queries";
import { STATUS_CODES } from "@/constants/app.constants";
import { authorizedApiRoutes } from "@/constants/route";
import { useAuthAxios } from "@/hooks/use-auth-axios";
import { useCustomToast } from "@/hooks/useCustomToast";
import { ToastIds } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
Payload Type Related to User
*/
interface MemberPayload {
  id?: string;
  data: {
    name: string;
    email: string;
    phoneNumber: string;
    designation: string;
    image: string;
    role: string;
  };
  onSuccess?: () => void;
}

/**
Mutation Related to Create User
*/
export const useCreateUser = () => {
  const authAxios = useAuthAxios();
  const queryClient = useQueryClient();
  const { successToast, errorToast } = useCustomToast();

  const createMember = useMutation({
    mutationKey: [MEMBERS_QUERY_KEYS.CREATE_MEMBER],
    mutationFn: async (payload: MemberPayload) => {
      const { data } = await authAxios.post(
        authorizedApiRoutes.MEMBERS,
        payload.data
      );
      return data?.data;
    },
    onSuccess: (_, variables) => {
      const { onSuccess } = variables;
      onSuccess && onSuccess();
      successToast({
        itemID: ToastIds.MEMBER_TOAST,
        title: CreateMember.success.title,
        description: CreateMember.success.description,
      });
      queryClient.invalidateQueries({
        queryKey: [MEMBERS_QUERY_KEYS.GET_MEMBERS],
      });
    },
    onError: (error: AxiosError) => {
      if (error.status === STATUS_CODES.CONFLICT) {
        errorToast({
          itemID: ToastIds.MEMBER_TOAST,
          title: CreateMember.alreadyExists.title,
          description: CreateMember.alreadyExists.description,
        });

        return;
      }
      errorToast({
        itemID: ToastIds.MEMBER_TOAST,
        title: CreateMember.error.title,
        description: CreateMember.error.description,
      });
    },
  });

  return createMember;
};

/**
Mutation Related to Update User
*/
export const useUpdateMember = () => {
  const authAxios = useAuthAxios();
  const queryClient = useQueryClient();
  const { successToast, errorToast } = useCustomToast();

  const updateMember = useMutation({
    mutationKey: [MEMBERS_QUERY_KEYS.UPDATE_MEMBER],
    mutationFn: async (payload: MemberPayload) => {
      const { data } = await authAxios.put(
        `${authorizedApiRoutes.MEMBERS}/${payload.id}`,
        payload.data
      );
      return data?.data;
    },
    onSuccess: (_, variables) => {
      const { onSuccess } = variables;
      onSuccess && onSuccess();
      successToast({
        itemID: ToastIds.MEMBER_TOAST,
        title: CreateMember.success.title,
        description: CreateMember.success.description,
      });
      queryClient.invalidateQueries({
        queryKey: [MEMBERS_QUERY_KEYS.GET_MEMBERS],
      });
    },
    onError: (error: AxiosError) => {
      if (error.status === STATUS_CODES.CONFLICT) {
        errorToast({
          itemID: ToastIds.MEMBER_TOAST,
          title: CreateMember.alreadyExists.title,
          description: CreateMember.alreadyExists.description,
        });

        return;
      }
      errorToast({
        itemID: ToastIds.MEMBER_TOAST,
        title: CreateMember.error.title,
        description: CreateMember.error.description,
      });
    },
  });

  return updateMember;
};

/**
Mutation Related to Delete User
*/
export const useDeleteMember = () => {
  const authAxios = useAuthAxios();
  const queryClient = useQueryClient();
  const { successToast, errorToast } = useCustomToast();

  const deleteMember = useMutation({
    mutationKey: [MEMBERS_QUERY_KEYS.DELETE_MEMBER],
    mutationFn: async (id: string) => {
      await authAxios.delete(`${authorizedApiRoutes.MEMBERS}/${id}`);
    },
    onSuccess: () => {
      successToast({
        itemID: ToastIds.MEMBER_TOAST,
        title: CreateMember.success.title,
        description: CreateMember.success.description,
      });
      queryClient.invalidateQueries({
        queryKey: [MEMBERS_QUERY_KEYS.GET_MEMBERS],
      });
    },
    onError: () => {
      errorToast({
        itemID: ToastIds.MEMBER_TOAST,
        title: CreateMember.error.title,
        description: CreateMember.error.description,
      });
    },
  });

  return deleteMember;
};
