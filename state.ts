import { create } from "zustand";

interface AppState {
  token: null | string;
  setToken: (token: null | string) => void;
}

const useAppStore = create<AppState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));

export { useAppStore };
