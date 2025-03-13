export {}; 

declare global {
  interface Window {
    keplr?: {
      enable: (chainId: string) => Promise<void>;
      getOfflineSigner: (chainId: string) => any;
      getKey: (chainId: string) => Promise<{ bech32Address: string }>;
    };
  }
}

// import { Window as KeplrWindow } from "@keplr-wallet/types";

// declare global {
//     interface Window extends KeplrWindow {}
// }
