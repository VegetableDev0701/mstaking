"use client";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ children, className, onClick, disabled }: ButtonProps) => {
  const createRipple = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`;
    circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  return (
    <button
      className={`relative overflow-hidden flex-center px-3 py-2.5 rounded-lg text-[#F0F0F5] bg-primary max-md:px-[8.61px] max-md:py-[7.18px] hover:opacity-85 transition-all ${
        className ? className : ""
      }`}
      onClick={(e) => {
        createRipple(e);
        onClick();
      }}
      disabled={disabled}
    >
      <span className="text-base font-semibold leading-5 tracking-[0.01em] text-center max-md:text-sm z-10">
        {children}
      </span>
    </button>
  );
};

export default Button;
