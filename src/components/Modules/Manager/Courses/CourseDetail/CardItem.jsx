import React from "react";
import { NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";
import note_favorite_purple from "@assets/images/icons/note-favorite-purple.svg";
import video_play_purple from "@assets/images/icons/video-play-purple.svg";
import thumbnail_video from "@assets/images/thumbnails/cover-video.png";
import thumbnail_text from "@assets/images/thumbnails/cover-text.png";
import { useMutation } from "@tanstack/react-query";
import { deleteContent } from "@/services/courseService";
import { useRevalidator } from "react-router-dom";

export default function CardItem({ id, index, type, title, courseId }) {
  const revalidator = useRevalidator();
  const { isPending, mutateAsync: mutateDelete } = useMutation({
    mutationFn: () => deleteContent(id),
  });

  const handleDeleteContent = async () => {
    try {
      await mutateDelete();
      revalidator.revalidate();
    } catch (error) {
      console.log("Delete Content Error:", error);
    }
  };

  const displayType = type.charAt(0).toUpperCase() + type.slice(1);
  const typeIcon = type === "video" ? video_play_purple : note_favorite_purple;
  const thumbnailSrc = type === "video" ? thumbnail_video : thumbnail_text;

  return (
    <div className="card flex items-center gap-5">
      <div className="relative flex shrink-0 w-[140px] h-[110px] ">
        <p className="absolute -top-[10px] -left-[10px] flex shrink-0 w-[30px] h-[30px] rounded-full items-center justify-center text-center bg-[#662FFF] text-white">
          <span className="font-bold text-sm leading-[21px]">{index}</span>
        </p>
        <div className="rounded-[20px] bg-[#D9D9D9] overflow-hidden">
          <img
            src={thumbnailSrc}
            className="w-full h-full object-cover"
            alt="thumbnail"
          />
        </div>
      </div>
      <div className="w-full">
        <h3 className="font-bold text-xl leading-[30px] line-clamp-1">
          {title}
        </h3>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-[6px] mt-[6px]">
            <ReactSVG src={typeIcon} alt="icon" />
            <p className="text-[#838C9D]">{displayType} Content</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-3">
        <NavLink
          to={`/manager/courses/${courseId}/edit/${id}`}
          className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap"
        >
          Edit Content
        </NavLink>
        <button
          disabled={isPending}
          onClick={handleDeleteContent}
          type="button"
          className="w-fit rounded-full p-[14px_20px] bg-[#FF435A] font-semibold text-white text-nowrap"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
