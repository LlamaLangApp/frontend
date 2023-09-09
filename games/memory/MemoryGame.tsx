import { Dimensions, Text, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import mainGamesStyles from "../../styles/games/MainGamesStyles";
import React, { useEffect, useState, useRef } from "react";
import { Bar as ProgressBar } from "react-native-progress";
import { buttonDarkPink, buttonLightPink } from "../../Consts";
import MemoryCard, { Card, shuffleCards } from "./MemoryCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MemoryStackParamList } from "./MemoryStack";
import textGamesStyles from "../../styles/games/TextGamesStyles";
import Toast from "react-native-toast-message";

type Props = NativeStackScreenProps<MemoryStackParamList, "Game">;

const maxAttempts = 15;

function MemoryGameScreen({ route, navigation }: Props) {
  const { setName, wordsSet, wordsSetID } = route.params;

  const [startTime] = useState(() => Date.now());

  const screenWidth = Dimensions.get("window").width;
  const [cards] = useState(() => shuffleCards(wordsSet));
  const [points, setPoints] = useState(0);
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [attempt, setAttempt] = useState(maxAttempts);
  const [disabled, setDisabled] = useState<boolean>(false);
  const checkIsFlipped = (index: number) => {
    return openCards.includes(index);
  };

  const checkIsDisabled = (card: Card) => {
    return matchedCards.includes(card.word);
  };

  const evaluateCardsMatching = () => {
    const [first, second] = openCards;
    if (cards[first].word === cards[second].translation) {
      setMatchedCards((prev) => [
        ...prev,
        cards[first].word,
        cards[first].translation,
      ]);
      Toast.show({
        type: "success",
        visibilityTime: 1600,
        text1: `Correct! ${cards[first].word} = ${cards[second].word}`,
        text2: `+10pts`,
      });
      setPoints((prevState: number) => prevState + 10);
      setProgress((prevProgress) => prevProgress + 1);
    } else {
      Toast.show({
        type: "error",
        visibilityTime: 1600,
        text1: `Wrong! ${cards[first].word} != ${cards[second].word}`,
      });
    }
    setAttempt((prevAttempt) => prevAttempt - 1);
    setOpenCards([]);
  };

  useEffect(() => {
    if (openCards.length === 2) {
      setDisabled(true);
      setTimeout(evaluateCardsMatching, 500);
    } else {
      setDisabled(false);
    }
  }, [openCards]);

  function endGameHandler() {
    const endTime = Date.now();

    navigation.navigate("Results", {
      points,
      accuracy: progress / (maxAttempts - attempt),
      duration: endTime - startTime,
      wordsSetID,
      setName,
    });
  }

  const currentTimeout = useRef<null | NodeJS.Timeout>(null);
  useEffect(() => {
    if (!currentTimeout.current && (progress >= 6 || attempt <= 0)) {
      currentTimeout.current = setTimeout(() => endGameHandler(), 1300);
    }
  }, [progress, attempt]);

  return (
    <View style={mainStyles.container}>
      <View style={mainGamesStyles.contentContainer}>
        <View style={{ flex: 1.3, marginTop: 30, marginBottom: "5%" }}>
          <View style={textGamesStyles.headingAndPointsContainer}>
            <Text style={textGamesStyles.headingText}>Memory</Text>
            <Text style={textGamesStyles.secondaryText}>{points} pts</Text>
          </View>
          <View style={textGamesStyles.textWithMarginContainer}>
            <Text style={textGamesStyles.basicText}>
              Match the words with their translations
            </Text>
          </View>
          <View style={textGamesStyles.headingAndPointsContainer}>
            <Text style={textGamesStyles.basicText}>Attempts left:</Text>
            <Text style={textGamesStyles.secondaryText}>{attempt}/15</Text>
          </View>
          <ProgressBar
            progress={progress / 6}
            width={screenWidth * 0.8}
            height={40}
            color={buttonLightPink}
            unfilledColor={"#ffffff"}
            borderWidth={1}
            borderRadius={15}
            borderColor={buttonDarkPink}
            animationType="timing"
          />
        </View>
        <View style={{ flex: 3.7, marginBottom: "7%" }}>
          <View style={mainGamesStyles.cardsContainer}>
            {cards.map((card, index) => {
              return (
                <MemoryCard
                  key={index}
                  card={card}
                  index={index}
                  isFlipped={checkIsFlipped(index)}
                  isDisabled={checkIsDisabled(card)}
                  isAllDisabled={disabled}
                  onClick={(index: number) => {
                    setOpenCards((prev) => [...prev, index]);
                  }}
                />
              );
            })}
          </View>
        </View>
      </View>
      <Toast position="bottom" bottomOffset={8} />
    </View>
  );
}

export default MemoryGameScreen;
