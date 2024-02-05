import InfoCard from "@/components/UI/InfoCard";
import React from "react";

const OwnerCollectionCardContent = ({
  setDropdown,
}: {
  setDropdown: (bool: boolean) => void;
}) => {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-start gap-3">
        <InfoCard title="Owner 1">{""}</InfoCard>
        <InfoCard title="Owner 2">{""}</InfoCard>
      </div>
      <InfoCard title="Fee Receiver">
        <p className="p-2 rounded-md bg-dark-900 text-base font-normal leading-4 tracking-[-0.01em] text-left">
          0x1234567890
        </p>
      </InfoCard>
      <InfoCard
        title="Tx fee amount"
        description="(The fee taken for each tx signed)"
      >
        <div className="flex items-center justify-start gap-2">
          <p className="p-2 rounded-md bg-dark-900 text-base font-normal leading-4 tracking-[-0.01em] text-left">
            0.1
          </p>
          <p className="text-base font-bold leading-4 tracking-[-0.01em] text-left">
            INJ
          </p>
        </div>
      </InfoCard>
      <InfoCard title="Status">
        <div className="flex items-center justify-start gap-2">
          <p className="px-2.5 py-1 rounded-[40px] bg-[#235000] text-base font-normal leading-4 tracking-[-0.01em] text-left">
            Active
          </p>
          <p className="text-base font-normal leading-4 tracking-[-0.01em] text-left">
            Disabled
          </p>
        </div>
      </InfoCard>
      <InfoCard title="Early unstake fee">
        <p className="p-2 rounded-md bg-dark-900 text-base font-normal leading-4 tracking-[-0.01em] text-left">
          0x1234567890
        </p>
      </InfoCard>
      <InfoCard
        title="Early unstake fee % share:"
        description="(Each collection Admin gets a share. The owner can change this % at any time.)"
      >
        <div className="flex items-center justify-start gap-2">
          <p className="p-2 rounded-md bg-dark-900 text-base font-normal leading-4 tracking-[-0.01em] text-left">
            0.1
          </p>
          <p className="text-base font-bold leading-4 tracking-[-0.01em] text-left">
            %
          </p>
        </div>
      </InfoCard>
      <InfoCard title="Title">
        <p className="p-2 rounded-md bg-dark-900 text-base font-normal leading-4 tracking-[-0.01em] text-left">
          RTFKT
        </p>
      </InfoCard>
      <InfoCard title="Change Admin">
        <p className="p-2 rounded-md bg-dark-900 text-base font-normal leading-4 tracking-[-0.01em] text-left">
          0x1234567890
        </p>
      </InfoCard>
      <div className="flex flex-row items-center justify-center gap-5 max-md:flex-col">
        <button
          className="w-full p-3 rounded-lg bg-secondary text-base font-medium leading-4 tracking-[-0.01em] text-center text-dark-100"
          onClick={() => setDropdown(false)}
        >
          Cancel
        </button>
        <button
          className="w-full p-3 rounded-lg bg-primary text-base font-medium leading-4 tracking-[-0.01em] text-center text-dark-100"
          onClick={() => console.log("Changes made")}
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default OwnerCollectionCardContent;
