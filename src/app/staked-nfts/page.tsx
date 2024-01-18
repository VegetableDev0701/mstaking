"use client";
import Button from "@/components/UI/Button";
import React from "react";
import { DummyCollections } from "@/constants";
import NFTCollectionShow from "@/components/pages/staked-nfts/NFTCollectionShow";

const page = () => {
  const totalStaked = 1255;
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-5">
        <div className="flex-between">
          <h3 className="text-2xl font-medium leading-10 tracking-[-0.02em] text-left text-dark-200">
            All Staked NFTs ({totalStaked})
          </h3>
          <Button className="bg-secondary" onClick={() => {}}>
            Unstake All
          </Button>
        </div>
        <div className="divider text-dark-700 m-0"></div>
      </div>
      {DummyCollections.slice(0, 5).map((collection) => {
        return (
          <NFTCollectionShow key={collection.id} collection={collection} />
        );
      })}
    </div>
  );
};

export default page;
