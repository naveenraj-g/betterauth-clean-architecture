import {
  TSignupResponseDto,
  TSignupValidationSchema,
} from "@/modules/entities/schemas/auth";
import { getInjection } from "@/modules/server/di/container";

export async function signupUseCase(
  payload: TSignupValidationSchema
): Promise<TSignupResponseDto> {
  const authService = getInjection("IAuthService");
  const data = authService.signUpWithEmail(payload);
  return data;
}
