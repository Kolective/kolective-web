import { http, createPublicClient, custom } from 'viem';
import { createWalletClient } from 'viem'

import { arbitrumSepolia } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL_ARBITRUM_TESTNET),
});

export const walletClient = createWalletClient({
  chain: arbitrumSepolia,
  transport: custom(window.ethereum)
})