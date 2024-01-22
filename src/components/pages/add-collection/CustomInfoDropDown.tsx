import React from "react";

interface CustomInfoDropDownProps {
  label: string;
  description: string;
}

const CustomInfoDropDown = ({
  label,
  description,
}: CustomInfoDropDownProps) => {
  return (
    <div className="dropdown dropdown-right ">
      <div tabIndex={0} role="button" className="btn-circle w-max h-max ">
        <svg
          tabIndex={0}
          xmlns="http://www.w3.org/2000/svg"
          fill="#B2B2B2"
          viewBox="0 0 24 24"
          className="w-4 h-4 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <div
        tabIndex={0}
        className="card compact dropdown-content z-[1] shadow bg-dark-600 rounded-box w-[350px] "
      >
        <div tabIndex={0} className="card-body">
          <h2 className="card-title text-sm">{label}</h2>
          <p className="text-xs">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomInfoDropDown;
