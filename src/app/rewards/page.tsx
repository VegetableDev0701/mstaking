'use client'
import { Chart } from "@/components/pages/rewards/Chart";
import React from "react";
import { useEffect, useState } from "react";
import { dummyChartData } from "@/constants";
import Rewards from "@/components/pages/rewards/Rewards";
import { useDispatch, useSelector } from "react-redux";
import { getCollections, getCollectionFromCA } from "@/lib/features/collectionSlice";
import { Collection } from "@/interface/collection";
import { getSMNFT } from "@/helper/queryHelper";
import { ClaimHelper } from "@/helper/transaction";
import { setCollectionStakedNFT, getTokens } from "@/lib/features/tokenSlice";
import { Token } from "@/interface/token";
const page = () => {
  const collections = useSelector(getCollections)
  const dispatch = useDispatch()
  const fetchAllStakedNFT = async () => {
    for (let i = 0; i < collections.length; i++) {
      const el: Collection = collections[i]
      const data = await getSMNFT(el.Saddress)
      dispatch(setCollectionStakedNFT({
        keyname: `${el.Caddress}/${el.Ctitle}`,
        tokens: data
      }))
    }
  }
  useEffect(() => {
    fetchAllStakedNFT()
  }, [])
  const tokens = useSelector(getTokens)
  const [totalCount, setTotalCount] = useState(0)
  const [totalStake, setTotalStake] = useState(0)
  const [totalReward, setTotalReward] = useState(0.0)
  const calcRewards = () => {
    Object.keys(tokens).length && Object.keys(tokens).map((el: string) => {
      const colData = useSelector(getCollectionFromCA(el.split('/')[0]))
      const cycle = colData?.cycle ? colData.cycle : 100000
      let amount = 0.0
      for(let i =0; i<tokens[el].staked.length; i++) {
        let tok = tokens[el].staked[i]
        if (tok.start_timestamp > tok.end_timestamp) {
          let period = tok.start_timestamp - tok.end_timestamp
          if (period > cycle) {
            if (colData && colData.auto_renewal) {
              amount = amount + parseInt(colData.reward.amount) * (cycle/period)
            } else if (colData && !colData.auto_renewal) {
              amount = amount + parseInt(colData.reward.amount)
            }
          }
        }
      }
      setTotalReward(totalReward + amount)
    })
  }
  const calcStaked = () => {
    Object.keys(tokens).length && Object.keys(tokens).map((el: string) => setTotalStake(totalStake + tokens[el].staked.filter((e: Token) => e.start_timestamp > e.end_timestamp).length))
  }
  const calcTotal = () => {
    Object.keys(tokens).length && Object.keys(tokens).map((el: string) => setTotalCount(totalCount + tokens[el].staked.filter((e: Token) => e.start_timestamp > e.end_timestamp).length + tokens[el].unstaked.length))  
  }
  const ClaimReward = () => {
    Object.keys(tokens).length && Object.keys(tokens).map((el: string) => {
      const colData = useSelector(getCollectionFromCA(el.split('/')[0]))
      const cycle = colData?.cycle ? colData.cycle : 100000
      for(let i =0; i<tokens[el].staked.length; i++) {
        let tok = tokens[el].staked[i]
        if (tok.start_timestamp > tok.end_timestamp) {
          let period = tok.start_timestamp - tok.end_timestamp
          if (period > cycle) {
            // Claim invididual Token Reward
            ClaimHelper(colData?.Saddress, {
              claim_staking_reward: {
                index: i
              }
            } )
          }
        }
      }
    })
  }
  useEffect(() => {
    calcRewards()
    calcStaked()
    calcTotal()
  }, [tokens])
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
          earnings: totalReward,
          stakedNfts: totalStake,
          lockDuration: new Date().getTime(),
          nftsOwned: totalCount
        }} />
      </div>
    </div>
  );
};

export default page;
