import { apiInstanceAuth } from "@/utils/axios";

export const getCourse = async () => {
  try {
    const response = await apiInstanceAuth.get("/courses");
    const { data: courses } = response;
    return courses;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await apiInstanceAuth.get(`/courses/${id}`);
    const { data: courseById } = response;
    return courseById;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await apiInstanceAuth.get("/categories");
    const { data: categories } = response;
    return categories;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createCourse = async (data) => {
  try {
    const response = await apiInstanceAuth.post("/courses", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { data: createData } = response;
    return createData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateCourse = async (data, id) => {
  try {
    const response = await apiInstanceAuth.put(`/courses/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { data: updateData } = response;
    return updateData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await apiInstanceAuth.delete(`/courses/${id}`);
    const { data: deleteData } = response;
    return deleteData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
