import * as z from "zod";

import { sizeConstants } from "@/constants/app.constants";

export const loginSchema = z.object({
  email: z
    .string()
    .email({
      message: "Required",
    })
    .min(sizeConstants.email.minLength, {
      message: sizeConstants.email.message,
    }),
});

export type TLogin = z.infer<typeof loginSchema>;
