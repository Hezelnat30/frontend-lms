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
