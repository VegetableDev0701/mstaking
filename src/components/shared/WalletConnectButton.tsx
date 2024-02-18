"use client";
import { useChain } from "@cosmos-kit/react";
import { CHAINNAME } from "@/constants";
import Button from "../UI/Button";
import { shortenAddress } from "@/utils";

export default function WalletConnectButton() {
  const chainContext = useChain(CHAINNAME);
  const { connect, address, isWalletConnected } = chainContext;

  async function handleConnectWallet() {
    try {
      await connect();
    } catch (e) {
      console.log("Connect Wallet failed.");
    }
  }

  return (
    <Button onClick={handleConnectWallet}>
      {isWalletConnected
        ? address && shortenAddress(address)
        : "Connect Wallet"}
    </Button>
  );
}
