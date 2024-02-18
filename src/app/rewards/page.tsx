'use client'
import { Chart } from "@/components/pages/rewards/Chart";
import React, { useCallback, useMemo } from "react";
import { useEffect, useState } from "react";
import { dummyChartData } from "@/constants";
import Rewards from "@/components/pages/rewards/Rewards";
import { useDispatch, useSelector } from "react-redux";
import { getCollections, getCollectionFromCA } from "@/lib/features/collectionSlice";
import { ClaimHelper } from "@/helper/transaction";
import { getTokens } from "@/lib/features/tokenSlice";
import { Token } from "@/interface/token";
import { CollectionReward } from '@/interface/Reward'
import { setRoute } from "@/lib/features/routerSlice";
import { ActionHelper } from "@/helper/actionHelper";
import {toast} from 'react-toastify'
const page = () => {
  const collections = useSelector(getCollections)
  const dispatch = useDispatch()
  const routeConfig = async () => {
    dispatch(setRoute({routeStr: 'Other'}))
  }
  const tokens = useSelector(getTokens)
  const [totalCount, setTotalCount] = useState(0)
  const [totalStake, setTotalStake] = useState(0)
  const [totalRewards, setTotalRewards] = useState<CollectionReward[]>([])
  const LockDate = new Date().getTime()
  const calcRewards = () => {
    let tempRewards: CollectionReward[] = []
    for (let i = 0; i < collections.length; i++) {
      let indReward: CollectionReward = {
        Caddress: collections[i].Caddress,
        Saddress: collections[i].Saddress,
        ClaimAmount: 0
      }
      const cycle = collections[i].cycle
      const reward = parseInt(collections[i].cReward.amount)
      let stakedToken = tokens[`${collections[i].Caddress}`].staked
      stakedToken = stakedToken.filter((el: Token) => el.token_stake_time < el.token_end_time)
      for (let j = 0; j < stakedToken.length; j++) {
        const tk: Token = stakedToken[j]
        let period = (new Date().getTime()) - parseInt(tk.token_stake_time.toString())/1000000
        if (collections[i].auto_renewal) {
          indReward.ClaimAmount = indReward.ClaimAmount + reward * Math.floor(period / cycle)
        } else {
          indReward.ClaimAmount = indReward.ClaimAmount + reward
        }
      }
      tempRewards.push(indReward)
    }
    setTotalRewards(tempRewards)
  }
  const ClaimReward = async () => {
    for (let i =0; i<collections.length; i++ ) {
      let resVal = await ActionHelper(collections[i].Saddress, {claim:{}});
      if (resVal == true) {
        toast('Claim Success !', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'success'
        });
      } else {
        toast('Claim failed !', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error'
        });
      }
    }
  }
  const calcTotal = () => {
    let keys = Object.keys(tokens)
    let total = 0
    for (let i = 0; i < keys.length; i++) {
      if (tokens[keys[i]].staked) {
        total = total + tokens[keys[i]].staked.filter((el: Token) => parseInt(el.token_stake_time.toString())/1000000 > parseInt(el.token_end_time.toString())).length
      }
      if (tokens[keys[i]].unstaked) {
        total = total + tokens[keys[i]].unstaked.length
      }
    }
    setTotalCount(total)
  }
  const calcStaked = () => {
    let keys = Object.keys(tokens)
    let total = 0
    for (let i = 0; i < keys.length; i++) {
      if (tokens[keys[i]].staked) {
        console.log('keys: ', tokens[keys[i]], tokens[keys[i]].staked)
        total = total + tokens[keys[i]].staked.filter((el: Token) => parseInt(el.token_stake_time.toString())/1000000 > parseInt(el.token_end_time.toString())).length
      }
    }
    setTotalStake(total)
  }
  useEffect(() => {
    calcTotal()
    calcStaked()
    calcRewards()
    routeConfig()
  }, [])
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-medium leading-10 tracking-[-0.02em] text-left text-dark-200">
          Overview
        </h3>
        <Chart chartData={dummyChartData} />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-medium leading-10 tracking-[-0.02em] text-left text-dark-200">
          Rewards
        </h3>
        <Rewards
          getReward={ClaimReward}
          data={{
            earnings: totalRewards,
            stakedNfts: totalStake,
            lockDuration: LockDate,
            nftsOwned: totalCount
          }} />
      </div>
    </div>
  );
};

export default page;
