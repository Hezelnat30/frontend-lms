import React from "react";
import { ReactSVG } from "react-svg";
import space_logo from "@assets/images/logos/spacelogo.svg";
import { NavLink } from "react-router-dom";
import sidebar_glow from "@assets/images/backgrounds/sidebar-glow.png";
import {
  sidebarMenuGeneral,
  sidebarMenuOthers,
} from "@/constant/sidebarMenuManager";

export default function Sidebar({ isAdmin = true }) {
  const studentSidebarMenuGeneral = sidebarMenuGeneral.map((menu) => {
    return menu.name === "Overview" && !isAdmin
      ? { ...menu, path: "/student" }
      : menu;
  });

  const filterMenu = isAdmin
    ? studentSidebarMenuGeneral
    : studentSidebarMenuGeneral.filter(({ name }) => name === "Overview");

  return (
    <aside className="sidebar-container fixed h-[calc(100vh-20px)] w-full max-w-[280px] my-[10px] ml-[10px] bg-[#060A23] overflow-hidden flex flex-1 rounded-[20px]">
      <div className="scroll-container flex w-full overflow-y-scroll hide-scrollbar">
        <nav className="flex flex-col w-full h-fit p-7.5 gap-10 z-10">
          <div className="flex items-center justify-start gap-1.5">
            <ReactSVG src={space_logo} />
            <h3 className="text-white font-bold text-xl hidden lg:inline-block">
              HezelnatLMS
            </h3>
          </div>
          <ul className="flex flex-col gap-4">
            <p className="font-semibold text-xs leading-[18px] text-white">
              GENERAL
            </p>
            {filterMenu.map(({ name, path, icon }) => (
              <li key={name}>
                <NavLink
                  end
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 w-full rounded-full border py-3.5 px-5 transition-all duration-300 hover:bg-primary-purple-2 hover:border-primary-purple-1 hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-primary-purple-2 border-primary-purple-1 shadow-[-10px_-6px_10px_0_#7F33FF_inset]"
                      : "flex items-center gap-3 w-full rounded-full border py-3.5 px-5 transition-all duration-300 hover:bg-primary-purple-2 hover:border-primary-purple-1 hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]"
                  }
                >
                  <img src={icon} className="w-6 h-6" alt="icon" />
                  <span className="font-semibold text-white">{name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-4">
            <p className="font-semibold text-xs leading-[18px] text-white">
              OTHERS
            </p>
            {sidebarMenuOthers.map(({ name, path, icon }) => (
              <li key={name}>
                <NavLink to={path}>
                  <div className="flex items-center gap-3 w-full rounded-full border py-3.5 px-5 transition-all duration-300 hover:bg-primary-purple-2 hover:border-primary hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
                    <ReactSVG src={icon} className="w-6 h-6" alt="icon" />
                    <span className="font-semibold text-white">{name}</span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <img
        src={sidebar_glow}
        className="absolute object-contain object-bottom bottom-0"
        alt="background"
      />
    </aside>
  );
}
