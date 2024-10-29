/**
 * Related to the toast
 */
export enum ToastIds {
  "LOGIN_TOAST" = "login-toast",
  "RESEND_TOAST" = "resend-verification",
  "VERIFY_TOAST" = "validate-otp",
  "MEMBER_TOAST" = "member-toast",
}

export enum ModalIds {
  "ADD_USER" = "add-user",
  "UPDATE_USER" = "update-user",
}

export type ToastTexts = Record<
  string,
  {
    title: string;
    description: string;
  }
>;
