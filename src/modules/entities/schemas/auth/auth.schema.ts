import z from "zod";
import { ZodSocialProviders } from "../../enums/auth/auth.enum";
import { TransportOptions } from "../transport";
import { BaseSigninOrSignupSchema } from "./base.schema";
import { UserSchema } from "./reusable.schema";

// form schemas (used in client side forms)
export const SignupFormSchema = BaseSigninOrSignupSchema.pick({
  name: true,
  email: true,
  password: true,
  rememberMe: true,
});
export type TSignupFormSchema = z.infer<typeof SignupFormSchema>;

export const SigninFormSchema = BaseSigninOrSignupSchema.pick({
  email: true,
  password: true,
  rememberMe: true,
});
export type TSigninFormSchema = z.infer<typeof SigninFormSchema>;

export const ForgetPasswordOrMagicLinkFormSchema =
  BaseSigninOrSignupSchema.pick({
    email: true,
  });
export type TForgetPasswordOrMagicLinkFormSchema = z.infer<
  typeof ForgetPasswordOrMagicLinkFormSchema
>;

// ------------------------------------------------------- //

// validation schemas (used in server actions and controllers)
export const SignupValidationSchema = BaseSigninOrSignupSchema.pick({
  name: true,
  email: true,
  password: true,
  rememberMe: true,
});
export type TSignupValidationSchema = z.infer<typeof SignupValidationSchema>;

export const SigninValidationSchema = BaseSigninOrSignupSchema.pick({
  email: true,
  password: true,
  rememberMe: true,
});
export type TSigninValidationSchema = z.infer<typeof SigninValidationSchema>;

export const SigninWithSocialValidationSchema = z.object({
  provider: ZodSocialProviders,
});
export type TSigninWithSocialValidationSchema = z.infer<
  typeof SigninWithSocialValidationSchema
>;

// ------------------------------------------------------- //

// Server Action Schema
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

export const SignoutActionSchema = z.object({
  transportOptions: TransportOptions.optional(),
});
export type TSignoutActionSchema = z.infer<typeof SignoutActionSchema>;

// ------------------------------------------------------- //

// return DTO validator
export const SignupResponseDtoSchema = z.union([
  z.object({
    token: z.null(),
    user: UserSchema,
  }),
  z.object({
    token: z.string(),
    user: UserSchema,
  }),
]);
export type TSignupResponseDto = z.infer<typeof SignupResponseDtoSchema>;

export const SigninResponseDtoSchema = z.object({
  redirect: z.boolean(),
  token: z.string(),
  url: z.string().optional(),
  user: UserSchema,
});
export type TSigninResponseDto = z.infer<typeof SigninResponseDtoSchema>;

export const SigninWithSocialResponse = z.union([
  z.object({
    redirect: z.boolean(),
    token: z.string(),
    url: z.undefined(),
    user: UserSchema,
  }),
  z.object({
    redirect: z.boolean(),
    url: z.string(),
  }),
]);
export type TSigninWithSocialResponse = z.infer<
  typeof SigninWithSocialResponse
>;

export const SignoutResponseDtoSchema = z.object({
  success: z.boolean(),
  url: z.string().nullable(),
});
export type TSignoutResponseDto = z.infer<typeof SignoutResponseDtoSchema>;
