import { createTier, deleteTier, getAllTier, getTierById, updateTier } from "@/api/tier";
import { Tier } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Fetch All Tier
export const useTiers = () => {
  return useQuery({
    queryKey: ["tier"],
    queryFn: getAllTier,
  });
};

// Fetch Single Tier
export const useTier = (id: string) => {
  return useQuery({
    queryKey: ["tier", id],
    queryFn: () => getTierById(id),
    enabled: !!id,
  });
};

// Create Tier
export const useCreateTier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTier,
    onSuccess: (res) => {
      toast.success(res.message || "Tier created successfully");
      queryClient.invalidateQueries({ queryKey: ["tier"] });
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Creation failed"),
  });
};

// Update Tier
export const useUpdateTier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tier }) => updateTier(id, data),
    onSuccess: (res) => {
      toast.success("Tier updated successfully");
      queryClient.invalidateQueries({ queryKey: ["tier"] });
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Update failed"),
  });
};

// Delete Group
export const useDeleteTier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTier,
    onSuccess: () => {
      toast.success("Group deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["tier"] });
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Delete failed"),
  });
};