import React from "react";
import { NavLink } from "react-router-dom";

export default function CardLatestCourse({
  imageUrl = "/assets/images/thumbnails/th-1.png",
  id = "1",
  category = "Programming",
  title = "Responsive Design Triclorem Lorem, ipsum dolor.",
}) {
  return (
    <div className="card flex items-center gap-5">
      <div className="flex shrink-0 w-[100px] h-20 rounded-[20px] bg-[#D9D9D9] overflow-hidden">
        <img
          src={imageUrl}
          className="w-full h-full object-cover"
          alt="thumbnail"
        />
      </div>
      <div className="w-full">
        <NavLink
          to={`/student/detail-course/${id}`}
          className="font-bold text-xl leading-[30px] line-clamp-1 hover:line-clamp-none"
        >
          {title}
        </NavLink>
        <div className="flex items-center gap-[6px] mt-[6px]">
          <img src="/assets/images/icons/crown-purple.svg" alt="icon" />
          <p className="text-[#838C9D]">{category}</p>
        </div>
      </div>
    </div>
  );
}
