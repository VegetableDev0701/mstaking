import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import CosmosApp from "@/context/WalletProvider";
import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/sidebar";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "INJ Staking",
  description:
    "Discover the most popular NFT staking platform on Injective, supporting all Injective collections. Stake your NFTs securely, claim rewards, and track your staking rewards across various collections. Join now for seamless staking and exclusive benefits.",
  icons: {
    icon: "/logo.svg",
  },
  keywords: [
    "staking",
    "NFT",
    "Injective",
    "rewards",
    "collections",
    "Injective Airdrops",
    "Injective NFT",
    "Injective NFT Staking",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-dark-900">
      <body
        className={`${poppins.className} bg-dark-900 text-white h-full w-full`}
      >
        <CosmosApp>
          <main className="flex">
            <div className="fixed top-0 left-0 z-50 w-full">
              <Navbar />
            </div>
            <div className="fixed top-0 left-0 z-40 h-full pt-[88px] max-lg:hidden">
              <Sidebar />
            </div>
            <div className="pl-[358px] pt-[88px] h-full w-full max-lg:pl-0">
              <div className="pt-6 pb-0 px-6 h-full w-full overflow-y-scroll no-scrollbar mb-10 max-md:px-4">
                {children}
              </div>
            </div>
          </main>
        </CosmosApp>
      </body>
    </html>
  );
}
