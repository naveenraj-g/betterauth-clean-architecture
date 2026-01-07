import { TSignoutResponseDto } from "@/modules/shared/entities/schema/auth/auth.schema";
import { getAuthInjection } from "../../../di/container";

export async function signoutUseCase(): Promise<TSignoutResponseDto> {
  const authService = getAuthInjection("IAuthService");
  const data = authService.signOut();
  return data;
}
