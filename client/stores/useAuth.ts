import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "client" | "freelancer" | "admin";

export type User = {
  id: string;
  name: string;
  phoneNumber: string;
  country: string;
  email: string;
  avatar?: string;
  role?: UserRole;
  createdAt?: string;
  updatedAt?: string;
  bio?: string;
  company?: string;
  website?: string;
  industry?: string;
  companySize?: string;
  location?: string;
  phone?: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  _hasHydrated: boolean;
  login: (user: User, token: string) => void;
  register: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  clearError: () => void;
  setToken: (token: string) => void;
  setHasHydrated: (state: boolean) => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      _hasHydrated: false,
      login: (user, token) =>
        set({ user, token, error: null }),
      register: (user, token) =>
        set({ user, token, error: null }),
      logout: () => set({ user: null, token: null, error: null }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      setToken: (token) => set({ token }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);

// Export a hook to check if user is logged in
export const useIsLoggedIn = () => {
  const user = useAuth((state) => state.user);
  const token = useAuth((state) => state.token);
  return !!user && !!token;
};
