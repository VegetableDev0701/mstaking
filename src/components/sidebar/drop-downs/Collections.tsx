"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import InsiderDropDowns from "./InsiderDropDown";
import { AnimatePresence, motion } from "framer-motion";
import { getCollections } from "@/lib/features/collectionSlice";
import { getTokens } from '@/lib/features/tokenSlice'
import { useSelector } from "react-redux";
import { Token } from "@/interface/token";
const CollectionsDropDown = () => {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const collections = useSelector(getCollections)
  const tokens = useSelector(getTokens)
  useEffect(() => {
    setHasHydrated(true);
    const savedState = localStorage.getItem("collectionsDropdownState");
    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    if (hasHydrated) {
      localStorage.setItem("collectionsDropdownState", JSON.stringify(isOpen));
    }
  }, [isOpen, hasHydrated]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const variants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 },
  };

  return (
    <div className="relative flex-1">
      <button
        onClick={handleToggle}
        className={`flex justify-between items-center w-full p-2 rounded-lg text-dark-200 ${
          isOpen ? "bg-dark-500" : "bg-transparent"
        }`}
      >
        <div className="flex-start gap-3">
          <Image
            src="/icons/user.svg"
            alt="sidebar-logo"
            width={32}
            height={32}
          />
          <span className="text-xl font-normal leading-[30px] tracking-normal text-left">
            My Collections
          </span>
        </div>
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
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute left-0 w-full mt-2 bg-transparent rounded-lg max-h-[70%] overflow-y-scroll no-scrollbar"
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col gap-3">
              <InsiderDropDowns
                collections={collections.filter((el: any) => tokens && tokens[`${el.Caddress}`] && tokens[`${el.Caddress}`].staked.filter((el: Token) => el.token_stake_time >el.token_end_time).length != 0)}
                header="Staked"
                initialOpen={true}
              />
              <InsiderDropDowns
                collections={collections.filter((el: any) =>  tokens && tokens[`${el.Caddress}`] && tokens[`${el.Caddress}`].staked.filter((el: Token) => el.token_stake_time >el.token_end_time).length == 0)}
                header="Available"
                initialOpen={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollectionsDropDown;
