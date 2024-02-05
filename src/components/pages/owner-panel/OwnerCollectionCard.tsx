"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import OwnerCollectionCardContent from "./OwnerCollectionCardContent";

const OwnerCollectionCard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <>
      <div
        className="w-full px-2 rounded-lg bg-dark-700 cursor-pointer"
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
        }}
      >
        <div className="pl-0 pr-2 py-2 w-full h-full flex items-center justify-start gap-3">
          <span className="text-sm font-medium leading-4 tracking-[-0.01em] text-left text-dark-200">
            1
          </span>
          <div className="flex items-center justify-start gap-2 w-full">
            <Image
              src="/assets/sample-nft.png"
              alt="collection-banner"
              width={44}
              height={44}
              className="rounded-[9px]"
            />
            <div className="flex items-center justify-start gap-1">
              <h3 className="text-xl font-bold leading-[19px] tracking-normal text-left">
                RTFKT
              </h3>
              <Image
                src="/icons/verified.svg"
                alt="verified"
                width={16}
                height={16}
              />
            </div>
          </div>
          <div>
            {isDropdownOpen ? (
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
      </div>
      {isDropdownOpen && (
        <div className="mt-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <OwnerCollectionCardContent setDropdown={setIsDropdownOpen} />
          </motion.div>
        </div>
      )}
    </>
  );
};

export default OwnerCollectionCard;
