import React from "react";

const CustomSwitchButton = ({
  initState,
  onChangeParent,
}: {
  initState: boolean,
  onChangeParent: (bool: boolean) => void;
}) => {
  const [checked, setChecked] = React.useState(initState);
  const onChange = (value: boolean) => {
    setChecked(value);
    onChangeParent(value);
  };

  return (
    <div className="relative select-none cursor-pointer">
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
  );
};

export default CustomSwitchButton;
