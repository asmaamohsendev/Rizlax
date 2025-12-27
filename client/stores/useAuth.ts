import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "CLIENT" | "FREELANCER" | "ADMIN";
export type UserStatus = "ACTIVE" | "SUSPENDED" | "BANNED";
export type AuthProvider = "EMAIL" | "GOOGLE";
export type CountryCode =
  | "EG"
  | "SA"
  | "AE"
  | "KW"
  | "QA"
  | "BH"
  | "OM"
  | "JO"
  | "LB"
  | "IQ"
  | "SY"
  | "PS"
  | "YE"
  | "MA"
  | "DZ"
  | "TN"
  | "LY"
  | "SD"
  | "MR"
  | "SO"
  | "DJ"
  | "PK"
  | "ID"
  | "TR"
  | "IR";

export type User = {
  id: string;
  email: string;
  password?: string;
  name: string;
  phoneNumber?: string;
  country: CountryCode;
  role: UserRole;
  status: UserStatus;
  isVerified: boolean;
  onBoardingCompleted: boolean;
  onBoardingStep: number;
  createdAt: string;
  updatedAt: string;
  suspendedUntil?: string;
  // OAuth fields
  googleId?: string;
  profilePicture?: string;
  authProvider: AuthProvider;
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
      login: (user, token) => set({ user, token, error: null }),
      register: (user, token) => set({ user, token, error: null }),
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

// Export a hook to check if profile is completed
export const useIsProfileCompleted = () => {
  const user = useAuth((state) => state.user);
  return user?.onBoardingCompleted ?? false;
};

// Export a hook to get OnBoarding Step
export const useOnBoardingStep = () => {
  const user = useAuth((state) => state.user);
  return user?.onBoardingStep ?? 0;
};