import React from "react";

export default function ButtonSubmitForm({ text, disabled = false }) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="w-full rounded-full border p-[14px_20px] text-center font-bold text-white hover:bg-primary-purple-1 hover:border-primary-purple-2 hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-primary-purple-2 border-primary-purple-1 shadow-[-10px_-6px_10px_0_#7F33FF_inset] transition-all duration-300"
    >
      {text}
    </button>
  );
}
