import { cookieStorage, createConfig, createStorage, http } from "wagmi";

import { mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, metaMask } from "wagmi/connectors";

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia],
    connectors: [coinbaseWallet(), metaMask()],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
