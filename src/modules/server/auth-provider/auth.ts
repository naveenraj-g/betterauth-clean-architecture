import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "../prisma/db"
import { nextCookies } from "better-auth/next-js"
import { sendEmailController } from "../core/common/email/interface-adapters/controllers/email"
import { getEmailVerificationTemplate } from "@/modules/client/email-templates/auth-email.templates"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  session: {
    // NOTE: Caching the session for 1 min
    // IMPORTANT: Don't cache session for long time
    cookieCache: {
      enabled: true,
      maxAge: 60 // 1 min
    }
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      void sendEmailController({
        to: user.email,
        subject: "Reset password",
        html: `<a href="${url}">Reset password</a>`
      })
    }
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      void sendEmailController({
        to: user.email,
        subject: "Verify email",
        html: getEmailVerificationTemplate(
          url,
          user.name,
          "Betterauth Clean Architecture"
        )
      })
    }
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }
  },
  plugins: [
    // NOTE: This plugin make sure the application knows how to set cookies in next.js, it is required for server side operations with better-auth
    nextCookies()
  ]
})
