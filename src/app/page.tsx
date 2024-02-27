'use client'
import FeaturedSection from "@/components/featured-section";
import TrendingCollections from "@/components/pages/home/trending-collections";
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getCollections } from '@/lib/features/collectionSlice'
import { setCollections } from '@/lib/features/collectionSlice'
import { getCollectionNFT, getSMNFT } from "@/helper/queryHelper"
import { setCollectionTokens } from '@/lib/features/tokenSlice'
import { setAllRewards } from "@/lib/features/rewardSlice";
import { setAddress } from "@/lib/features/addressSlice";
import { getAddresses } from "@/services/wallet";
import { setRoute } from "@/lib/features/routerSlice";
import { getAddress } from "@/lib/features/addressSlice";
export default function Home() {
  const collections = useSelector(getCollections)
  const myAddr = useSelector(getAddress)
  const dispatch = useDispatch()
  const routeConfig = async () => {
    dispatch(setRoute({routeStr: 'Other'}))
  }
  const fetchAddress = async () => {
    const addr = (await getAddresses())[0]
    dispatch(setAddress({address: addr}))
  }
  const fetchCollectioNFT = async (colData: any) => {
    const cAddress: string = colData.Caddress
    const sAddress: string = colData.Saddress
    const collectionNFT = await getCollectionNFT(cAddress, myAddr)
    const smNFT = await getSMNFT(sAddress, myAddr)
    console.log(smNFT)
    dispatch(setCollectionTokens({
      keyname: `${cAddress}`,
      tokens: {
        unstaked: collectionNFT,
        staked: smNFT
      }
    }))
  }
  const fetchCollections = async () => {
    await fetchAddress()
    let cols = await (await fetch('/api/collection/getCollections')).json()
    dispatch(setCollections(cols))
    for(let i =0;i<cols.length ; i++ ) {
      await fetchCollectioNFT(cols[i])
    }
  }
  const fetchRewards = async () => {
    await fetchAddress()
    let data = await (await fetch('/api/reward/getRewards', {
      method: 'POST',
      body: JSON.stringify({
        wallet: myAddr
      })
    })).json()
    dispatch(setAllRewards(data))
  }
  useEffect(() => {
    fetchCollections()
    fetchRewards()
    routeConfig()
  }, [])
  return (
    <main className="h-full w-full flex flex-col gap-10 mb-5">
      <FeaturedSection
        heading="Featured Collections"
        collections={collections}
      />
      <TrendingCollections />
    </main>
  );
}
