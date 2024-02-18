"use client";
import React, { useState, useRef, ChangeEvent } from "react";
import CustomWrapper from "../add-collection/CustomWrapper";
import CustomInput from "../add-collection/CustomInput";
import CustomCheckBox from "../add-collection/CustomCheckBox";
import Button from "@/components/UI/Button";
import Image from "next/image";
import { toast } from "react-toastify";
import { getSelectedCollection, setCollectionData } from "@/lib/features/collectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { Collection } from "@/interface/collection";
import { ActionHelper } from "@/helper/actionHelper";
import { DEFAULT_COLLECTION_IMG } from "@/constants";
import { useRouter } from 'next/navigation'
const EditCollection = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File>();
  const colData: Collection = useSelector(getSelectedCollection)
  const [CBackground ,setCBackground] = useState<string>(colData.cBkgimg)
  const [collectionAddr, setCollectionAddr] = useState<string>(colData.Caddress)
  const [collectionTitle, setCollectionTitle] = useState<string>(colData.cTitle)
  const [collectionDes, setCollectionDes] = useState<string>(colData.cDescription)
  const [status, setStatus] = useState<boolean>(colData.cEnable)
  const [stakingDuration, setStakingDuration] = useState<number>(colData.cDuration);
  const [restartAble, setRestartAble] = useState<boolean>(colData.cRestart);
  const [dailyAirdrops, setDailyAirdrops] = useState<number>(parseInt(colData.cDailyAirdrop.amount));
  const [receiverAddress, setReceiverAddress] = useState<string>(colData.cUnstakingFeeReceiver);
  const [reward, setReward] = useState<number>(parseInt(colData.cReward.amount))
  const [unstakingFee, setUnstakingFee] = useState<number>(parseInt(colData.cUnstakingFee.amount));
  const [feeShare, setFeeShare] = useState<number>(colData.cUnstakingFeeShare)
  const submitCollection = async () => {

    const bodyData = {
      Caddress: collectionAddr,
      cTitle: collectionTitle,
      cDescription: collectionDes,
      cDuration: stakingDuration,
      cRestart: restartAble,
      cDailyAirdrop: {
        amount: dailyAirdrops.toString(),
        denom: 'inj'
      },
      cUnstakingFeeReceiver: receiverAddress,
      cUnstakingFeeShare: feeShare,
      cUnstakingFee: {
        amount: unstakingFee.toString(),
        denom: 'inj'
      },
      cReward: {
        amount: reward.toString(),
        denom: 'inj'
      },
      cEnable: status
    }
    const retAction = await ActionHelper(colData.Saddress, {
      update_collection: {
        col_address: bodyData.Caddress,
        col_admin: colData.cAdmin,
        col_title: bodyData.cTitle,
        col_description: bodyData.cDescription,
        col_bkgimg: CBackground,
        col_restart: bodyData.cRestart,
        address: colData.Caddress,
        reward: bodyData.reward,
        airdrop: bodyData.airdrop,
        auto_renewal: bodyData.auto_renewal,
        cycle: bodyData.cycle,
        enabled: bodyData.enabled,
        spots: 50,
        fee_receiver: receiverAddress,
        unstake_lock_period: 10000
      }
    })
    if (retAction) {
      toast('Collection Information Updated !', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success'
      })
      router.push(`/collections/${colData.Caddress}`)
    } else {
      toast('Contract Error!', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      })
    }
  }
  const uploadCollectionImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
    let formdata = new FormData()
    formdata.append('Caddress', colData.Caddress)
    formdata.append('file', e.target.files[0])
    let retVal = await (await fetch(`${process.env.API_SERVER}/api/collection/changeBkg`, {
      method: 'POST', 
      body: formdata
    })).json()
    if (retVal.status) {
      setCBackground(retVal.CBackground)
      dispatch(setCollectionData({data: {
        ...colData,
        CBackground: retVal.CBackground
      }}))
      toast('Collection Background Updated !', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success'
      })
    } else {
      toast('Server Error!', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      })
    }
  }
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="relative p-3 h-[272px]">
          <Image
            fill
            className="object-center object-cover pointer-events-none rounded-lg blur-sm"
            src={CBackground == "default" ? DEFAULT_COLLECTION_IMG : `${process.env.API_SERVER}/images${CBackground}`}
            alt={'Update Collection Information'}
            quality={100}
          />
        </div>
        <h2 className="text-xl font-normal leading-[30px] tracking-normal text-left text-dark-200">
          Collection Info
        </h2>
        <CustomWrapper>
          <CustomInput
            label="Collection Address"
            inputType="text"
            val={colData.Caddress}
            placeHolder="Input Collection Address"
            inputOnChange={(value) => {
              setCollectionAddr(value);
            }}
            disable={true}
          />
          <CustomInput
            label="Collection Name"
            inputType="text"
            val={collectionTitle}
            placeHolder="Input Collection Name"
            inputOnChange={(value) => {
              setCollectionTitle(value);
            }}
            disable={false}
          />
          <CustomInput
            label="Collection Description"
            inputType="text"
            val={collectionDes}
            placeHolder="Input Collection Description"
            inputOnChange={(value) => {
              setCollectionDes(value);
            }}
            disable={false}
          />
          <CustomCheckBox
            label="Staking Status."
            checked={status}
            onChange={(checked) => {
              setStatus(checked);
            }}
            description="If disabled, users won't stake their NFTs."
          />
        </CustomWrapper>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-normal leading-[30px] tracking-normal text-left text-dark-200">
          Settings
        </h2>
        <CustomWrapper>
          <CustomInput
            label="Staking and lock duration( 1day = 86400000)"
            inputType="number"
            val={stakingDuration}
            placeHolder="Input staking and lock duration"
            inputOnChange={(value) => {
              setStakingDuration(Number(value));
            }}
            disable={false}
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
            label="Reward of Staked Each NFT(amount)"
            inputType="number"
            val={reward}
            placeHolder="Daily airdrop amount"
            inputOnChange={(value) => {
              setReward(Number(value));
            }}
            disable={false}
          />
          <CustomInput
            label="Daily airdrops of INJ or native INJ tokens(amount)"
            inputType="number"
            val={dailyAirdrops}
            placeHolder="Daily airdrop amount"
            inputOnChange={(value) => {
              setDailyAirdrops(Number(value));
            }}
            disable={false}
          />
        </CustomWrapper>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-normal leading-[30px] tracking-normal text-left text-dark-200">
          Financial settings
        </h2>
        <CustomWrapper>
          <CustomInput
            label="Fee Receiver Address"
            inputType="text"
            val={receiverAddress}
            placeHolder="Input unstaking Fee receiver"
            inputOnChange={(value) => {
              setReceiverAddress(value);
            }}
            disable={true}
          />
          <CustomInput
            label="Early unstaking fee(INJ)"
            inputType="number"
            val={unstakingFee}
            placeHolder="Unstaking fee(INJ)"
            inputOnChange={(value) => {
              setUnstakingFee(Number(value));
            }}
            disable={false}
          />
          <CustomInput
            label="Early unstaking fee share"
            inputType="number"
            val={feeShare}
            placeHolder="Unstaking fee share(percent)"
            inputOnChange={(value) => {
              setFeeShare(Number(value));
            }}
            disable={false}
          />
        </CustomWrapper>
      </div>
      <div className="flex flex-col w-full gap-2.5">
        <div className="flex-start w-full">
          <input type="file" name="file" ref={inputRef}
            onChange={uploadCollectionImage}
            style={{ display: 'none' }}
          />
          <Button onClick={() => { inputRef.current?.click(); }} className="bg-secondary w-full">
            Chnage Background
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

export default EditCollection;
