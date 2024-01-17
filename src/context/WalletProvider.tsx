"use client";
import * as React from "react";
import { ChainProvider } from "@cosmos-kit/react";
import { chains, assets } from "chain-registry";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as leapWallets } from "@cosmos-kit/leap";

// Import this in your top-level route/layout
import "@interchain-ui/react/styles";

function CosmosApp({ children }: { children: React.ReactNode }) {
  return (
    <ChainProvider
      chains={chains}
      assetLists={assets}
      wallets={[...keplrWallets, ...leapWallets]}
      walletConnectOptions={{
        signClient: {
          projectId: "0279c013b4fd637ac7b62e8c393dd28b",
          relayUrl: "wss://relay.walletconnect.org",
          metadata: {
            name: "Injective NFT Staking",
            description: "Injective NFT Staking",
            url: "https://injective-cw721-staking.vercel.app/",
            icons: [],
          },
        },
      }}
    >
      {children}
    </ChainProvider>
  );
}

export default CosmosApp;
