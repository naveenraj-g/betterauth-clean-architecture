import {
  TSignupResponse,
  TSignupEmailSchema,
  TSigninEmailSchema,
  TSigninResponse,
} from "@/modules/shared/entities/schema/auth/auth.schema";

export interface IAuthService {
  emailSignup(payload: TSignupEmailSchema): Promise<TSignupResponse>;
  emailSignin(payload: TSigninEmailSchema): Promise<TSigninResponse>;
}
