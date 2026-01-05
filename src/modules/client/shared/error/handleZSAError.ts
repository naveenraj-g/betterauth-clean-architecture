"client-only";

import { toast } from "sonner";
import { FieldValues, Path } from "react-hook-form";
import { IHandleInputParseError, IZSAErrorPayload } from "./types";

export function parseZSAErrorData<T>(data: unknown): T | null {
  if (typeof data !== "string") return null;
  try {
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}

export function handleZSAError<T extends FieldValues>(
  params: IHandleInputParseError<T>
) {
  const { err, form, fallbackMessage } = params;

  // Collect non-form errors here
  const nonFormFieldMessages: string[] = [];

  // INPUT PARSE ERROR (user-fixable)
  if (err.code === "INPUT_PARSE_ERROR") {
    const parsed = parseZSAErrorData<IZSAErrorPayload>(err.data);

    const inputErrors = parsed?.inputParseErrors;

    if (!inputErrors) {
      toast.error(err.message || fallbackMessage || "Invalid input");
      return;
    }

    // Field-level errors → RHF
    if (form && inputErrors.fieldErrors) {
      const formValues = form.getValues();

      Object.entries(inputErrors.fieldErrors).forEach(([field, messages]) => {
        if (!messages?.[0]) return;

        if (field in formValues) {
          // ✅ Field exists in UI → attach to input
          form.setError(field as Path<T>, {
            type: "server",
            message: messages[0],
          });
        } else {
          // ❗ Not a UI field → collect, don’t toast yet
          nonFormFieldMessages.push(messages[0]);
        }
      });
    }

    let didShowToast = false;

    // Show ONE toast for all non-form field errors
    if (nonFormFieldMessages.length) {
      toast.error(
        fallbackMessage ??
          "Something went wrong. Please refresh the page and try again."
      );
      didShowToast = true;
    }

    // Form-level errors → toast
    if (!didShowToast && inputErrors.formErrors?.length) {
      toast.error(inputErrors.formErrors[0]);
    }

    return;
  }

  // OUTPUT PARSE ERROR (internal only)
  if (err.code === "OUTPUT_PARSE_ERROR") {
    // Never show internals to user
    toast.error(
      fallbackMessage ?? "Something went wrong. Please try again later."
    );
    return;
  }

  // AUTH / PERMISSION ERRORS
  if (err.code === "NOT_AUTHORIZED") {
    toast.error("You are not authorized to perform this action");
    return;
  }

  // FALLBACK
  toast.error(err.message || fallbackMessage || "Something went wrong");
}
