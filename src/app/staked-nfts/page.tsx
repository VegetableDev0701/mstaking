"use client";
import {toast} from 'react-toastify'
import React from "react";
import NFTCollectionShow from "@/components/pages/staked-nfts/NFTCollectionShow";
import CustomBreakLine from "@/components/UI/CustomBreakLine";
import { getTokens, getTokenCount, setCollectionStakedNFT } from '@/lib/features/tokenSlice'
import { getCollections } from '@/lib/features/collectionSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Collection } from "@/interface/collection";
import { getSMNFT } from "@/helper/queryHelper";
import { unStakeHelper } from "@/helper/transaction";
import { queryHelper } from '@/helper/queryHelper';
import { getSaddress, getUnstakeFee } from "@/lib/features/collectionSlice";
import { setTokenUnStaked, getStakedTotalCOunt } from "@/lib/features/tokenSlice";
import { Token } from "@/interface/token";
const DEFAULT_UNSTAKE_FEE = 50000000;
import { setRoute } from '@/lib/features/routerSlice';
import { useEffect } from 'react';
const page = () => {
  const collections = useSelector(getCollections)
  const dispatch = useDispatch()
  const routeConfig = async () => {
    dispatch(setRoute({routeStr: 'Other'}))
  }
  const getCol_test = async () => {
    let col = await queryHelper('inj1j3de04txnndp94v37hfl0k906z0f47crrl0xm3', 'get_collections', {});
    console.log(col);
  }
  useEffect(() => {
    routeConfig()
    getCol_test()
  }, [])
  const tokens = useSelector(getTokens)
  const totalStaked = useSelector(getStakedTotalCOunt)
  const unStackNFT = async (token_id: string, index: number,Saddress: string, cTitle: string) => {
    const cAddress = cTitle.split('/')[0]
    const unStakeFee = useSelector(getUnstakeFee(cAddress))
    let ret = await unStakeHelper(
      Saddress,
      {
        unstake: {
          index: index,
        },
      },
      unStakeFee,
      DEFAULT_UNSTAKE_FEE
    );
    if (ret) {
      toast('NFT unStacking Success !', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success'
      });
      dispatch(setTokenUnStaked({
        collectionKey: cTitle,
        tokenId: token_id
      }))
    } else {
      toast('Error Occur ', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      });
    }
  }
  const unStakeAll = () => {
    Object.keys(tokens).length && Object.keys(tokens).map((el: string, index: number) => {
      const cAddress = el.split('/')[0]
      const Saddress = useSelector(getSaddress(cAddress))
      let stakedToken = tokens[el].staked
      for(let i =0;i<stakedToken.length; i++) {
        unStackNFT(stakedToken[i].token_id, i, Saddress, el)
      }
    })
  }
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-5">
        <div className="flex-between">
          <h3 className="text-2xl font-medium leading-10 tracking-[-0.02em] text-left text-dark-200">
            All Staked NFTs ({totalStaked})
          </h3>
        </div>
        <CustomBreakLine />
      </div>
      {Object.keys(tokens).length && Object.keys(tokens).map((el: string, index: number) => {
        return (
          <NFTCollectionShow key={index} title={el} tokens={tokens[el].staked.filter((el: Token) => el.start_timestamp >= el.end_timestamp)} />
        );
      })}
    </div>
  );
};

export default page;
