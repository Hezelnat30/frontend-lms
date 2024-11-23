import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const signInSchema = signUpSchema.omit({ name: true });

export const createCourseSchema = z.object({
  name: z.string().min(5, "Title must be at least 5 characters long"),
  categoryId: z.string().min(1, { message: "Please select a category" }),
  tagline: z.string().min(5, "Tagline must be at least 5 characters long"),
  description: z
    .string()
    .min(12, "Description must be at least 12 characters long"),
  thumbnail: z.any().refine((file) => file?.name, {
    message: "Thumbnail is required",
  }),
});

export const updateCourseSchema = createCourseSchema.partial({
  thumbnail: true,
});

export const mutateContentSchema = z
  .object({
    title: z.string().min(5, "Title must be at least 5 characters long"),
    type: z.string().min(1, { message: "Type is required" }),
    youtubeId: z.string().optional(),
    text: z.string().optional(),
  })
  .superRefine(({ type, youtubeId, text }, ctx) => {
    const schemaYoutubeId = z.string().min(4).safeParse(youtubeId);
    const schemaText = z.string().min(4).safeParse(text);

    if (type === "video") {
      if (!schemaYoutubeId.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Youtube ID is required",
          path: ["youtubeId"],
        });
      }
    }
    if (type === "text") {
      if (!schemaText.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Text is required",
          path: ["text"],
        });
      }
    }
  });

export const createStudentSchema = z.object({
  name: z.string().min(5, "Title must be at least 5 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
  avatar: z.any().refine((file) => file?.name, {
    message: "Avatar is required",
  }),
});

export const updateStudentSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters long").optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z
    .string()
    .optional()
    .transform((val) => val || undefined)
    .refine((val) => val === undefined || val.length >= 5, {
      message: "Password must be at least 5 characters long",
    }),
  avatar: z
    .any()
    .refine((file) => !file || file?.name, {
      message: "Avatar is required",
    })
    .optional(),
});

export const addStudentToCourseSchema = z.object({
  studentId: z.string().min(1, { message: "Please select a student" }),
});
