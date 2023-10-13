import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserDataToSet = {
  token?: null | string;
  username?: string | null;
  avatar?: string | null;
  level?: number;
  score?: number;
};

interface AppState {
  token: null | string;
  username: string | null;
  avatar: string | null;
  level: number;
  score: number;
  setUserData: (data: UserDataToSet) => void;
  setToken: (token: null | string) => void;
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      username: null,
      avatar: null,
      score: 0,
      level: 0,
      token: null,
      setUserData: (data) => set(data),
      setToken: (token) => set({ token }),
    }),
    {
      name: "llamalang-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export { useAppStore };
