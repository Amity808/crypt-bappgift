import { createConfig, http } from "wagmi";
import { defineChain } from "viem";
import { walletConnect } from "wagmi/connectors";



export const citreChain = /*#__PURE__*/ defineChain({
    id: 5115,
    name: 'Citrea Chain Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'CBTC',
      symbol: 'CBTC',
    },
    rpcUrls: {
      default: {
        http: ['https://rpc.testnet.citrea.xyz/'],
        webSocket: ['wss://ws.testnet.citrea.xyz'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Citrea Chain Testnet Explorer',
        url: 'https://explorer.testnet.citrea.xyz',
        apiUrl: 'https://explorer.testnet.citrea.xyz/api',
      },
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 15514133,
      },
    },
    testnet: true,
  })
  

export const supportedNetworks = [citreChain];

export const config = createConfig({
    chains: supportedNetworks,
    multiInjectedProviderDiscovery: true, // default to true though
    connectors: [
        walletConnect({ projectId: process.env.REOWN_PROJECT_ID }),
    ],
    transports: {
        [citreChain.id]: http(),
    },
});


