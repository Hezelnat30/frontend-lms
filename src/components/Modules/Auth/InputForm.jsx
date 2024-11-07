import React from "react";
import { ReactSVG } from "react-svg";

export default function InputForm({
  icon,
  placeholder,
  type,
  name,
  register,
  errorMessage,
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300 focus-within:border-[#8661EE] focus-within:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
        <ReactSVG src={icon} />
        <input
          {...register(name)}
          type={type}
          name={name}
          id={name}
          className="appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-[#6B6C7F]"
          placeholder={placeholder}
        />
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
    </div>
  );
}
