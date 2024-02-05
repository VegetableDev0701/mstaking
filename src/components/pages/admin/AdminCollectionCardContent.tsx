import React, { use, useEffect, useState } from "react";
import InfoCard from "../../UI/InfoCard";
import CustomSwitchButton from "@/components/UI/CustomSwitchButton";
import Image from "next/image";

const AdminCollectionCardContent = ({
  setDropdown,
}: {
  setDropdown: (bool: boolean) => void;
}) => {
  const [chosenModel, setChosenModel] = useState(1);
  const [lockDuration, setLockDuration] = useState(0);
  const [dailyAirdrop, setDailyAirdrop] = useState(0);
  const [unstakingFeeReceiver, setUnstakingFeeReceiver] = useState("");
  const [isStakingDurationEnabled, setIsStakingDurationEnabled] =
    useState(false);
  const [isUnstakingFeeEnabled, setIsUnstakingFeeEnabled] = useState(false);
  const [isChangesMade, setIsChangesMade] = useState(false);

  return (
    <div className="flex flex-col gap-2.5">
      <InfoCard title="Staking duration">
        <span className="text-base font-normal leading-4 tracking-[-0.01em] text-left text-dark-100">
          1d 2h 3m
        </span>
      </InfoCard>
      <InfoCard
        title="Enable/Disable"
        description="(if the staking duration should restart automatically when it hits finished)"
      >
        <CustomSwitchButton onChangeParent={setIsStakingDurationEnabled} />
      </InfoCard>
      <InfoCard title="Change lock duration">
        <input
          type="number"
          className="p-2 rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center"
          placeholder="Enter Duration"
          onChange={(e) => setLockDuration(+e.target.value)}
        />
      </InfoCard>
      <InfoCard
        title="Staking model"
        description="(1: Staked NFTs locked, free unstake after X days. 2: Lock NFT, pay fee for early unstaking.)"
      >
        <div className="flex items-center justify-start gap-2">
          {["MODEL 1", "MODEL 2"].map((model, index) => {
            return (
              <div
                key={index}
                className={`px-2.5 py-1.5 rounded-[40px] text-base font-normal leading-4 tracking-[-0.01em] text-left text-dark-100 cursor-pointer transition-all ${
                  chosenModel === index + 1 && "bg-dark-800"
                }`}
                onClick={() => setChosenModel(index + 1)}
              >
                {model}
              </div>
            );
          })}
        </div>
      </InfoCard>
      <InfoCard title="Send out INJ token airdrop">
        <Image
          src="/icons/share.svg"
          width={24}
          height={24}
          alt="share-icon"
          className="cursor-pointer"
        />
      </InfoCard>
      <InfoCard title="Send out any native INJ tokens in airdrop">
        <Image
          src="/icons/share.svg"
          width={24}
          height={24}
          alt="share-icon"
          className="cursor-pointer"
        />
      </InfoCard>
      <InfoCard title="Daily airdrops of INJ or native INJ tokens">
        <input
          type="number"
          className="p-2 rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center"
          placeholder="Enter Amount"
          onChange={(e) => setDailyAirdrop(+e.target.value)}
        />
      </InfoCard>
      <InfoCard
        title="Rewards based on NFT ranks"
        description="(if the staking duration should restart automatically when it hits finished)"
      >
        <CustomSwitchButton onChangeParent={setIsUnstakingFeeEnabled} />
      </InfoCard>
      <InfoCard title="Unstaking fee receiver">
        <input
          type="text"
          className="p-2 rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center"
          placeholder="Enter Address"
          onChange={(e) => setUnstakingFeeReceiver(e.target.value)}
        />
      </InfoCard>
      <InfoCard title="Download snapshot of all current staked NFTs & addresses">
        <Image
          src="/icons/download.svg"
          width={24}
          height={24}
          alt="download-icon"
          className="cursor-pointer"
        />
      </InfoCard>
      <InfoCard title="Download snapshot of all current non-locked and staked NFTs & addresses">
        <Image
          src="/icons/download.svg"
          width={24}
          height={24}
          alt="download-icon"
          className="cursor-pointer"
        />
      </InfoCard>

      <div className="flex flex-row items-center justify-center gap-5 max-md:flex-col">
        <button
          className="w-full p-3 rounded-lg bg-secondary text-base font-medium leading-4 tracking-[-0.01em] text-center text-dark-100"
          onClick={() => setDropdown(false)}
        >
          Cancel
        </button>
        <button
          className="w-full p-3 rounded-lg bg-primary text-base font-medium leading-4 tracking-[-0.01em] text-center text-dark-100"
          onClick={() => console.log("Changes made")}
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default AdminCollectionCardContent;
