"use client";
import React, { useState } from "react";
import CustomWrapper from "./CustomWrapper";
import CustomInput from "./CustomInput";
import CustomCheckBox from "./CustomCheckBox";
import Button from "@/components/UI/Button";
import { toast } from "react-toastify";
import { addCollection } from "@/lib/features/collectionSlice";
import { useDispatch } from "react-redux";
import { redirect } from "next/navigation";
const AddCollection = () => {
  const dispatch = useDispatch()
  const [collectionAddr, setCollectionAddr] = useState<string>("")
  const [collectionTitle, setCollectionTitle] = useState<string>("")
  const [collectionDes, setCollectionDes] = useState<string>("")
  const [stakingDuration, setStakingDuration] = useState<number>(0);
  const [restartAble, setRestartAble] = useState<boolean>(true);
  const [enableAirdrop, setEnableAirdrop] = useState<boolean>(false);

  const [dailyAirdrops, setDailyAirdrops] = useState<number>(0);
  const [disableNFT, setDisableNFT] = useState<boolean>(true);

  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [stakingFee, setStakingFee] = useState<number>(0);
  const [unstakingFee, setUnstakingFee] = useState<number>(0);

  const submitCollection = async () => {
/*     let formData = new FormData()
    formData.append('Caddress', collectionAddr)
    formData.append('Ctitle', collectionTitle)
    formData.append('Cdescription', collectionDes)

    formData.append('duration', stakingDuration.toString())
    formData.append('restartAble', restartAble ? "true" : "false")
    formData.append('dailyAirDropable', enableAirdrop ? "true" : "false")

    formData.append('dailyAirDrops', dailyAirdrops.toString())
    formData.append('NFTRank', disableNFT ? "true": "false")

    formData.append('fee', stakingFee.toString())
    formData.append('fee_receiver', receiverAddress) */

    const bodyData = {
      Caddress: collectionAddr,
      Ctitle: collectionTitle,
      Cdescription: collectionDes,
      duration: stakingDuration,
      restartFlag: restartAble,
      dailyAirDropFlag: enableAirdrop,
      dailyAirdrops: dailyAirdrops,
      NFTFlag: disableNFT,
      unStakingFee: stakingFee,
      receiverAddress: receiverAddress
    }

    const res = await (await fetch('/api/collection/addCollection', {method: 'POST', body: JSON.stringify(bodyData)})).json()
    if (res.status == false) {
      toast('Error Occur ', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      });
    } else {
      dispatch(addCollection(res))
      redirect('/')
    }
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
            checked={restartAble}
            onChange={(checked) => {
              setRestartAble(checked);
            }}
            description="If enabled, users will have to manually restart their staking duration after each staking period ends."
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
            label="Staking fee(INJ)"
            inputType="number"
            placeHolder="Staking fee(INJ)"
            inputOnChange={(value) => {
              setStakingFee(Number(value));
            }}
          />
          <CustomInput
            label="Unstaking fee(INJ)"
            inputType="number"
            placeHolder="Unstaking fee(INJ)"
            inputOnChange={(value) => {
              setUnstakingFee(Number(value));
            }}
          />
        </CustomWrapper>
      </div>
      <div className="flex flex-col w-full gap-2.5">
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
