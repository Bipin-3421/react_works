import * as z from "zod";

/**
Basic Validator
 @params required: boolean (default: true)
@params message: string (default: "Required")
@params minLength: number (default: 1)
@params maxLength: number (default: 50)
@returns Provides a basic validator for simple validation checks.
*/
export const basicValidator = (
  required: boolean = true,
  message?: string,
  minLength: number = 1,
  maxLength: number = 50
): z.ZodEffects<z.ZodString, string, string> =>
  z.string().refine(
    (data) => {
      if (!required && !data) {
        return true; // If the data is not required and no data is provided, return true (valid).
      }
      if (required && !data) {
        return false; // If the data is required and no data is provided, return false (invalid).
      }
      if (data.length < minLength) {
        return false; // If the data length is less than the minimum length, return false (invalid).
      }
      if (data.length > maxLength) {
        return false; // If the data length is greater than the maximum length, return false (invalid).
      }

      return true; // If all checks pass, return true (valid).
    },
    {
      message: message || "Required",
    }
  );
