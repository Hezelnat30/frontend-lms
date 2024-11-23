import { apiInstanceAuth } from "@/utils/axios";

export const getOverviews = async () => {
  try {
    const response = await apiInstanceAuth.get("/overviews");
    const { data: overviews } = response;
    return overviews;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
