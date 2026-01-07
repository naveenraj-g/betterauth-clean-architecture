import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../prisma/db";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // session: {
  //   // NOTE: Caching the session for 1 min
  //   // IMPORTANT: Don't cache session for long time
  //   cookieCache: {
  //     enabled: true,
  //     maxAge: 60, // 1 min
  //   },
  // },

  emailAndPassword: {
    enabled: true,
  },

  plugins: [
    // NOTE: This plugin make sure the application knows how to set cookies in next.js, it is required for server side operations with better-auth
    nextCookies(),
  ],
});
