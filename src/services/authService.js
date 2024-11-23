import apiInstance from "@/utils/axios";

export const postSignUp = async (data) => {
  try {
    const response = await apiInstance.post("/sign-up", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postSignIn = async (data) => {
  try {
    const response = await apiInstance.post("/sign-in", data);
    return response.data;
  } catch (error) {
    console.log("Failed to sign in", error);
    throw error;
  }
};
