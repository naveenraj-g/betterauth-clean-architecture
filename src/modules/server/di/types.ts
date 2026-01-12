import { IAuthService } from "../core/auth/domain/interfaces/auth.service.interface";
import { IEmailService } from "../core/common/email/domain/interfaces/email.service.interface";

export const DI_SYMBOLS = {
  // Repositories

  // Services
  IAuthService: Symbol.for("IAuthService"),
  IEmailService: Symbol.for("IEmailService"),
};

export interface DI_RETURN_TYPES {
  // Repositories

  // Services
  IAuthService: IAuthService;
  IEmailService: IEmailService;
}
