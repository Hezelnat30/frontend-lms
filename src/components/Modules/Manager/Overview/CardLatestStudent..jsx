import React from "react";

export default function CardLatestStudent({ imageUrl, name, coursesJoined }) {
  return (
    <div className="card flex items-center gap-5">
      <div className="flex shrink-0 w-20 h-20 rounded-[20px] bg-[#D9D9D9] overflow-hidden">
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
        <div className="flex items-center gap-[6px] mt-[6px]">
          <img src="assets/images/icons/crown-purple.svg" alt="icon" />
          <p className="text-[#838C9D]">{coursesJoined} Course Joined</p>
        </div>
      </div>
    </div>
  );
}
