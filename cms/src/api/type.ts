import axiosInstance from "@/lib/axiosInstance";
import { ProductGroup, ProductType } from "@/types/api";

/* ===================== PRODUCT GROUP ===================== */

// CREATE
export const createProductGroup = async (formData: ProductGroup) => {
  const res = await axiosInstance.post("/product/groups", formData);
  return res.data;
};

// READ ALL
export const getAllProductGroups = async () => {
  const res = await axiosInstance.get("/product/groups");
  return res.data;
};

// READ BY ID
export const getProductGroupById = async (id: string) => {
  const res = await axiosInstance.get(`/product/groups/${id}`);
  return res.data;
};

// UPDATE
export const updateProductGroup = async (
  id: string,
  formData: ProductGroup
) => {
  const res = await axiosInstance.put(`/product/groups/${id}`, formData);
  return res.data;
};

// DELETE
export const deleteProductGroup = async (id: string) => {
  const res = await axiosInstance.delete(`/product/groups/${id}`);
  return res.data;
};

/* ===================== PRODUCT TYPE ===================== */

// CREATE
export const createProductType = async (formData: ProductType) => {
  const res = await axiosInstance.post("/product/types", formData);
  return res.data;
};

// READ ALL
export const getAllProductTypes = async () => {
  const res = await axiosInstance.get("/product/types");
  return res.data;
};

// READ BY ID
export const getProductTypeById = async (id: string) => {
  const res = await axiosInstance.get(`/product/types/${id}`);
  return res.data;
};

// UPDATE
export const updateProductType = async (
  id: string,
  formData: ProductType
) => {
  const res = await axiosInstance.put(`/product/types/${id}`, formData);
  return res.data;
};

// DELETE
export const deleteProductType = async (id: string) => {
  const res = await axiosInstance.delete(`/product/types/${id}`);
  return res.data;
};
