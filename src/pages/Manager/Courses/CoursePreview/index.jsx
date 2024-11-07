import ContentText from "@/components/Modules/Manager/Courses/CoursePreview/ContentText";
import ContentVideo from "@/components/Modules/Manager/Courses/CoursePreview/ContentVideo";
import Header from "@/components/Modules/Layouts/Header";
import Sidebar from "@/components/Modules/Manager/Courses/CoursePreview/Sidebar";
import React from "react";

export default function CoursePreview() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex flex-col flex-1 gap-[30px] p-[30px] ml-[340px]">
        <Header />
        <div className="relative flex flex-col gap-[26px]">
          <ContentText />
          <ContentVideo />
        </div>
      </main>
    </div>
  );
}
