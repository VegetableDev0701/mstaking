import React from "react";
import Image from "next/image";
import Link from "next/link";

interface FeaturedSectionProps {
  heading: string;
  sections: {
    id: string;
    name: string;
    imageUrl: string;
    href: string;
  }[];
}

const FeaturedSection = ({ heading, sections }: FeaturedSectionProps) => {
  return (
    <div className="flex flex-col gap-3 overflow-x-scroll no-scrollbar">
      <h2 className="text-2xl font-medium leading-10 tracking-[-0.02em] text-dark-200">
        {heading}
      </h2>
      <div className="flex-between min-w-[1014px] gap-5">
        {sections.map((section) => {
          return (
            <Link
              key={section.id}
              className="relative w-max overflow-hidden rounded-[18px]"
              href={section.href}
            >
              <div className="transition-transform hover:scale-105 transform-gpu">
                <Image
                  src={section.imageUrl}
                  alt={section.name}
                  width={338}
                  height={272}
                  quality={100}
                />
              </div>
              <p className="absolute bottom-0 left-0 text-white p-3 text-2xl font-medium leading-9 tracking-[-0.02em] text-left">
                {section.name}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedSection;
