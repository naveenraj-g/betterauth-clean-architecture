import {
  InvalidCredentialsError,
  UserAlreadyExistsError,
  EmailNotVerifiedError,
  SessionExpiredError,
  AccountNotFoundError,
  PasswordPolicyError,
} from "../auth/commonAuthErrors";
import { InfrastructureError } from "../infrastructureError";

/**
 * Translates BetterAuth SDK errors into application-level errors.
 *
 * @param error - raw error thrown by BetterAuth
 * @param infraMessage - contextual infrastructure message (dynamic)
 * @throws ApplicationError
 */
export function mapBetterAuthError(
  error: unknown,
  infraMessage: string
): never {
  const code = (error as any)?.code ?? (error as any)?.body?.code;

  switch (code) {
    case "INVALID_EMAIL":
    case "INVALID_PASSWORD":
    case "INVALID_EMAIL_OR_PASSWORD":
    case "INVALID_USER":
    case "CREDENTIAL_ACCOUNT_NOT_FOUND":
    case "VALIDATION_ERROR":
    case "MISSING_FIELD":
    case "FIELD_NOT_ALLOWED":
      throw new InvalidCredentialsError();

    case "USER_ALREADY_EXISTS":
    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
    case "LINKED_ACCOUNT_ALREADY_EXISTS":
    case "SOCIAL_ACCOUNT_ALREADY_LINKED":
      throw new UserAlreadyExistsError();

    case "USER_NOT_FOUND":
    case "ACCOUNT_NOT_FOUND":
    case "USER_EMAIL_NOT_FOUND":
    case "EMAIL_MISMATCH":
      throw new AccountNotFoundError();

    case "EMAIL_NOT_VERIFIED":
    case "EMAIL_ALREADY_VERIFIED":
    case "VERIFICATION_EMAIL_NOT_ENABLED":
      throw new EmailNotVerifiedError();

    // Password policy
    case "PASSWORD_TOO_SHORT":
    case "PASSWORD_TOO_LONG":
    case "USER_ALREADY_HAS_PASSWORD":
      throw new PasswordPolicyError();

    case "SESSION_EXPIRED":
    case "SESSION_NOT_FRESH":
    case "INVALID_TOKEN":
    case "TOKEN_EXPIRED":
      throw new SessionExpiredError();

    default:
      throw new InfrastructureError(infraMessage, error);
  }
}
