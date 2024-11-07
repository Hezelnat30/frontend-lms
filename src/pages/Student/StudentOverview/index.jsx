import CardCourses from "@/components/Modules/Manager/Courses/CardCourses";
import CardLatestCourse from "@/components/Modules/Student/CardLatestCourse";
import React from "react";
import { NavLink } from "react-router-dom";

export default function Student() {
  return (
    <section
      id="LatestCourse"
      className="flex flex-col rounded-[30px] p-7.5 gap-7.5 bg-[#F8FAFB]"
    >
      <h2 className="font-extrabold text-[22px] leading-[33px]">
        Latest Courses
      </h2>
      <CardLatestCourse />
      <CardLatestCourse title="Mastering React" />
      <CardLatestCourse title="Responsive Design" />
      <CardLatestCourse title="Mastering Angular" />
    </section>
  );
}
