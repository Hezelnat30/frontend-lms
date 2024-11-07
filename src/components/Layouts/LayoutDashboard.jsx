import React from "react";
import Sidebar from "@/components/Modules/Layouts/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../Modules/Layouts/Header";
import { useMatch } from "react-router-dom";

export default function LayoutDashboard({ isAdmin = true }) {
  const isManagerPreviewPage = useMatch("/manager/courses/:id/preview");
  const isStudentPreviewPage = useMatch("/student/detail-course/:id");

  return (
    <>
      {isManagerPreviewPage !== null || isStudentPreviewPage !== null ? (
        <Outlet />
      ) : (
        <div className="flex min-h-screen">
          <Sidebar isAdmin={isAdmin} />
          <main className="flex flex-col flex-1 gap-7.5 p-7.5 ml-[290px]">
            <Header />
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
}
