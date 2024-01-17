"use client";
import React, { useState } from "react";
import Image from "next/image";

const CollectionsDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapse bg-transparent rounded-lg">
      <div
        onClick={handleToggle}
        className={`collapse-title flex-start gap-3 p-2 rounded-lg text-dark-200 ${
          isOpen ? "bg-primary" : "transparent"
        }`}
      >
        <Image
          src="/icons/user.svg"
          alt="sidebar-logo"
          width={32}
          height={32}
        />
        <div className="flex-between w-full">
          <span className="text-xl font-normal leading-[30px] tracking-normal text-left">
            Collections
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
          className="collapse-content  text-red-300"
          style={{
            visibility: isOpen ? "visible" : "hidden",
            minHeight: isOpen ? "100%" : "0",
            minWidth: isOpen ? "100%" : "0",
            height: isOpen ? "max-content" : "0",
          }}
        >
          <p>hello</p>
        </div>
      )}
    </div>
  );
};

export default CollectionsDropDown;
