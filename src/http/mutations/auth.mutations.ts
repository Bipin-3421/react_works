import { useCustomToast } from "@/hooks/useCustomToast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import * as ToastText from "@/lib/toast-texts";
import * as T from "@/types/index";
import { routes } from "@/constants/route";
import { AxiosError, AxiosResponse } from "axios";
import { STATUS_CODES } from "@/constants/app.constants";
import useTokenStore from "@/store";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { successToast, errorToast } = useCustomToast();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (email: string) => {
      const response = await api.post("/member/login", { email });
      return response.data;
    },
    onSuccess: (_, variables) => {
      successToast({
        itemID: T.ToastIds.LOGIN_TOAST,
        title: ToastText.Login.success.title,
        description: ToastText.Login.success.description,
      });

      navigate(routes.VERIFY, {
        state: { email: variables },
      });
    },
    onError: (error: AxiosError) => {
      if (error?.status === STATUS_CODES.NOT_FOUND) {
        errorToast({
          itemID: T.ToastIds.LOGIN_TOAST,
          title: ToastText.Login.unauthorizedUser.title,
          description: ToastText.Login.unauthorizedUser.description,
        });

        return;
      }
      errorToast({
        itemID: T.ToastIds.LOGIN_TOAST,
        title: ToastText.Login.invalidError.title,
        description: ToastText.Login.invalidError.description,
      });
    },
  });
};

/**
  For Verify Mutation
*/
interface VerifyData {
  email: string;
  otp: string;
  onVerifyCompleted: () => void;
}
export const useVerifyMutation = () => {
  const { successToast, errorToast } = useCustomToast();
  const { setToken } = useTokenStore();
  const verifyMutation = useMutation({
    mutationKey: ["verify"],
    mutationFn: async (data: VerifyData) => {
      const response = await api.post(routes.VERIFY, data);

      return response;
    },
    onSuccess: (response: AxiosResponse, variable) => {
      const { onVerifyCompleted } = variable;
      const { accessToken } = response?.data?.data || {};
      setToken(accessToken);
      onVerifyCompleted();
      successToast({
        itemID: T.ToastIds.VERIFY_TOAST,
        title: ToastText.Verify.success.title,
        description: ToastText.Verify.success.description,
      });
    },
    onError: (error: AxiosError) => {
      if (error?.status === STATUS_CODES.UNAUTHORIZED) {
        errorToast({
          itemID: T.ToastIds.VERIFY_TOAST,
          title: ToastText.Verify.otpExpired.title,
          description: ToastText.Verify.otpExpired.description,
        });

        return;
      }
      errorToast({
        itemID: T.ToastIds.VERIFY_TOAST,
        title: ToastText.Verify.invalidError.title,
        description: ToastText.Verify.invalidError.description,
      });
    },
  });

  return verifyMutation;
};
