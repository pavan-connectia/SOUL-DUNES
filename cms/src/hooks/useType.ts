import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  createProductGroup, getAllProductGroups, getProductGroupById, updateProductGroup, deleteProductGroup,
  createProductType, getAllProductTypes, getProductTypeById, updateProductType, deleteProductType 
} from "@/api/type";
import { ProductGroup, ProductType } from "@/types/api";
import { toast } from "sonner";

// Fetch All Groups
export const useProductGroups = () => {
  return useQuery({
    queryKey: ["productGroups"],
    queryFn: getAllProductGroups,
  });
};

// Fetch Single Group
export const useProductGroup = (id: string) => {
  return useQuery({
    queryKey: ["productGroups", id],
    queryFn: () => getProductGroupById(id),
    enabled: !!id,
  });
};

// Create Group
export const useCreateProductGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProductGroup,
    onSuccess: (res) => {
      toast.success(res.message || "Group created successfully");
      queryClient.invalidateQueries({ queryKey: ["productGroups"] });
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Creation failed"),
  });
};

// Update Group
export const useUpdateProductGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductGroup }) => updateProductGroup(id, data),
    onSuccess: (res) => {
      toast.success("Group updated successfully");
      queryClient.invalidateQueries({ queryKey: ["productGroups"] });
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Update failed"),
  });
};

// Delete Group
export const useDeleteProductGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductGroup,
    onSuccess: () => {
      toast.success("Group deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["productGroups"] });
    },
  });
};


// Fetch All Types
export const useProductTypes = () => {
  return useQuery({
    queryKey: ["productTypes"],
    queryFn: getAllProductTypes,
  });
};

// Create Type
export const useCreateProductType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProductType,
    onSuccess: (res) => {
      toast.success(res.message || "Type created successfully");
      queryClient.invalidateQueries({ queryKey: ["productTypes"] });
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Creation failed"),
  });
};

// Update Type
export const useUpdateProductType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductType }) => updateProductType(id, data),
    onSuccess: () => {
      toast.success("Type updated successfully");
      queryClient.invalidateQueries({ queryKey: ["productTypes"] });
    },
  });
};

// Delete Type
export const useDeleteProductType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductType,
    onSuccess: () => {
      toast.success("Type deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["productTypes"] });
    },
  });
};