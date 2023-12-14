import React, { useState, useContext } from "react";
import { FindingWordsWebSocketContext } from "./FindingWordsWebSocket";
import MultiplayerGameStartScreen from "../common/MultiplayerGameStart";
import MultiplayerJoinRoom from "../common/MultiplayerJoinRoom";

function FindingWordsStartScreen() {
  const { ws, withFriends, setWithFriends, fromInvite, setWordSetName } =
    useContext(FindingWordsWebSocketContext);
  const [setId, setSetId] = useState<number>(0);
  console.log(withFriends);

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
        owned_room: "75",
      })
    );
  }

  return fromInvite ? (
    <MultiplayerJoinRoom
      gameName={"Finding words"}
      onPressHandler={joinRoomHandler}
    />
  ) : (
    <MultiplayerGameStartScreen
      gameName={"Finding words"}
      setWordSetName={setWordSetName}
      setWordSetId={setSetId}
      onPressHandler={findOtherPlayersHandler}
      playWithFriends={setWithFriends}
    />
  );
}

export default FindingWordsStartScreen;
