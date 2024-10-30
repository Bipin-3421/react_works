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
  ADD_MEMBER = "add-member",
  UPDATE_MEMBER = "update-member",
  // Add other modal IDs as needed
}

export type ToastTexts = Record<
  string,
  {
    title: string;
    description: string;
  }
>;
