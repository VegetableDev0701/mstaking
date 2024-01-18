import Button from "@/components/UI/Button";
import NFTCard from "@/components/shared/NFTCard";
import { Collection } from "@/types";
import React from "react";

const NFTCollectionShow = ({ collection }: { collection: Collection }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex-between">
        <h3 className="text-2xl font-medium leading-10 tracking-[-0.02em] text-left text-dark-200">
          {collection.name} ({collection.nfts?.length || 0})
        </h3>
        <Button className="bg-secondary" onClick={() => {}}>
          Unstake Full Collection
        </Button>
      </div>
      <div className="flex-start gap-x-6 flex-wrap gap-y-4">
        {collection.nfts?.map((nft) => {
          return (
            <NFTCard
              key={nft.id}
              nft={nft}
              onClick={() => {}}
              status="staked"
            />
          );
        })}
      </div>
    </div>
  );
};

export default NFTCollectionShow;
