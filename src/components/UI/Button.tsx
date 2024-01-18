"use client";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ children, className, onClick, disabled }: ButtonProps) => {
  return (
    <button
      className={`flex-center px-3 py-2.5 rounded-lg text-[#F0F0F5] bg-primary ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="text-base font-semibold leading-5 tracking-[0.01em] text-center">
        {children}
      </span>
    </button>
  );
};

export default Button;
