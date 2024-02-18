'use client'
import React from "react";
import CollectionCard from "@/components/shared/CollectionCard";
import CustomBreakLine from "@/components/UI/CustomBreakLine";
import { Collection } from "@/interface/collection";
import { getCollections } from '@/lib/features/collectionSlice'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setRoute } from "@/lib/features/routerSlice";
const page = () => {
  const collections = useSelector(getCollections)
  const dispatch = useDispatch()
  const routeConfig = async () => {
    dispatch(setRoute({routeStr: 'Other'}))
  }
  useEffect(() => {
    routeConfig()
  }, [])
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-medium leading-10 tracking-[-0.02em] text-left text-dark-200">
        All Collections
      </h2>
      <CustomBreakLine />
      <div className="flex flex-col gap-1">
        {collections.map((collection: Collection) => {
          return <CollectionCard key={collection._id}
            _id={collection._id}
            Caddress={collection.Caddress}
            cTitle={collection.cTitle}
            Saddress={collection.Saddress}
            cDescription={collection.cDescription}
            cBkgimg={collection.cBkgimg}
          />;
        })}
      </div>
    </div>
  );
};

export default page;
