import React from "react";
import { DummyCollections } from "@/constants";
import CollectionCard from "@/components/shared/CollectionCard";
import CustomBreakLine from "@/components/UI/CustomBreakLine";

const page = () => {
  return (
    <div className="flex flex-col gap-3 max-md:gap-2">
      <h2 className="text-2xl font-medium leading-10 tracking-[-0.02em] text-left text-dark-200">
        All Collections
      </h2>
      <CustomBreakLine />
      <div className="flex flex-col gap-1">
        {DummyCollections.map((collection) => {
          return <CollectionCard key={collection.id} {...collection} />;
        })}
      </div>
    </div>
  );
};

export default page;
