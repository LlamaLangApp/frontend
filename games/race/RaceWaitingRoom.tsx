import React, { useContext } from "react";
import { RaceWebSocketContext } from "./RaceWebSocket";
import MultiPlayerWaitingRoomScreen from "../common/waiting_room/MultiplayerWaitingRoom";
import MultiPlayerOwnerWaitingRoomScreen from "../common/waiting_room/MultiplayerOwnerWaitingRoom";
import MultiPlayerJoinedWaitingRoomScreen from "../common/waiting_room/MultiplayerJoinedWaitingRoom";

function RaceWaitingRoomScreen() {
  const { withFriends, fromInvite, ws, leaveGame, usersInWaitRoom, invite } =
    useContext(RaceWebSocketContext);

  return fromInvite && invite ? (
    <MultiPlayerJoinedWaitingRoomScreen
      gameName={"Race"}
      hostName={invite.username}
      leaveGame={leaveGame}
      usersInWaitRoom={usersInWaitRoom}
    />
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
