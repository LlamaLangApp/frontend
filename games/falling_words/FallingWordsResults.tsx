import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { GamesStackParamList } from "@navigation/GamesStack";
import { useAppStore } from "../../state";
import { saveSinglePlayerGame } from "@backend/GamesBackend";
import { FallingWordsStackParamList } from "./FallingWordsStack";
import SinglePlayerResultScreen from "../common/SingleplayerResult";

type Props = NativeStackScreenProps<FallingWordsStackParamList, "Results">;
type GamesStack = NavigationProp<GamesStackParamList, "Home">;

function FallingWordsResultsScreen({ route, navigation }: Props) {
  const [changedOrientation, setChangedOrientation] = useState(false);
  const parentNavigation = useNavigation<GamesStack>();
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
    saveSinglePlayerGame(
      token,
      "falling-words",
      points,
      accuracy,
      duration,
      wordsSetID
    ).then();
  });

  return changedOrientation ? (
    <SinglePlayerResultScreen
      gameName={"FallingWords"}
      points={points}
      rounds={2}
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
