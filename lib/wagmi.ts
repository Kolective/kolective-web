'use client';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  okxWallet,
  rabbyWallet,
  rainbowWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { useMemo } from 'react';
import { http, createConfig } from 'wagmi';
import { sonicBlazeTestnet } from 'wagmi/chains';

export function useWagmiConfig() {
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? '';
  if (!projectId) {
    const providerErrMessage =
      'To connect to all Wallets you need to provide a NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable';
    throw new Error(providerErrMessage);
  }

  return useMemo(() => {
    const connectors = connectorsForWallets(
      [
        {
          groupName: 'Recommended Wallet',
          wallets: [okxWallet, rabbyWallet, metaMaskWallet, trustWallet],
        },
        {
          groupName: 'Other Wallets',
          wallets: [rainbowWallet],
        },
      ],
      {
        appName: 'Connectors',
        projectId,
      },
    );

    const wagmiConfig = createConfig({
      chains: [sonicBlazeTestnet],
      multiInjectedProviderDiscovery: false,
      connectors,
      ssr: true,
      transports: {
        [sonicBlazeTestnet.id]: http(process.env.NEXT_PUBLIC_RPC_URL_SONIC_BLAZE_TESTNET),
      },
    });

    return wagmiConfig;
  }, [projectId]);
}