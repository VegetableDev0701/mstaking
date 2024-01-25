"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "../UI/Button";
import WalletConnectButton from "./WalletConnectButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MobileSideBar from "../sidebar/MobileSideBar";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const router = useRouter();
  return (
    <>
      <div className="h-[88px] px-8 py-6 border-b border-dark-600 bg-dark-800 flex-between w-full max-md:p-4">
        <div className="flex-start gap-3">
          <Image src="/logo.svg" alt="INJ Staking" width={36} height={52} />
          <Link href="/">
            <h1 className="text-[32px] font-bold leading-[48px] tracking-normal text-left">
              INJSTAKING
            </h1>
          </Link>
        </div>
        <div className="flex-center gap-2 max-md:hidden">
          <Button
            onClick={() => {
              router.push("/add-collection");
            }}
          >
            Add collection
          </Button>
          <WalletConnectButton />
        </div>
        <div
          className="flex-center h-full cursor-pointer rounded-lg bg-primary-gradient px-3 py-2 text-white md:hidden"
          onClick={() => toggleDrawer()}
        >
          {!isDrawerOpen ? (
            <motion.img
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.4, ease: "linear" }}
              src="/icons/hamburger.svg"
              width={22}
              height={22}
              alt="burger-icon"
              key="hamburger-icon"
            />
          ) : (
            <motion.img
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.4, ease: "linear" }}
              src="/icons/close.svg"
              width={22}
              height={22}
              alt="close-icon"
              key="close-icon"
            />
          )}
        </div>
      </div>
      <MobileSideBar
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        renderSide="left"
      ></MobileSideBar>
    </>
  );
};

export default Navbar;
