import { apiInstanceAuth } from "@/utils/axios";

export const getStudents = async () => {
  try {
    const response = await apiInstanceAuth.get("/students");
    const { data: students } = response;
    return students;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getStudentById = async (id) => {
  try {
    const response = await apiInstanceAuth.get(`/students/${id}`);
    const { data: studentById } = response;
    return studentById;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createStudent = async (data) => {
  try {
    const response = await apiInstanceAuth.post("/students", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { data: createStudent } = response;
    return createStudent;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateStudent = async (data, id) => {
  try {
    const response = await apiInstanceAuth.put(`/students/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { data: updateStudent } = response;
    return updateStudent;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
