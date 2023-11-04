import { Button, Dimensions, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FallingWordsStackParamList } from "./FallingWordsStack";
import Toast from "react-native-toast-message";
import * as ScreenOrientation from "expo-screen-orientation";
import FallingWordsCard, { Card } from "./FallingWordsCard";
import Bucket from "./FallingWordsBucket";

type Props = NativeStackScreenProps<FallingWordsStackParamList, "Game">;

function FallingWordsGameScreen({ route, navigation }: Props) {
  const { setName, wordsSetID, roundsNumber, rounds } = route.params;

  const [startTime] = useState(() => Date.now());

  const screenWidth = Dimensions.get("window").width;
  const [points, setPoints] = useState(0);
  const [progress, setProgress] = useState(0);
  const [round, setRound] = useState(roundsNumber - 1);
  const [cardsToFall, setCardsToFall] = useState<Card[]>(rounds[round].cards);
  const [cardsFalling, setCardsFalling] = useState<Card[]>([]);

  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    ).then();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (cardsToFall.length > 0) {
        const [element, ...rest] = cardsToFall;
        setCardsToFall(rest);
        setCardsFalling((prevList) => [...prevList, element]);
      }
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [cardsToFall]);

  function endGameHandler() {
    const endTime = Date.now();
    navigation.navigate("Results", {
      points,
      accuracy: progress / roundsNumber,
      duration: endTime - startTime,
      wordsSetID,
      setName,
    });
  }

  return (
    <View style={mainStyles.container}>
      {/*<View style={mainGamesStyles.contentContainer}>*/}
      <View style={{ flex: 5 }}>
        <Button title={"exit"} onPress={endGameHandler} />
        <View>
          {cardsFalling.map((card, index) => {
            return <FallingWordsCard card={card} index={index} key={index} />;
          })}
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Bucket />
      </View>
      <Toast position="bottom" bottomOffset={8} />
    </View>
  );
}

export default FallingWordsGameScreen;
