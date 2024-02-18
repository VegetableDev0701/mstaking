"use client";
import React, { useState } from "react";
import RewardsCart from "./RewardsCart";
import { UserRewards } from "@/types";
import { convertTimestampToDate } from "@/utils";
import Image from "next/image";
import Button from "@/components/UI/Button";
import { useEffect } from "react";
const Rewards = ({ data, getReward }: { data: UserRewards, getReward: any }) => {
  const [totalEarning, setTotalEarning] = useState(0.0)
  const calcTotalEarning = () => {
    for(let i = 0;i<data.earnings.length; i++) {
      setTotalEarning(totalEarning + data.earnings[i].ClaimAmount)
    }
  }
  useEffect(() => {
    calcTotalEarning()
  }, [])
  return (
    <div className="flex-center flex-wrap gap-3">
      <RewardsCart>
        <div className="flex-center gap-2">
          <div className="p-2.5 border border-[#F4F7FE] rounded-full">
            <Image
              src="/icons/large-dollar.svg"
              alt="dollar"
              width={34}
              height={34}
              className="h-[34px] w-[34px] max-w-[34px]"
            />
          </div>
          <div className="flex flex-col w-full">
            <span className="text-sm font-medium leading-6 tracking-[-0.02em] text-left text-[#A3AED0]">
              Earnings
            </span>
            <span className="text-2xl font-semibold leading-8 tracking-[-0.02em] text-left">
              ${totalEarning}
            </span>
          </div>
          <Button onClick={() => {getReward()}} className="bg-secondary">
            Claim
          </Button>
        </div>
      </RewardsCart>
      <RewardsCart>
        <div className="flex-center gap-2">
          <div className="p-2.5 border border-[#F4F7FE] rounded-full">
            <Image
              src="/icons/large-chart.svg"
              alt="chart"
              width={34}
              height={34}
              className="h-[34px] w-[34px] max-w-[34px]"
            />
          </div>
          <div className="flex flex-col w-full">
            <span className="text-sm font-medium leading-6 tracking-[-0.02em] text-left text-[#A3AED0]">
              Staked NFTs
            </span>
            <span className="text-2xl font-semibold leading-8 tracking-[-0.02em] text-left">
              {data.stakedNfts}
            </span>
          </div>
        </div>
      </RewardsCart>
      <RewardsCart>
        <div className="flex flex-col w-full">
          <span className="text-sm font-medium leading-6 tracking-[-0.02em] text-left text-[#A3AED0]">
            Earnings
          </span>
          <span className="text-2xl font-semibold leading-8 tracking-[-0.02em] text-left">
            Until {new Date(data.lockDuration).toLocaleDateString()}
          </span>
        </div>
      </RewardsCart>
      <RewardsCart>
        <div className="flex flex-col w-full">
          <span className="text-sm font-medium leading-6 tracking-[-0.02em] text-left text-[#A3AED0]">
            NFTs owned
          </span>
          <span className="text-2xl font-semibold leading-8 tracking-[-0.02em] text-left">
            {data.nftsOwned}
          </span>
        </div>
      </RewardsCart>
    </div>
  );
};

export default Rewards;
