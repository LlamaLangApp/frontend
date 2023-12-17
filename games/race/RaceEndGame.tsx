import React, { useContext } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RaceStackParamList } from "./RaceStack";
import MultiplayerResult from "../common/MultiplayerResult";
import { RaceWebSocketContext } from "./RaceWebSocket";

type Props = NativeStackScreenProps<RaceStackParamList, "EndGame">;

function RaceEndGameScreen({ route }: Props) {
  const { scoreboard } = route.params;
  const { leaveGame } = useContext(RaceWebSocketContext);
  return (
    <MultiplayerResult
      gameName={"Race"}
      scoreboard={scoreboard}
      leaveGame={leaveGame}
    />
  );
}

export default RaceEndGameScreen;
