import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FallingWordsStackParamList } from "./FallingWordsStack";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "../../App";
import SinglePlayerResultsScreen from "../common_singleplayer/SingleplayerResults";
import { saveFallingWordsGame } from "../../backend/GamesBackend";
import { useAppStore } from "../../state";
import * as ScreenOrientation from "expo-screen-orientation";

type Props = NativeStackScreenProps<FallingWordsStackParamList, "Results">;
type MainStack = NavigationProp<MainStackParamList, "Home">;

function FallingWordsResultsScreen({ route, navigation }: Props) {
  const [changedOrientation, setChangedOrientation] = useState(false);
  const parentNavigation = useNavigation<MainStack>();
  const { points, accuracy, duration, wordsSetID, setName } = route.params;
  const token = useAppStore((state) => state.token);

  useEffect(() => {
    setTimeout(() => {
      ScreenOrientation.unlockAsync().then(() => {
        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        ).then(() => setChangedOrientation(true));
      });
    }, 400);
  }, []);

  useEffect(() => {
    if (!token) {
      console.warn("No token when saving memory results!");
      return;
    }
    saveFallingWordsGame(token, points, accuracy, duration, wordsSetID);
  });

  return changedOrientation ? (
    <SinglePlayerResultsScreen
      gameName={"FallingWords"}
      points={points}
      hasWon={accuracy === 1}
      setName={setName}
      exitGameHandler={() => {
        parentNavigation.navigate("Home");
      }}
      playAgainHandler={() => {
        navigation.navigate("Start");
      }}
    />
  ) : null;
}

export default FallingWordsResultsScreen;
