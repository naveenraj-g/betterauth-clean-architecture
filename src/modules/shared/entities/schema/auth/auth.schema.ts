import z from "zod";

// Reusable/base schemas
export const BaseSigninOrSgnupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export const UserSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  name: z.string(),
  image: z.string().nullable().optional(),
});

// ------------------------------------------------------- //

// form schemas (used in client side forms)
export const SignupSchema = BaseSigninOrSgnupSchema.pick({
  name: true,
  email: true,
  password: true,
});
export type TSignupSchema = z.infer<typeof SignupSchema>;

// ------------------------------------------------------- //

// validation schemas (used in server actions and controllers)
export const SignupValidationSchema = BaseSigninOrSgnupSchema.pick({
  name: true,
  email: true,
  password: true,
});
export type TSignupValidationSchema = z.infer<typeof SignupValidationSchema>;

// ------------------------------------------------------- //

// backend schemas (used in class methods)
// payloads

// Signup with email
export const signupEmailSchema = BaseSigninOrSgnupSchema.pick({
  name: true,
  email: true,
  password: true,
});
export type TSignupEmailSchema = z.infer<typeof signupEmailSchema>;

// ------------------------------------------------------- //

// return DTO validator

/** Signup with email Response schema */
export const SignupResponseSchema = z.union([
  z.object({
    token: z.null(),
    user: UserSchema,
  }),
  z.object({
    token: z.string(),
    user: UserSchema,
  }),
]);
export type TSignupResponse = z.infer<typeof SignupResponseSchema>;
