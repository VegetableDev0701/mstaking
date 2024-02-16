import InfoCard from "@/components/UI/InfoCard";
import React from "react";
import { Collection } from "@/interface/collection";
import { useState } from "react";
import { toast } from "react-toastify";
import { ActionHelper } from "@/helper/actionHelper";
import { queryHelper } from "@/helper/queryHelper";
import { setCollectionData } from "@/lib/features/collectionSlice";
import { useRouter } from 'next/navigation'
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAddresses } from "@/services/wallet";
const OwnerCollectionCardContent = ({
  setDropdown,
  colData
}: {
  colData: Collection,
  setDropdown: (bool: boolean) => void;
}) => {
  const dispath = useDispatch();
  const router = useRouter()
  const [owner1, setOwner1] = useState<string>('')
  const [owner2, setOwner2] = useState<string>('')
  const [feeReceiver, setFeeReciever] = useState<string>(colData.fee_receiver)
  const [tx_fee, setFeeAmount] = useState<string>(colData.tx_fee.amount)
  const [status, setStatus] = useState<boolean>(colData.enabled)
  const [unstakingFee, setUnstakingFee] = useState<string>(colData.unstake_fee.amount)
  const [feeShare, setFeeShare] = useState<number>(colData.unstake_fee_share)
  const [title, setTile] = useState<string>(colData.Ctitle)
  const [admin, setAdmin] = useState<string>(colData.admin)

  const fetchCollectionConfig = async () => {
    const retConfig = await queryHelper(colData.Saddress, "get_config", {});
    if (retConfig) {
      setOwner1(retConfig.owner)
      setOwner2(retConfig.master)
    }
  }

  const [myAddr, setMyAddr] = useState('')
  const addressConfirm = async () => {
    const add = (await getAddresses())[0]
    setMyAddr(add)

  }
  useEffect(() => {
    addressConfirm();
    fetchCollectionConfig();
  }, [])

  const changeCollection = async () => {
    const res = await (await fetch('/api/collection/editCollection', {
      method: 'PUT', body: JSON.stringify({
        Caddress: colData.Caddress,
        Ctitle: title,
        Cdescription: colData.Cdescription
      })
    })).json()
    if (res.status == false) {
      toast('Maybe server Error ! ', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      });
      return;
    }
    const retConfig = await ActionHelper(colData.Saddress, {
      transfer_ownership: {
        new_owner: owner1
      }
    })
    if (!retConfig) {
      toast('Maybe server Error ! ', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      });
      return;
    }
    let bodyData: Collection = {
      ...colData,
      admin: admin,
      staking_model: colData.staking_model,
      unstake_fee: {
        amount: unstakingFee,
        denom: colData.unstake_fee.denom
      },
      unstake_fee_share: feeShare,
      reward: colData.reward,
      airdrop: colData.airdrop,
      nairdrop: colData.nairdrop,
      auto_renewal: colData.auto_renewal,
      cycle: colData.cycle,
      enabled: status,
      spots: 0,
      fee_receiver: feeReceiver,
      unstake_lock_period: colData.unstake_lock_period,
      tx_fee: {
        amount: tx_fee,
        denom: colData.tx_fee.denom
      },
      reward_by_rank: colData.reward_by_rank
    }
    const retAction = await ActionHelper(colData.Saddress, {
      set_collection: {
        address: colData.Caddress,
        owner: admin,
        staking_model: colData.staking_model,
        unstake_fee: {
          amount: unstakingFee,
          denom: colData.unstake_fee.denom
        },
        unstake_fee_share: feeShare,
        reward: colData.reward,
        airdrop: colData.airdrop,
        nairdrop: colData.nairdrop,
        auto_renewal: colData.auto_renewal,
        cycle: colData.cycle,
        enabled: status,
        spots: 0,
        fee_receiver: feeReceiver,
        unstake_lock_period: colData.unstake_lock_period,
        tx_fee: {
          amount: tx_fee,
          denom: colData.tx_fee.denom
        },
        reward_by_rank: colData.reward_by_rank
      }
    })
    if (retAction) {
      toast('Collection Information Updated !', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success'
      })
      dispath(setCollectionData({ data: bodyData }))
      router.push(`/collections/${colData.Caddress}`)
    } else {
      toast('Contract Error!', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      })
    }
  }
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-start gap-3">
        {
          myAddr == owner2 ?
            <>
              <div className="gap-2.5 pl-2 pr-3 py-3 rounded-lg bg-dark-700 w-full flex items-center justify-between">
                <div className="w-full flex items-center justify-start gap-1">
                  <h3 className="text-lg font-normal leading-[19px] tracking-normal text-left text-dark-100">
                    Owner1
                  </h3>
                </div>
                <div className="text-nowrap w-max">
                  <input
                    type="text"
                    value={owner1}
                    className="p-2 rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center"
                    placeholder="Enter Address"
                    onChange={(e) => setOwner1(e.target.value)}
                  />
                </div>
              </div>
            </>
            :
            <InfoCard title="Owner 1">{owner1}</InfoCard>
        }
        <InfoCard title="Owner 2">{owner2}</InfoCard>
      </div>
      <InfoCard title="Fee Receiver">
        <input
          type="text"
          value={feeReceiver}
          className="p-2 rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center"
          placeholder="Enter Address"
          onChange={(e) => setFeeReciever(e.target.value)}
        />
      </InfoCard>
      <InfoCard
        title="Tx fee amount"
        description="(The fee taken for each tx signed)"
      >
        <div className="flex items-center justify-start gap-2">
          <input
            type="text"
            value={tx_fee}
            className="p-2 rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center"
            placeholder="Enter Address"
            onChange={(e) => setFeeAmount(e.target.value)}
          />
          <p className="text-base font-bold leading-4 tracking-[-0.01em] text-left">
            INJ
          </p>
        </div>
      </InfoCard>
      <InfoCard title="Status">
        <div className="flex items-center justify-start gap-2">
          <p className="px-2.5 py-1 rounded-[40px] bg-[#235000] text-base font-normal leading-4 tracking-[-0.01em] text-left"
            onClick={() => { setStatus(!status); }}
          >
            {status ? 'Active' : 'Disabled'}
          </p>
        </div>
      </InfoCard>
      <InfoCard title="Early unstake fee">
        <input
          type="text"
          value={unstakingFee}
          className="p-2 rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center"
          placeholder="Enter Address"
          onChange={(e) => setUnstakingFee(e.target.value)}
        />
      </InfoCard>
      <InfoCard
        title="Early unstake fee % share:"
        description="(Each collection Admin gets a share. The owner can change this % at any time.)"
      >
        <div className="flex items-center justify-start gap-2">
          <input
            type="number"
            min={0}
            max={100}
            value={feeShare}
            className="p-2 rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center"
            placeholder="Enter Address"
            onChange={(e) => setFeeShare(parseInt(e.target.value))}
          />
        </div>
      </InfoCard>
      <InfoCard title="Title">
        <input
          type="text"
          value={title}
          className="p-2 rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center"
          placeholder="Enter Address"
          onChange={(e) => setTile(e.target.value)}
        />
      </InfoCard>
      <InfoCard title="Change Admin">
        <input
          type="text"
          value={admin}
          className="p-2 rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center"
          placeholder="Enter Address"
          onChange={(e) => setAdmin(e.target.value)}
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
          onClick={() => changeCollection()}
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default OwnerCollectionCardContent;
