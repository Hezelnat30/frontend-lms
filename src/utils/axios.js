import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { STORAGE_KEY } from "./const";

const baseURL = import.meta.env.VITE_API_URL;

const apiInstance = axios.create({
  baseURL,
  timeout: 3000,
});

export const apiInstanceAuth = axios.create({
  baseURL,
  timeout: 3000,
});

apiInstanceAuth.interceptors.request.use((config) => {
  const session = secureLocalStorage.getItem(STORAGE_KEY);

  if (!session) {
    return config;
  }

  config.headers.Authorization = `Bearer ${session.token}`;

  return config;
});

apiInstanceAuth.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err?.response?.status === 400) {
      window.location.replace("/manager/signin");
      secureLocalStorage.removeItem(STORAGE_KEY);
    }
    return Promise.reject(err);
  }
);

export default apiInstance;
