import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FallingWordsStackParamList } from "./FallingWordsStack";
import { useAppStore } from "../../state";
import SinglePlayerStartScreen from "../common_singleplayer/SingleplayerStart";
import { callTranslations } from "../../backend/WordSetsBackend";
import { Card, choseMainWord, makeCards } from "./FallingWordsCard";

type Props = NativeStackScreenProps<FallingWordsStackParamList, "Start">;

const roundsNumber = 1;

export type Round = {
  id: number;
  cards: Card[];
  mainWordCard: Card;
};

function FallingWordsStartScreen({ navigation }: Props) {
  const [setName, setSetName] = useState<string>("");
  const [setId, setSetId] = useState<number>(-1);
  const [rounds, setRounds] = useState<Round[]>([]);
  const token = useAppStore.getState().token;

  const startGameHandler = () => {
    for (let i = 0; i < roundsNumber; i++) {
      callTranslations(token, setId, 6).then((response) => {
        if (response.type === "success") {
          const round = {
            id: i,
            cards: makeCards(response.translations),
            mainWordCard: choseMainWord(response.translations),
          };
          setRounds((rounds) => [...rounds, round]);
        }
      });
    }
  };

  useEffect(() => {
    if (rounds.length === 0) {
      return;
    }
    navigation.navigate("Game", {
      setName: setName,
      wordsSetID: setId,
      roundsNumber: roundsNumber,
      rounds: rounds,
    });
  }, [rounds]);

  return (
    <SinglePlayerStartScreen
      gameName={"Falling Words"}
      setWordSetId={setSetId}
      setWordSetName={setSetName}
      startGameHandler={startGameHandler}
    />
  );
}

export default FallingWordsStartScreen;
