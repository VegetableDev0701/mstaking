import React from "react";

interface InfoCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const InfoCard = ({ title, description, children }: InfoCardProps) => {
  return (
    <div className="gap-2.5 pl-2 pr-3 py-3 rounded-lg bg-dark-700 w-full flex items-center justify-between">
      <div className="w-full flex items-center justify-start gap-1">
        <h3 className="text-lg font-normal leading-[19px] tracking-normal text-left text-dark-100">
          {title}
        </h3>
        {description && (
          <span className="text-sm font-normal leading-[19px] tracking-normal text-left text-[#747474]">
            {description}
          </span>
        )}
      </div>
      <div className="text-nowrap w-max">{children}</div>
    </div>
  );
};

export default InfoCard;
