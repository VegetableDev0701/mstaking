"use client";
import React from "react";
import Image from "next/image";
import CollectionBannerDescription from "./CollectionBannerDescription";
import { DEFAULT_COLLECTION_IMG } from '@/constants'
interface CollectionBannerProps {
  backgroundImage: string;
  imageUrl: string;
  longTitle: string;
  description: string;
  staked: string;
  total: string;
}

const CollectionBanner = ({
  backgroundImage,
  imageUrl,
  longTitle,
  description,
  staked,
  total,
}: CollectionBannerProps) => {
  return (
    <div className="relative p-3 h-[272px]">
      <Image
        fill
        className="object-center object-cover pointer-events-none rounded-lg blur-sm"
        src={backgroundImage}
        alt={longTitle}
        quality={100}
      />
      <div className="absolute z-1 bottom-5 left-3">
        <div className="flex-center gap-3">
          <Image src={imageUrl} width={120} height={120} alt="arrow-icon" />
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-medium leading-9 tracking-[-0.02em] text-left">
              {longTitle}
            </h3>
            <CollectionBannerDescription
              collectionImgUrl={imageUrl}
              description={description}
              longTitle={longTitle}
            />
            <p className="text-lg font-medium leading-[27px] tracking-[-0.02em] text-left">
              Staked{" "}
              <span className="font-bold">
                <span className="text-green">{staked}</span> / {total}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionBanner;
