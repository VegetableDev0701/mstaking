"use client";
import React, { use, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import InfoCard from "@/components/UI/InfoCard";
import Button from "@/components/UI/Button";

const AirdropPanel = () => {
  const DUMMY_TOKENS = [
    {
      id: 1,
      name: "ETH",
      image: "/assets/sample-nft.png",
      price: 5,
    },
    {
      id: 2,
      name: "RTFKT",
      image: "/assets/sample-nft.png",
      price: 5,
    },
    {
      id: 3,
      name: "BTC",
      image: "/assets/sample-nft.png",
      price: 5,
    },
    {
      id: 4,
      name: "SOL",
      image: "/assets/sample-nft.png",
      price: 5,
    },
    {
      id: 5,
      name: "DOGE",
      image: "/assets/sample-nft.png",
      price: 5,
    },
    {
      id: 6,
      name: "ADA",
      image: "/assets/sample-nft.png",
      price: 5,
    },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTokenDropdownOpen, setIsTokenDropdownOpen] = useState(false);
  const [filteredTokens, setFilteredTokens] = useState([] as any);
  const [selectedToken, setSelectedToken] = useState({
    id: 1,
    name: "INJ",
    image: "/assets/sample-nft.png",
    price: 5,
  });

  const [dailyAirdrop, setDailyAirdrop] = useState(0);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const filteredTokens = DUMMY_TOKENS.filter(
      (token) =>
        searchTerm !== "" &&
        token.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTokens(filteredTokens);
  }, [searchTerm]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        (dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsTokenDropdownOpen(true);
      } else {
        setIsTokenDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className="w-full px-2 rounded-lg bg-dark-700 cursor-pointer"
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
        }}
      >
        <div className="pl-0 pr-2 py-2 w-full h-full flex items-center justify-start gap-3">
          <span className="text-sm font-medium leading-4 tracking-[-0.01em] text-left text-dark-200">
            1
          </span>
          <div className="flex items-center justify-start gap-2 w-full">
            <Image
              src="/assets/sample-nft.png"
              alt="collection-banner"
              width={44}
              height={44}
              className="rounded-[9px]"
            />
            <div className="flex items-center justify-start gap-1">
              <h3 className="text-xl font-bold leading-[19px] tracking-normal text-left">
                RTFKT
              </h3>
              <Image
                src="/icons/verified.svg"
                alt="verified"
                width={16}
                height={16}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-3">
            <span className="whitespace-nowrap text-lg font-normal leading-[19px] tracking-normal text-left text-dark-200">
              Staked 125/3000
            </span>
            {isDropdownOpen ? (
              <Image
                src="/icons/arrow-up.svg"
                width={18}
                height={18}
                alt="arrow-icon"
              />
            ) : (
              <Image
                src="/icons/arrow-up.svg"
                width={18}
                height={18}
                alt="arrow-icon"
                className="transform rotate-180"
              />
            )}
          </div>
        </div>
      </div>
      {isDropdownOpen && (
        <div className="mt-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-2.5"
          >
            <InfoCard
              title="Days"
              description="(How many days the airdrop should send out the tokens)"
            >
              <div className="flex items-center justify-end gap-1">
                <input
                  type="number"
                  className="p-2 rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center max-w-[45px]"
                  placeholder="0"
                  onChange={(e) => setDailyAirdrop(+e.target.value)}
                />
                <span className="text-base font-bold leading-4 tracking-[-0.01em] text-left">
                  Days
                </span>
              </div>
            </InfoCard>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="w-[70%] max-md:w-full">
                <InfoCard title="Charge the airdrop">
                  <div className="flex items-center justify-end gap-1 w-max">
                    <input
                      type="number"
                      className="p-2 rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center max-w-[45px]"
                      placeholder="0"
                      onChange={(e) => setDailyAirdrop(+e.target.value)}
                    />
                    <div className="p-2 rounded-md flex items-center justify-start gap-1.5 bg-[#121212] relative">
                      <Image
                        src={selectedToken.image}
                        width={18}
                        height={18}
                        alt="token-image"
                        className="rounded-full"
                      />
                      <input
                        type="text"
                        className="rounded-md bg-[#121212] text-dark-100 text-base font-normal leading-4 tracking-[-0.01em] text-center max-w-[80px]"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setIsTokenDropdownOpen(true);
                        }}
                      />
                      <Image
                        src="/icons/search.svg"
                        width={18}
                        height={18}
                        alt="search"
                      />
                      {searchTerm && isTokenDropdownOpen && (
                        <div
                          ref={dropdownRef}
                          className="absolute top-7 w-full bg-[#121212] px-2 py-2.5 rounded-md left-0 z-50 flex flex-col gap-1"
                        >
                          {filteredTokens.length > 0 ? (
                            filteredTokens.map((token: any) => (
                              <div
                                className="flex items-center justify-between gap-2 border-b border-dark-200 pb-1 hover:bg-dark-700 cursor-pointer transition-all"
                                key={token.id}
                                onClick={() => {
                                  setSearchTerm(token.name);
                                  setSelectedToken(token);
                                  setIsTokenDropdownOpen(false);
                                }}
                              >
                                <Image
                                  src={token.image}
                                  width={18}
                                  height={18}
                                  alt="arrow-up"
                                  className="rounded-full"
                                />
                                <p className="w-full text-base font-normal leading-4 tracking-[-0.01em] text-left">
                                  {token.name}
                                </p>
                                <span className="text-base font-normal leading-4 tracking-[-0.01em] text-left">
                                  {token.price}
                                </span>
                              </div>
                            ))
                          ) : (
                            <p className="text-center text-dark-200">
                              No Tokens Found
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </InfoCard>
              </div>
              <Button
                className="px-3 py-[18px] rounded-lg bg-primary text-base font-medium leading-4 tracking-[-0.01em] text-center text-dark-100 w-[29%] max-md:w-full h-full"
                onClick={() => {}}
              >
                Send
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default AirdropPanel;
