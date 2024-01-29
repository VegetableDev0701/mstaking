import {toast} from 'react-toastify'
import Button from "@/components/UI/Button";
import NFTCard from "@/components/shared/NFTCardSM";
import React from "react";
import { Token } from "@/interface/token";
import { unStakeHelper } from "@/helper/transaction";
import { getSaddress, getUnstakeFee } from "@/lib/features/collectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { setTokenUnStaked } from '@/lib/features/tokenSlice';
const DEFAULT_UNSTAKE_FEE = 50000000;

const NFTCollectionShow = ({ tokens, title }: { tokens: Token[], title: string }) => {
  const cTitle = title.split('/')[1]
  const cAddress = title.split('/')[0]
  const Saddress = useSelector(getSaddress(cAddress))
  const unStakeFee = useSelector(getUnstakeFee(cAddress))
  const dispatch = useDispatch()
  const unStackNFT = async (token_id: string, index: number) => {
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
  const unStakeAllNFT = () => {
    for(let i =0;i<tokens.length; i++ ){
      if (tokens[i].end_timestamp < tokens[i].start_timestamp) {
        unStackNFT(tokens[i].token_id, i)
      }
    }
  }
  return (
    <div className="flex flex-col gap-5">
      <div className="flex-between">
        <h3 className="text-2xl font-medium leading-10 tracking-[-0.02em] text-left text-dark-200">
          {cTitle} ({tokens.length || 0})
        </h3>
        <Button className="bg-secondary" onClick={() => {}}>
          Unstake Full Collection
        </Button>
      </div>
      <div className="flex-start gap-x-6 flex-wrap gap-y-4">
        {tokens?.map((nft, ind) => {
          return (
            nft.start_timestamp> nft.end_timestamp && <NFTCard
              key={ind}
              address={nft.token_address}
              tId={nft.token_id}
              onClick={() => {unStakeAllNFT()}}
              status="staked"
            />
          );
        })}
      </div>
    </div>
  );
};

export default NFTCollectionShow;
