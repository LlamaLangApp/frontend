import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RaceStackParamList } from "./RaceStack";
import React from "react";
import MultiplayerPlayersListScreen from "../common/MultiplayerPlayersList";

type Props = NativeStackScreenProps<RaceStackParamList, "PlayersList">;

function RacePlayersListScreen({ route }: Props) {
  const { players } = route.params;

  return (
    <MultiplayerPlayersListScreen
      gameName={"Race"}
      hostName={""}
      players={players}
    />
  );
}

export default RacePlayersListScreen;
