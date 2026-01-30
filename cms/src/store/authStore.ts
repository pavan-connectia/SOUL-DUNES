import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  name: string | null;
  email: string | null;
  role: string | null;
  login: (payload: {
    name: string;
    email: string;
    role: string;
  }) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      name: null,
      email: null,
      role: null,

      login: ({ name, email, role }) =>
        set({
          name,
          email,
          role
        }),

      logout: () =>
        set({
          name: null,
          email: null,
          role: null
        }),
    }),
    {
      name: "auth-store",
    }
  )
);

export default useAuthStore;
