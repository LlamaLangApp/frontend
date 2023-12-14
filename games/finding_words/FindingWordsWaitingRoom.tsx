import React, { useContext } from "react";
import MultiPlayerWaitingRoomScreen from "../common/MultiplayerWaitingRoom";
import { FindingWordsWebSocketContext } from "./FindingWordsWebSocket";
import MultiPlayerJoinedWaitingRoomScreen from "../common/MultiplayerJoinedWaitingRoom";
import MultiPlayerOwnerWaitingRoomScreen from "../common/MultiplayerOwnerWaitingRoom";

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
