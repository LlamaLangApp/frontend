import React, { useState, useContext } from "react";
import { FindingWordsWebSocketContext } from "./FindingWordsWebSocket";
import MultiplayerJoinRoom from "../common/start/MultiplayerJoinRoom";
import GameStartScreen from "../common/start/GameStart";

function FindingWordsStartScreen() {
  const {
    ws,
    withFriends,
    setWithFriends,
    fromInvite,
    invite,
    wordSetName,
    setWordSetName,
  } = useContext(FindingWordsWebSocketContext);
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
    console.log(invite);
  }

  return fromInvite && invite ? (
    <MultiplayerJoinRoom
      gameName={"Finding words"}
      hostName={invite.username}
      wordSetName={wordSetName}
      setWordSetName={setWordSetName}
      wordSetId={invite.wordSetId}
      onPressHandler={joinRoomHandler}
    />
  ) : (
    <GameStartScreen
      gameName={"Finding words"}
      setWordSetName={setWordSetName}
      setWordSetId={setSetId}
      onPressHandler={findOtherPlayersHandler}
      playWithFriends={setWithFriends}
    />
  );
}

export default FindingWordsStartScreen;
