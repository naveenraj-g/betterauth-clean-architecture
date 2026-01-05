import z from "zod";
import { TransportOptions } from "../transportOptions.schema";

// Reusable/base schemas
export const BaseSigninOrSignupSchema = z.object({
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
export const SignupFormSchema = BaseSigninOrSignupSchema.pick({
  name: true,
  email: true,
  password: true,
});
export type TSignupFormSchema = z.infer<typeof SignupFormSchema>;

export const SigninFormSchema = BaseSigninOrSignupSchema.pick({
  email: true,
  password: true,
}).extend({
  rememberMe: z.boolean().optional(),
});
export type TSigninFormSchema = z.infer<typeof SigninFormSchema>;

// ------------------------------------------------------- //

// validation schemas (used in server actions and controllers)
export const SignupValidationSchema = BaseSigninOrSignupSchema.pick({
  name: true,
  email: true,
  password: true,
});
export type TSignupValidationSchema = z.infer<typeof SignupValidationSchema>;

export const SigninValidationSchema = BaseSigninOrSignupSchema.pick({
  email: true,
  password: true,
}).extend({
  rememberMe: z.boolean().optional(),
});
export type TSigninValidationSchema = z.infer<typeof SigninValidationSchema>;

// ------------------------------------------------------- //

export const SignupActionSchema = z.object({
  payload: SignupValidationSchema,
  transportOptions: TransportOptions.optional(),
});
export type TSignupActionSchema = z.infer<typeof SignupActionSchema>;

export const SigninActionSchema = z.object({
  payload: SigninValidationSchema,
  transportOptions: TransportOptions.optional(),
});
export type TSigninActionSchema = z.infer<typeof SigninActionSchema>;

// ------------------------------------------------------- //

// backend schemas (used in class methods)
// payloads

// Signup with email
export const SignupEmailSchema = BaseSigninOrSignupSchema.pick({
  name: true,
  email: true,
  password: true,
});
export type TSignupEmailSchema = z.infer<typeof SignupEmailSchema>;

export const SigninEmailSchema = BaseSigninOrSignupSchema.pick({
  email: true,
  password: true,
}).extend({
  rememberMe: z.boolean().optional(),
});
export type TSigninEmailSchema = z.infer<typeof SigninEmailSchema>;

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

export const SigninResponseSchema = z.object({
  redirect: z.boolean(),
  token: z.string(),
  url: z.string().optional(),
  user: UserSchema,
});

export type TSigninResponse = z.infer<typeof SigninResponseSchema>;
