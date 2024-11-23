import CardLatestStudent from "@/components/Modules/Manager/Overview/CardLatestStudent.";
import React from "react";
import { useLoaderData } from "react-router-dom";

export default function Students() {
  const overviews = useLoaderData();
  const { students } = overviews;

  return (
    <section
      id="LatestStudents"
      className="flex flex-col rounded-[30px] p-7.5 gap-7.5 bg-[#F8FAFB]"
    >
      <h2 className="font-extrabold text-[22px] leading-[33px]">
        Latest Students
      </h2>
      {students?.map((student) => (
        <CardLatestStudent
          key={student._id}
          imageUrl={student.photo_url}
          name={student.name}
          coursesJoined={student.courses.length || 0}
        />
      ))}
    </section>
  );
}
