import React from "react";
import { NavLink } from "react-router-dom";
import Courses from "./courses";
import Students from "./students";
import Stats from "./stats";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

export default function Overview() {
  return (
    <>
      <header className="flex items-center justify-between gap-7.5">
        <div>
          <h1 className="font-extrabold text-[28px] leading-[42px]">
            Overview
          </h1>
          <p className="text-[#838C9D]">Grow your company quickly</p>
        </div>
        <div className="flex items-center gap-3">
          <NavLink
            to="#"
            className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap"
          >
            Customize
          </NavLink>
          <NavLink
            to="#"
            className="w-fit rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap"
          >
            Export Data
          </NavLink>
        </div>
      </header>
      <Stats />
      <div className="grid grid-cols-2 gap-[30px]">
        <Courses />
        <Students />
      </div>
    </>
  );
}
