import { IAuthService } from "../domain/interfaces";

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
