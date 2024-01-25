"use client";

// Drawer.tsx
import React, { useEffect, useRef } from "react";
import SideBar from "./index";
import Image from "next/image";

type MobileDrawerProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  renderSide: "left" | "right";
};

const MobileSideBar: React.FC<MobileDrawerProps> = ({
  isOpen,
  setIsOpen,
  renderSide,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[99] transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        ref={drawerRef}
        className={`fixed inset-y-0 z-[99] transition-transform duration-500 mt-[88px] ${
          renderSide === "left" ? "left-0" : "right-0"
        } ${
          isOpen
            ? "translate-x-0"
            : renderSide === "left"
            ? "-translate-x-full"
            : "translate-x-full"
        }`}
        style={{ width: "auto" }}
      >
        <SideBar drawerClose={() => setIsOpen(false)} />
      </div>
    </>
  );
};

export default MobileSideBar;
