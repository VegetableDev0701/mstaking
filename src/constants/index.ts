import * as types from "@/types";

export const ChainName = "injective";

export const SideBarItems: types.SideBarItem[] = [
  {
    label: "Home",
    href: "/",
    imageUrl: "/icons/home.svg",
  },
  {
    label: "All Staked NFTs",
    href: "/staked-nfts",
    imageUrl: "/icons/case.svg",
  },
  {
    label: "Rewards",
    href: "/rewards",
    imageUrl: "/icons/dollar.svg",
  },
];

export const DummyFeaturedCollections: types.FeaturedCollection[] = [
  {
    id: "1",
    name: "Collection 1",
    imageUrl: "/assets/sample-collection.png",
    href: `/collections/${"1"}`,
  },
  {
    id: "2",
    name: "Collection 2",
    imageUrl: "/assets/sample-collection.png",
    href: `/collections/${"2"}`,
  },
  {
    id: "3",
    name: "Collection 3",
    imageUrl: "/assets/sample-collection.png",
    href: `/collections/${"3"}`,
  },
];

export const DummyCollections: types.Collection[] = [
  {
    id: "1",
    name: "RTFKT",
    floorPrice: 3.2,
    imageUrl: "/assets/sample-nft-logo-1.png",
    href: `/collections/RFTKT`,
    staked: 3200,
    apr: 300,
    isVerified: true,
  },
  {
    id: "2",
    name: "RTFKT",
    floorPrice: 3.2,
    imageUrl: "/assets/sample-nft-logo-2.png",
    href: `/collections/RFTKT`,
    staked: 3200,
    apr: 300,
    isVerified: true,
  },
  {
    id: "3",
    name: "AZUKI",
    floorPrice: 3.2,
    imageUrl: "/assets/sample-nft-logo-3.png",
    href: `/collections/RFTKT`,
    staked: 3200,
    apr: 300,
    isVerified: true,
  },
  {
    id: "4",
    name: "DeGods",
    floorPrice: 3.2,
    imageUrl: "/assets/sample-nft-logo-4.png",
    href: `/collections/RFTKT`,
    staked: 3200,
    apr: 300,
    isVerified: true,
  },
  {
    id: "5",
    name: "RTFKT",
    floorPrice: 3.2,
    imageUrl: "/assets/sample-nft-logo-1.png",
    href: `/collections/RFTKT`,
    staked: 3200,
    apr: 300,
    isVerified: true,
  },
  {
    id: "6",
    name: "RTFKT",
    floorPrice: 3.2,
    imageUrl: "/assets/sample-nft-logo-2.png",
    href: `/collections/RFTKT`,
    staked: 3200,
    apr: 300,
    isVerified: true,
  },
  {
    id: "7",
    name: "AZUKI",
    floorPrice: 3.2,
    imageUrl: "/assets/sample-nft-logo-3.png",
    href: `/collections/RFTKT`,
    staked: 3200,
    apr: 300,
    isVerified: true,
  },
  {
    id: "8",
    name: "DeGods",
    floorPrice: 3.2,
    imageUrl: "/assets/sample-nft-logo-4.png",
    href: `/collections/RFTKT`,
    staked: 3200,
    apr: 300,
    isVerified: true,
  },
];
