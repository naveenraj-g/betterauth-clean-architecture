import {
  TSigninResponse,
  TSigninValidationSchema,
} from "@/modules/shared/entities/schema/auth/auth.schema";
import { getAuthInjection } from "../../../di/container";

export async function signinUseCase(
  payload: TSigninValidationSchema
): Promise<TSigninResponse> {
  const authService = getAuthInjection("IAuthService");
  const data = authService.emailSignin(payload);
  return data;
}
