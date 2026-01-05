"use server";

import {
  SigninActionSchema,
  SignupActionSchema,
} from "@/modules/shared/entities/schema/auth/auth.schema";
import { createServerAction } from "zsa";
import {
  signinController,
  signupController,
  TSigninControllerOutput,
  TSignupControllerOutput,
} from "../../interface-adapters/controllers/auth/index";
import { runWithTransport } from "@/modules/server/transport/runWithTransport";

/**
 * Server action acting as a transport layer between client and server.
 * Input validation and business logic are delegated to controllers and use cases.
 */

// Server actions act as a transport layer only.
// Input validation is handled in controllers to preserve clean architecture boundaries.
export const signupAction = createServerAction()
  .input(SignupActionSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    return await runWithTransport<TSignupControllerOutput>(async () => {
      const data = await signupController(input.payload);

      return {
        result: data,
        transport: input.transportOptions,
      };
    });
  });

export const signinAction = createServerAction()
  .input(SigninActionSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    return await runWithTransport<TSigninControllerOutput>(async () => {
      const data = await signinController(input.payload);

      return {
        result: data,
        transport: {
          ...input.transportOptions,
          url: data.url ?? input.transportOptions?.url,
          shouldRedirect:
            data.redirect ?? input.transportOptions?.shouldRedirect,
        },
      };
    });
  });
