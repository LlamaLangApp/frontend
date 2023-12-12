import React, { useState, useContext } from "react";
import { RaceWebSocketContext } from "./RaceWebSocket";
import MultiplayerGameStartScreen from "../common/MultiplayerGameStart";
import MultiplayerJoinRoom from "../common/MultiplayerJoinRoom";

function RaceStartScreen() {
  const { ws, setWithFriends, fromInvite, withFriends } =
    useContext(RaceWebSocketContext);
  const [setName, setSetName] = useState<string>("");
  const [setId, setSetId] = useState<number>(1);
  console.log(fromInvite);

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

  async function joinRoomHandler() {
    console.log("Joining Steve...", setName);
    ws.send(
      JSON.stringify({
        type: "waitroom_request",
        owned_room: "39",
      })
    );
  }

  return fromInvite ? (
    <MultiplayerJoinRoom gameName={"Race"} onPressHandler={joinRoomHandler} />
  ) : (
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
