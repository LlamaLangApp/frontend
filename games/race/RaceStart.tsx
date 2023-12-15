import React, { useState, useContext } from "react";
import { RaceWebSocketContext } from "./RaceWebSocket";
import MultiplayerGameStartScreen from "../common/MultiplayerGameStart";
import MultiplayerJoinRoom from "../common/MultiplayerJoinRoom";

function RaceStartScreen() {
  const {
    ws,
    setWithFriends,
    fromInvite,
    invite,
    withFriends,
    setWordSetName,
  } = useContext(RaceWebSocketContext);
  const [setId, setSetId] = useState<number>(1);

  async function findOtherPlayersHandler() {
    ws?.send(
      JSON.stringify({
        type: "waitroom_request",
        wordset_id: setId,
        ...(withFriends && { as_owner: true }),
      })
    );
  }

  async function joinRoomHandler() {
    ws?.send(
      JSON.stringify({
        type: "waitroom_request",
        owned_room: invite?.waitRoom,
      })
    );
  }

  return fromInvite ? (
    <MultiplayerJoinRoom gameName={"Race"} onPressHandler={joinRoomHandler} />
  ) : (
    <MultiplayerGameStartScreen
      gameName={"Race"}
      setWordSetName={setWordSetName}
      setWordSetId={setSetId}
      onPressHandler={findOtherPlayersHandler}
      playWithFriends={setWithFriends}
    />
  );
}

export default RaceStartScreen;
