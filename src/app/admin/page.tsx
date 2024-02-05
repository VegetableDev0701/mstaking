"use client";
import React from "react";
import { CHAINNAME, ADMIN_ADDRESS } from "@/constants";
import { useChain } from "@cosmos-kit/react";
import AdminCollectionCard from "@/components/pages/admin/AdminCollectionCard";

const Page = () => {
  const chainContext = useChain(CHAINNAME);
  const { address } = chainContext;

  return address === ADMIN_ADDRESS ? (
    <div>
      <AdminCollectionCard />
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
