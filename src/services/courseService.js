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

export const getCourseById = async (id, preview = false) => {
  try {
    const response = await apiInstanceAuth.get(
      `/courses/${id}${preview ? "?preview=true" : ""}`
    );
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

export const createContent = async (data) => {
  try {
    const response = await apiInstanceAuth.post("/courses/contents", data);
    const { data: createData } = response;
    return createData;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

export const getDetailContent = async (id) => {
  try {
    const response = await apiInstanceAuth.get(`/courses/contents/${id}`);
    const { data: detailContent } = response;
    return detailContent;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

export const updateContent = async (data, id) => {
  try {
    const response = await apiInstanceAuth.put(`/courses/contents/${id}`, data);
    const { data: updateContent } = response;
    return updateContent;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

export const deleteContent = async (id) => {
  try {
    const response = await apiInstanceAuth.delete(`/courses/contents/${id}`);
    const { data: deleteContent } = response;
    return deleteContent;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

export const getStudentsCourse = async (id) => {
  try {
    const response = await apiInstanceAuth.get(`/courses/students/${id}`);
    const { data: studentsCourse } = response;
    return studentsCourse;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

export const addStudentToCourse = async (data, id) => {
  try {
    const response = await apiInstanceAuth.post(
      `/courses/students/${id}`,
      data
    );
    const { data: addStudentToCourse } = response;
    return addStudentToCourse;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

export const deleteStudentFromCourse = async (data, id) => {
  try {
    const response = await apiInstanceAuth.put(`/courses/students/${id}`, data);
    const { data: deleteStudentFromCourse } = response;
    return deleteStudentFromCourse;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};
