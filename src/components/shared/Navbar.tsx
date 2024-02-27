"use client";
import React, { use } from "react";
import Image from "next/image";
import Button from "../UI/Button";
import WalletConnectButton from "./WalletConnectButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAddresses } from "@/services/wallet";
import { useState } from "react";
import { useEffect } from "react";
import { ADMIN_ADDRESS } from '@/constants/index'
import { useSelector } from "react-redux";
import { getSelectedCollection } from "@/lib/features/collectionSlice";
import { getRoute } from "@/lib/features/routerSlice";
import { Collection } from "@/interface/collection";
const Navbar = () => {
  const selCollection: Collection = useSelector(getSelectedCollection)
  const curRoute = useSelector(getRoute)
  console.log('navbar curRoute', curRoute)
  const router = useRouter();
  const [myAddr, setMyAddr] = useState('')
  console.log('navbar addr: ', myAddr)
  const addressConfirm = async () => {
    const add = (await getAddresses())[0]
    setMyAddr(add)
    
  }
  useEffect(() => {
    addressConfirm()
  }, [])
  return (
    <div className="h-[88px] px-8 py-6 border-b border-dark-600 bg-dark-800 flex-between w-full">
      <div className="flex-start gap-3">
        <Image src="/logo.svg" alt="INJ Staking" width={36} height={52} />
        <Link href="/">
          <h1 className="text-[32px] font-bold leading-[48px] tracking-normal text-left">
            INJSTAKING
          </h1>
        </Link>
      </div>
      <div className="flex-center gap-2">
        { curRoute == 'HOME' && <Button
          onClick={() => {
            router.push("/add-collection");
          }}
        >
          Add collection
        </Button>}
        { (selCollection.cAdmin == myAddr && curRoute == 'COLLECTION') && <Button onClick={() => {
          router.push(`/admin/${selCollection.Caddress}`)
        }}>Edit Collection</Button>}
        <WalletConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
