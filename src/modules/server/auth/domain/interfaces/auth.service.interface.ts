import { TSignupEmailSchema } from "@/modules/shared/entities/schema/auth/signup.schema";

export interface IAuthService {
  emailSignup(payload: TSignupEmailSchema): Promise<any>;
}
