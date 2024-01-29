import React from "react";
import { Collection } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { IACollection } from '@/constants/collection'
import { DEFAULT_COLLECTION_IMG } from '@/constants'

const CollectionCard = ({
  _id,
  Caddress,
  Ctitle,
  CSaddress,
  Cdescription,
  CBackground,
}: IACollection) => {
  return (
    <Link
      className="px-2 py-2 rounded-[18px] hover:bg-dark-500 transition-all"
      href={`/collections/${Caddress}`}
    >
      <div className="flex-start gap-4">
        <span className="text-sm font-medium leading-4 tracking-[-0.01em] text-left text-dark-200">
          {''}
        </span>
        <div className="flex-start gap-2 w-full">
          <Image
            src={CBackground == "default" ? DEFAULT_COLLECTION_IMG : CBackground}
            alt={Cdescription}
            width={72}
            height={72}
            className="rounded-[9px]"
          />
          <div className="flex flex-col w-full gap-1">
            <div className="flex-between w-full">
              <div className="flex-start gap-1">
                <h3 className="text-xl font-bold leading-[19px] tracking-normal text-left">
                  {Ctitle}
                </h3>
                {true && (
                  <Image
                    src="/icons/verified.svg"
                    alt="Verified"
                    width={16}
                    height={16}
                  />
                )}
              </div>
              <p className="text-base font-semibold leading-4 tracking-[-0.01em] text-left text-white">
{/*                 {stakedNfts ? stakedNfts?.length : 0}{" "}
                <span className="text-sm font-medium leading-4 tracking-[-0.01em] text-dark-200">
                  Staked
                </span> */}
              </p>
            </div>
            <div className="text-sm font-medium leading-4 tracking-[-0.01em] text-left w-full flex-between">
              {/* <p className="text-dark-200">Floor Price {floorPrice} INJ</p> */}
              {/* <p className="text-green">{apr}% APR</p> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
