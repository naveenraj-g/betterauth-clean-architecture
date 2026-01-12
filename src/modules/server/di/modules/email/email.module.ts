import { Bind, ContainerModule } from "inversify";
import { DI_SYMBOLS } from "../../types";
import { IEmailService } from "@/modules/server/core/common/email/domain/interfaces/email.service.interface";
import { NodemailerEmailService } from "@/modules/server/core/common/email/infrastructure/services/nodemailerEmail.service";

const initializeModules = ({ bind }: { bind: Bind }) => {
  bind<IEmailService>(DI_SYMBOLS.IEmailService)
    .to(NodemailerEmailService)
    .inSingletonScope();
};

export const EmailModule = new ContainerModule(initializeModules);
