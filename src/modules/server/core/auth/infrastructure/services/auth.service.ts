import {
  SignupResponseDtoSchema,
  TSignupResponseDto,
  TSigninResponseDto,
  SigninResponseDtoSchema,
  SignoutResponseDtoSchema,
  TSignoutResponseDto,
  SigninWithSocialResponse,
  TSigninWithSocialResponse,
} from "@/modules/entities/schemas/auth";
import { auth } from "@/modules/server/auth-provider/auth";
import { IAuthService } from "../../domain/interfaces/auth.service.interface";
import { mapBetterAuthError } from "@/modules/server/shared/errors/mappers/mapBetterAuthError";
import { headers } from "next/headers";
import {
  TSigninEmailPayload,
  TSigninWithSocialPayload,
  TSignupEmailPayload,
} from "@/modules/entities/types/auth";

export class AuthService implements IAuthService {
  async signUpWithEmail(
    payload: TSignupEmailPayload
  ): Promise<TSignupResponseDto> {
    const { email, name, password } = payload;

    try {
      const res = await auth.api.signUpEmail({
        body: {
          name,
          email,
          password,
          callbackURL: "/",
        },
      });

      return await SignupResponseDtoSchema.parseAsync(res);
    } catch (error) {
      mapBetterAuthError(error, "Failed to sign up user");
    }
  }

  async signInWithEmail(
    payload: TSigninEmailPayload
  ): Promise<TSigninResponseDto> {
    const { email, password, rememberMe } = payload;

    try {
      const res = await auth.api.signInEmail({
        body: {
          email,
          password,
          rememberMe,
          callbackURL: "/",
        },
      });

      return await SigninResponseDtoSchema.parseAsync(res);
    } catch (error) {
      mapBetterAuthError(error, "Failed to sign in user");
    }
  }

  async signInWithSocial(
    payload: TSigninWithSocialPayload
  ): Promise<TSigninWithSocialResponse> {
    const { provider } = payload;

    try {
      const res = await auth.api.signInSocial({
        body: {
          provider,
          callbackURL: "/",
        },
      });

      return await SigninWithSocialResponse.parseAsync(res);
    } catch (error) {
      mapBetterAuthError(error, "Failed to sign in user");
    }
  }

  async signOut(): Promise<TSignoutResponseDto> {
    try {
      const res = await auth.api.signOut({
        headers: await headers(),
      });

      const data = {
        ...res,
        url: res.success ? "/" : null,
      };

      return await SignoutResponseDtoSchema.parseAsync(data);
    } catch (error) {
      mapBetterAuthError(error, "Failed to sign out user");
    }
  }
}
