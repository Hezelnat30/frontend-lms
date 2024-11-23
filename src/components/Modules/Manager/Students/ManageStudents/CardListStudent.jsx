import { deleteStudent } from "@/services/studentService";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useRevalidator } from "react-router-dom";
import { NavLink } from "react-router-dom";
import note_favorite_purple from "@assets/images/icons/note-favorite-purple.svg";
import { ReactSVG } from "react-svg";
import { deleteStudentFromCourse } from "@/services/courseService";
import { useParams } from "react-router-dom";

export default function CardListStudent({ imageUrl, name, id }) {
  const params = useParams();
  const revalidator = useRevalidator();
  const { isLoading, mutateAsync } = useMutation({
    mutationFn: () => deleteStudentFromCourse({ studentId: id }, params.id),
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
      </div>
      <div className="flex justify-end items-center gap-3">
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
