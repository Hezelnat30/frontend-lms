import React from "react";
import { useLoaderData } from "react-router-dom";

export default function Stats() {
  const overviews = useLoaderData();
  return (
    <section
      id="Stats"
      className="flex rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]"
    >
      <div className="grid grid-cols-2 w-[500px] gap-[30px]">
        <div className="flex flex-col rounded-[20px] p-5 gap-5 bg-white shadow-[0_4px_4px_0_#E0E2EF]">
          <img
            src="assets/images/icons/profile-2user-purple.svg"
            className="w-[46px] h-[46px]"
            alt="icon"
          />
          <div>
            <p className="font-extrabold text-2xl leading-[36px]">
              {overviews?.totalStudents.toLocaleString()}
            </p>
            <p className="text-[#838C9D]">Total Students</p>
          </div>
        </div>
        <div className="flex flex-col rounded-[20px] p-5 gap-5 bg-white shadow-[0_4px_4px_0_#E0E2EF]">
          <img
            src="assets/images/icons/note-favorite-purple.svg"
            className="w-[46px] h-[46px]"
            alt="icon"
          />
          <div>
            <p className="font-extrabold text-2xl leading-[36px]">
              {overviews?.totalCourse.toLocaleString()}
            </p>
            <p className="text-[#838C9D]">Total Courses</p>
          </div>
        </div>
        <div className="flex flex-col rounded-[20px] p-5 gap-5 bg-white shadow-[0_4px_4px_0_#E0E2EF]">
          <img
            src="assets/images/icons/video-play-purple.svg"
            className="w-[46px] h-[46px]"
            alt="icon"
          />
          <div>
            <p className="font-extrabold text-2xl leading-[36px]">
              {overviews?.totalVideos.toLocaleString()}
            </p>
            <p className="text-[#838C9D]">Video Content</p>
          </div>
        </div>
        <div className="flex flex-col rounded-[20px] p-5 gap-5 bg-white shadow-[0_4px_4px_0_#E0E2EF]">
          <img
            src="assets/images/icons/note-purple.svg"
            className="w-[46px] h-[46px]"
            alt="icon"
          />
          <div>
            <p className="font-extrabold text-2xl leading-[36px]">
              {overviews?.totalText.toLocaleString()}
            </p>
            <p className="text-[#838C9D]">Text Content</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 rounded-[20px] p-5 gap-5 bg-white shadow-[0_4px_4px_0_#E0E2EF]">
        <div className="relative flex items-center justify-center shrink-0 m-auto rounded-full w-[230px] h-[230px]">
          <div
            className="absolute rounded-full w-[230px] h-[230px] z-10"
            style={{
              background: "conic-gradient(#C2ACFF 0% 25%, #662FFF 0% 100%)",
            }}
          ></div>
          <div className="flex justify-center items-center w-[130px] h-[130px] rounded-full bg-white z-10">
            <p className="w-fit h-fit text-center font-bold text-lg leading-[27px]">
              Our
              <br />
              Rapport
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-[#662FFF]"></div>
            <p className="font-semibold text-sm leading-[21px]">
              Completed 75%
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-[#C2ACFF]"></div>
            <p className="font-semibold text-sm leading-[21px]">
              Not Completed 25%
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
