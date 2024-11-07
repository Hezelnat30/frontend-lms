import React from "react";
import { ReactSVG } from "react-svg";

const DefaultInput = ({
  type,
  placeholder,
  name,
  register,
  icon,
  errorMessage,
}) => {
  const displayLabel = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <>
      <label htmlFor={name} className="font-semibold">
        Course {displayLabel}
      </label>
      <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
        <ReactSVG src={icon} alt="icon" />
        <input
          type={type}
          name={name}
          {...register(name)}
          id={name}
          className="appearance-none outline-none w-full px-2.5 py-3 font-semibold placeholder:font-semibold placeholder:text-[#838C9D] !bg-transparent"
          placeholder={placeholder}
        />
      </div>
      <span className="error-message text-[#FF435A]">{errorMessage}</span>
    </>
  );
};

export default DefaultInput;
