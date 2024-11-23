import ContentText from "@/components/Modules/Manager/Courses/CoursePreview/ContentText";
import ContentVideo from "@/components/Modules/Manager/Courses/CoursePreview/ContentVideo";
import Header from "@/components/Modules/Layouts/Header";
import Sidebar from "@/components/Modules/Manager/Courses/CoursePreview/Sidebar";
import React from "react";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

export default function CoursePreview({ isAdmin = true }) {
  const course = useLoaderData();

  const [activeContent, setActiveContent] = useState(course?.details[0]);

  const handleChangeContent = (content) => {
    setActiveContent(content);
  };

  const handleNextContent = (content) => {
    const currIndex = course?.details.findIndex(
      (item) => item._id === content._id
    );

    if (currIndex < course?.details.length - 1) {
      handleChangeContent(course?.details[currIndex + 1]);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar onChangeContent={handleChangeContent} />
      <main className="flex flex-col flex-1 gap-[30px] p-[30px] ml-[340px]">
        <Header />
        <div className="relative flex flex-col gap-[26px]">
          {activeContent?.type === "video" ? (
            <ContentVideo
              content={activeContent}
              handleNextContent={handleNextContent}
            />
          ) : (
            <ContentText
              content={activeContent}
              handleNextContent={handleNextContent}
            />
          )}
        </div>
      </main>
    </div>
  );
}
