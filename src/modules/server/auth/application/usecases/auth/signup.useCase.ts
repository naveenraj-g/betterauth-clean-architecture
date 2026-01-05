import { TSignupValidationSchema } from "@/modules/shared/entities/schema/auth/signup.schema";
import { getAuthInjection } from "../../../di/container";

export async function signupUseCase(payload: TSignupValidationSchema) {
  const authService = getAuthInjection("IAuthService");
  const data = authService.emailSignup(payload);
  return data;
}
