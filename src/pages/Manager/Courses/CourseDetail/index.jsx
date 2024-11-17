import TableManageCourseDetail from "@/components/Modules/Manager/Courses/CourseDetail/TableManageCourseDetail";
import React from "react";
import { useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import cup_purple from "@assets/images/icons/cup-purple.svg";
import note_favorite_purple from "@assets/images/icons/note-favorite-purple.svg";
import crown_purple from "@assets/images/icons/crown-purple.svg";
import profile_user_purple from "@assets/images/icons/profile-2user-purple.svg";
import { ReactSVG } from "react-svg";

export default function CourseDetail() {
  const { id } = useParams();
  const course = useLoaderData();
  const { result } = course;

  const category = result?.category?.name;
  const contents = result?.details.length || 0;

  return (
    <>
      <div
        id="Breadcrumb"
        className="flex items-center gap-5 *:after:content-['/'] *:after:ml-5"
      >
        <span className="last-of-type:after:content-[''] last-of-type:font-semibold">
          Dashboard
        </span>
        <span className="last-of-type:after:content-[''] last-of-type:font-semibold">
          Manage Course
        </span>
        <span className="last-of-type:after:content-[''] last-of-type:font-semibold">
          Details
        </span>
      </div>
      <header className="flex items-center justify-between gap-[30px]">
        <div>
          <h1 className="font-extrabold text-[28px] leading-[42px]">
            {result?.name}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <NavLink
            to={`/manager/courses/edit/${id}`}
            className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap"
          >
            Edit Course
          </NavLink>
          <NavLink
            to={`/manager/courses/${id}/preview`}
            className="w-fit rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap"
          >
            Preview
          </NavLink>
        </div>
      </header>
      <section id="CourseInfo" className="flex gap-[50px]">
        <div
          id="Thumbnail"
          className="flex shrink-0 w-[480px] h-[250px] rounded-[20px] bg-[#D9D9D9] overflow-hidden"
        >
          <img
            src={result?.thumbnail_url}
            className="w-full h-full object-cover"
            alt="thumbnail"
          />
        </div>
        <div className="grid grid-cols-2 gap-5 w-full">
          <div className="flex flex-col rounded-[20px] border border-[#CFDBEF] p-5 gap-4">
            <img src={profile_user_purple} className="w-8 h-8" alt="icon" />
            <p className="font-semibold">{course?.students?.length || 0}</p>
          </div>
          <div className="flex flex-col rounded-[20px] border border-[#CFDBEF] p-5 gap-4">
            <img src={crown_purple} className="w-8 h-8" alt="icon" />
            <p className="font-semibold">{category}</p>
          </div>
          <div className="flex flex-col rounded-[20px] border border-[#CFDBEF] p-5 gap-4">
            <img src={note_favorite_purple} className="w-8 h-8" alt="icon" />
            <p className="font-semibold">{contents} Contents</p>
          </div>
          <div className="flex flex-col rounded-[20px] border border-[#CFDBEF] p-5 gap-4">
            <ReactSVG src={cup_purple} alt="icon" />
            <p className="font-semibold">Certificate</p>
          </div>
        </div>
      </section>
      <TableManageCourseDetail
        details={result?.details ?? []}
        courseId={result?._id}
      />
    </>
  );
}
