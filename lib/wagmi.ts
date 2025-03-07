import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sonicBlazeTestnet } from 'viem/chains';

export const config = getDefaultConfig({
    appName: 'OriginX',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
    chains: [
      sonicBlazeTestnet
    ],
});