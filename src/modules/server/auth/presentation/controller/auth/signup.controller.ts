import { InputParseError } from "@/modules/shared/entities/errors/schemaParseError";
import { signupValidationSchema } from "@/modules/shared/entities/schema/auth/signup.schema";
import { signupUseCase } from "../../../application/usecases/auth/signup.usecase";

// function presenter(data: any) {
//     return data;
// }

export async function signupController(input: any) {
  const parsed = await signupValidationSchema.safeParseAsync(input);

  if (!parsed.success) {
    throw new InputParseError(parsed.error);
  }

  const data = await signupUseCase(parsed.data);
  return data;
}
