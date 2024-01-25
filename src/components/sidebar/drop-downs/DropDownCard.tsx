import React from "react";
import Image from "next/image";
import Link from "next/link";

interface DropDownCardProps {
  name: string;
  imageURL: string;
  drawerClose?: () => void;
}

const DropDownCard = ({ name, imageURL, drawerClose }: DropDownCardProps) => {
  return (
    <Link
      className="p-2 rounded-lg flex-start gap-3 hover:bg-dark-700"
      onClick={() => {
        if (drawerClose) {
          drawerClose();
        }
      }}
      href={`/collections/${name}`}
    >
      <Image src={imageURL} alt={name} width={36} height={36} />
      <h3 className="text-xl font-normal leading-[30px] tracking-normal text-left uppercase text-dark-200">
        {name}
      </h3>
    </Link>
  );
};

export default DropDownCard;
