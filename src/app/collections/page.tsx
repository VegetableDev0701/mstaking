'use client'
import React from "react";
import CollectionCard from "@/components/shared/CollectionCard";
import CustomBreakLine from "@/components/UI/CustomBreakLine";
import { IACollection } from '@/constants/collection'
import { getCollections } from '@/lib/features/collectionSlice'
import { useSelector } from "react-redux";
const page = () => {
  const collections = useSelector(getCollections)
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-medium leading-10 tracking-[-0.02em] text-left text-dark-200">
        All Collections
      </h2>
      <CustomBreakLine />
      <div className="flex flex-col gap-1">
        {collections.cols.map((collection: IACollection) => {
          return <CollectionCard key={collection._id} {...collection} />;
        })}
      </div>
    </div>
  );
};

export default page;
