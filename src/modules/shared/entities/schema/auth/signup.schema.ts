import z from "zod";

// form schemas (used in client side forms)
export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});
export type TSignupSchema = z.infer<typeof signupSchema>;

// ------------------------------------------------------- //

// validation schemas (used in server actions and controllers)
export const signupValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});
export type TSignupValidationSchema = z.infer<typeof signupValidationSchema>;

// ------------------------------------------------------- //

// backend schemas (used in class methods)

// payloads
export const signupEmailSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});
export type TSignupEmailSchema = z.infer<typeof signupEmailSchema>;

// return DTO validator
