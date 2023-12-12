import { Dispatch, SetStateAction } from "react";

export const SocketGameStates = {
  justConnected: 0,
  inWaitRoomRandom: 1,
  inWaitRoomAsOwner: 2,
  inWaitRoomJoinedFriend: 3,
  beforeRound: 4,
  roundStarted: 5,
  gameEnded: 6,
};

export interface CommonWebSocketProps {
  ws: WebSocket | undefined;
  wordSetName: string;
  setWordSetName: Dispatch<SetStateAction<string>>;
  points: number;
  round: number;
  usersInWaitRoom: string[];
  fromInvite: boolean;
  withFriends: boolean;
  setWithFriends: Dispatch<SetStateAction<boolean>>;
}

export const commonWebSocketDefaultValues = {
  ws: undefined,
  points: 0,
  round: 1,
  usersInWaitRoom: [],
  fromInvite: false,
  withFriends: false,
  setWithFriends: () => {
    return;
  },
  wordSetName: "",
  setWordSetName: () => {
    return "";
  },
};
