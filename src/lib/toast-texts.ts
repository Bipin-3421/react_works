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

export const Verify: T.ToastTexts = {
  success: {
    title: "OTP verified successfully.",
    description: "Please wait while we redirect you to the dashboard.",
  },
  invalidError: {
    title: "Verification failed.",
    description: "Invalid OTP. Please try again.",
  },
  otpExpired: {
    title: "OTP expired.",
    description: "Please resend the OTP.",
  },
};

/**
 * Related to the user...
 */

export const CreateMember: T.ToastTexts = {
  success: {
    title: "Success",
    description: "User has been created successfully",
  },
  error: {
    title: "Error",
    description: "Something went wrong. Please try again.",
  },
  alreadyExists: {
    title: "Error",
    description: "User with given email or phone number already exists.",
  },
};

export const UpdateMember: T.ToastTexts = {
  success: {
    title: "Success",
    description: "User has been updated successfully",
  },
  error: {
    title: "Error",
    description: "Something went wrong. Please try again.",
  },
  alreadyExists: {
    title: "Error",
    description: "User with given email or phone number already exists.",
  },
};

export const DeleteMember: T.ToastTexts = {
  success: {
    title: "Success",
    description: "User has been deleted successfully",
  },
  error: {
    title: "Error",
    description: "Something went wrong. Please try again.",
  },
};
