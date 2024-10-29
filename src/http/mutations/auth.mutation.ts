import { useCustomToast } from "@/hooks/useCustomToast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "./api";
import * as ToastText from "@/lib/toast-texts";
import * as T from "@/types/index";
import { routes } from "@/constants/route";
import { AxiosError } from "axios";
import { STATUS_CODES } from "@/constants/app.constants";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { successToast, errorToast } = useCustomToast();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (email: string) => {
      const response = await api.post("/auth/login", { email });
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
