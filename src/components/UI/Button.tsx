"use client";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}

const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      className={`flex-center px-3 py-2.5 rounded-lg bg-primary ${className}`}
      onClick={onClick}
    >
      <span className="text-base font-semibold leading-5 tracking-[0.01em] text-center">
        {children}
      </span>
    </button>
  );
};

export default Button;
