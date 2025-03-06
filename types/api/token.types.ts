import { z } from "zod";

export const TokenResponseSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  address: z.string(),
  chain: z.string(),
  decimals: z.number().int().positive(),
  logo: z.string().url(),
  priceChange24H: z.number().positive(),
  tags: z.array(z.string()),
});

export type TokenResponse = z.infer<typeof TokenResponseSchema>;
