import z from "zod";
import { ZodERevalidateType } from "../../enums/transportOptions.enum";

export const TransportOptions = z.object({
  url: z.string().optional(),
  shouldRevalidate: z.boolean().optional(),
  shouldRedirect: z.boolean().optional(),
  revalidateType: ZodERevalidateType.default("page").optional(),
});
export type TTransportOptions = z.infer<typeof TransportOptions>;

export const TransportOptionsSchema = z.object({
  transportOptions: TransportOptions.optional(),
});
