import axios from "axios";
import useAuthStore from "@/store/authStore";

const api = axios.create({
    baseURL:process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res:any) => res,
  (error:any) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
