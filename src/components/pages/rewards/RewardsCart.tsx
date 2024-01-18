import React from "react";

const RewardsCart = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border px-8 py-5 rounded-[20px] border-dark-200 w-[49%]">
      {children}
    </div>
  );
};

export default RewardsCart;
