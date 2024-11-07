import CardCourses from "@/components/Modules/Manager/Courses/CardCourses";
import CardLatestCourse from "@/components/Modules/Student/CardLatestCourse";
import React from "react";
import { NavLink } from "react-router-dom";

export default function Courses() {
  return (
    <section
      id="LatestCourse"
      className="flex flex-col rounded-[30px] p-7.5 gap-7.5 bg-[#F8FAFB]"
    >
      <h2 className="font-extrabold text-[22px] leading-[33px]">
        Latest Courses
      </h2>
      <div className="card flex items-center gap-5">
        <div className="flex shrink-0 w-[100px] h-20 rounded-[20px] bg-[#D9D9D9] overflow-hidden">
          <img
            src="assets/images/thumbnails/th-1.png"
            className="w-full h-full object-cover"
            alt="thumbnail"
          />
        </div>
        <div className="w-full">
          <NavLink
            href="#"
            className="font-bold text-xl leading-[30px] line-clamp-1"
          >
            Responsive Design Triclorem Lorem, ipsum dolor.
          </NavLink>
          <div className="flex items-center gap-[6px] mt-[6px]">
            <img src="assets/images/icons/crown-purple.svg" alt="icon" />
            <p className="text-[#838C9D]">Programming</p>
          </div>
        </div>
      </div>
      <CardLatestCourse title="Mastering React" />
      <CardLatestCourse title="Responsive Design" />
      <CardLatestCourse title="Mastering Angular" />
    </section>
  );
}
