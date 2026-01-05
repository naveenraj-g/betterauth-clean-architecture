"server-only";

// Use this in server-safe helper to parse ZSA Errors
import { ZSAError } from "zsa";

export interface ZSAParseErrors {
  fieldErrors: Record<string, string[] | undefined>;
  formErrors: string[];
  formattedErrors: {
    _errors: string[];
    [key: string]: any;
  };
}

export function parseZSAParseErrors(err: ZSAError): ZSAParseErrors | null {
  if (err.code !== "INPUT_PARSE_ERROR") return null;
  if (typeof err.data !== "string") return null;

  try {
    const parsed = JSON.parse(err.data);
    return parsed?.inputParseErrors ?? null;
  } catch {
    return null;
  }
}
