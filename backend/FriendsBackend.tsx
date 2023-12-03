import { ApiResponse, makeApiRequest } from "./CommonBackend";

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

export async function getUsersData(
  token: string | null
): Promise<ApiResponse<FriendData[]>> {
  return makeApiRequest<FriendData[]>("auth/users/", "GET", token);
}

export async function getFriendsData(
  token: string | null
): Promise<ApiResponse<{ friendship_id: number; friend: FriendData }[]>> {
  return makeApiRequest<{ friendship_id: number; friend: FriendData }[]>(
    "friendship/",
    "GET",
    token
  );
}

export async function getSentRequestsData(
  token: string | null
): Promise<ApiResponse<RequestData[]>> {
  return makeApiRequest<RequestData[]>("friend-request/sent/", "GET", token);
}

export async function getReceivedRequestsData(
  token: string | null
): Promise<ApiResponse<RequestData[]>> {
  return makeApiRequest<RequestData[]>(
    "friend-request/received/",
    "GET",
    token
  );
}

export async function sendFriendsInvite(
  ourId: number,
  userId: number,
  token: string | null
): Promise<ApiResponse<RequestData>> {
  return makeApiRequest<RequestData>("friend-request/", "POST", token, {
    sender: userId,
    receiver: ourId,
  });
}
export async function acceptFriendsInvite(
  inviteId: number | null,
  token: string | null
): Promise<ApiResponse<{ friendship_id: number }>> {
  return makeApiRequest<{ friendship_id: number }>(
    `friend-request/${inviteId}/accept/`,
    "PATCH",
    token
  );
}

export async function rejectFriendsInvite(
  inviteId: number | null,
  token: string | null
): Promise<ApiResponse<{ friendship_id: number }>> {
  return makeApiRequest<{ friendship_id: number }>(
    `friend-request/${inviteId}/reject/`,
    "PATCH",
    token
  );
}

export async function cancelFriendsInvite(
  inviteId: number | null,
  token: string | null
): Promise<ApiResponse<string>> {
  return makeApiRequest<string>(`friend-request/${inviteId}/`, "DELETE", token);
}

export async function deleteFriend(
  friendshipId: number | null,
  token: string | null
): Promise<ApiResponse<string>> {
  return makeApiRequest<string>(`friendship/${friendshipId}/`, "DELETE", token);
}
