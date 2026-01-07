import {
  TSignupResponseDto,
  TSignupEmailSchema,
  TSigninEmailSchema,
  TSigninResponseDto,
  TSignoutResponseDto,
} from "@/modules/shared/entities/schema/auth/auth.schema";

export interface IAuthService {
  signUpWithEmail(payload: TSignupEmailSchema): Promise<TSignupResponseDto>;
  signInWithEmail(payload: TSigninEmailSchema): Promise<TSigninResponseDto>;
  signOut(): Promise<TSignoutResponseDto>;
}
