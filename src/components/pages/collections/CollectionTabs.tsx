'use client'
import { Collection } from "@/interface/collection";
import React, { useState } from "react";
import NFTCard from "@/components/shared/NFTCardSM";
import CustomBreakLine from "@/components/UI/CustomBreakLine";
import { StackHelper, unStakeHelper } from '@/helper/transaction'
import { getCollectionTokens } from '@/lib/features/tokenSlice'
import { Token } from "@/interface/token";
import { toast } from 'react-toastify';
import {
  setTokenStaked,
  setTokenLocked,
  setTokenUnStaked
} from '@/lib/features/tokenSlice'
import { useDispatch } from "react-redux";
import { CollectionToken } from "@/interface/token";
import { useSelector } from "react-redux";
const CollectionTabs = ({ selCollection }: {selCollection: Collection }) => {
  const dispatch = useDispatch()
  const tokens: CollectionToken = useSelector(getCollectionTokens(`${selCollection.Caddress}`))
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
  const [selToken, setSelToken] = useState<string[]>([])
  const stackNFT = async () => {
    debugger
    console.log(selToken)
    if (selToken.length == 0) {
      toast('Please select Tokens to stake !', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      });
      setSelToken([])
      return
    }
    if (!selCollection.cEnable) {
      toast('NFT stacking Not Allowed !', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      });
      setSelToken([])
      return
    }
    let ret = await StackHelper(
      selCollection.Saddress,
      {
        multi_staking: {
          token_id: selToken,
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
        tokenId: selToken,
        cLock: selCollection.cModel ? (new Date().getTime() * 1000000 + selCollection.cLockDur * 1000000000) : 0
      }))
    } else {
      toast('Error Occur ', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      });
    }
    setSelToken([])
  }

  const unstakeNFT1 = async () => {
    if (selToken.length == 0) {
      toast('Please select NFT to Unstake', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      });
      setSelToken([])
      return;
    }
    let tempToken: Token[] = tokens.staked.filter((el: Token) => selToken.findIndex((idx) => idx == el.token_id) != -1)
    tempToken = tempToken.filter((el: Token) => (el.token_lock_time / 1000000 ) <= (new Date().getTime()))
    if (selToken.length > tempToken.length) {
      toast('Please select unstakable NFT', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      });
      setSelToken([])
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
    setSelToken([])
  }

  const unStackNFT2 = async () => {
    debugger
    if (selToken.length == 0) {
      toast('Please select NFT to Unstake', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      });
      setSelToken([])
      return;
    }
    let selTokens: Token[] = tokens.staked.filter((el: Token) => selToken.findIndex((idx) => idx == el.token_id) != -1)
    let tempToken = selTokens.filter((el: Token) => el.token_lock_time == 0);
    if (tempToken.length != 0 && selToken.length != tempToken.length) {
      toast('Please select only unlocked or locked NFT', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      });
      setSelToken([])
      return;
    }
    let stakable: Token[] = selTokens.filter((el: Token) => el.token_stake_time == 0)
    if (stakable.length > 0) {
      toast('Please select only staked NFT to Unstake', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      });
      setSelToken([])
      return;
    }
    if (tempToken.length == 0 ) {
      let ret = await unStakeHelper(
        selCollection.Saddress,
        {
          early_unstake: {
            token_id: selTokens.map((el: Token) => el.token_id),
          },
        },
        {
          amount: parseInt(selCollection.cUnstakingFee.amount) * selTokens.length,
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
          tokenId: selTokens.map((el: Token) => el.token_id)
        }))
      } else {
        toast('Error Occur ', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error'
        });
      }
    } else {
      debugger
      let ret = await unStakeHelper(
        selCollection.Saddress,
        {
          nft_lock: {
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
          tokenId: tempToken.map((el: Token) => el.token_id),
          cLock: (new Date().getTime() * 1000000 + selCollection.cLockDur * 1000000000)
        }))
      } else {
        toast('Error Occur ', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error'
        });
      }
    }
    setSelToken([])
  }
  const addSelToken = (idx: string ) => {
    setSelToken([...selToken, idx])
  }
  const canBeVisible = (token: Token) => {
    if (selCollection.cModel) {
      if (token.token_stake_time > token.token_end_time) return true
      return false
    } else {
      if (token.token_end_time != 0 && (token.token_end_time / 1000000 + selCollection.cLockDur * 1000) < (new Date().getTime())) return true
      return false
    }
  }
  return (
    <div className="flex flex-col gap-5">
      <div className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${activeTab === tab.id && "bg-dark-700"
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
                  /* canBeVisible(nft) &&  */<NFTCard
                    key={nft.token_id}
                    tData={nft}
                    address={selCollection.Caddress}
                    onClick={() => { selCollection.cModel ? unstakeNFT1() : unStackNFT2() }}
                    status={"staked"}
                    onSelect={(idx: string) => setSelToken([...selToken, idx])}
                    onUnSelect={(idx: string) => setSelToken([...selToken.filter((el: string) => el != idx)])}
                  />
                ))
              }
              {
                tokens.unstaked.map((nft) => (
                  <NFTCard
                    key={nft.token_id}
                    tData={nft}
                    address={selCollection.Caddress}
                    onClick={() => { stackNFT() }}
                    status={"active"}
                    onSelect={(idx: string) => addSelToken(idx)}
                    onUnSelect={(idx: string) => setSelToken([...selToken.filter((el: string) => el != idx)])}
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
              /* canBeVisible(nft) &&  */<NFTCard
                key={nft.token_id}
                tData={nft}
                address={selCollection.Caddress}
                onClick={() => { selCollection.cModel ? unstakeNFT1() : unStackNFT2() }}
                status={"staked"}
                onSelect={(idx: string) => setSelToken([...selToken, idx])}
                onUnSelect={(idx: string) => setSelToken([...selToken.filter((el: string) => el != idx)])}
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
                tData={nft}
                address={selCollection.Caddress}
                onClick={() => { stackNFT() }}
                status={"active"}
                onSelect={(idx: string) => setSelToken([...selToken, idx])}
                onUnSelect={(idx: string) => setSelToken([...selToken.filter((el: string) => el != idx)])}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CollectionTabs;
