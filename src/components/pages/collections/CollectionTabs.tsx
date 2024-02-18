'use client'
import { Collection } from "@/interface/collection";
import React, { useState } from "react";
import NFTCard from "@/components/shared/NFTCardSM";
import CustomBreakLine from "@/components/UI/CustomBreakLine";
import { StackHelper, unStakeHelper } from '@/helper/transaction'
import { Token } from "@/interface/token";
import {toast} from 'react-toastify';
import { 
  setTokenStaked,
  setTokenLocked, 
  setTokenUnStaked } from '@/lib/features/tokenSlice'
import { useDispatch } from "react-redux";
import { CollectionToken } from "@/interface/token";
import { DEFAULT_STD_FEE } from "@injectivelabs/sdk-ts";
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
  const stackNFT =async (token_id: string[]) => {
    if (!selCollection.cEnable) {
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
        multi_staking: {
          contract: selCollection.Saddress,
          token_id: token_id,
          msg: '',
        },
      },
      selCollection.cTxFee
    );
    if (ret) {
      toast('NFT stacking Success !', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success'
      });
      dispatch(setTokenStaked({
        collectionKey: `${selCollection.Caddress}`,
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

  const unstakeNFT1 = async (token: Token[]) => {
    if (token.length == 0) {
      toast('Please select NFT to Unstake', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      });
      return;
    }
    let tempToken: Token[] = token.filter((el: Token) => (el.token_stake_time / 1000000 + selCollection.cLockDur) < (new Date().getTime()))
    let ret = await unStakeHelper(
      selCollection.Saddress,
      {
        unstake: {
          token_id: tempToken.map((el: Token) => el.token_id),
        },
      },
      selCollection.cTxFee
    );
    if (ret) {
      toast('NFT locked Success !', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success'
      });
      dispatch(setTokenUnStaked({
        collectionKey: `${selCollection.Caddress}`,
        tokenId: tempToken.map((el: Token) => el.token_id)
      }))
    } else {
      toast('Error Occur ', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      });
    }
  }

  const unStackNFT2 = async (token: Token[]) => {
    if (token.length == 0) {
      toast('Please select NFT to Unstake', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      });
      return;
    }
    let tempToken: Token[] = token.filter((el:Token) => el.token_end_time == 0);
    if (tempToken.length > 0) {
      let stakable: Token[] = token.filter((el: Token) => el.token_stake_time == 0)
      if (stakable.length > 0) {
        toast('Please select only staked NFT to Unstake', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error'
        });
        return;
      }
      let ret = await unStakeHelper(
        selCollection.Saddress,
        {
          unstake: {
            token_id: tempToken.map((el: Token) => el.token_id),
          },
        },
        selCollection.cTxFee
      );
      if (ret) {
        toast('NFT locked Success !', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'success'
        });
        dispatch(setTokenLocked({
          collectionKey: `${selCollection.Caddress}`,
          tokenId: tempToken.map((el: Token) => el.token_id)
        }))
      } else {
        toast('Error Occur ', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error'
        });
      }
    } else {
      let ret = await unStakeHelper(
        selCollection.Saddress,
        {
          early_unstake: {
            token_id: token.map((el: Token) => el.token_id),
          },
        },
        {
          amount: parseInt(selCollection.cUnstakingFee.amount) * token.length,
          denom: selCollection.cUnstakingFee.denom
        }
      );
      if (ret) {
        toast('NFT unstaked Success !', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'success'
        });
        dispatch(setTokenUnStaked({
          collectionKey: `${selCollection.Caddress}`,
          tokenId: tempToken.map((el: Token) => el.token_id)
        }))
      } else {
        toast('Error Occur ', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error'
        });
      }
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
                nft.token_stake_time/1000000 >= nft.token_end_time/1000000 && <NFTCard
                  key={nft.token_id}
                  tId={nft.token_id}
                  address={selCollection.Caddress}
                  onClick={() => { selCollection.cModel ? unstakeNFT1([nft]): unStackNFT2([nft])}}
                  status={"staked"}
                />
              ))
            }
            {
              tokens.unstaked.map((nft) => (
                <NFTCard
                  key={nft.token_id}
                  tId={nft.token_id}
                  address={selCollection.Caddress}
                  onClick={() => {stackNFT([nft.token_id])}}
                  status={"active"}
                />
              ))
            }
            </>
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
              nft.token_stake_time > nft.token_end_time && <NFTCard
                key={nft.token_id}
                tId={nft.token_id}
                address={selCollection.Caddress}
                onClick={() => {selCollection.cModel ? unstakeNFT1([nft]): unStackNFT2([nft])}}
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
                address={selCollection.Caddress}
                onClick={() => {stackNFT([nft.token_id])}}
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
