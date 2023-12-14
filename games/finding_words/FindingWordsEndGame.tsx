import React, { useContext, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FindingWordsStackParamList } from "./FindingWordsStack";
import * as ScreenOrientation from "expo-screen-orientation";
import MultiplayerResult from "../common/MultiplayerResult";
import { FindingWordsWebSocketContext } from "./FindingWordsWebSocket";

type Props = NativeStackScreenProps<FindingWordsStackParamList, "EndGame">;

function FindingWordsEndGame({ route }: Props) {
  const { scoreboard } = route.params;
  const { leaveGame } = useContext(FindingWordsWebSocketContext);

  return (
    <MultiplayerResult
      gameName={"Falling Words"}
      scoreboard={scoreboard}
      leaveGame={leaveGame}
    />
  );
}

function FindingWordsEndGameScreen({ route, navigation }: Props) {
  const [changedOrientation, setChangedOrientation] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      ScreenOrientation.unlockAsync().then(() => {
        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        ).then(() => setChangedOrientation(true));
      });
    }, 400);
  }, []);

  return changedOrientation ? (
    <FindingWordsEndGame route={route} navigation={navigation} />
  ) : null;
}

export default FindingWordsEndGameScreen;
