"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "../UI/Button";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { getCollectionData } from "@/lib/features/collectionSlice";
import { Collection } from "@/interface/collection";
import { Token } from "@/interface/token";
import { MS2PeriodS } from "@/helper/utils";
import { useEffect } from "react";
interface NFTCardProps {
  // nft: NFT;
  tData: Token;
  address: string;
  lockPeriod?: string;
  onClick: () => void;
  onSelect: (idx: string) => void;
  onUnSelect: (idx: string) => void;
  status: "passive" | "staked" | "active";
}

const NFTCard = ({
  address,
  tData,
  onClick,
  onSelect,
  onUnSelect,
  status,
  lockPeriod,
}: NFTCardProps) => {
  const colData: Collection = useSelector(getCollectionData(address));
  const [thisTime, setThisTime] = useState<Date>(new Date())
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
  const getNFTTitle = () => {
    if (colData.cModel) {
      if ((tData.token_lock_time/1000000) > new Date().getTime()) {
        return MS2PeriodS((tData.token_lock_time/1000000 - (thisTime.getTime()))/1000)
        // return new Date(tData.token_stake_time/1000000 + colData.cLockDur).toLocaleTimeString()
      } else {
        return 'Unstake Free'
      }
    } else {
      if (tData.token_lock_time == 0 ) {
        return 'Unstake'
      } else if (tData.token_lock_time/1000000 > new Date().getTime()) {
        return MS2PeriodS((tData.token_lock_time/1000000 - (thisTime.getTime()))/1000)
      } else {
        return 'Unstake Free'
      }
    }
  }
  useEffect(() => {
    var interval = setInterval(() => setThisTime(new Date()), 1000);
    return ()=> {
        clearInterval(interval);
    };
}, []);
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
          if (selected) {
            onUnSelect(tData.token_id);
          } else {
            onSelect(tData.token_id);
          }
          setSelected(!selected);
        }}
      >
        {selected && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            X
          </motion.span>
        )}
      </motion.div>
      <Image
        src={`${process.env.API_SERVER}/image?tId=${tData.token_id}&addr=${address}`}
        alt={tData.token_id}
        width={216}
        height={216}
        quality={100}
      />
      <div className="text-lg font-medium leading-[27px] tracking-[-0.02em] flex-between">
        <h4>
          {} #{tData.token_id}
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
          <span>{getNFTTitle()}</span>
        ) : (
          <span>Stake</span>
        )}
      </Button>
    </div>
  );
};

export default NFTCard;