import { create } from 'zustand';

interface AppState {
  isOnboarded: boolean;
  setOnboarded: (value: boolean) => void;
}

/**
 * Estado global ligero de la app (preferencias, flags de sesión).
 * Para datos de servidor usar React Query en `services/`.
 */
export const useAppStore = create<AppState>((set) => ({
  isOnboarded: false,
  setOnboarded: (value) => set({ isOnboarded: value }),
}));
