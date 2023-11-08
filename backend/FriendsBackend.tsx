import { serverURL } from "./CommonBackend";

export type FriendData = {
  id: number;
  level: number;
  avatar: string;
  username: string;
};

type GetUsersDataResponse =
  | { type: "success"; result: FriendData[] }
  | { type: "error"; message: string };

export async function getUsersData(
  token: string | null
): Promise<GetUsersDataResponse> {
  let response;
  try {
    response = await fetch(`http://${serverURL}/auth/users/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Token " + token,
      },
    });
  } catch (_) {
    return { type: "error", message: "Unknown network error" };
  }
  const tokenResponse: FriendData[] = await response.json();
  console.log(tokenResponse);

  if (!response.ok) {
    return { type: "error", message: "Unable to get word sets" };
  }

  return { type: "success", result: tokenResponse };
}
