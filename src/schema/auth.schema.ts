import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type TLogin = z.infer<typeof loginSchema>;
