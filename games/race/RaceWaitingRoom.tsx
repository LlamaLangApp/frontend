import React, { useContext } from "react";
// import MultiPlayerOwnerWaitingRoomScreen from "../common/MultiplayerOwnerWaitingRoom";
// import MultiPlayerJoinedWaitingRoomScreen from "../common/MultiplayerJoinedWaitingRoom";
import MultiPlayerWaitingRoomScreen from "../common/MultiplayerWaitingRoom";
import { RaceWebSocketContext } from "./RaceWebSocket";
import MultiPlayerOwnerWaitingRoomScreen from "../common/MultiplayerOwnerWaitingRoom";
import MultiPlayerJoinedWaitingRoomScreen from "../common/MultiplayerJoinedWaitingRoom";

function RaceWaitingRoomScreen() {
  const { withFriends, fromInvite } = useContext(RaceWebSocketContext);

  return fromInvite ? (
    <MultiPlayerJoinedWaitingRoomScreen gameName={"Race"} />
  ) : withFriends ? (
    <MultiPlayerOwnerWaitingRoomScreen gameName={"Race"} />
  ) : (
    <MultiPlayerWaitingRoomScreen gameName={"Race"} />
  );
}

export default RaceWaitingRoomScreen;
