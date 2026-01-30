import axiosInstance from "@/lib/axiosInstance";
import { Login } from "@/types/api";

export const postLogin = async (formData: Login) => {
    const res = await axiosInstance.post("/admin/login", {
        ...formData,
    });

    return res.data;

}

export const getLogout = async () => {
    const res = await axiosInstance.get("/admin/logout");

    return res.data;

}