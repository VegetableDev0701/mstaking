"use client";
import React from "react";
import Image from "next/image";
import Button from "../UI/Button";
import { NFT } from "@/types";

interface NFTCardProps {
  // nft: NFT;
  tId: string,
  nft: string,
  onClick: () => void;
  status: "passive" | "staked" | "active";
}

const NFTCard = ({
  // nft: { id, name, price, imageUrl },
  nft,
  tId,
  onClick,
  status,
}: NFTCardProps) => {
  let bgColor;
  switch (status) {
    case "staked":
      bgColor = "!bg-secondary";
      break;
    case "passive":
      bgColor = "!bg-dark-200";
      break;
    default:
      bgColor = "!bg-green";
  }

  return (
    <div className="p-3 rounded-lg bg-dark-600 flex flex-col gap-2.5">
      <Image src={nft} alt={tId} width={216} height={216} quality={100} />
      <div className="text-lg font-medium leading-[27px] tracking-[-0.02em] flex-between">
        <h4>
          {} #{tId}
        </h4>
        <h4>XX INJ</h4>
      </div>
      <Button
        onClick={onClick}
        disabled={status === "passive"}
        className={`${bgColor}`}
      >
        {status === "passive" ? (
          <span>Passive</span>
        ) : status === "staked" ? (
          <span>Unstake</span>
        ) : (
          <span>Stake</span>
        )}
      </Button>
    </div>
  );
};

export default NFTCard;
