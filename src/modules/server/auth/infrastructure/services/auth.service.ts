import {
  SignupResponseSchema,
  TSignupResponse,
  TSignupEmailSchema,
  TSigninEmailSchema,
  TSigninResponse,
  SigninResponseSchema,
} from "@/modules/shared/entities/schema/auth/auth.schema";
import { auth } from "../../../auth-provider/auth";
import { IAuthService } from "../../domain/interfaces";
import { mapBetterAuthError } from "@/modules/server/shared/errors/mappers/mapBetterAuthError";

export class AuthService implements IAuthService {
  async emailSignup(payload: TSignupEmailSchema): Promise<TSignupResponse> {
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

      return await SignupResponseSchema.parseAsync(res);
    } catch (error) {
      mapBetterAuthError(error, "Failed to sign up user");
    }
  }

  async emailSignin(payload: TSigninEmailSchema): Promise<TSigninResponse> {
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

      return await SigninResponseSchema.parseAsync(res);
    } catch (error) {
      mapBetterAuthError(error, "Failed to sign in user");
    }
  }
}
