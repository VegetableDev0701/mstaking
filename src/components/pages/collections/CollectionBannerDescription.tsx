import React, { useState, useEffect } from "react";
import Image from "next/image";
const CollectionBannerDescription = ({
  collectionImgUrl,
  longTitle,
  description,
}: {
  collectionImgUrl: string;
  longTitle: string;
  description: string;
}) => {
  const [charLimit, setCharLimit] = useState(90);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCharLimit(window.innerWidth < 768 ? 30 : 90);
    }
  }, []);

  return (
    <div className="text-base font-medium leading-6 tracking-[-0.02em] text-left">
      <dialog id="my_modal_2" className="modal focus-visible:outline-none">
        <div className="modal-box bg-dark-800">
          <div className="flex-center gap-3">
            <Image
              src={collectionImgUrl}
              width={100}
              height={100}
              alt="collection-image"
            />
            <h3 className="text-2xl font-medium leading-9 tracking-[-0.02em] text-left max-md:text-[18px] max-md:leading-6">
              {longTitle}
            </h3>
          </div>
          <p className="text-base font-medium leading-6 tracking-[-0.02em] text-left py-4  max-md:text-[14px]">
            {description}
          </p>
        </div>
        <form
          method="dialog"
          className="modal-backdrop focus-visible:outline-none"
        >
          <button className="focus-visible:outline-none">close</button>
        </form>
      </dialog>
      <span>
        {description.length > charLimit
          ? description.substring(0, charLimit) + "..."
          : description}
        {description.length > charLimit && (
          <span
            className="text-blue-500 ml-2 cursor-pointer"
            onClick={() =>
              // @ts-ignore
              document.getElementById("my_modal_2").showModal()
            }
          >
            See more
          </span>
        )}
      </span>
    </div>
  );
};

export default CollectionBannerDescription;
