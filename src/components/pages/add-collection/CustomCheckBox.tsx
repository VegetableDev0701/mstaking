"use client";
import React, { useState } from "react";
import CustomInfoDropDown from "./CustomInfoDropDown";

interface CustomCheckBoxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description: string;
}

const CustomCheckBox = ({
  label,
  checked,
  description,
  onChange,
}: CustomCheckBoxProps) => {
  return (
    <div className="flex-start gap-3">
      <div className="relative select-none">
        <div
          className={`h-[18px] w-9 rounded-[38.57px] p-0.5 transition-colors duration-300 ease-in-out ${
            checked ? "bg-primary" : "bg-[#6B6B6B]"
          }`}
          onClick={() => {
            onChange(!checked);
          }}
        >
          <div
            className={`h-[12px] w-[12px] transform rounded-full mt-[1px] bg-white shadow transition-transform duration-300 ease-in-out ${
              checked ? "translate-x-[18px]" : "translate-x-[2px]"
            }`}
          />
        </div>
      </div>
      <div className="flex-start gap-1.5">
        <p className="text-base font-medium leading-6 tracking-[-0.011em] text-left text-white">
          {label}
        </p>
        <CustomInfoDropDown label={label} description={description} />
      </div>
    </div>
  );
};

export default CustomCheckBox;
