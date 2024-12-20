import StudentCard from "@/components/Modules/Manager/Students/StudentCard";
import { getStudents } from "@/services/studentService";
import React from "react";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Students() {
  const students = useLoaderData();

  return (
    <>
      <header className="flex items-center justify-between gap-[30px]">
        <div>
          <h1 className="font-extrabold text-[28px] leading-[42px]">
            Manage Students
          </h1>
          <p className="text-[#838C9D] mt-[1]">
            Keep your employee or student happy
          </p>
        </div>
        <div className="flex items-center gap-3">
          <NavLink
            to="#"
            className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap"
          >
            Import File
          </NavLink>
          <NavLink
            to="/manager/students/create"
            className="w-fit rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap"
          >
            Add Student
          </NavLink>
        </div>
      </header>
      <section
        id="CourseList"
        className="flex flex-col w-full rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]"
      >
        {students?.map((student) => (
          <StudentCard
            key={student._id}
            id={student._id}
            name={
              student?.name.charAt(0).toUpperCase() + student?.name.slice(1)
            }
            totalCourse={student?.courses?.length}
            imageUrl={student?.photo_url}
          />
        ))}
      </section>
    </>
  );
}
