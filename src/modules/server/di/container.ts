import "reflect-metadata";
import { Container } from "inversify";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types";
import { AuthModule, EmailModule } from "./modules";

const AppContainer = new Container({ defaultScope: "Singleton" });

const initializeContainer = () => {
  AppContainer.load(AuthModule);
  AppContainer.load(EmailModule);
};

initializeContainer();

export const getInjection = <K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] => {
  return AppContainer.get(DI_SYMBOLS[symbol]);
};
