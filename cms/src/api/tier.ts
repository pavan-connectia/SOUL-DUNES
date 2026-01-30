import axiosInstance from "@/lib/axiosInstance";
import { Tier } from "@/types/api";

/* ===================== Tier ===================== */

// CREATE
export const createTier = async (formData: Tier) => {
  const res = await axiosInstance.post("/servicetier", formData);
  return res.data;
};

// READ ALL
export const getAllTier= async () => {
  const res = await axiosInstance.get("/servicetier");
  return res.data;
};

// READ BY ID
export const getTierById = async (id: string) => {
  const res = await axiosInstance.get(`/servicetier/${id}`);
  return res.data;
};

// UPDATE
export const updateTier = async (
  id: string,
  formData: Tier
) => {
  const res = await axiosInstance.put(`/servicetier/${id}`, formData);
  return res.data;
};

// DELETE
export const deleteTier = async (id: string) => {
  const res = await axiosInstance.delete(`/servicetier/${id}`);
  return res.data;
};