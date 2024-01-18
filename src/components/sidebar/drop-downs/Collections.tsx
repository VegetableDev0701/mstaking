import React, { useState } from "react";
import Image from "next/image";
import InsiderDropDowns from "./InsiderDropDown";
import { DummyCollections } from "@/constants";
import { AnimatePresence, motion } from "framer-motion";

const CollectionsDropDown = () => {
  const [isOpen, setIsOpen] = useState(true);

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
          isOpen ? "bg-primary" : "bg-transparent"
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
            Collections
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
            className="absolute left-0 w-full mt-2 bg-transparent rounded-lg max-h-[78%] overflow-y-scroll no-scrollbar"
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col gap-3">
              <InsiderDropDowns
                collections={DummyCollections.slice(0, 2)}
                header="Staked"
                initialOpen={true}
              />
              <InsiderDropDowns
                collections={DummyCollections.slice(2, 4)}
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
