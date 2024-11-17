import React from "react";
import { ReactSVG } from "react-svg";

const DefaultInput = ({
  icon,
  label,
  type,
  name,
  register,
  placeholder,
  errorMessage,
}) => {
  return (
    <>
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>
      <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
        <ReactSVG src={icon} className="w-6 h-6" alt={icon} />
        <input
          type={type}
          name={name}
          {...register(name)}
          id={name}
          className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent"
          placeholder={placeholder}
        />
      </div>
      {errorMessage && (
        <span className="error-message text-[#FF435A]">{errorMessage}</span>
      )}
    </>
  );
};

export default DefaultInput;
