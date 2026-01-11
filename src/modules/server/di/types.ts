import { IAuthService } from "@/modules/server/core/auth/domain/interfaces/auth.service.interface";

export const DI_SYMBOLS = {
  // Repositories

  // Services
  IAuthService: Symbol.for("IAuthService"),
};

export interface DI_RETURN_TYPES {
  // Repositories

  // Services
  IAuthService: IAuthService;
}
