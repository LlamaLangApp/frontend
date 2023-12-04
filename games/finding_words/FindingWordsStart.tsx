import React, { useState, useContext } from "react";
import { FindingWordsWebSocketContext } from "./FindingWordsWebSocket";
import GameStartScreen from "../common/GameStart";

function FindingWordsStartScreen() {
  const { ws } = useContext(FindingWordsWebSocketContext);
  const [setName, setSetName] = useState<string>("");
  const [setId, setSetId] = useState<number>(0);

  async function findOtherPlayersHandler() {
    console.log("Finding players for game ", setName);
    ws?.send(
      JSON.stringify({
        type: "waitroom_request",
        game: "finding_words",
        wordset_id: setId,
      })
    );
  }

  return (
    <GameStartScreen
      gameName={"Finding words"}
      setWordSetName={setSetName}
      setWordSetId={setSetId}
      onPressHandler={findOtherPlayersHandler}
    />
  );
}

export default FindingWordsStartScreen;
