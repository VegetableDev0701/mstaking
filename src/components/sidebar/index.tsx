"use client";
import React from "react";
import Image from "next/image";
import { SideBarItems } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../UI/Button";
import CollectionsDropDown from "./drop-downs/Collections";
import { getAddress } from "@/lib/features/addressSlice";
import { useSelector } from "react-redux";
import { ADMIN_ADDRESS } from '@/constants'
import { useState, useEffect } from "react";
import { getAddresses } from "@/services/wallet";
const Sidebar = () => {
  const pathname = usePathname();
  // const address = useSelector(getAddress)
  const [myAddr, setMyAddr] = useState('')
  const addressConfirm = async () => {
    const add = (await getAddresses())[0]
    setMyAddr(add)
    
  }
  useEffect(() => {
    addressConfirm()
  }, [])
  return (
    <div className="px-6 py-8 border-r border-dark-600 flex flex-col h-full w-[358px] bg-dark-800 justify-between overflow-scroll no-scrollbar">
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

        {myAddr === ADMIN_ADDRESS && (
          <Link href="/owner-panel">
            <div
              className={`flex-start gap-3 p-2 rounded-lg text-dark-200 hover:text-white transition-colors ${
                pathname === "/owner-panel" && "bg-primary"
              }`}
            >
              <Image
                src="/icons/filter.svg"
                alt="sidebar-logo"
                width={32}
                height={32}
              />
              <span className="text-xl font-normal leading-[30px] tracking-normal text-left">
                Owner Panel
              </span>
            </div>
          </Link>
        )}

        <CollectionsDropDown />
      </div>
    </div>
  );
};

export default Sidebar;
