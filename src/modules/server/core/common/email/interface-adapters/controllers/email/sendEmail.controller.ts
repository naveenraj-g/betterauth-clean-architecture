import {
  sendEmailValidationSchema,
  TSendEmailValidationSchema,
} from "@/modules/entities/schemas/email";
import { InputParseError } from "@/modules/server/shared/errors/schemaParseError";
import { sendEmailUseCase } from "../../../application/usecases/sendEmail.usecase";

export async function sendEmailController(
  input: TSendEmailValidationSchema
): Promise<void> {
  const parsed = await sendEmailValidationSchema.safeParseAsync(input);

  if (!parsed.success) {
    throw new InputParseError(parsed.error);
  }

  return await sendEmailUseCase(parsed.data);
}
