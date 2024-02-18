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
import { DEFAULT_STD_FEE } from "@injectivelabs/sdk-ts";
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
    if (!selCollection.enabled) {
      toast('NFT stacking Not Allowed !', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      });
      return
    }
    let ret = await StackHelper(
      selCollection.Caddress,
      {
        send_nft: {
          contract: selCollection.Saddress,
          token_id: token_id,
          msg: '',
        },
      },
      selCollection.tx_fee
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

  const unStackNFT = async (token: Token, index: number) => {
    let fee = selCollection.unstake_fee
    if ( parseInt(selCollection.unstake_fee.amount) > 0 && selCollection.unstake_lock_period != 0 && (new Date().getTime() - token.end_timestamp) < selCollection.unstake_lock_period) {
      fee = selCollection.unstake_fee
    } else {
      fee = selCollection.tx_fee
    }
    if ( ((new Date().getTime()) - token.start_timestamp/1000000) < selCollection .unstake_lock_period ) {
      fee = DEFAULT_STD_FEE .amount
    }
    let ret = await unStakeHelper(
      selCollection.Saddress,
      {
        unstake: {
          index: index,
        },
      },
      fee
    );
    if (ret) {
      toast('NFT unStacking Success !', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success'
      });
      dispatch(setTokenUnStaked({
        collectionKey: `${selCollection.Caddress}/${selCollection.Ctitle}`,
        tokenId: token.token_id
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
            <>
            {
              tokens.staked.map((nft: Token, ind) => (
                nft.start_timestamp/1000000 > nft.end_timestamp && <NFTCard
                  key={nft.token_id}
                  tId={nft.token_id}
                  address={nft.token_address}
                  onClick={() => {unStackNFT(nft, ind)}}
                  status={"staked"}
                />
              ))
            }
            {
              tokens.unstaked.map((nft) => (
                <NFTCard
                  key={nft.token_id}
                  tId={nft.token_id}
                  address={nft.token_address}
                  onClick={() => {stackNFT(nft.token_id)}}
                  status={"active"}
                />
              ))
            }
            </>
/*             allTokens.map((nft: Token) => (
              (nft.start_timestamp >= nft.end_timestamp && <NFTCard
                key={nft.token_id}
                tId={nft.token_id}
                address={nft.token_address}
                onClick={() => {}}
                status={nft.start_timestamp < nft.end_timestamp || nft.start_timestamp == 0 ? 'passive': 'staked'}
              />)
            )) */
          )}
        </div>
      )}
      {activeTab === 2 && (
        <div className="flex-start gap-x-6 flex-wrap gap-y-4">
          {tokens === undefined ||
          tokens.staked.length === 0 ? (
            <h1>You Have No NFTs Staked In This Collection.</h1>
          ) : (
            tokens.staked.map((nft: Token, ind) => (
              nft.start_timestamp > nft.end_timestamp && <NFTCard
                key={nft.token_id}
                tId={nft.token_id}
                address={nft.token_address}
                onClick={() => {unStackNFT(nft, ind)}}
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
