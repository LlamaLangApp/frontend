import React, { useState, useContext } from "react";
import { FindingWordsWebSocketContext } from "./FindingWordsWebSocket";
import GameStartScreen from "../common/GameStart";

function FindingWordsStartScreen() {
  const { ws, withFriends, setWithFriends } = useContext(
    FindingWordsWebSocketContext
  );
  const [setName, setSetName] = useState<string>("");
  const [setId, setSetId] = useState<number>(0);
  console.log(withFriends);

  async function findOtherPlayersHandler() {
    console.log("Finding players for game ", setName);
    console.log(
      JSON.stringify({
        type: "waitroom_request",
        wordset_id: setId,
        ...(withFriends && { as_owner: true }),
      })
    );
    ws?.send(
      JSON.stringify({
        type: "waitroom_request",
        wordset_id: setId,
        ...(withFriends && { as_owner: true }),
      })
    );
  }

  return (
    <GameStartScreen
      gameName={"Finding words"}
      setWordSetName={setSetName}
      setWordSetId={setSetId}
      onPressHandler={findOtherPlayersHandler}
      playWithFriends={setWithFriends}
    />
  );
}

export default FindingWordsStartScreen;
