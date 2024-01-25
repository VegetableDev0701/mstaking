import React from "react";
import { DummyCollections } from "@/constants";
import TrendingCardShow from "./TrendingCardShow";
import Link from "next/link";

const TrendingCollections = () => {
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
      <div className="flex-center gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex-1 w-full border-t-2 border-dark-700 pt-2">
          <TrendingCardShow collections={DummyCollections.slice(0, 4)} />
        </div>
        <div className="flex-1 w-full border-t-2 border-dark-700 pt-2 max-md:border-0 max-md:pt-0">
          <TrendingCardShow collections={DummyCollections.slice(4, 8)} />
        </div>
      </div>
    </div>
  );
};

export default TrendingCollections;
