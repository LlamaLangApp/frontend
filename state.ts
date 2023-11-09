import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserDataToSet = {
  id?: number;
  token?: null | string;
  username?: string | null;
  avatar?: string | null;
  level?: number;
  score?: number;
};

interface AppState {
  id: number;
  token: null | string;
  username: string | null;
  avatar: string | null;
  level: number;
  score: number;
  setUserData: (data: UserDataToSet) => void;
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      id: 0,
      username: null,
      avatar: null,
      score: 0,
      level: 0,
      token: null,
      setUserData: (data) => set(data),
    }),
    {
      name: "llamalang-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export { useAppStore };
