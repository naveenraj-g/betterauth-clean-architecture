import { TSendEmailPayload } from "@/modules/shared/entities/types/email";

export interface EmailService {
  send(message: TSendEmailPayload): Promise<void>;
}
