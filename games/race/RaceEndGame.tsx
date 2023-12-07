import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RaceStackParamList } from "./RaceStack";
import MultiplayerResult from "../common/MultiplayerResult";

type Props = NativeStackScreenProps<RaceStackParamList, "EndGame">;

function RaceEndGameScreen({ route }: Props) {
  const { scoreboard } = route.params;
  return <MultiplayerResult gameName={"Race"} scoreboard={scoreboard} />;
}

export default RaceEndGameScreen;
