import React, { useState, useContext } from "react";
import { RaceWebSocketContext } from "./RaceWebSocket";
import MultiplayerJoinRoom from "../common/start/MultiplayerJoinRoom";
import GameStartScreen from "../common/start/GameStart";

function RaceStartScreen() {
  const {
    ws,
    setWithFriends,
    fromInvite,
    invite,
    withFriends,
    wordSetName,
    setWordSetName,
  } = useContext(RaceWebSocketContext);
  const [setId, setSetId] = useState<number>(0);

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

  return fromInvite && invite ? (
    <MultiplayerJoinRoom
      gameName={"Race"}
      hostName={invite.username}
      wordSetName={wordSetName}
      setWordSetName={setWordSetName}
      wordSetId={invite.wordSetId}
      onPressHandler={joinRoomHandler}
    />
  ) : (
    <GameStartScreen
      gameName={"Race"}
      setWordSetName={setWordSetName}
      setWordSetId={setSetId}
      onPressHandler={findOtherPlayersHandler}
      playWithFriends={setWithFriends}
    />
  );
}

export default RaceStartScreen;
