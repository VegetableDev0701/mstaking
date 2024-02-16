"use client";
import React from "react";
import AdminCollectionCard from "@/components/pages/admin/AdminCollectionCard";
import { ADMIN_ADDRESS } from '@/constants'
import { useSelector } from "react-redux";
import { getAddress } from "@/lib/features/addressSlice";
const Page = () => {
  const myAddr = useSelector(getAddress)
  return myAddr === ADMIN_ADDRESS ? (
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
