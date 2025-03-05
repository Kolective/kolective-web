import { z } from "zod";

export const TokenResponseSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  address: z.string(),
  chain: z.string(),
  decimals: z.number().int().positive(),
  logoURI: z.string().url(),
  price: z.number().positive(),
});

export type TokenResponse = z.infer<typeof TokenResponseSchema>;
