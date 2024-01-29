'use client'
import FeaturedSection from "@/components/featured-section";
import TrendingCollections from "@/components/pages/home/trending-collections";
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getCollections } from '@/lib/features/collectionSlice'
import { setCollections } from '@/lib/features/collectionSlice'
export default function Home() {
  const collections = useSelector(getCollections)
  const dispatch = useDispatch()
  const fetchCollections = async () => {
    let cols = await (await fetch('/api/collection/getCollections')).json()
    dispatch(setCollections(cols))
  }
  useEffect(() => {
    fetchCollections()
  }, [])
  return (
    <main className="h-full w-full flex flex-col gap-10 mb-5">
      <FeaturedSection
        heading="Featured Collections"
        collections={collections}
      />
      <TrendingCollections />
      <FeaturedSection
        heading="Winner Communities"
        collections={collections}
      />
    </main>
  );
}
