import CardCourses from "@/components/Modules/Manager/Courses/CardCourses";
import CardLatestCourse from "@/components/Modules/Manager/Overview/CardLatestCourse";
import React from "react";
import { useLoaderData } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Student() {
  const studentsCourses = useLoaderData();
  console.log({ studentsCourses });

  return (
    <section
      id="LatestCourse"
      className="flex flex-col rounded-[30px] p-7.5 gap-7.5 bg-[#F8FAFB]"
    >
      <h2 className="font-extrabold text-[22px] leading-[33px]">
        Latest Courses
      </h2>
      {studentsCourses?.map((item) => (
        <CardLatestCourse
          key={item._id}
          id={item._id}
          imageUrl={item.thumbnail_url}
          title={item.name}
          category={item.category.name}
        />
      ))}
    </section>
  );
}
