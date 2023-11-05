import { serverURL } from "./CommonBackend";

export type UserData = {
  id: number;
  level: number;
  score: number;
  current_week_points: number;
  avatar: string;
  username: string;
  email: string;
};
type GetUserDataResponse =
  | { type: "success"; result: UserData }
  | { type: "error"; message: string };
export async function getUserData(
  token: string | null
): Promise<GetUserDataResponse> {
  let response;
  try {
    response = await fetch(`http://${serverURL}/auth/users/me/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Token " + token,
      },
    });
  } catch (_) {
    return { type: "error", message: "Unknown network error" };
  }
  const tokenResponse: UserData = await response.json();
  // console.log(tokenResponse);

  if (!response.ok) {
    return { type: "error", message: "Unable to get word sets" };
  }

  return { type: "success", result: tokenResponse };
}
