import {
  SignupResponseSchema,
  TSignupResponse,
  TSignupEmailSchema,
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
      console.log(error);
      mapBetterAuthError(error, "Failed to sign up user");
    }
  }
}

/*
{
    "token": "OiKcUjA2lSlrl3Xd0pKYvLcRjCO7UOOP",
    "user": {
        "name": "test",
        "email": "testuser.gnr@gmail.com",
        "emailVerified": false,
        "image": null,
        "createdAt": "2026-01-05T00:53:27.415Z",
        "updatedAt": "2026-01-05T00:53:27.415Z",
        "id": "CxwoWFq6PPJ57IXeqp2uTl2gRLtt2ATn"
    }
}
*/
