import React, { useContext } from "react";
import { RaceWebSocketContext } from "./RaceWebSocket";
import MultiPlayerWaitingRoomScreen from "../common/MultiplayerWaitingRoom";
import MultiPlayerOwnerWaitingRoomScreen from "../common/MultiplayerOwnerWaitingRoom";
import MultiPlayerJoinedWaitingRoomScreen from "../common/MultiplayerJoinedWaitingRoom";

function RaceWaitingRoomScreen() {
  const { withFriends, fromInvite, ws, leaveGame, usersInWaitRoom } =
    useContext(RaceWebSocketContext);

  return fromInvite ? (
    <MultiPlayerJoinedWaitingRoomScreen gameName={"Race"} />
  ) : withFriends ? (
    <MultiPlayerOwnerWaitingRoomScreen
      gameName={"Race"}
      ws={ws}
      leaveGame={leaveGame}
      usersInWaitRoom={usersInWaitRoom}
    />
  ) : (
    <MultiPlayerWaitingRoomScreen
      gameName={"Race"}
      leaveGame={leaveGame}
      usersInWaitRoom={usersInWaitRoom}
    />
  );
}

export default RaceWaitingRoomScreen;
