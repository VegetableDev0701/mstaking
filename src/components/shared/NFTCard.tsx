"use client";
import React from "react";
import Image from "next/image";
import Button from "../UI/Button";
import { NFT } from "@/types";

interface NFTCardProps {
  nft: NFT;
  onClick: () => void;
  status: "passive" | "staked" | "active";
}

const NFTCard = ({
  nft: { id, name, price, imageUrl },
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
    <div className="p-3 rounded-lg bg-dark-600 flex flex-col gap-2.5 items-center max-md:p-[8.61px]">
      <Image
        src={imageUrl}
        alt={name}
        width={216}
        height={216}
        quality={100}
        className="max-md:w-[155px] max-md:h-[155px]"
      />
      <div className="text-lg font-medium leading-[27px] tracking-[-0.02em] flex-between max-md:text-sm w-full">
        <h4>
          {name} #{id}
        </h4>
        <h4>{price} INJ</h4>
      </div>
      <Button
        onClick={onClick}
        disabled={status === "passive"}
        className={`${bgColor} w-full`}
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
