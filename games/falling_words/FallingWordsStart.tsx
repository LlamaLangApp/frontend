import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FallingWordsStackParamList } from "./FallingWordsStack";
import { useAppStore } from "../../state";
import SinglePlayerStartScreen from "../common_singleplayer/SingleplayerStart";
import { callTranslations } from "../../backend/WordSetsBackend";
import { Card, choseMainWord, makeCards } from "./FallingWordsCard";
import { Dimensions } from "react-native";

type Props = NativeStackScreenProps<FallingWordsStackParamList, "Start">;

const roundsNumber = 2;

export type Round = {
  id: number;
  cards: Card[];
  mainWordCard: Card;
};

const screenWidth = Math.min(
  Dimensions.get("window").width,
  Dimensions.get("window").height
);

function FallingWordsStartScreen({ navigation }: Props) {
  const [setName, setSetName] = useState<string>("");
  const [setId, setSetId] = useState<number>(-1);
  const [rounds, setRounds] = useState<Round[]>([]);
  const token = useAppStore.getState().token;

  const startGameHandler = async () => {
    const allRounds = [];
    for (let i = 0; i < roundsNumber; i++) {
      const response = await callTranslations(token, setId, 6);
      if (response.type === "success") {
        const cards = makeCards(response.translations);

        let lastPos = 9999999999;
        for (const card of cards) {
          let cardPos;
          while (!cardPos || Math.abs(lastPos - cardPos) < 100) {
            cardPos =
              Math.random() * (screenWidth - 10) - (screenWidth - 10) / 2;
          }
          card.leftPosition = cardPos;
          lastPos = cardPos;
        }

        const round = {
          id: i,
          cards,
          mainWordCard: choseMainWord(response.translations),
        };
        allRounds.push(round);
      }
    }
    setRounds(allRounds);
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
