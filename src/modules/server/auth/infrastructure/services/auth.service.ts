import {
  SignupResponseDtoSchema,
  TSignupResponseDto,
  TSignupEmailSchema,
  TSigninEmailSchema,
  TSigninResponseDto,
  SigninResponseDtoSchema,
  SignoutResponseDtoSchema,
  TSignoutResponseDto,
} from "@/modules/shared/entities/schema/auth/auth.schema";
import { auth } from "../../../auth-provider/auth";
import { IAuthService } from "../../domain/interfaces";
import { mapBetterAuthError } from "@/modules/server/shared/errors/mappers/mapBetterAuthError";
import { headers } from "next/headers";

export class AuthService implements IAuthService {
  async signUpWithEmail(
    payload: TSignupEmailSchema
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
    payload: TSigninEmailSchema
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
