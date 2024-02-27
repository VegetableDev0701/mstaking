"use client";
import React, { useState } from "react";
import CustomWrapper from "./CustomWrapper";
import CustomInput from "./CustomInput";
import CustomCheckBox from "./CustomCheckBox";
import Button from "@/components/UI/Button";
import { Notify } from "@/helper/notification";
import { getAddresses } from '@/services/wallet' 
import { IACollectionR } from '@/constants/collection'

const AddCollection = () => {
  const [collectionAddr, setCollectionAddr] = useState<string>("")
  const [collectionTitle, setCollectionTitle] = useState<string>("")
  const [collectionDes, setCollectionDes] = useState<string>("")
  const [stakingDuration, setStakingDuration] = useState<number>(0);
  const [disableRestart, setDisableRestart] = useState<boolean>(true);
  const [enableAirdrop, setEnableAirdrop] = useState<boolean>(false);

  const [dailyAirdrops, setDailyAirdrops] = useState<number>(0);
  const [disableNFT, setDisableNFT] = useState<boolean>(true);

  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [stakingFee, setStakingFee] = useState<number>(0);
  const [stakingStatus, setStakingStatus] = useState<string>("")

  const submitCollection = async () => {
    let myAddr = await getAddresses()
    if ( myAddr.length == 0 ) {
      return Notify('error', 'No Wallet Connected');
    }
    const bodyData: IACollectionR = {
      Caddress: collectionAddr,
      Cwaddress: myAddr[0],
      Ctitle: collectionTitle,
      Cdescription: collectionDes,
      CBackground: '',
      CstakingDuration: stakingDuration,
      CdisableRestart: disableRestart,
      CenableAirdrop: enableAirdrop,
      CdailyAirdrops: dailyAirdrops,
      CdisableNFT: disableNFT,
      CreceiverAddress: receiverAddress,
      CstakingFee: stakingFee,
      CstakingStatus: stakingStatus
    }
    const res = await fetch('/api/collection/addCollection', {method: 'POST', body: JSON.stringify(bodyData)})
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-normal leading-[30px] tracking-normal text-left text-dark-200">
          Collection Info
        </h2>
        <CustomWrapper>
          <CustomInput
            label="Collection Address"
            inputType="text"
            placeHolder="Input Collection Address"
            inputOnChange={(value) => {
              setCollectionAddr(value);
            }}
          />
          <CustomInput
            label="Collection Name"
            inputType="text"
            placeHolder="Input Collection Name"
            inputOnChange={(value) => {
              setCollectionTitle(value);
            }}
          />
          <CustomInput
            label="Collection Description"
            inputType="text"
            placeHolder="Input Collection Description"
            inputOnChange={(value) => {
              setCollectionDes(value);
            }}
          />
        </CustomWrapper>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-normal leading-[30px] tracking-normal text-left text-dark-200">
          Settings
        </h2>
        <CustomWrapper>
          <CustomInput
            label="Staking and lock duration(days)"
            inputType="number"
            placeHolder="Input staking and lock duration"
            inputOnChange={(value) => {
              setStakingDuration(Number(value));
            }}
          />
          <CustomCheckBox
            label="Disable automatic restart of staking duration."
            checked={disableRestart}
            onChange={(checked) => {
              setDisableRestart(checked);
            }}
            description="If enabled, users will have to manually restart their staking duration after each staking period ends."
          />
          <CustomCheckBox
            label="Enable INJ token airdrops."
            checked={enableAirdrop}
            onChange={(checked) => {
              setEnableAirdrop(checked);
            }}
            description="If enabled, users will receive INJ tokens daily as a reward for staking."
          />
        </CustomWrapper>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-normal leading-[30px] tracking-normal text-left text-dark-200">
          Rewards managment
        </h2>
        <CustomWrapper>
          <CustomInput
            label="Daily airdrops of INJ or native INJ tokens(amount)"
            inputType="number"
            placeHolder="Staking duration"
            inputOnChange={(value) => {
              setDailyAirdrops(Number(value));
            }}
          />
          <CustomCheckBox
            label="Disable sending reward based on NFT ranks."
            checked={disableNFT}
            onChange={(checked) => {
              setDisableNFT(checked);
            }}
            description="If enabled, users will receive INJ tokens daily as a reward for staking."
          />
        </CustomWrapper>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-normal leading-[30px] tracking-normal text-left text-dark-200">
          Financial settings
        </h2>
        <CustomWrapper>
          <CustomInput
            label="Reciever address for staking/unstaking fees"
            inputType="text"
            placeHolder="Input receiver address"
            inputOnChange={(value) => {
              setReceiverAddress(value);
            }}
          />
          <CustomInput
            label="Staking/unstaking fee(INJ)"
            inputType="number"
            placeHolder="Staking/unstaking fee(INJ)"
            inputOnChange={(value) => {
              setStakingFee(Number(value));
            }}
          />
        </CustomWrapper>
      </div>
      <div className="flex flex-col w-full gap-2.5">
        <div className="flex-start gap-2.5 w-full">
          <Button onClick={() => { setStakingStatus('Start') }} className="w-full">
            Start Staking
          </Button>
          <Button onClick={() => { }} className="w-full">
            Snapshot of staked NFTs and addresses
          </Button>
        </div>
        <div className="flex-start gap-2.5">
          <Button onClick={() => { setStakingStatus('Restart') }} className="bg-secondary w-full">
            Restart Staking
          </Button>
          <Button onClick={() => { setStakingStatus('Disable') }} className="bg-secondary w-full">
            Disable Staking
          </Button>
        </div>
        <div className="flex-start w-full">
          <Button onClick={() => submitCollection()} className="bg-primary w-full">
            Submit Collection
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCollection;
