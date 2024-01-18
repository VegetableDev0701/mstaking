"use client";
import React from "react";
import Image from "next/image";
import { SideBarItems } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../UI/Button";
import CollectionsDropDown from "./drop-downs/Collections";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="px-6 py-8 border-r border-dark-600 flex flex-col h-full w-[358px] bg-dark-800 justify-between">
      <div className="flex flex-col gap-4 flex-1">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="input w-full border px-3 rounded-lg border-dark-700 bg-[#202020] pl-8 h-[40px]"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Image
              src="/icons/search.svg"
              alt="Search"
              width={16}
              height={16}
            />
          </span>
        </div>
        {SideBarItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link key={index} href={item.href}>
              <div
                className={`flex-start gap-3 p-2 rounded-lg text-dark-200 hover:text-white transition-colors ${
                  isActive && "bg-primary"
                }`}
              >
                <Image
                  src={item.imageUrl}
                  alt="sidebar-logo"
                  width={32}
                  height={32}
                />
                <span className="text-xl font-normal leading-[30px] tracking-normal text-left">
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
        <CollectionsDropDown />
      </div>
      <div className="flex flex-col gap-2">
        <Button onClick={() => {}}>Claim all rewards</Button>
        <Button onClick={() => {}} className="bg-secondary">
          Unstake All
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;