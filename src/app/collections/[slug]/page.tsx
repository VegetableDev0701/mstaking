"use client";
import React from "react";
import { useParams } from "next/navigation";
import CollectionBanner from "@/components/pages/collections/CollectionBanner";
import CollectionTabs from "@/components/pages/collections/CollectionTabs";
import { getCollectionData } from "@/lib/features/collectionSlice";
import {
  setCollectionTokens,
  getCollectionTokens,
} from "@/lib/features/tokenSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCollectionNFT, getSMNFT } from "@/helper/queryHelper";
import { Token } from "@/interface/token";
import { useEffect } from "react";
import { Collection } from "@/interface/collection";
import { CollectionToken } from "@/interface/token";
const Page = () => {
  const dispatch = useDispatch();
  const { slug: Caddress } = useParams();
  const selCollection: Collection = useSelector(getCollectionData(Caddress));
  const getNFTData = async () => {
    const collectionNFT = await getCollectionNFT(Caddress);
    const smNFT = await getSMNFT(selCollection.Saddress);
    dispatch(
      setCollectionTokens({
        keyname: `${Caddress}/${selCollection.Ctitle}`,
        tokens: {
          unstaked: collectionNFT,
          staked: smNFT,
        },
      })
    );
  };
  useEffect(() => {
    getNFTData();
  }, []);
  const selCollectionTokens: CollectionToken = useSelector(
    getCollectionTokens(`${Caddress}/${selCollection.Ctitle}`)
  );

  return selCollectionTokens ? (
    <div className="flex flex-col gap-5">
      <CollectionBanner
        backgroundImage={
          selCollection?.CBackground ? selCollection?.CBackground : ""
        }
        imageUrl={selCollection?.CBackground ? selCollection?.CBackground : ""}
        longTitle={selCollection?.Ctitle ? selCollection?.Ctitle : ""}
        description={
          selCollection?.Cdescription ? selCollection?.Cdescription : ""
        }
        staked={
          selCollectionTokens
            ? selCollectionTokens.staked
                .filter((el: Token) => el.start_timestamp > el.end_timestamp)
                .length.toString()
            : "0"
        }
        total={
          selCollectionTokens
            ? (
                selCollectionTokens.staked.filter(
                  (el: Token) => el.start_timestamp > el.end_timestamp
                ).length + selCollectionTokens.unstaked.length
              ).toString()
            : "0"
        }
      />
      <CollectionTabs
        tokens={selCollectionTokens}
        selCollection={selCollection}
      />
    </div>
  ) : (
    <div>
      <h1>Collection Not Found</h1>
    </div>
  );
};

export default Page;
