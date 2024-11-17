import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import crown_black from "@assets/images/icons/crown-black.svg";
import { ReactSVG } from "react-svg";

const SelectType = ({ control, errorMessage }) => {
  const typeOptions = [
    { value: "video", label: "Video" },
    { value: "text", label: "Text" },
  ];

  return (
    <>
      <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 ps-5 py-1.5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
        <ReactSVG src={crown_black} alt="icon" />
        <Controller
          name="type"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <Select
              placeholder="Choose content type"
              options={typeOptions}
              className="w-full border-none"
              value={
                typeOptions.find((option) => option.value === value) || null
              }
              onChange={(selectedOption) =>
                onChange(selectedOption ? selectedOption.value : null)
              }
              ref={ref}
              styles={{
                control: (base) => ({
                  ...base,
                  border: "none",
                  boxShadow: "none",
                  marginLeft: -10,
                  fontWeight: "500",
                  color: "#838C9D",
                  backgroundColor: "transparent",
                }),
              }}
            />
          )}
        />
      </div>
      {errorMessage && (
        <span className="error-message text-[#FF435A]">
          {errorMessage && "Please select content type"}
        </span>
      )}
    </>
  );
};

export default SelectType;
