import React, { useState, useContext } from "react";
import { RaceWebSocketContext } from "./RaceWebSocket";
import MultiplayerGameStartScreen from "../common/MultiplayerGameStart";

function RaceStartScreen() {
  const { ws, setWithFriends, withFriends } = useContext(RaceWebSocketContext);
  const [setName, setSetName] = useState<string>("");
  const [setId, setSetId] = useState<number>(0);

  async function findOtherPlayersHandler() {
    console.log("Finding players for game ", setName);
    ws.send(
      JSON.stringify({
        type: "waitroom_request",
        wordset_id: setId,
        ...(withFriends && { as_owner: true }),
      })
    );
  }

  return (
    <MultiplayerGameStartScreen
      gameName={"Race"}
      setWordSetName={setSetName}
      setWordSetId={setSetId}
      onPressHandler={findOtherPlayersHandler}
      playWithFriends={setWithFriends}
    />
  );
}

export default RaceStartScreen;
