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
  floorPrice: number;
  imageUrl: string;
  href: string;
  staked: number;
  apr: number;
  isVerified: boolean;
};
