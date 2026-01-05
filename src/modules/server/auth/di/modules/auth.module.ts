import { Bind, ContainerModule } from "inversify";
import { DI_SYMBOLS } from "../types";
import { IAuthService } from "../../domain/interfaces";
import { AuthService } from "../../infrastructure/services";

const initializeModules = ({ bind }: { bind: Bind }) => {
  bind<IAuthService>(DI_SYMBOLS.IAuthService)
    .to(AuthService)
    .inSingletonScope();
};

export const AuthModule = new ContainerModule(initializeModules);
