import * as types from "@/types";

export const ChainName = "injective";

export const DEFAULT_COLLECTION_IMG = '/assets/collection.png'
export const ADMIN_ADDRESS = 'inj1j3de04txnndp94v37hfl0k906z0f47crrl0xm3'
export interface IErrorResponse {
  error: string,
  code: number
}

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
  {
    label: "Collections",
    href: "/collections",
    imageUrl: "/icons/collection.svg",
  },
];

export const DummyFeaturedCollections: types.FeaturedCollection[] = [
  {
    id: "1",
    name: "Collection 1",
    imageUrl: "/assets/collection.png",
    href: `/collections/${"1"}`,
  },
  {
    id: "2",
    name: "Collection 2",
    imageUrl: "/assets/collection.png",
    href: `/collections/${"2"}`,
  },
  {
    id: "3",
    name: "Collection 3",
    imageUrl: "/assets/collection.png",
    href: `/collections/${"3"}`,
  },
];

export const DummyCollections: types.Collection[] = [
  {
    id: "1",
    name: "RFTKT",
    longName: "RTFKT Clone X Forging SZN 1 (PRE-FORGE)",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    floorPrice: 3.2,
    imageUrl: "/assets/sample-nft-logo-1.png",
    bannerUrl: "/assets/sample-banner.png",
    href: `/collections/RFTKT`,
    apr: 300,
    isVerified: true,
    totalVolume: 12000,
    stakedNfts: [
      {
        id: "1203",
        name: "NFT 1",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "1204",
        name: "NFT 2",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "1205",
        name: "NFT 3",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "1206",
        name: "NFT 4",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "1207",
        name: "NFT 5",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "1208",
        name: "NFT 6",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "1209",
        name: "NFT 7",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "1210",
        name: "NFT 8",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "1211",
        name: "NFT 9",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
    ],
    nfts: [
      {
        id: "1203",
        name: "NFT 1",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "1204",
        name: "NFT 2",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "1205",
        name: "NFT 3",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "1206",
        name: "NFT 4",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "1207",
        name: "NFT 5",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "1208",
        name: "NFT 6",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "1209",
        name: "NFT 7",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "1210",
        name: "NFT 8",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "1211",
        name: "NFT 9",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
    ],
  },
  {
    id: "2",
    name: "RTFKTP",
    longName: "RTFKT Clone X Forging SZN 1 (PRE-FORGE)",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    floorPrice: 3.2,
    imageUrl: "/assets/sample-nft-logo-2.png",
    bannerUrl: "/assets/sample-banner.png",
    href: `/collections/RFTKT`,
    totalVolume: 12000,
    apr: 300,
    isVerified: true,
    stakedNfts: [
      {
        id: "2001",
        name: "NFT 1",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "2002",
        name: "NFT 2",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "2003",
        name: "NFT 3",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "2004",
        name: "NFT 4",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "2005",
        name: "NFT 5",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "2006",
        name: "NFT 6",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
    ],
    nfts: [
      {
        id: "2001",
        name: "NFT 1",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "2002",
        name: "NFT 2",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "2003",
        name: "NFT 3",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "2004",
        name: "NFT 4",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "2005",
        name: "NFT 5",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "2006",
        name: "NFT 6",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
    ],
  },
  {
    id: "3",
    name: "AZUKI",
    longName: "RTFKT Clone X Forging SZN 1 (PRE-FORGE)",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    floorPrice: 3.2,
    imageUrl: "/assets/sample-nft-logo-3.png",
    bannerUrl: "/assets/sample-banner.png",
    href: `/collections/RFTKT`,
    apr: 300,
    isVerified: true,
    totalVolume: 12000,
    stakedNfts: [
      {
        id: "3001",
        name: "NFT 1",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "3002",
        name: "NFT 2",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "3003",
        name: "NFT 3",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "3004",
        name: "NFT 4",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
    ],
    nfts: [
      {
        id: "3001",
        name: "NFT 1",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "3002",
        name: "NFT 2",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "3003",
        name: "NFT 3",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "3004",
        name: "NFT 4",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
    ],
  },
  {
    id: "4",
    name: "DeGods",
    longName: "RTFKT Clone X Forging SZN 1 (PRE-FORGE)",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    floorPrice: 3.2,
    imageUrl: "/assets/sample-nft-logo-4.png",
    bannerUrl: "/assets/sample-banner.png",
    href: `/collections/RFTKT`,
    apr: 300,
    isVerified: true,
    totalVolume: 12000,
    stakedNfts: [
      {
        id: "4001",
        name: "NFT 1",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "4002",
        name: "NFT 2",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "4003",
        name: "NFT 3",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "4004",
        name: "NFT 4",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "4005",
        name: "NFT 5",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "4006",
        name: "NFT 6",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "4007",
        name: "NFT 7",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
    ],
    nfts: [
      {
        id: "4001",
        name: "NFT 1",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "4002",
        name: "NFT 2",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "4003",
        name: "NFT 3",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "4004",
        name: "NFT 4",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "4005",
        name: "NFT 5",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "4006",
        name: "NFT 6",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "4007",
        name: "NFT 7",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
    ],
  },
  {
    id: "5",
    name: "RTFKT",
    longName: "RTFKT Clone X Forging SZN 1 (PRE-FORGE)",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    floorPrice: 3.2,
    imageUrl: "/assets/sample-nft-logo-1.png",
    bannerUrl: "/assets/sample-banner.png",
    href: `/collections/RFTKT`,
    apr: 300,
    isVerified: true,
    totalVolume: 12000,
    stakedNfts: [
      {
        id: "5001",
        name: "NFT 1",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "5002",
        name: "NFT 2",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "5003",
        name: "NFT 3",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "5004",
        name: "NFT 4",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "5005",
        name: "NFT 5",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "5006",
        name: "NFT 6",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "5007",
        name: "NFT 7",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "5008",
        name: "NFT 8",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "5009",
        name: "NFT 9",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
    ],
    nfts: [
      {
        id: "5001",
        name: "NFT 1",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "5002",
        name: "NFT 2",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "5003",
        name: "NFT 3",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "5004",
        name: "NFT 4",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "5005",
        name: "NFT 5",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "5006",
        name: "NFT 6",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "5007",
        name: "NFT 7",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "5008",
        name: "NFT 8",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
      {
        id: "5009",
        name: "NFT 9",
        imageUrl: "/assets/sample-nft.png",
        price: 3.2,
      },
    ],
  },
  {
    id: "6",
    name: "RTFKT",
    longName: "RTFKT Clone X Forging SZN 1 (PRE-FORGE)",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    floorPrice: 3.2,
    imageUrl: "/assets/sample-nft-logo-2.png",
    bannerUrl: "/assets/sample-banner.png",
    href: `/collections/RFTKT`,
    apr: 300,
    totalVolume: 12000,
    isVerified: true,
  },
  {
    id: "7",
    name: "AZUKI",
    longName: "RTFKT Clone X Forging SZN 1 (PRE-FORGE)",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    floorPrice: 3.2,
    imageUrl: "/assets/sample-nft-logo-3.png",
    bannerUrl: "/assets/sample-banner.png",
    href: `/collections/RFTKT`,
    apr: 300,
    totalVolume: 12000,
    isVerified: true,
  },
  {
    id: "8",
    name: "DeGods",
    longName: "RTFKT Clone X Forging SZN 1 (PRE-FORGE)",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    floorPrice: 3.2,
    imageUrl: "/assets/sample-nft-logo-4.png",
    bannerUrl: "/assets/sample-banner.png",
    href: `/collections/RFTKT`,
    apr: 300,
    totalVolume: 12000,
    isVerified: true,
  },
];

export const dummyChartData: types.ChartData = {
  totalVolume: 25694,
  data: [
    { month: "Jan", volume: 20000 },
    { month: "Feb", volume: 18000 },
    { month: "Mar", volume: 22000 },
    { month: "Apr", volume: 25000 },
    { month: "May", volume: 28000 },
    { month: "Jun", volume: 29000 },
    { month: "Jul", volume: 24000 },
    { month: "Aug", volume: 27000 },
    { month: "Sep", volume: 26000 },
    { month: "Oct", volume: 24000 },
    { month: "Nov", volume: 23000 },
    { month: "Dec", volume: 29000 },
  ],
};

export const dummyUserRewards: types.UserRewards = {
  earnings: 640.39,
  stakedNfts: 125,
  lockDuration: 1705597845,
  nftsOwned: 125,
};
