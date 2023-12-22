import { Dimensions, Text, View } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Toast from "react-native-toast-message";
import { Bar as ProgressBar } from "react-native-progress";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MemoryStackParamList } from "./MemoryStack";
import MemoryCard, { Card, shuffleCards } from "./MemoryCard";
import { grey, lightGrey, pink } from "../../Consts";
import mainStyles from "../../styles/MainStyles";
import mainGamesStyles from "../../styles/games/MainGamesStyles";
import containerGamesStyles from "../../styles/games/ContainerGamesStyles";
import textStyles from "../../styles/TextStyles";

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
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={[containerGamesStyles.screen, { marginBottom: "0%" }]}>
        <View
          style={[containerGamesStyles.textWithMargin, { marginBottom: "5%" }]}
        >
          <Text style={textStyles.grey27Weight800}>MEMORY</Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textStyles.grey18}>
            Match the words with their translations
          </Text>
        </View>
        <View
          style={[
            containerGamesStyles.differentSizeTexts,
            { marginBottom: "5%" },
          ]}
        >
          <Text style={[textStyles.grey20Weight600, { color: pink }]}>
            {points}
          </Text>
          <Text style={[textStyles.grey14Weight600, { color: pink }]}>
            POINTS
          </Text>
        </View>
        <View style={containerGamesStyles.differentSizeTexts}>
          <Text style={[textStyles.finePrint, { color: grey }]}>
            Attempts left: {attempt}/15
          </Text>
        </View>
        <View style={containerGamesStyles.thinLine} />
        <ProgressBar
          progress={(15 - attempt) / 15}
          width={screenWidth * 0.9}
          height={20}
          color={"#fffcff"}
          unfilledColor={lightGrey}
          borderWidth={0}
          borderRadius={2}
          borderColor={lightGrey}
          animationType="timing"
        />
        <View style={containerGamesStyles.thinLine} />
        <View style={{ height: "70%", marginTop: "5%", width: "100%" }}>
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
      <Toast position="top" topOffset={60} />
    </View>
  );
}

export default MemoryGameScreen;
