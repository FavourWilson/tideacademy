import { create } from "zustand";

export interface AuthUser {
  id: string;
  fullname: string;
  email: string;
  dateOfBirth: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setAuth: (token: string, user: AuthUser) => void;
  logout: () => void;
  hydrateAuth: () => void;
}

const TOKEN_KEY = "tide_token";
const USER_KEY = "tide_user";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isHydrated: false,

  setAuth: (token, user) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    set({
      token,
      user,
      isAuthenticated: true,
      isHydrated: true,
    });
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    set({
      token: null,
      user: null,
      isAuthenticated: false,
      isHydrated: true,
    });
  },

  hydrateAuth: () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const user = localStorage.getItem(USER_KEY);

      set({
        token: token || null,
        user: user ? JSON.parse(user) : null,
        isAuthenticated: !!token,
        isHydrated: true,
      });
    } catch (error) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);

      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isHydrated: true,
      });
    }
  },
}));