"use client";
import React from "react";

interface CustomInputProps {
  label: string;
  inputType: "text" | "number";
  placeHolder: string;
  inputOnChange: (value: string) => void;
}

const CustomInput = ({
  label,
  inputType,
  placeHolder,
  inputOnChange,
}: CustomInputProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-base font-normal leading-5 tracking-[0.01em] text-left">
        {label}
      </h3>
      <input
        type={inputType}
        placeholder={placeHolder}
        className="input input-bordered w-full border-dark-200 border px-3 py-2.5 rounded-lg bg-transparent "
        onChange={(e) => {
          inputOnChange(e.target.value);
        }}
      />
    </div>
  );
};

export default CustomInput;
