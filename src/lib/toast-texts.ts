import * as T from "@/types";

/**
 * Related to the auth...
 */
export const Login: T.ToastTexts = {
  success: {
    title: "Successfully OTP sent.",
    description: "Please check your email for the OTP.",
  },
  unauthorizedUser: {
    title: "User not found.",
    description: "Please check your email address and try again.",
  },
  invalidError: {
    title: "Login failed.",
    description: "Something went wrong. Please try again.",
  },
};
