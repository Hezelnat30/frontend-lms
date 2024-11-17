import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo,
} from "ckeditor5";
import note_favorite_black from "@assets/images/icons/note-favorite-black.svg";
import bill_black from "@assets/images/icons/bill-black.svg";
import { CgSpinnerTwoAlt } from "react-icons/cg";

import "ckeditor5/ckeditor5.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mutateContentSchema } from "@/utils/zodSchema";
import DefaultInput from "@/components/Modules/Manager/Courses/AddCourseContent/DefaultInput.jsx";
import SelectType from "@/components/Modules/Manager/Courses/AddCourseContent/SelectType";
import { useMutation } from "@tanstack/react-query";
import { createContent, updateContent } from "@/services/courseService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

export default function AddCourseContent() {
  const navigate = useNavigate();
  const content = useLoaderData();
  const { id, contentId } = useParams();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(mutateContentSchema),
    defaultValues: {
      title: content?.title || "",
      type: content?.type || "video",
      youtubeId: content?.youtubeId || "",
      text: content?.text || "",
    },
  });

  const { isPending: createIsPending, mutateAsync: mutateCreateContent } =
    useMutation({
      mutationFn: (data) => createContent(data),
      onSuccess: () => navigate(`/manager/courses/${id}`),
    });
  const { isPending: updateIsPending, mutateAsync: mutateUpdateContent } =
    useMutation({
      mutationFn: (data) => updateContent(data, contentId),
      onSuccess: () => navigate(`/manager/courses/${id}`),
    });
  const type = watch("type");

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      courseId: id,
    };
    try {
      content === undefined
        ? await mutateCreateContent(payload)
        : await mutateUpdateContent(payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        id="Breadcrumb"
        className="flex items-center gap-5 *:after:content-['/'] *:after:ml-5"
      >
        <span className="last-of-type:after:content-[''] last-of-type:font-semibold">
          Manage Course
        </span>
        <span className="last-of-type:after:content-[''] last-of-type:font-semibold">
          Course
        </span>
        <span className="last-of-type:after:content-[''] last-of-type:font-semibold">
          {content === undefined ? "Add" : "Edit"} Content
        </span>
      </div>
      <header className="flex items-center justify-between gap-[30px]">
        <div className="flex items-center gap-[30px]">
          <div className="flex shrink-0 w-[150px] h-[100px] rounded-[20px] overflow-hidden bg-[#D9D9D9]">
            <img
              src="/assets/images/thumbnails/th-1.png"
              className="w-full h-full object-cover"
              alt="thumbnail"
            />
          </div>
          <div>
            <h1 className="font-extrabold text-[28px] leading-[42px]">
              {content === undefined ? "Add" : "Edit"} Content
            </h1>
            <p className="text-[#838C9D] mt-[1]">
              Give a best content for the course
            </p>
          </div>
        </div>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[930px] rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]"
      >
        <div className="flex flex-col gap-[10px]">
          <DefaultInput
            icon={note_favorite_black}
            label="Content Title"
            name="title"
            type="text"
            register={register}
            placeholder="Write better name for your course"
            errorMessage={errors.title?.message}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="type" className="font-semibold">
            Select Type
          </label>
          <SelectType control={control} errorMessage={errors.type?.message} />
        </div>
        {type === "video" && (
          <div className="flex flex-col gap-[10px]">
            <DefaultInput
              icon={bill_black}
              label="Youtube Video ID"
              name="youtubeId"
              type="text"
              register={register}
              placeholder="Youtube id for your course"
              errorMessage={errors.youtubeId?.message}
            />
          </div>
        )}
        {type === "text" && (
          <div className="flex flex-col gap-[10px]">
            <label className="font-semibold">Content Text</label>
            <CKEditor
              editor={ClassicEditor}
              config={{
                toolbar: [
                  "undo",
                  "redo",
                  "|",
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "|",
                  "link",
                  "insertTable",
                  "mediaEmbed",
                  "|",
                  "bulletedList",
                  "numberedList",
                  "indent",
                  "outdent",
                ],
                plugins: [
                  Bold,
                  Essentials,
                  Heading,
                  Indent,
                  IndentBlock,
                  Italic,
                  Link,
                  List,
                  MediaEmbed,
                  Paragraph,
                  Table,
                  Undo,
                ],
                initialData: content?.text,
              }}
              onChange={(_, editor) => {
                const data = editor.getData();
                setValue("text", data);
              }}
            />
            <span className="error-message text-[#FF435A]">
              {errors?.text?.message}
            </span>
          </div>
        )}
        <div className="flex items-center gap-[14px]">
          <button
            type="button"
            className="w-full rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap"
          >
            Save as Draft
          </button>
          <button
            disabled={content === undefined ? createIsPending : updateIsPending}
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap"
          >
            {content === undefined ? "Add Content Now" : "Edit Content"}
            <CgSpinnerTwoAlt
              size={24}
              className={`hidden ${
                createIsPending || (updateIsPending && "block animate-spin")
              }`}
            />
          </button>
        </div>
      </form>
    </>
  );
}
