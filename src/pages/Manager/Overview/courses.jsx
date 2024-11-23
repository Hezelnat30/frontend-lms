import CardLatestCourse from "@/components/Modules/Manager/Overview/CardLatestCourse";
import React from "react";
import { useLoaderData } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Courses() {
  const overviews = useLoaderData();
  const { courses } = overviews;
  return (
    <section
      id="LatestCourse"
      className="flex flex-col rounded-[30px] p-7.5 gap-7.5 bg-[#F8FAFB]"
    >
      <h2 className="font-extrabold text-[22px] leading-[33px]">
        Latest Courses
      </h2>
      {courses?.map((course) => (
        <CardLatestCourse
          key={course._id}
          id={course?._id}
          title={course.name}
          imageUrl={course?.thumbnail_url}
        />
      ))}
    </section>
  );
}
