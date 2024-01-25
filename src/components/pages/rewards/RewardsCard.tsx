import React from "react";

const RewardsCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border px-8 py-5 rounded-[20px] border-dark-200 w-[49%] max-md:w-full">
      {children}
    </div>
  );
};

export default RewardsCard;
