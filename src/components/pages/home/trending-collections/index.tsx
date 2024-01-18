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
      <div className="flex-center gap-5">
        <div className="flex-1">
          <TrendingCardShow collections={DummyCollections.slice(0, 4)} />
        </div>
        <div className="flex-1">
          <TrendingCardShow collections={DummyCollections.slice(4, 8)} />
        </div>
      </div>
    </div>
  );
};

export default TrendingCollections;
