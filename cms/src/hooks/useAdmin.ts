import { useMutation } from "@tanstack/react-query";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getLogout, postLogin } from "@/api/admin";

export const useAuth = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.login);
  const clearAuth = useAuthStore((state) => state.logout);

  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      setAuth({
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      });

      toast.success("Login successful!");
      
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: getLogout,
    onSuccess: () => {
      clearAuth();
      toast.success("Logged out");
      router.push("/");
      router.refresh();
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
};