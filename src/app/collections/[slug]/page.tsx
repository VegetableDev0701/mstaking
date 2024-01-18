"use client";
import React from "react";
import { useParams } from "next/navigation";
import { DummyCollections } from "@/constants";
import CollectionBanner from "@/components/pages/collections/CollectionBanner";
import CollectionTabs from "@/components/pages/collections/CollectionTabs";

const Page = () => {
  const { slug: collectionName } = useParams();

  const collection = DummyCollections.find(
    (collection) =>
      typeof collectionName === "string" &&
      collection.name.toLowerCase() === collectionName.toLowerCase()
  );

  return collection ? (
    <div className="flex flex-col gap-5">
      <CollectionBanner
        backgroundImage={collection.bannerUrl}
        imageUrl={collection.imageUrl}
        longTitle={collection.longName}
        description={collection.description}
        staked={
          collection.stakedNfts ? collection.stakedNfts.length.toString() : "0"
        }
        total={collection.totalVolume.toString()}
      />
      <CollectionTabs collection={collection} />
    </div>
  ) : (
    <div>
      <h1>Collection Not Found</h1>
    </div>
  );
};

export default Page;
