import { createStudentSchema, updateStudentSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import gallery_add_black from "@assets/images/icons/gallery-add-black.svg";
import note_favorite_black from "@assets/images/icons/note-favorite-black.svg";
import sms_black from "@assets/images/icons/sms-black.svg";
import lock_black from "@assets/images/icons/lock-black.svg";
import delete_icon from "@assets/images/icons/delete.svg";
import { ReactSVG } from "react-svg";
import DefaultInput from "@/components/Modules/Manager/Students/AddStudents/DefaultInput";
import { useState } from "react";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { createStudent, updateStudent } from "@/services/studentService";
import { useNavigate } from "react-router-dom";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useRevalidator } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

export default function AddStudent() {
  const navigate = useNavigate();
  const student = useLoaderData();
  const result = student?.result;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(
      student === undefined ? createStudentSchema : updateStudentSchema
    ),
    defaultValues: {
      name: result?.name,
      email: result?.email,
    },
  });

  const { isLoading: createStudentLoading, mutateAsync: mutateCreateStudent } =
    useMutation({
      mutationFn: (data) => createStudent(data),
    });
  const { isLoading: updateStudentLoading, mutateAsync: mutateUpdateStudent } =
    useMutation({
      mutationFn: (data) => updateStudent(data, result._id),
      onSuccess: (response) => {
        console.log("Student updated successfully", response);
      },
      onError: (error) => {
        console.error("Error updating student:", error);
        alert("There was an error updating the student.");
      },
    });

  const [file, setFile] = useState(null);
  const inputFileRef = useRef(null);

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setValue("avatar", e.target.files[0]);
    }
  };

  const handleDeleteAvatar = () => {
    setFile(null);
    setValue("avatar", null, { shouldValidate: true });
    if (inputFileRef.current) inputFileRef.current.value = "";
  };

  const onSubmit = async (data) => {
    console.log("Form data", data);
    try {
      const formData = new FormData();
      formData.append("avatar", data.avatar);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      console.log("Submitting form data:", formData);

      if (student === undefined) {
        console.log("Calling createStudent");
        await mutateCreateStudent(formData);
      } else {
        console.log("Calling updateStudent");
        await mutateUpdateStudent(formData);
      }

      navigate("/manager/students");
    } catch (error) {
      console.log("Failed to create student", error);
    }
  };

  return (
    <>
      <header className="flex items-center justify-between gap-[30px]">
        <div>
          <h1 className="font-extrabold text-[28px] leading-[42px]">
            {student === undefined ? "Add Student" : "Update Student"}
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
        className="flex flex-col w-[550px] rounded-[30px] p-[30px] gap-4.5 bg-[#F8FAFB]"
      >
        <div className="relative flex flex-col gap-[10px]">
          <label htmlFor="thumbnail" className="font-semibold">
            Add a Avatar
          </label>
          <div className="flex items-center gap-[14px]">
            <div
              id="thumbnail-preview-container"
              className="relative flex shrink-0 w-22 h-22 rounded-[20px] border border-[#CFDBEF] overflow-hidden"
            >
              <button
                type="button"
                id="trigger-input"
                onClick={() => inputFileRef.current.click()}
                className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-3 z-0"
              >
                {file === null && (
                  <ReactSVG src={gallery_add_black} alt="icon" />
                )}
              </button>
              <img
                id="avatar-preview"
                src={file !== null ? URL.createObjectURL(file) : ""}
                className={`w-full h-full object-cover ${
                  file !== null ? "block" : "hidden"
                }`}
                alt="avatar"
              />
            </div>
            {file !== null && (
              <button
                type="button"
                onClick={handleDeleteAvatar}
                id="delete-preview"
                className="w-12 h-12 rounded-full z-10"
              >
                <ReactSVG src={delete_icon} alt="delete" />
              </button>
            )}
          </div>
          <input
            {...register("avatar")}
            onChange={handleAvatarChange}
            ref={inputFileRef}
            type="file"
            id="avatar"
            accept="image/*"
            className="absolute bottom-0 left-1/4 -z-10"
          />
          {errors.avatar?.message && !file && (
            <span className="error-message text-[#FF435A]">
              {errors.avatar?.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-[10px]">
          <DefaultInput
            label="Full Name"
            name="name"
            type="text"
            placeholder="Write your name"
            register={register}
            icon={note_favorite_black}
            errorMessage={errors.name?.message}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <DefaultInput
            label="Email"
            name="email"
            type="email"
            placeholder="Write your email address"
            register={register}
            icon={sms_black}
            errorMessage={errors.email?.message}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <DefaultInput
            label="Password"
            name="password"
            type="password"
            placeholder="Type password"
            register={register}
            icon={lock_black}
            errorMessage={errors.password?.message}
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
            type="submit"
            disabled={student ? updateStudentLoading : createStudentLoading}
            className="w-full rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap"
          >
            <CgSpinnerTwoAlt
              className={`${
                createStudentLoading || updateStudentLoading
                  ? "animate-spin"
                  : "hidden"
              }`}
            />
            {student === undefined ? "Add Student" : "Update Student"}
          </button>
        </div>
      </form>
    </>
  );
}
