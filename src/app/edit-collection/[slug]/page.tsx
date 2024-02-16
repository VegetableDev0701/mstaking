"use client";
import React from "react";
import { useParams } from "next/navigation";
import EditCollection from '@/components/pages/edit-collection/editCollection'
import { setRoute } from "@/lib/features/routerSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const Page = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const routeConfig = async () => {
    dispatch(setRoute({routeStr: 'Other'}))
  }
  useEffect(() => {
    routeConfig()
  }, [])
  return (
    <div>
      <EditCollection />
    </div>
  );
};

export default Page;
