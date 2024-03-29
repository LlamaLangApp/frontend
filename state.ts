import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { defaultUserData } from "./Consts";

export type UserDataToSet = {
  id?: number;
  token?: null | string;
  username?: string | null;
  email?: string | null;
  avatar?: string | null;
  level?: number;
  score?: number;
  llama?: number;
  current_week_points?: number | null;
  points_to_next_level?: number;
};

interface AppState {
  id: number;
  token: null | string;
  username: string | null;
  email: string | null;
  avatar: string | null;
  level: number;
  score: number;
  llama: number;
  current_week_points: number | null;
  points_to_next_level: number;
  setUserData: (data: UserDataToSet) => void;
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...defaultUserData,
      setUserData: (data) => set(data),
    }),
    {
      name: "llamalang-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export { useAppStore };
