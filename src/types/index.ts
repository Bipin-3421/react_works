/**
 * Related to the toast
 */
export enum ToastIds {
  "LOGIN_TOAST" = "login-toast",
}

export type ToastTexts = Record<
  string,
  {
    title: string;
    description: string;
  }
>;
