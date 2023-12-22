import React, { useContext } from "react";
import { FindingWordsWebSocketContext } from "./FindingWordsWebSocket";
import MultiPlayerWaitingRoomScreen from "../common/waiting_room/MultiplayerWaitingRoom";
import MultiPlayerJoinedWaitingRoomScreen from "../common/waiting_room/MultiplayerJoinedWaitingRoom";
import MultiPlayerOwnerWaitingRoomScreen from "../common/waiting_room/MultiplayerOwnerWaitingRoom";

function FindingWordsWaitingRoomScreen() {
  const { withFriends, fromInvite, ws, leaveGame, usersInWaitRoom } =
    useContext(FindingWordsWebSocketContext);

  return fromInvite ? (
    <MultiPlayerJoinedWaitingRoomScreen gameName={"Finding words"} />
  ) : withFriends ? (
    <MultiPlayerOwnerWaitingRoomScreen
      gameName={"Finding words"}
      ws={ws}
      leaveGame={leaveGame}
      usersInWaitRoom={usersInWaitRoom}
    />
  ) : (
    <MultiPlayerWaitingRoomScreen
      gameName={"Finding words"}
      leaveGame={leaveGame}
      usersInWaitRoom={usersInWaitRoom}
    />
  );
}

export default FindingWordsWaitingRoomScreen;
