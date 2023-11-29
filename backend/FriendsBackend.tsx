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

type GetFriendsDataResponse =
  | { type: "success"; result: { friendship_id: number; friend: FriendData }[] }
  | { type: "error"; message: string };

type GetRequestsDataResponse =
  | { type: "success"; result: RequestData[] }
  | { type: "error"; message: string };

type InviteDataResponse =
  | { type: "success"; result: RequestData }
  | { type: "error"; message: string };

type ResponseToInviteDataResponse =
  | { type: "success"; result: { friendship_id: number } }
  | { type: "error"; message: string };

type DeleteInviteDataResponse =
  | { type: "success"; result: string }
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

  if (!response.ok) {
    return { type: "error", message: "Unable to get word sets" };
  }

  return { type: "success", result: tokenResponse };
}

export async function getFriendsData(
  token: string | null
): Promise<GetFriendsDataResponse> {
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
  const tokenResponse: { friendship_id: number; friend: FriendData }[] =
    await response.json();

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
    response = await fetch(`http://${serverURL}/friend-request/sent/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Token " + token,
      },
    });
  } catch (_) {
    return { type: "error", message: "Unknown network error" };
  }
  const tokenResponse: RequestData[] = await response.json();

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
    response = await fetch(`http://${serverURL}/friend-request/received/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Token " + token,
      },
    });
  } catch (_) {
    return { type: "error", message: "Unknown network error" };
  }
  const tokenResponse: RequestData[] = await response.json();

  if (!response.ok) {
    return { type: "error", message: "Unable to get word sets" };
  }

  return { type: "success", result: tokenResponse };
}

export async function sendFriendsInvite(
  ourId: number,
  userId: number,
  token: string | null
): Promise<InviteDataResponse> {
  let response;
  try {
    response = await fetch(`http://${serverURL}/friend-request/`, {
      method: "POST",
      body: JSON.stringify({
        sender: userId,
        receiver: ourId,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: "Token " + token,
      },
    });
  } catch (_) {
    return { type: "error", message: "Unknown network error" };
  }
  const tokenResponse: RequestData = await response.json();

  if (!response.ok) {
    return { type: "error", message: tokenResponse.toString() };
  }

  return { type: "success", result: tokenResponse };
}

export async function acceptFriendsInvite(
  inviteId: number | null,
  token: string | null
): Promise<ResponseToInviteDataResponse> {
  let response;
  try {
    response = await fetch(
      `http://${serverURL}/friend-request/${inviteId}/accept/`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: "Token " + token,
        },
      }
    );
  } catch (_) {
    return { type: "error", message: "Unknown network error" };
  }
  const tokenResponse: { friendship_id: number } = await response.json();

  if (!response.ok) {
    return { type: "error", message: tokenResponse.toString() };
  }

  return { type: "success", result: tokenResponse };
}

export async function rejectFriendsInvite(
  inviteId: number | null,
  token: string | null
): Promise<ResponseToInviteDataResponse> {
  let response;
  try {
    response = await fetch(
      `http://${serverURL}/friend-request/${inviteId}/reject/`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: "Token " + token,
        },
      }
    );
  } catch (_) {
    return { type: "error", message: "Unknown network error" };
  }
  const tokenResponse: { friendship_id: number } = await response.json();

  if (!response.ok) {
    return { type: "error", message: tokenResponse.toString() };
  }

  return { type: "success", result: tokenResponse };
}

export async function cancelFriendsInvite(
  inviteId: number | null,
  token: string | null
): Promise<DeleteInviteDataResponse> {
  let response;
  try {
    response = await fetch(`http://${serverURL}/friend-request/${inviteId}/`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Token " + token,
      },
    });
  } catch (_) {
    return { type: "error", message: "Unknown network error" };
  }

  if (!response.ok) {
    return { type: "error", message: "" };
  }

  return { type: "success", result: "success" };
}

export async function deleteFriend(
  friendshipId: number | null,
  token: string | null
): Promise<DeleteInviteDataResponse> {
  let response;
  try {
    response = await fetch(`http://${serverURL}/friendship/${friendshipId}/`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Token " + token,
      },
    });
  } catch (_) {
    return { type: "error", message: "Unknown network error" };
  }

  if (!response.ok) {
    return { type: "error", message: "" };
  }

  return { type: "success", result: "success" };
}
