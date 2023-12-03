import { ApiResponse, makeApiRequest } from "./CommonBackend";
import { UserDataToSet } from "../state";

export type UserData = {
  id: number;
  username: string;
  email: string;
  avatar: string;
  llama: number;
  level: number;
  score: number;
  points_to_next_level: number;
  current_week_points: number;
};

export async function getUserData(
  token: string | null
): Promise<ApiResponse<UserData>> {
  return makeApiRequest<UserData>("auth/users/me/", "GET", token);
}

export const handleSetUserData = (
  token: string | null,
  setUserData: (data: UserDataToSet) => void
) => {
  getUserData(token).then((response) => {
    if (response.type === "success") {
      setUserData({
        id: response.result.id,
        token: token,
        username: response.result.username,
        email: response.result.email,
        score: response.result.score,
        level: response.result.level,
        avatar: response.result.avatar,
        llama: response.result.llama,
        points_to_next_level: response.result.points_to_next_level,
        current_week_points: response.result.current_week_points,
      });
    }
  });
};
