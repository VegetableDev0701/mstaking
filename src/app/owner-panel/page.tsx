"use client";
import AirdropPanel from "@/components/pages/owner-panel/AirdropPanel";
import OwnerCollectionCard from "@/components/pages/owner-panel/OwnerCollectionCard";
import React from "react";

const Page = () => {
  const [activeTab, setActiveTab] = React.useState("collections");
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center gap-5 text-xl font-medium">
        <div
          className={`w-full flex items-center justify-center p-3 bg-dark-700 rounded-lg border border-dark-600 uppercase text-dark-200 cursor-pointer transition-all ${
            activeTab === "collections" && "!bg-dark-500 text-white"
          }`}
          onClick={() => setActiveTab("collections")}
        >
          Collections
        </div>
        <div
          className={`w-full flex items-center justify-center p-3 bg-dark-700 rounded-lg border border-dark-600 uppercase text-dark-200 cursor-pointer transition-all ${
            activeTab === "airdrop" && "!bg-dark-500 text-white"
          }`}
          onClick={() => setActiveTab("airdrop")}
        >
          Airdrop Panel
        </div>
      </div>
      <div>
        {activeTab === "collections" && <OwnerCollectionCard />}
        {activeTab === "airdrop" && <AirdropPanel />}
      </div>
    </div>
  );
};

export default Page;
