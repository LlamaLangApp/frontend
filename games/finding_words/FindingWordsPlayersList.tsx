import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FindingWordsStackParamList } from "./FindingWordsStack";
import React from "react";
import MultiplayerPlayersListScreen from "../common/MultiplayerPlayersList";

type Props = NativeStackScreenProps<FindingWordsStackParamList, "PlayersList">;

function FindingWordsPlayersListScreen({ route }: Props) {
  const { players } = route.params;

  return (
    <MultiplayerPlayersListScreen
      gameName={"Finding Words"}
      hostName={""}
      players={players}
    />
  );
}

export default FindingWordsPlayersListScreen;
