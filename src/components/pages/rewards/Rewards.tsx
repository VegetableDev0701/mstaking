"use client";
import React from "react";
import RewardsCart from "./RewardsCart";
import { UserRewards } from "@/types";
import { convertTimestampToDate } from "@/utils";
import Image from "next/image";
import Button from "@/components/UI/Button";

const Rewards = ({ data }: { data: UserRewards }) => {
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
              ${data.earnings}
            </span>
          </div>
          <Button onClick={() => {}} className="bg-secondary">
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
          <Button onClick={() => {}} className="bg-secondary">
            Unstake
          </Button>
        </div>
      </RewardsCart>
      <RewardsCart>
        <div className="flex flex-col w-full">
          <span className="text-sm font-medium leading-6 tracking-[-0.02em] text-left text-[#A3AED0]">
            Earnings
          </span>
          <span className="text-2xl font-semibold leading-8 tracking-[-0.02em] text-left">
            Until {convertTimestampToDate(data.lockDuration)}
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
