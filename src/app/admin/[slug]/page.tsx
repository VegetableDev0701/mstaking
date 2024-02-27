"use client";
import React from "react";
import AdminCollectionCard from "@/components/pages/admin/AdminCollectionCard";
import { ADMIN_ADDRESS } from '@/constants'
import { useSelector } from "react-redux";
import { getAddress } from "@/lib/features/addressSlice";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { Collection } from "@/interface/collection";
import { getSelectedCollection } from "@/lib/features/collectionSlice";
import { useState } from "react";
import { DEFAULT_COLLECTION_IMG } from "@/constants";
const Page = () => {
  const { slug: Caddress } = useParams();
  const dispatch = useDispatch()
  const colData: Collection = useSelector(getSelectedCollection)
  const [CBackground ,setCBackground] = useState<string>(colData.cBkgimg)
  const myAddr = useSelector(getAddress)
  return myAddr === colData.cAdmin ? (
    <div>
      <div className="relative p-3 h-[272px]">
        <Image
          fill
          className="object-center object-cover pointer-events-none rounded-lg blur-sm"
          src={CBackground == "default" ? DEFAULT_COLLECTION_IMG : `${process.env.API_SERVER}/images${CBackground}`}
          alt={'Update Collection Information'}
          quality={100}
        />
      </div>
      <AdminCollectionCard colData={colData}/>
    </div>
  ) : (
    <div>
      <h1>Access required!</h1>
      <p>
        You are not authorized to access this page. Please contact the admin.
      </p>
    </div>
  );
};

export default Page;
