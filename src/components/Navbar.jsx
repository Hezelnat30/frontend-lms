import React from "react";
import space_logo from "@assets/images/logos/spacelogo.svg";
import { NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { navbarMenu } from "@/constant/navbarMenu";

export default function Navbar({ type }) {
  return (
    <nav className="flex items-center justify-between p-7.5">
      <div className="flex items-center gap-15">
        <div className="flex items-center justify-center gap-1.5">
          <ReactSVG src={space_logo} />
          <h3 className="text-white font-bold text-xl hidden lg:inline-block">
            HezelnatLMS
          </h3>
        </div>
        <ul className="flex items-center gap-10">
          {navbarMenu.map(({ name, path }) => (
            <li
              key={name}
              className="font-semibold transition-all duration-300 hover:text-primary-purple-3 text-white"
            >
              <NavLink to={path}>{name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-3">
        <NavLink to="/manager/signin">
          <div className="flex items-center gap-3 w-fit rounded-full border p-[14px_20px] transition-all duration-300 hover:bg-primary-purple-1 hover:border-primary-purple-2 hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
            <span className="font-semibold text-white">My Dashboard</span>
          </div>
        </NavLink>
        {type === "manager" && (
          <NavLink to="/manager/signup">
            <div className="flex items-center gap-3 w-fit rounded-full border p-[14px_20px] transition-all duration-300 hover:bg-primary-purple-1 hover:border-primary-purple-2 hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#662FFF] border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]">
              <span className="font-semibold text-white">Sign Up</span>
            </div>
          </NavLink>
        )}
      </div>
    </nav>
  );
}
