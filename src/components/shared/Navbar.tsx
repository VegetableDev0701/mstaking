"use client";
import React from "react";
import Image from "next/image";
import Button from "../UI/Button";
import WalletConnectButton from "./WalletConnectButton";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="h-[88px] px-8 py-6 border-b border-dark-600 bg-dark-800 flex-between w-full">
      <div className="flex-start gap-3">
        <Image src="/logo.svg" alt="INJ Staking" width={36} height={52} />
        <Link href="/">
          <h1 className="text-[32px] font-bold leading-[48px] tracking-normal text-left">
            INJSTAKING
          </h1>
        </Link>
      </div>
      <div className="flex-center gap-2">
        <Button onClick={() => {}}>Add collection</Button>
        <WalletConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
