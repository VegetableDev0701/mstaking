import { toast } from 'react-toastify'
import Button from "@/components/UI/Button";
import NFTCard from "@/components/shared/NFTCardSM";
import React from "react";
import { Token } from "@/interface/token";
import { unStakeHelper } from "@/helper/transaction";
import { useDispatch, useSelector } from "react-redux";
import { setTokenUnStaked, setTokenLocked } from '@/lib/features/tokenSlice';
import { Collection } from '@/interface/collection';
import { useState } from 'react';
const DEFAULT_UNSTAKE_FEE = 50000000;

const NFTCollectionShow = ({ tokens, colData }: { tokens: Token[], colData: Collection }) => {
  const [colTokens, setColTokens] = useState<Token[]>(tokens);
  const cTitle = colData.cTitle
  const cAddress = colData.Caddress
  const Saddress = colData.Saddress
  const unStakeFee = colData.cUnstakingFee
  const [selToken, setSelToken] = useState<string[]>([])
  const dispatch = useDispatch()
  const setTokenUnstake = (ts: Token[]) => {
    setColTokens([...colTokens.filter((el: Token) => ts.findIndex((ele: Token) => ele.token_id == el.token_id) == -1)])
  }
  const unstakAll1 = async () => {
    if (selToken.length == 0) {
      toast('No NFT to Unstake', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      });
      return;
    }
    let tempToken: Token[] = colTokens.filter((el: Token) => selToken.findIndex(t => el.token_id == t) != -1 )
    tempToken = tempToken.filter((el: Token) => el.token_lock_time / 1000000 < (new Date().getTime()))
    let ret = await unStakeHelper(
      colData.Saddress,
      {
        unstake: {
          token_id: tempToken.map((el: Token) => el.token_id),
        },
      },
      colData.cTxFee
    );
    if (ret) {
      toast('NFT locked Success !', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success'
      });
      dispatch(setTokenUnStaked({
        collectionKey: `${colData.Caddress}`,
        tokenId: tempToken.map((el: Token) => el.token_id)
      }))
      setTokenUnstake(colTokens)
    } else {
      toast('Error Occur ', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      });
    }
  }
  const unstakAll2 = async () => {
    if (selToken.length == 0) {
      toast('No NFT to Unstake', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
      });
      return;
    }
    let tempToken: Token[] = colTokens.filter((el: Token) => selToken.findIndex(t => el.token_id == t) != -1 )
    tempToken = tokens.filter((el: Token) => el.token_end_time == 0);
    if (tempToken.length > 0) {
      let stakable: Token[] = tokens.filter((el: Token) => el.token_stake_time == 0)
      if (stakable.length > 0) {
        toast('Please select only staked NFT to Unstake', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error'
        });
        return;
      }
      let ret = await unStakeHelper(
        colData.Saddress,
        {
          nft_lock: {
            token_id: tempToken.map((el: Token) => el.token_id),
          },
        },
        colData.cTxFee
      );
      if (ret) {
        toast('NFT locked Success !', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'success'
        });
        dispatch(setTokenLocked({
          collectionKey: `${colData.Caddress}`,
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
      tempToken = colTokens.filter((el: Token) => selToken.findIndex(t => el.token_id == t) != -1 )
      let ret = await unStakeHelper(
        colData.Saddress,
        {
          early_unstake: {
            token_id: tempToken.map((el: Token) => el.token_id),
          },
        },
        {
          amount: parseInt(colData.cUnstakingFee.amount) * tempToken.length,
          denom: colData.cUnstakingFee.denom
        }
      );
      if (ret) {
        toast('NFT unstaked Success !', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'success'
        });
        dispatch(setTokenUnStaked({
          collectionKey: `${colData.Caddress}`,
          tokenId: tempToken.map((el: Token) => el.token_id)
        }))
        setTokenUnstake(tempToken)
      } else {
        toast('Error Occur ', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error'
        });
      }
    }
  }
  const addSelToken = (idx: string ) => {
    setSelToken([...selToken, idx])
  }
  return (
    <div className="flex flex-col gap-5">
      <div className="flex-between">
        <h3 className="text-2xl font-medium leading-10 tracking-[-0.02em] text-left text-dark-200">
          {cTitle} ({tokens.length || 0})
        </h3>
        {tokens.length ?
          <Button className="bg-secondary" onClick={() => { 
            setSelToken([...colTokens.map((el: Token) => el.token_id)]);
            colData.cModel ? unstakAll1() : unstakAll2(); }}>
            Unstake Full Collection
          </Button> : ''}
      </div>
      <div className="flex-start gap-x-6 flex-wrap gap-y-4">
        {tokens?.map((nft, ind) => {
          return (
            nft.token_stake_time >= nft.token_end_time && <NFTCard
              key={ind}
              address={colData.Caddress}
              tData={nft}
              onClick={() => { colData.cModel ? unstakAll1() : unstakAll2() }}
              status="staked"
              onSelect={(idx: string) => setSelToken([...selToken, idx])}
              onUnSelect={(idx: string) => setSelToken([...selToken.filter((el: string) => el != idx)])}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NFTCollectionShow;
