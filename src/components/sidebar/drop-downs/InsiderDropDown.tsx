"use client";
import React, { useState } from "react";
import Image from "next/image";
// import { Collection } from "@/types";
import DropDownCard from "./DropDownCard";
import { Collection } from "@/interface/collection";
import { DEFAULT_COLLECTION_IMG } from '@/constants/index'
interface InsiderDropDownsProps {
  header: string;
  collections: Collection[];
  initialOpen: boolean;
}

const InsiderDropDowns = ({
  header,
  collections,
  initialOpen,
}: InsiderDropDownsProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapse bg-transparent rounded-none">
      <div
        onClick={handleToggle}
        className={`collapse-title flex-start gap-3 p-2 border-b-2 rounded-none text-dark-200 bg-transparent border-dark-700`}
      >
        <div className="flex-between w-full">
          <span className="text-xl font-normal leading-[30px] tracking-normal text-left">
            {header}
          </span>
          {isOpen ? (
            <Image
              src="/icons/arrow-up.svg"
              width={18}
              height={18}
              alt="arrow-icon"
            />
          ) : (
            <Image
              src="/icons/arrow-up.svg"
              width={18}
              height={18}
              alt="arrow-icon"
              className="transform rotate-180"
            />
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="collapse-content text-red-300 rounded-none px-0 mt-3"
          style={{
            visibility: isOpen ? "visible" : "hidden",
            minHeight: isOpen ? "100%" : "0",
            minWidth: isOpen ? "100%" : "0",
            height: isOpen ? "max-content" : "0",
          }}
        >
          <div className="flex flex-col gap-4">
            {collections.map((item: Collection, index) => {
              return (
                <DropDownCard
                  key={index}
                  name={item.Ctitle}
                  cAddress={item.Caddress}
                  imageURL={item.CBackground == "default" ? DEFAULT_COLLECTION_IMG : `${process.env.API_SERVER}/images${item.CBackground}`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default InsiderDropDowns;
