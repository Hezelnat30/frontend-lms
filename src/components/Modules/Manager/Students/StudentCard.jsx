import { deleteStudent } from "@/services/studentService";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useRevalidator } from "react-router-dom";
import { NavLink } from "react-router-dom";
import note_favorite_purple from "@assets/images/icons/note-favorite-purple.svg";
import { ReactSVG } from "react-svg";

export default function StudentCard({ imageUrl, name, totalCourse, id }) {
  const revalidator = useRevalidator();
  const { isLoading, mutateAsync } = useMutation({
    mutationFn: () => deleteStudent(id),
  });

  const handleDeleteStudent = async () => {
    try {
      await mutateAsync();
      revalidator.revalidate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card flex items-center gap-5">
      <div className="relative flex shrink-0 w-20 h-20">
        <div className="rounded-[20px] bg-[#D9D9D9] overflow-hidden w-20 h-20">
          <img
            src={imageUrl}
            className="w-full h-full object-cover"
            alt="photo"
          />
        </div>
      </div>
      <div className="w-full">
        <h3 className="font-bold text-xl leading-7 line-clamp-1">{name}</h3>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-[6px] mt-1.5">
            <ReactSVG src={note_favorite_purple} alt="icon" />
            <p className="text-[#838C9D]">
              {totalCourse > 0
                ? `${totalCourse} Course Joined`
                : "0 Course Joined"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-3">
        <NavLink
          to={`/manager/students/edit/${id}`}
          className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap"
        >
          Edit Profile
        </NavLink>
        <button
          type="button"
          disabled={isLoading}
          onClick={handleDeleteStudent}
          className="w-fit rounded-full p-[14px_20px] bg-[#FF435A] font-semibold text-white text-nowrap"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
