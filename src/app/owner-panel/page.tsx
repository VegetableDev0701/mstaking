'use client'
import OwnerCollectionCard from "@/components/pages/owner-panel/OwnerCollectionCard";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCollections } from "@/lib/features/collectionSlice";
import { Collection } from "@/interface/collection";
const Page = () => {
  const collections = useSelector(getCollections)
  const [activeTab, setActiveTab] = React.useState("collections");
  return (
    <div>
      {
        collections && collections.map((col: Collection, index: number) => {
          return <OwnerCollectionCard colData={col} iNumber={index}/>
        })
      }
    </div>
  )
};
export default Page;
