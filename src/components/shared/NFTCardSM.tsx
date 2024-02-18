"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "../UI/Button";
import { NFT } from "@/types";
import { motion } from "framer-motion";
interface NFTCardProps {
  // nft: NFT;
  tId: string;
  address: string;
  onClick: () => void;
  onSelect: () => void;
  onUnSelect: () => void;
  status: "passive" | "staked" | "active";
}

const NFTCard = ({
  // nft: { id, name, price, imageUrl },
  address,
  tId,
  onClick,
  onSelect,
  onUnSelect,
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

  const [selected, setSelected] = useState(false);

  return (
    <div
      className={`p-3 rounded-lg bg-dark-600 flex flex-col gap-2.5 relative transition-all ${
        selected && "bg-dark-400"
      }`}
    >
      <motion.div
        className="absolute top-3 right-3 w-6 h-6 border-2 border-white rounded cursor-pointer flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => {
          setSelected(!selected);
          if (selected) {
            onSelect();
          } else {
            onUnSelect();
          }
        }}
      >
        {selected && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            X
          </motion.span>
        )}
      </motion.div>
      <Image
        src={`${process.env.API_SERVER}/image?tId=${tId}&addr=${address}`}
        alt={tId}
        width={216}
        height={216}
        quality={100}
      />
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
