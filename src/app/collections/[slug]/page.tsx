"use client";
import React from "react";
import { useParams } from "next/navigation";
import CollectionBanner from "@/components/pages/collections/CollectionBanner";
import CollectionTabs from "@/components/pages/collections/CollectionTabs";
import { getCollectionData, setSelectedCollection } from '@/lib/features/collectionSlice'
import { getCollectionTokens } from '@/lib/features/tokenSlice'
import { setRoute } from "@/lib/features/routerSlice";
import { useSelector, useDispatch } from "react-redux";
import { Token } from "@/interface/token";
import { Collection } from "@/interface/collection";
import { CollectionToken } from "@/interface/token";
import { useEffect } from "react";
import { DEFAULT_COLLECTION_IMG } from "@/constants";
import { getBackgroundUrl } from "@/helper/utils";
const Page = () => {
  const { slug: Caddress } = useParams();
  const dispatch = useDispatch()
  const selCollection: Collection = useSelector(getCollectionData(Caddress))
  const selCollectionTokens: CollectionToken = useSelector(getCollectionTokens(`${Caddress}/${selCollection.Ctitle}`))
  console.log('sel Collection TOkens', selCollectionTokens)
  const setSelCollection = async () => {
    dispatch(setSelectedCollection({Caddress}))
    dispatch(setRoute({routeStr:'COLLECTION'}))
  }
  useEffect(() => {
    setSelCollection()
  }, [])
  return selCollectionTokens ? (
    <div className="flex flex-col gap-5">
      <CollectionBanner
        backgroundImage={getBackgroundUrl(selCollection.CBackground)}
        imageUrl={getBackgroundUrl(selCollection.CBackground)}
        longTitle={selCollection?.Ctitle ? selCollection?.Ctitle : ''}
        description={selCollection?.Cdescription ? selCollection?.Cdescription : ''}
        staked={
          selCollectionTokens && selCollectionTokens.staked ? selCollectionTokens.staked.filter((el: Token) => el.start_timestamp/1000000 > el.end_timestamp).length.toString() : "0"
        }
        total={selCollectionTokens ? (selCollectionTokens.staked.filter((el: Token) =>  el.start_timestamp/1000000 > el.end_timestamp).length + selCollectionTokens.unstaked.length).toString() : "0"}
      />
      <CollectionTabs tokens={selCollectionTokens} selCollection={selCollection}/>
    </div>
  ) : (
    <div>
      <h1>Collection Not Found</h1>
    </div>
  );
};

export default Page;
