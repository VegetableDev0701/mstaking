'use client'
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation'
interface DropDownCardProps {
  name: string;
  imageURL: string;
  cAddress: string;
}

const DropDownCard = ({ name, imageURL, cAddress }: DropDownCardProps) => {
  const { slug: pathRoute } = useParams();
  const router = useRouter()
  const gotoCollectionPage = () => {
    console.log('sidebar click', cAddress)
    router.push(`/collections/${cAddress}`)
  }
  const isActive = pathRoute == cAddress
  return (
    <div className={`p-2 rounded-lg flex-start gap-3 hover:bg-dark-700 ${
      isActive && "bg-primary"}`} onClick={() => { gotoCollectionPage()}}>
      <Image src={imageURL} alt={name} width={36} height={36} />
      <h3 className="text-xl font-normal leading-[30px] tracking-normal text-left uppercase text-dark-200">
        {name}
      </h3>
    </div>
  );
};

export default DropDownCard;
