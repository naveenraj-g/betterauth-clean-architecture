"use server";

import {
  InputParseError,
  OutputParseError,
} from "@/modules/shared/entities/errors/schemaParseError";
import { signupValidationSchema } from "@/modules/shared/entities/schema/auth/signup.schema";
import { createServerAction, ZSAError } from "zsa";
import { signupController } from "../controller/auth";
import { ApplicationError } from "@/modules/server/shared/errors/applicationError";

export const signupAction = createServerAction()
  .input(signupValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    try {
      return await signupController(input);
    } catch (error) {
      /**
       * IMPORTANT:
       * The Server Action is the serialization boundary.
       *
       * Any value returned or thrown from here (even to Server Components)
       * goes through the React Server Components (RSC) transport pipeline.
       *
       * ZSA aligns with React's rules:
       * - Server Components are NOT "local Node code"
       * - They are transport consumers via React Flight
       * - Therefore, all data must be serializable
       *
       * Inside controllers/usecases (before this boundary),
       * custom error classes retain full structure and prototypes.
       */

      // User-fixable validation error
      if (error instanceof InputParseError) {
        /**
         * ❌ INVALID (ZSAError only accepts (code, data)):
         *
         * throw new ZSAError("INPUT_PARSE_ERROR", error.message, {
         *   inputParseErrors: {...}
         * });
         *
         * ✅ CORRECT:
         * Pass ONE object as the second argument.
         * ZSA will serialize it and expose it as `err.data` on the consumer.
         */
        throw new ZSAError("INPUT_PARSE_ERROR", {
          inputParseErrors: {
            fieldErrors: error.fieldErrors,
            formErrors: error.formErrors,
            formattedErrors: error.formattedErrors,
          },
        });
      }

      // Internal-only error (log on server, hide details from user)
      if (error instanceof OutputParseError) {
        // Log here if needed
        throw new ZSAError(
          "OUTPUT_PARSE_ERROR",
          "Something went wrong. Please try again later."
        );
      }

      if (error instanceof ApplicationError) {
        if (!error.isOperational) {
          console.error(error);
        }
        throw new ZSAError("ERROR", error.message);
      }

      if (error instanceof Error) {
        throw new ZSAError("ERROR", error.message);
      }

      throw new ZSAError("INTERNAL_SERVER_ERROR", "Something went wrong");
    }
  });
