import z from "zod";

export const sendEmailValidationSchema = z.object({
  to: z.string().email(),
  subject: z.string(),
  html: z.string(),
  from: z.string().email().optional(),
});
export type TSendEmailValidationSchema = z.infer<
  typeof sendEmailValidationSchema
>;
