import React, { use, useEffect, useState, useRef, ChangeEvent } from "react";
import Button from "@/components/UI/Button";
import InfoCard from "../../UI/InfoCard";
import CustomSwitchButton from "@/components/UI/CustomSwitchButton";
import Image from "next/image";
import { Collection } from "@/interface/collection";
import { MS2Period } from "@/helper/utils";
import { useDispatch } from "react-redux";
import { queryHelper } from "@/helper/queryHelper";
import { getSMNFT } from "@/helper/queryHelper"
import { toast } from "react-toastify";
import { setCollectionData } from "@/lib/features/collectionSlice";
import { ActionHelper } from "@/helper/actionHelper";
import { useRouter } from 'next/navigation'
import { downloadFile } from "@/helper/utils";
const AdminCollectionCardContent = ({
  setDropdown, colData
}: {
  colData: Collection
  setDropdown: (bool: boolean) => void;
}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  // for image upload
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File>();

  const [CBackground, setCBackground] = useState<string>(colData.cBkgimg)

  // Collection Information
  const [title, setTitle] = useState<string>(colData.cTitle)
  const [description, setDescription] = useState<string>(colData.cDescription)
  const [stakingDur, setStakingDur] = useState<number>(colData.cDuration)
  const [autoRestart, setAutoRestart] = useState<boolean>(colData.cRestart)
  const [lockDur, setLockDur] = useState<number>(colData.cLockDur)
  const [stakingType, setStakingType] = useState<boolean>(colData.cModel)
  const [airdrop, setAirDrop] = useState<string>(colData.cDailyAirdrop.amount)
  const [nairdrop, setNAirDrop] = useState<string>(colData.cDailyNAirdrop.amount)
  const [rewardByrank, setRewardRnk] = useState<boolean>(colData.cRewardbyRank)
  const [feeShare, setFeeShare] = useState<number>(colData.cUnstakingFeeShare)
  const [unstakeFee, setUnstakeFee] = useState<string>(colData.cUnstakingFee.amount)
  const [feeReciever, setFeeReceiver] = useState<string>(colData.cUnstakingFeeReceiver)
  const [reward, setReward] = useState<string>(colData.cReward.amount)

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
      dispatch(setCollectionData({
        data: {
          ...colData,
          cBkgimg: retVal.CBackground
        }
      }))
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

  const changeCollectionData = async () => {
    const bodyData = {
      ...colData,
      cTitle: title,
      cDescription: description,
      cBkgimg: CBackground,
      cRestart: autoRestart,
      cModel: stakingType,
      cDuration: stakingDur,
      cLockDur: lockDur,
      cDailyAirdrop: {
        amount: airdrop,
        denom: 'inj'
      },
      cDailyNAirdrop: {
        amount: nairdrop,
        denom: 'inj'
      },
      cReward: {
        amount: reward,
        denom: 'inj'
      },
      cRewardbyRank: rewardByrank,
      cUnstakingFeeReceiver: feeReciever,
      cUnstakingFee: {
        amount: unstakeFee,
        denom: 'inj'
      },
      cUnstakingFeeShare: feeShare
    }
    const retAction = await ActionHelper(colData.Saddress, {
      update_collection: {
        col_address: colData.Caddress,
        col_admin: colData.cAdmin,
        col_title: title,
        col_description: description,
        col_bkgimg: CBackground,
        col_restart: autoRestart,
        col_model: stakingType,
        col_duration: stakingDur,
        col_lock_dur: lockDur,
        col_daily_airdrop: {
          denom: 'inj',
          amount: airdrop
        },
        col_daily_nairdrop: {
          denom: 'inj',
          amount: nairdrop
        },
        col_reward: {
          denom: 'inj',
          amount: reward
        },
        col_reward_rank: rewardByrank,
        col_unstaking_fee_receiver: feeReciever,
        col_unstaking_fee: {
          denom: 'inj',
          amount: unstakeFee
        },
        col_unstaking_fee_share: feeShare,
        col_tx_fee: {
          denom: 'inj',
          amount: colData.cTxFee.amount
        },
        col_enable: colData.cEnable
      }
    })
    if (retAction) {
      toast('Collection Information Updated !', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success'
      })
      router.push(`/collections/${colData.Caddress}`)
      dispatch(setCollectionData({ data: bodyData }))
    } else {
      toast('Contract Error!', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      })
    }
  }

  const sendoutAirDrop = async () => {
    const retAirDrop = await ActionHelper(colData.Saddress, {
      sendout_airdrop: {}
    });
    if (retAirDrop) {
      toast('Daily AirDrop Sent Successfully !', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success'
      })
    } else {
      toast('Contract Error!', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      })
    }
  }

  const sendoutNAirdrop = async () => {

  }
  const downloadNFT = async () => {
    let headers = ['address', 'token_id', 'staked']
    let data: string[] = []
    let stakedUsers = await queryHelper(colData.Saddress, "get_staking_users", {});
    if (stakedUsers) {
      for(let i =0; i<stakedUsers?.length; i++) {
        if (stakedUsers && stakedUsers[i]) {
          let smNFT = await getSMNFT(colData.Saddress, stakedUsers[i]);
          if (smNFT) {
            for(let j =0;j<smNFT.length; j++) {
              if (smNFT[j].token_end_time > 0) continue;
              let indx = data.findIndex(el => el.includes(`${colData.Saddress},${smNFT[j].token_id}`));
              if (indx == -1) {
                data.push(`${colData.Saddress},${smNFT[j].token_id},${new Date(smNFT[j].token_stake_time/1000000).toLocaleString()}`)
              }
            }
          }
        }
      }
    }
    downloadFile({
      data: [headers.join(','), ...data].join('\n'),
      fileName: 'staked.csv',
      fileType: 'text/csv',
    })
  }
  const downloadNoneLocked = async () => {
    let headers = ['address', 'token_id', 'staked']
    let data: string[] = []
    let stakedUsers = await queryHelper(colData.Saddress, "get_staking_users", {});
    if (stakedUsers) {
      for(let i =0; i<stakedUsers?.length; i++) {
        if (stakedUsers && stakedUsers[i]) {
          let smNFT = await getSMNFT(colData.Saddress, stakedUsers[i]);
          if (smNFT) {
            for(let j =0;j<smNFT.length; j++) {
              if (smNFT[j].token_lock_time = 0) continue;
              if ( smNFT[j].token_lock_time/1000000 > (new Date().getTime())) continue;
              let indx = data.findIndex(el => el.includes(`${colData.Saddress},${smNFT[j].token_id}`));
              if (indx == -1) {
                data.push(`${colData.Saddress},${smNFT[j].token_id},${new Date(smNFT[j].token_stake_time/1000000).toLocaleString()}`)
              }
            }
          }
        }
      }
    }
    downloadFile({
      data: [headers.join(','), ...data].join('\n'),
      fileName: 'lockednft.csv',
      fileType: 'text/csv',
    })
  }
  return (
    <div className="flex flex-col gap-2.5">
      <InfoCard title="Collection Title">
        <input
          type="text"
          value={title}
          className="p-2 rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center"
          placeholder="input Title"
          onChange={(e) => setTitle}
        />
      </InfoCard>
      <InfoCard title="Collection Description">
        <input
          type="text"
          value={description}
          className="p-2 rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center"
          placeholder="input description"
          onChange={(e) => setDescription(e.target.value.toString())}
        />
      </InfoCard>
      <InfoCard title="Staking duration">
        <span className="text-base font-normal leading-4 tracking-[-0.01em] text-left text-dark-100">
          {'(' + MS2Period(stakingDur) + ')'}
        </span>
        <input
          type="number"
          value={stakingDur}
          className="p-2 rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center"
          placeholder="Enter Duration"
          onChange={(e) => setStakingDur(parseInt(e.target.value))}
        />
      </InfoCard>
      <InfoCard
        title="Staking Duration Renewal"
        description="(if the staking duration should restart automatically when it hits finished)"
      >
        <CustomSwitchButton initState={autoRestart} onChangeParent={setAutoRestart} />
      </InfoCard>
      <InfoCard title="Change lock duration">
        <input
          type="number"
          value={lockDur}
          className="p-2 rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center"
          placeholder="Enter Duration"
          onChange={(e) => setLockDur(parseInt(e.target.value))}
        />
        <span className="text-base font-normal leading-4 tracking-[-0.01em] text-left text-dark-100">
          {MS2Period(lockDur)}
        </span>
      </InfoCard>
      <InfoCard
        title="Staking model"
        description="(1: The lock period starts instantly when a user stakes. 2: The lock period starts when a user press unstake.)"
      >
        <div className="flex items-center justify-start gap-2">
          {["MODEL 1", "MODEL 2"].map((model, index) => {
            return (
              <div
                key={index}
                className={`px-2.5 py-1.5 rounded-[40px] text-base font-normal leading-4 tracking-[-0.01em] text-left text-dark-100 cursor-pointer transition-all ${stakingType == (index == 0) && "bg-dark-800"
                  }`}
                onClick={() => setStakingType(!stakingType)}
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
          onClick={() => sendoutAirDrop()}
        />
      </InfoCard>
      <InfoCard title="Send out any native INJ tokens in airdrop">
        <Image
          src="/icons/share.svg"
          width={24}
          height={24}
          alt="share-icon"
          className="cursor-pointer"
          onClick={() => sendoutNAirdrop()}
        />
      </InfoCard>
      <InfoCard title="Daily airdrops of INJ   ">
        <input
          type="number"
          value={airdrop}
          className="p-2 rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center"
          placeholder="Enter Amount"
          onChange={(e) => setAirDrop(e.target.value.toString())}
        />
      </InfoCard>
      <InfoCard title="Daily airdrops of native INJ">
        <input
          type="number"
          value={nairdrop}
          className="p-2 rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center"
          placeholder="Enter Amount"
          onChange={(e) => setNAirDrop(e.target.value.toString())}
        />
      </InfoCard>
      <InfoCard
        title="Rewards based on NFT ranks"
        description="(Stakers will get rewards by their NFT ranks)"
      >
        <CustomSwitchButton initState={rewardByrank} onChangeParent={setRewardRnk} />
      </InfoCard>
      <InfoCard title="Staked NFT reward">
        <input
          type="number"
          value={parseInt(reward)}
          className="p-2 rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center"
          placeholder="Enter Address"
          onChange={(e) => setReward(e.target.value.toString())}
        />
      </InfoCard>
      <InfoCard title="Unstaking fee receiver">
        <input
          type="text"
          disabled
          value={feeReciever}
          className="p-2 rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center"
          onChange={(e) => setFeeReceiver(e.target.value)}
        />
      </InfoCard>
      <InfoCard title="Unstaking fee" description="(if a user decides to unstake before the lock period ends, this is the fee they will pay)">
        <input
          type="text"
          value={unstakeFee}
          className="p-2 rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center"
          placeholder="Enter Address"
          onChange={(e) => setUnstakeFee(e.target.value)}
        />
      </InfoCard>
      <InfoCard title="Unstaking fee Share">
        <input
          type="text"
          disabled
          value={feeShare}
          className="p-2 rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center"
        />
      </InfoCard>
      <InfoCard title="Download snapshot of all current staked NFTs & addresses">
        <Image
          src="/icons/download.svg"
          width={24}
          height={24}
          alt="download-icon"
          className="cursor-pointer"
          onClick={() => downloadNFT()}
        />
      </InfoCard>
      <InfoCard title="Download snapshot of all current non-locked and staked NFTs & addresses">
        <Image
          src="/icons/download.svg"
          width={24}
          height={24}
          alt="download-icon"
          className="cursor-pointer"
          onClick={() => downloadNoneLocked()}
        />
      </InfoCard>
      <div className="flex-start w-full">
        <input type="file" name="file" ref={inputRef}
          onChange={uploadCollectionImage}
          style={{ display: 'none' }}
        />
        <Button onClick={() => { inputRef.current?.click(); }} className="bg-secondary w-full">
          Chnage Background
        </Button>
      </div>
      <div className="flex flex-row items-center justify-center gap-5 max-md:flex-col">
        <button
          className="w-full p-3 rounded-lg bg-secondary text-base font-medium leading-4 tracking-[-0.01em] text-center text-dark-100"
          onClick={() => router.push(`/collections/${colData.Caddress}`)}
        >
          Cancel
        </button>
        <button
          className="w-full p-3 rounded-lg bg-primary text-base font-medium leading-4 tracking-[-0.01em] text-center text-dark-100"
          onClick={() => changeCollectionData()}
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default AdminCollectionCardContent;
