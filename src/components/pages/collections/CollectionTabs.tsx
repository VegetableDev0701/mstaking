'use client'
import { Collection } from "@/interface/collection";
import React, { useState } from "react";
import NFTCard from "@/components/shared/NFTCardSM";
import CustomBreakLine from "@/components/UI/CustomBreakLine";
import { StackHelper, unStakeHelper } from '@/helper/transaction'
import { Token } from "@/interface/token";
import {toast} from 'react-toastify';
import { setTokenStaked, setTokenUnStaked } from '@/lib/features/tokenSlice'
import { useDispatch } from "react-redux";
import { CollectionToken } from "@/interface/token";
const DEFAULT_UNSTAKE_FEE = 50000000;
const CollectionTabs = ({ tokens, selCollection }: { tokens: CollectionToken, selCollection: Collection }) => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState(1);
  const tabs = [
    {
      id: 1,
      name: "All NFTs",
    },
    {
      id: 2,
      name: "Staked",
    },
    {
      id: 3,
      name: "Available to Stake",
    },
  ];
  const allTokens = [...tokens.staked, ...tokens.unstaked]
  const stackNFT =async (token_id: string) => {
    let ret = await StackHelper(
      selCollection.Caddress,
      {
        send_nft: {
          contract: selCollection.Saddress,
          token_id: token_id,
          msg: '',
        },
      }
    );
    if (ret) {
      toast('NFT stacking Success !', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success'
      });
      dispatch(setTokenStaked({
        collectionKey: `${selCollection.Caddress}/${selCollection.Ctitle}`,
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

  const unStackNFT = async (token_id: string, index: number) => {
    debugger;
    let ret = await unStakeHelper(
      selCollection.Saddress,
      {
        unstake: {
          index: index,
        },
      },
      selCollection.unstake_fee,
      DEFAULT_UNSTAKE_FEE
    );
    if (ret) {
      toast('NFT unStacking Success !', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success'
      });
      dispatch(setTokenUnStaked({
        collectionKey: `${selCollection.Caddress}/${selCollection.Ctitle}`,
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

  return (
    <div className="flex flex-col gap-5">
      <div className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${
              activeTab === tab.id && "bg-dark-700"
            } px-3 py-1 text-dark-200 rounded-lg focus:outline-none`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <CustomBreakLine />

      {activeTab === 1 && (
        <div className="flex-start gap-x-6 flex-wrap gap-y-4">
          {tokens === undefined || tokens.staked.length === 0 && tokens.unstaked.length === 0 ? (
            <h1>No NFTs Found For This Collection.</h1>
          ) : (
            allTokens.map((nft: Token) => (
              (nft.start_timestamp > nft.end_timestamp && <NFTCard
                key={nft.token_id}
                tId={nft.token_id}
                address={nft.token_address}
                onClick={() => {}}
                status={nft.start_timestamp < nft.end_timestamp || nft.start_timestamp == 0 ? 'passive': 'staked'}
              />)
            ))
          )}
        </div>
      )}
      {activeTab === 2 && (
        <div className="flex-start gap-x-6 flex-wrap gap-y-4">
          {tokens === undefined ||
          tokens.staked.length === 0 ? (
            <h1>You Have No NFTs Staked In This Collection.</h1>
          ) : (
            tokens.staked.map((nft, ind) => (
              nft.start_timestamp > nft.end_timestamp && <NFTCard
                key={nft.token_id}
                tId={nft.token_id}
                address={nft.token_address}
                onClick={() => {unStackNFT(nft.token_id, ind)}}
                status={"staked"}
              />
            ))
          )}
        </div>
      )}
      {activeTab === 3 && (
        <div className="flex-start gap-x-6 flex-wrap gap-y-4">
          {tokens === undefined ||
          tokens.unstaked.length === 0 ? (
            <h1>No Availabe NFTs Found In This Collection.</h1>
          ) : (
            tokens.unstaked.map((nft) => (
              <NFTCard
                key={nft.token_id}
                tId={nft.token_id}
                address={nft.token_address}
                onClick={() => {stackNFT(nft.token_id)}}
                status={"active"}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CollectionTabs;
