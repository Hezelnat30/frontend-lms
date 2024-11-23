import React from "react";
import { useLoaderData } from "react-router-dom";
import Select from "react-select";
import { Controller } from "react-hook-form";
import bill_black from "@assets/images/icons/bill-black.svg";
import { ReactSVG } from "react-svg";

const SelectStudent = ({ control, name, errorMessage }) => {
  const students = useLoaderData();
  console.log({ students });

  const studentsOptions = students?.map((student) => ({
    value: student._id,
    label: student.name,
  }));

  return (
    <>
      <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 ps-5 py-1.5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
        <ReactSVG src={bill_black} alt="icon" />
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <Select
              placeholder="Choose One Student"
              options={studentsOptions}
              className="w-full border-none"
              value={
                studentsOptions.find((option) => option.value === value) || null
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
                  fontWeight: "600",
                  color: "#838C9D",
                  backgroundColor: "transparent",
                }),
              }}
            />
          )}
        />
      </div>
      <span className="error-message text-[#FF435A]">{errorMessage}</span>
    </>
  );
};

export default SelectStudent;
