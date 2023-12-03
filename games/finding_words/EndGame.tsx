import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FindingWordsStackParamList } from "./Stack";
import * as ScreenOrientation from "expo-screen-orientation";
import MultiplayerResult from "../common/MultiplayerResult";

type Props = NativeStackScreenProps<FindingWordsStackParamList, "EndGame">;

function FindingWordsEndGame({ route }: Props) {
  const { scoreboard } = route.params;
  return (
    <MultiplayerResult gameName={"Falling Words"} scoreboard={scoreboard} />
  );
}

function FindingWordsEndGameScreen({ route, navigation }: Props) {
  const [changedOrientation, setChangedOrientation] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      ScreenOrientation.unlockAsync().then(() => {
        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        ).then(() => setChangedOrientation(true));
      });
    }, 400);
  }, []);

  return changedOrientation ? (
    <FindingWordsEndGame route={route} navigation={navigation} />
  ) : null;
}

export default FindingWordsEndGameScreen;
