"use client";
import Button from "@/components/UI/Button";
import React from "react";
import { DummyCollections } from "@/constants";
import NFTCollectionShow from "@/components/pages/staked-nfts/NFTCollectionShow";
import CustomBreakLine from "@/components/UI/CustomBreakLine";

const page = () => {
  const totalStaked = 1255;
  return (
    <div className="flex flex-col gap-3 max-md:gap-2">
      <div className="flex flex-col gap-5 max-md:gap-2">
        <div className="flex-between">
          <h3 className="text-2xl font-medium leading-10 tracking-[-0.02em] text-left text-dark-200 max-md:text-[18px]">
            All Staked NFTs ({totalStaked})
          </h3>
          <Button className="bg-secondary" onClick={() => {}}>
            Unstake All
          </Button>
        </div>
        <CustomBreakLine />
      </div>
      <div className="flex flex-col gap-8 max-md:gap-12">
        {DummyCollections.slice(0, 5).map((collection) => {
          return (
            <NFTCollectionShow key={collection.id} collection={collection} />
          );
        })}
      </div>
    </div>
  );
};

export default page;
