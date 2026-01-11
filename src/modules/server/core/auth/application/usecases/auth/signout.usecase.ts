import { TSignoutResponseDto } from "@/modules/entities/schemas/auth";
import { getInjection } from "@/modules/server/di/container";

export async function signoutUseCase(): Promise<TSignoutResponseDto> {
  const authService = getInjection("IAuthService");
  const data = authService.signOut();
  return data;
}
