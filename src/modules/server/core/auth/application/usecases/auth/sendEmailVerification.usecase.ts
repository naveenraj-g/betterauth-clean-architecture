import {
  TSendEmailVerificationDtoSchema,
  TSendVerificationEmailValidationSchema
} from "@/modules/entities/schemas/auth"
import { getInjection } from "@/modules/server/di/container"

export async function sendEmailVerificationUseCase(
  payload: TSendVerificationEmailValidationSchema
): Promise<TSendEmailVerificationDtoSchema> {
  const authService = getInjection("IAuthService")
  const data = await authService.sendEmailVerification(payload)
  return data
}
