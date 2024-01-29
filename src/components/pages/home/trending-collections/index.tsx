import React from "react";
import { DummyCollections } from "@/constants";
import TrendingCardShow from "./TrendingCardShow";
import Link from "next/link";
import { IACollection } from '@/constants/collection'
import { useDispatch, useSelector } from "react-redux";
import { getCollections } from '@/lib/features/collectionSlice'
import { Collection } from "@/interface/collection";
interface TrendingCollections {
  sections: IACollection[];
}

interface ICollections {
  cols: IACollection[]
}

const TrendingCollections = () => {
  const collections: Collection[] = useSelector(getCollections)
  const leftCollections = collections.filter((el, ind) => ind % 2 == 0 )
  const rightCollections = collections.filter((el, ind) => ind % 2 == 1)
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex-between">
        <h2 className="text-2xl font-medium leading-10 tracking-[-0.02em] text-left text-dark-200">
          Trending Collections
        </h2>
        <Link
          href="/collections"
          className="text-sm font-medium leading-6 tracking-[-0.02em] text-left text-dark-200 hover:text-white transition-all"
        >
          View all
        </Link>
      </div>
      <div className="flex-center gap-5 border-t-2 border-dark-700">
        <div className="flex-1">
          <TrendingCardShow collections={leftCollections} />
        </div>
        <div className="flex-1">
          <TrendingCardShow collections={rightCollections} />
        </div>
      </div>
    </div>
  );
};

export default TrendingCollections;
