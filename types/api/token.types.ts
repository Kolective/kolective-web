import { z } from "zod";

export const TokenResponseSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  chain: z.string(),
  decimals: z.number().int().positive(),
  logoURI: z.string().url(),
  price: z.number().nonnegative()
});

export type TokenResponse = z.infer<typeof TokenResponseSchema>;
