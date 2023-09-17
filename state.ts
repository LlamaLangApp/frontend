import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AppState {
  token: null | string;
  setToken: (token: null | string) => void;
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
    }),
    {
      name: "llamalang-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export { useAppStore };
