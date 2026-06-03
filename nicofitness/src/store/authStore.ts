import type { User } from 'firebase/auth';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  isInitializing: boolean;
  setUser: (user: User | null) => void;
  setInitializing: (value: boolean) => void;
}

/**
 * Estado global de sesión Firebase (sincronizado con onAuthStateChanged).
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isInitializing: true,
  setUser: (user) => set({ user, isInitializing: false }),
  setInitializing: (value) => set({ isInitializing: value }),
}));
