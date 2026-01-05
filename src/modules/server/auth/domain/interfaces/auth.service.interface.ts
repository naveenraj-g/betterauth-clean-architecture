import {
  TSignupResponse,
  TSignupEmailSchema,
} from "@/modules/shared/entities/schema/auth/auth.schema";

export interface IAuthService {
  emailSignup(payload: TSignupEmailSchema): Promise<TSignupResponse>;
}
