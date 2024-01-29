import React from "react";
import CollectionCard from "../../../shared/CollectionCard";
import { Collection } from "@/types";
import { IACollection } from '@/constants/collection'

const TrendingCardShow = ({ collections }: { collections: IACollection[] }) => {
  return (
    <div className="flex flex-col pt-2">
      {collections.map((collection) => {
        return <CollectionCard key={collection._id} {...collection} />;
      })}
    </div>
  );
};

export default TrendingCardShow;
