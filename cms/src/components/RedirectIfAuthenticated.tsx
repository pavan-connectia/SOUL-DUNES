"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

export default function RedirectIfAuthenticated({
  children,
}: {
  children: React.ReactNode;
}) {
  const { email } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (email) {
      router.replace("/dashboard");
    }
  }, [email, router]);

  if (email) return null; 

  return <>{children}</>;
}
