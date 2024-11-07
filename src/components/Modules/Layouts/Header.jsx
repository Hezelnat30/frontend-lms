import React from "react";
import { useState } from "react";
import { ReactSVG } from "react-svg";
import search_normal from "@assets/images/icons/search-normal.svg";
import { NavLink } from "react-router-dom";
import { dropdownMenuManager } from "@/constant/dropdownMenuManager";
import secureLocalStorage from "react-secure-storage";
import { STORAGE_KEY } from "@/utils/const";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  function handleDropDown() {
    setIsDropdownOpen((prev) => !prev);
  }

  const { name, role } = secureLocalStorage.getItem(STORAGE_KEY);
  const displayRole = role && role.charAt(0).toUpperCase() + role.slice(1);

  function handleLogout() {
    secureLocalStorage.removeItem(STORAGE_KEY);
    window.location.replace("/manager/signin");
  }

  return (
    <div id="TopBar" className="flex items-center justify-between gap-7.5">
      <form
        action=""
        className="flex items-center w-full max-w-[450px] rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]"
      >
        <input
          type="text"
          name="search"
          id="search"
          className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#838C9D]"
          placeholder="Search course, student, other file..."
        />
        <ReactSVG src={search_normal} alt="icon" />
      </form>
      <div className="relative flex items-center justify-end gap-[14px] group">
        <div className="text-right">
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-slate-500">{displayRole}</p>
        </div>
        <button
          onClick={handleDropDown}
          type="button"
          id="profileButton"
          className="flex shrink-0 w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer"
        >
          <img
            src="/assets/images/photos/photo-1.png"
            className="w-full h-full object-cover hover:blur-xs transition-all duration-300"
            alt="profile photos"
          />
        </button>
        <div
          id="profileDropdown"
          className={`absolute top-full z-20 transition-all duration-300 ease-in-out ${
            isDropdownOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-[200%] opacity-0"
          }`}
        >
          <ul className="flex flex-col w-[200px] rounded-[20px] border border-[#CFDBEF] p-5 gap-4 bg-white mt-4">
            {dropdownMenuManager.map(({ name, path }) => (
              <li
                key={name}
                className="font-semibold hover:underline cursor-pointer"
              >
                {path ? (
                  <NavLink to={path}>{name}</NavLink>
                ) : (
                  <button type="button" onClick={handleLogout}>
                    {name}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
