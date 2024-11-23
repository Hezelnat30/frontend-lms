import SelectCategories from "@/components/Modules/Manager/Courses/CreateCourse/SelectCategories";
import React from "react";
import { NavLink } from "react-router-dom";
import note_favorite_black from "@assets/images/icons/note-favorite-black.svg";
import gallery_black from "@assets/images/icons/gallery-add-black.svg";
import bill_black from "@assets/images/icons/bill-black.svg";
import delete_icon from "@assets/images/icons/delete.svg";
import { ReactSVG } from "react-svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addStudentToCourseSchema,
  createCourseSchema,
  updateCourseSchema,
} from "@/utils/zodSchema";
import DefaultInput from "@/components/Modules/Manager/Courses/CreateCourse/DefaultInput";
import { useState } from "react";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { addStudentToCourse, createCourse } from "@/services/courseService";
import { updateCourse } from "@/services/courseService";
import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useRevalidator } from "react-router-dom";
import { useEffect } from "react";
import SelectStudent from "@/components/Modules/Manager/Courses/AddStudentToCourse/SelectStudent";

export default function AddStudentToCourse() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addStudentToCourseSchema),
  });

  const { isLoading, mutateAsync: mutateStudentToCourse } = useMutation({
    mutationFn: (data) => addStudentToCourse(data, id),
    onSuccess: () => {
      navigate(`/manager/courses/students/${id}`);
    },
  });

  const onSubmit = async (data) => {
    try {
      await mutateStudentToCourse(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <>
      <header className="flex items-center justify-between gap-[30px]">
        <div>
          <h1 className="font-extrabold text-[28px] leading-[42px]">
            Add Student
          </h1>
          <p className="text-[#838C9D] mt-[1]">Add Student to Your Course</p>
        </div>
        <div className="flex items-center gap-3">
          <NavLink
            to="#"
            className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap"
          >
            Import from BWA
          </NavLink>
        </div>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[550px] rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]"
      >
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="category" className="font-semibold">
            Select Category
          </label>
          <SelectStudent
            control={control}
            name="studentId"
            errorMessage={errors?.studentId?.message}
          />
        </div>
        <div className="flex items-center gap-[14px]">
          <button
            type="button"
            className="w-full rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap"
          >
            Save as Draft
          </button>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full rounded-full p-[14px_20px] font-semsibold text-[#FFFFFF] bg-[#662FFF] text-nowrap"
          >
            Add Now
          </button>
        </div>
      </form>
    </>
  );
}
