import {
  TSignupResponseDto,
  TSigninResponseDto,
  TSignoutResponseDto,
  TSigninWithSocialResponse,
} from "@/modules/entities/schemas/auth";
import {
  TSigninEmailPayload,
  TSigninWithSocialPayload,
  TSignupEmailPayload,
} from "@/modules/entities/types/auth";

export interface IAuthService {
  signUpWithEmail(payload: TSignupEmailPayload): Promise<TSignupResponseDto>;
  signInWithEmail(payload: TSigninEmailPayload): Promise<TSigninResponseDto>;
  signInWithSocial(
    payload: TSigninWithSocialPayload
  ): Promise<TSigninWithSocialResponse>;
  signOut(): Promise<TSignoutResponseDto>;
}
