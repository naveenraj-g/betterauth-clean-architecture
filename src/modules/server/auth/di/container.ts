import "reflect-metadata";
import { Container } from "inversify";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types";
import { AuthModule } from "./modules";

const AuthContainer = new Container({ defaultScope: "Singleton" });

const initializeContainer = () => {
  AuthContainer.load(AuthModule);
};

initializeContainer();

export const getAuthInjection = <K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] => {
  return AuthContainer.get(DI_SYMBOLS[symbol]);
};

export { AuthContainer };
