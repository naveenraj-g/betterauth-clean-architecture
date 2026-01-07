import {
  TSignupResponseDto,
  TSignupValidationSchema,
} from "@/modules/shared/entities/schema/auth/auth.schema";
import { getAuthInjection } from "../../../di/container";

export async function signupUseCase(
  payload: TSignupValidationSchema
): Promise<TSignupResponseDto> {
  const authService = getAuthInjection("IAuthService");
  const data = authService.signUpWithEmail(payload);
  return data;
}
