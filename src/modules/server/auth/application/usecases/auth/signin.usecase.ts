import {
  TSigninResponseDto,
  TSigninValidationSchema,
} from "@/modules/shared/entities/schema/auth/auth.schema";
import { getAuthInjection } from "../../../di/container";

export async function signinUseCase(
  payload: TSigninValidationSchema
): Promise<TSigninResponseDto> {
  const authService = getAuthInjection("IAuthService");
  const data = authService.signInWithEmail(payload);
  return data;
}
