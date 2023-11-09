import { serverURL } from "./CommonBackend";

export type FriendData = {
  id: number;
  level: number;
  avatar: string;
  username: string;
};
export type RequestData = {
  id: number;
  accepted: boolean;
  created_at: string;
  sender: number;
  receiver: number;
};

type GetUsersDataResponse =
  | { type: "success"; result: FriendData[] }
  | { type: "error"; message: string };

type GetRequestsDataResponse =
  | { type: "success"; result: RequestData[] }
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

export async function getFriendsData(
  token: string | null
): Promise<GetUsersDataResponse> {
  let response;
  try {
    response = await fetch(`http://${serverURL}/friendship/`, {
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

export async function getSentRequestsData(
  user_id: number,
  token: string | null
): Promise<GetRequestsDataResponse> {
  let response;
  try {
    response = await fetch(
      `http://${serverURL}/friend-request/${user_id}/sent`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Token " + token,
        },
      }
    );
  } catch (_) {
    return { type: "error", message: "Unknown network error" };
  }
  const tokenResponse: RequestData[] = await response.json();
  console.log(tokenResponse);

  if (!response.ok) {
    return { type: "error", message: "Unable to get word sets" };
  }

  return { type: "success", result: tokenResponse };
}

export async function getReceivedRequestsData(
  user_id: number,
  token: string | null
): Promise<GetRequestsDataResponse> {
  let response;
  try {
    response = await fetch(
      `http://${serverURL}/friend-request/${user_id}/received`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Token " + token,
        },
      }
    );
  } catch (_) {
    return { type: "error", message: "Unknown network error" };
  }
  const tokenResponse: RequestData[] = await response.json();
  console.log(tokenResponse);

  if (!response.ok) {
    return { type: "error", message: "Unable to get word sets" };
  }

  return { type: "success", result: tokenResponse };
}
