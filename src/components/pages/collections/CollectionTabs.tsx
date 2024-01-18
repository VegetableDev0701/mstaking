import { Collection } from "@/types";
import React, { useState } from "react";
import NFTCard from "@/components/shared/NFTCard";
import CustomBreakLine from "@/components/UI/CustomBreakLine";

const CollectionTabs = ({ collection }: { collection: Collection }) => {
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
          {collection.nfts === undefined || collection.nfts?.length === 0 ? (
            <h1>No NFTs Found For This Collection.</h1>
          ) : (
            collection.nfts?.map((nft) => (
              <NFTCard
                key={nft.id}
                nft={nft}
                onClick={() => {}}
                status={"passive"}
              />
            ))
          )}
        </div>
      )}
      {activeTab === 2 && (
        <div className="flex-start gap-x-6 flex-wrap gap-y-4">
          {collection.stakedNfts === undefined ||
          collection.stakedNfts?.length === 0 ? (
            <h1>You Have No NFTs Staked In This Collection.</h1>
          ) : (
            collection.stakedNfts?.map((nft) => (
              <NFTCard
                key={nft.id}
                nft={nft}
                onClick={() => {}}
                status={"staked"}
              />
            ))
          )}
        </div>
      )}
      {activeTab === 3 && (
        <div className="flex-start gap-x-6 flex-wrap gap-y-4">
          {collection.stakedNfts === undefined ||
          collection.stakedNfts?.length === 0 ? (
            <h1>No Availabe NFTs Found In This Collection.</h1>
          ) : (
            collection.stakedNfts?.map((nft) => (
              <NFTCard
                key={nft.id}
                nft={nft}
                onClick={() => {}}
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
