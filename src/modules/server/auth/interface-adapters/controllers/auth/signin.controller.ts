import { InputParseError } from "@/modules/shared/entities/errors/schemaParseError";
import {
  SigninValidationSchema,
  TSigninResponseDto,
} from "@/modules/shared/entities/schema/auth/auth.schema";
import { signinUseCase } from "../../../application/usecases/auth/signin.usecase";

// Use an inline presenter for simple output mapping.
// Extract a dedicated presenter when presentation logic grows in complexity.
function presenter(data: TSigninResponseDto) {
  return data;
}

export type TSigninControllerOutput = ReturnType<typeof presenter>;

/**
 * Controller responsible for:
 * - input validation
 * - orchestrating use cases
 * - delegating output transformation to presenters
 *
 * Business rules are handled in use cases.
 */
export async function signinController(
  input: any
): Promise<TSigninControllerOutput> {
  const parsed = await SigninValidationSchema.safeParseAsync(input);

  if (!parsed.success) {
    throw new InputParseError(parsed.error);
  }

  const data = await signinUseCase(parsed.data);
  return presenter(data);
}
