export type SideBarItem = {
  label: string;
  href: string;
  imageUrl: string;
};

export type FeaturedCollection = {
  id: string;
  name: string;
  imageUrl: string;
  href: string;
};

export type Collection = {
  id: string;
  name: string;
  longName: string;
  description: string;
  floorPrice: number;
  imageUrl: string;
  bannerUrl: string;
  href: string;
  apr: number;
  isVerified: boolean;
  totalVolume: number;
  nfts?: NFT[];
  stakedNfts?: NFT[];
};

export type NFT = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
};
