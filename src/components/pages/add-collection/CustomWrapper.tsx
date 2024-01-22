import React from "react";

const CustomWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-8 py-[22px] rounded-lg w-full h-max bg-dark-700 flex flex-col gap-3">
      {children}
    </div>
  );
};

export default CustomWrapper;
