import React from "react";
import CollectionCard from "../../../shared/CollectionCard";
import { Collection } from "@/types";

const TrendingCardShow = ({ collections }: { collections: Collection[] }) => {
  return (
    <div className="flex flex-col">
      {collections.map((collection) => {
        return <CollectionCard key={collection.id} {...collection} />;
      })}
    </div>
  );
};

export default TrendingCardShow;
