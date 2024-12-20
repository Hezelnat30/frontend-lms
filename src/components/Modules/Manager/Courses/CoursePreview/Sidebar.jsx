import React from "react";
import sidebar_glow from "@assets/images/backgrounds/sidebar-glow.png";
import thumb_1 from "@assets/images/thumbnails/th-1.png";
import { NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { useMatch } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import note_white from "@assets/images/icons/note-white.svg";
import video_white from "@assets/images/icons/video-play-white.svg";
import { useParams } from "react-router-dom";
export default function Sidebar({ onChangeContent }) {
  const isStudent = useMatch("/student/detail-course/:id");
  const { id } = useParams();
  const course = useLoaderData();

  return (
    <aside className="sidebar-container fixed h-[calc(100vh-20px)] w-full max-w-[330px] my-[10px] ml-[10px] bg-[#060A23] overflow-hidden flex flex-1 rounded-[20px]">
      <div className="scroll-container flex w-full overflow-y-scroll hide-scrollbar">
        <nav className="flex flex-col w-full h-fit p-[30px] gap-[30px] z-10">
          <NavLink
            to={isStudent ? "/student" : `/manager/courses/${id}`}
            className="font-semibold text-white hover:underline"
          >
            <span>Back to Dashboard</span>
          </NavLink>
          <div className="flex flex-col gap-4">
            <div className="flex shrink-0 w-[130px] h-[100px] rounded-[14px] bg-[#D9D9D9] overflow-hidden">
              <img
                src={thumb_1}
                className="w-full h-full object-cover"
                alt="thumbnail"
              />
            </div>
            <h2 className="font-bold text-xl leading-[34px] text-white">
              {course?.name}
            </h2>
          </div>
          <ul className="flex flex-col gap-4">
            {course?.details.map((item) => {
              const iconSrc = item.type === "video" ? video_white : note_white;
              return (
                <li key={item?._id}>
                  <button
                    type="button"
                    className="w-full"
                    onClick={() => onChangeContent(item)}
                  >
                    <div className="flex items-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300 hover:bg-[#662FFF] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
                      <ReactSVG src={iconSrc} className="w-6 h-6" alt="icon" />
                      <span className="w-full text-left font-semibold text-white line-clamp-1 transition-all duration-300 hover:line-clamp-none">
                        {item.title}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <img
        src={sidebar_glow}
        className="absolute object-contain object-bottom bottom-0"
        alt="background"
      />
    </aside>
  );
}
