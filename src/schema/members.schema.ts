import { z } from "zod";
import { basicValidator } from "@/validators/basicValidator";

export const MemberSchema = z.object({
  id: z.string(),
  image: z
    .string()
    .min(1, { message: "Image is required" })
    .refine((val) => val.startsWith("data:image/"), {
      message: "Invalid image format",
    }), // Validates binary image string

  name: basicValidator(),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),

  phoneNumber: z
    .string()
    .min(10, { message: "Phone number is required and must be 10 digits" })
    .max(10, { message: "Phone number must be exactly 10 digits" }),

  designation: z
    .string()
    .min(1, { message: "Designation is required" })
    .max(50, { message: "Designation must be 50 characters or fewer" }),

  role: z.enum(["Superadmin", "Admin", "Member"], {
    errorMap: () => ({
      message: "Invalid role. Must be one of: Superadmin, Admin, Member",
    }),
  }),
});

// Infer the types from the schema
export type TMember = z.infer<typeof MemberSchema>;

// Schemas for specific DTOs
export const memberCreateSchema = MemberSchema.omit({ id: true });
export type MemberCreate = z.infer<typeof memberCreateSchema>;

export const memberUpdateSchema = MemberSchema.partial();
export type MemberUpdate = z.infer<typeof memberUpdateSchema>;
