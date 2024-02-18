import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IACollection } from '@/constants/collection'
import { DEFAULT_COLLECTION_IMG } from '@/constants'
import { Collection } from "@/interface/collection";
import { getBackgroundUrl } from "@/helper/utils";
interface FeaturedSectionProps {
  heading: string;
  collections: Collection[];
}

const FeaturedSection = ({ heading, collections }: FeaturedSectionProps) => {
  return (
    <div className="flex flex-col gap-3 overflow-x-scroll no-scrollbar">
      <h2 className="text-2xl font-medium leading-10 tracking-[-0.02em] text-dark-200">
        {heading}
      </h2>
      <div className="flex-between min-w-[1014px] gap-5">
        {collections.map((section, index) => {
          return (
            <Link
              key={index}
              className="relative w-max overflow-hidden rounded-[18px]"
              href={`/collections/${section.Caddress}`}
            >
              <div className="transition-transform hover:scale-105 transform-gpu">
                <Image
                  src={getBackgroundUrl(section.cBkgimg)}
                  alt={section.cTitle}
                  width={338}
                  height={272}
                  quality={100}
                />
              </div>
              <p className="absolute bottom-0 left-0 text-white p-3 text-2xl font-medium leading-9 tracking-[-0.02em] text-left">
                {section.cTitle}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedSection;
