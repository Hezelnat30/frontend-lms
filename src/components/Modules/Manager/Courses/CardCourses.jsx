import React from "react";
import { NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";
import profile_user_purple from "@assets/images/icons/profile-2user-purple.svg";
import crown_purple from "@assets/images/icons/crown-purple.svg";
import { useMutation } from "@tanstack/react-query";
import { deleteCourse } from "@/services/courseService";
import { useRevalidator } from "react-router-dom";

export default function CardCourses({
  imageUrl = "/assets/images/thumbnails/th-1.png",
  name = "Responsive Design Triclorem Lorem, ipsum dolor.",
  totalStudents = 554,
  category = "Programming",
  id = 1,
}) {
  const revalidator = useRevalidator();

  const { isPending, mutateAsync: mutateDelete } = useMutation({
    mutationFn: () => deleteCourse(id),
  });

  const handleDelete = async () => {
    try {
      await mutateDelete();
      revalidator.revalidate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card flex items-center gap-5">
      <div className="flex shrink-0 w-[140px] h-[110px] rounded-[20px] bg-[#D9D9D9] overflow-hidden">
        <img
          src={imageUrl}
          className="w-full h-full object-cover"
          alt="thumbnail"
        />
      </div>
      <div className="w-full">
        <h3 className="font-bold text-xl leading-[30px] line-clamp-1">
          {name}
        </h3>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-[6px] mt-[6px]">
            <ReactSVG src={profile_user_purple} alt="icon" />
            <p className="text-[#838C9D]">{totalStudents} Students</p>
          </div>
          <div className="flex items-center gap-[6px] mt-[6px]">
            <ReactSVG src={crown_purple} alt="icon" />
            <p className="text-[#838C9D]">{category}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-3">
        <button
          onClick={handleDelete}
          disabled={isPending}
          type="button"
          className="w-fit rounded-full bg-red-500 text-white p-[14px_20px] font-semibold text-nowrap"
        >
          Delete
        </button>
        <NavLink
          to={`/manager/courses/${id}`}
          className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap"
        >
          Manage
        </NavLink>
      </div>
    </div>
  );
}
