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
import { createCourseSchema, updateCourseSchema } from "@/utils/zodSchema";
import DefaultInput from "@/components/Modules/Manager/Courses/CreateCourse/DefaultInput";
import { useState } from "react";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { createCourse } from "@/services/courseService";
import { updateCourse } from "@/services/courseService";
import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useRevalidator } from "react-router-dom";
import { useEffect } from "react";

export default function CreateCourses() {
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const { id } = useParams();
  const { course } = useLoaderData();
  const result = course?.result;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(
      result === null ? createCourseSchema : updateCourseSchema
    ),
    defaultValues: {
      name: result?.name,
      tagline: result?.tagline,
      description: result?.description,
    },
  });

  const [file, setFile] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(result?.thumbnail_url || "");
  const inputFileRef = useRef(null);

  const { isLoading: isPendingCreate, mutateAsync: mutateCreate } = useMutation(
    {
      mutationFn: (data) => createCourse(data),
      onSuccess: () => {
        revalidator.revalidate();
        navigate("/manager/courses");
      },
    }
  );
  const { isLoading: isPendingUpdate, mutateAsync: mutateUpdate } = useMutation(
    {
      mutationFn: (data) => updateCourse(data, id),
      onSuccess: () => {
        revalidator.revalidate();
        navigate("/manager/courses");
      },
    }
  );

  useEffect(() => {
    if (file) {
      const newThumbnailUrl = URL.createObjectURL(file);
      setThumbnailUrl(newThumbnailUrl);

      return () => URL.revokeObjectURL(newThumbnailUrl);
    } else {
      setThumbnailUrl(result?.thumbnail_url || "");
    }
  }, [file, result?.thumbnail_url]);

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setValue("thumbnail", e.target.files[0]);
    }
  };

  const handleDeleteThumbnail = () => {
    setFile(null);
    setThumbnailUrl("");
    setValue("thumbnail", null, { shouldValidate: true });
    if (inputFileRef.current) inputFileRef.current.value = "";
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("tagline", data.tagline);
      formData.append("description", data.description);
      formData.append("categoryId", data.categoryId);
      formData.append("thumbnail", data.thumbnail);

      course ? await mutateUpdate(formData) : await mutateCreate(formData);
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
            {course ? "Update Course" : "New Course"}
          </h1>
          <p className="text-[#838C9D] mt-[1]">Create new future for company</p>
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
          <DefaultInput
            placeholder="Write better name for your course"
            type="text"
            name="name"
            register={register}
            icon={note_favorite_black}
            errorMessage={errors?.name?.message}
          />
        </div>
        <div className="relative flex flex-col gap-[10px]">
          <label htmlFor="thumbnail" className="font-semibold">
            Add a Thumbnail
          </label>
          <div
            id="thumbnail-preview-container"
            className="relative flex shrink-0 w-full h-[200px] rounded-[20px] border border-[#CFDBEF] overflow-hidden"
          >
            <button
              type="button"
              id="trigger-input"
              onClick={() => inputFileRef.current?.click()}
              className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-3 z-0"
            >
              {!file && !thumbnailUrl && (
                <>
                  <ReactSVG src={gallery_black} alt="icon" />
                  <span className="text-[#838C9D]">Add an attachment</span>
                </>
              )}
            </button>
            <img
              id="thumbnail-preview"
              src={thumbnailUrl}
              className={`w-full h-full object-cover ${
                file || thumbnailUrl ? "block" : "hidden"
              }`}
              alt="thumbnail"
            />

            {(file || thumbnailUrl) && (
              <button
                onClick={handleDeleteThumbnail}
                type="button"
                className="absolute right-3 bottom-3 w-12 h-12 rounded-full"
              >
                <ReactSVG src={delete_icon} alt="delete" />
              </button>
            )}
          </div>
          <input
            {...register("thumbnail")}
            ref={inputFileRef}
            onChange={handleThumbnailChange}
            type="file"
            name="thumbnail"
            id="thumbnail"
            accept="image/*"
            className="absolute bottom-0 left-1/4 -z-10"
          />
          <span className="error-message text-[#FF435A]">
            {errors?.thumbnail?.message}
          </span>
        </div>
        <div className="flex flex-col gap-[10px]">
          <DefaultInput
            type="text"
            name="tagline"
            register={register}
            placeholder="Write tagline for better copy"
            icon={bill_black}
            errorMessage={errors?.tagline?.message}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="category" className="font-semibold">
            Select Category
          </label>
          <SelectCategories
            control={control}
            name="categoryId"
            errorMessage={
              errors?.categoryId?.message && "Please select a category"
            }
            selectedCategoryId={result?.categoryId}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="desc" className="font-semibold">
            Description
          </label>
          <div
            className={`flex w-full rounded-[20px] border border-[#CFDBEF] gap-3 p-5  transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF] ${
              errors?.description?.message ? "ring-2 ring-[#FF435A]" : ""
            }`}
          >
            <img
              src="/assets/images/icons/note-black.png"
              className="w-6 h-6"
              alt="icon"
            />
            <textarea
              {...register("description")}
              name="description"
              id="description"
              rows="5"
              className="appearance-none outline-none w-full font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent"
              placeholder="Explain what this course about"
            ></textarea>
          </div>
          <span className="error-message text-[#FF435A]">
            {errors?.description?.message}
          </span>
        </div>
        <div className="flex items-center gap-[14px]">
          <button
            type="button"
            className="w-full rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            disabled={course ? isPendingUpdate : isPendingCreate}
            className="w-full rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap"
          >
            {course ? "Update Course" : "Create Course"}
          </button>
        </div>
      </form>
    </>
  );
}
