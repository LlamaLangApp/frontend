import { Dimensions, Text, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import gameStyles from "../../styles/GamesStyles";
import React, { useEffect, useState } from "react";
import { Bar as ProgressBar } from "react-native-progress";
import { buttonDarkPink, buttonLightPink } from "../../Consts";
import MemoryCard, { Card, shuffleCards } from "./MemoryCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MemoryStackParamList } from "./MemoryStack";

type Props = NativeStackScreenProps<MemoryStackParamList, "Game">;

function MemoryGameScreen({ route, navigation }: Props) {
  const { setName, wordsSet } = route.params;

  const screenWidth = Dimensions.get("window").width;
  const [cards] = useState(() => shuffleCards(wordsSet));
  const [points, setPoints] = useState(0);
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [attempt, setAttempt] = useState(15);
  const [wrongPick, setWrongPick] = useState(false);
  const [correctPick, setCorrectPick] = useState(false);

  const checkIsFlipped = (index: number) => {
    return openCards.includes(index);
  };

  const checkIsDisabled = (card: Card) => {
    return matchedCards.includes(card.word);
  };

  const handlePress = (index: number) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setAttempt((prevAttempt) => prevAttempt - 1);
    } else {
      setOpenCards([index]);
    }
  };

  const evaluateCardsMatching = () => {
    const [first, second] = openCards;
    if (cards[first].word === cards[second].translation) {
      setMatchedCards((prev) => [
        ...prev,
        cards[first].word,
        cards[first].translation,
      ]);
      setCorrectPick(true);
      setPoints((prevState: number) => prevState + 10);
      setProgress((prevProgress) => prevProgress + 1);
      setOpenCards([]);
      return;
    } else {
      setWrongPick(true);
      setOpenCards([]);
    }
  };

  useEffect(() => {
    if (openCards.length === 2) {
      setTimeout(evaluateCardsMatching, 500);
    }
  }, [openCards]);

  useEffect(() => {
    if (correctPick) {
      setTimeout(() => setCorrectPick(false), 1300);
    }
  }, [correctPick]);

  useEffect(() => {
    if (wrongPick) {
      setTimeout(() => setWrongPick(false), 1300);
    }
  }, [wrongPick]);

  async function endGameHandler() {
    try {
      navigation.navigate("Results", { points, setName });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log(progress);
    if (progress >= 1) {
      setTimeout(() => endGameHandler(), 200);
    }
  }, [progress]);

  return (
    <View style={mainStyles.container}>
      <View style={gameStyles.contentContainer}>
        <View style={{ flex: 1.3, marginTop: 30 }}>
          <View style={gameStyles.headingAndPointsContainer}>
            <Text style={gameStyles.headingText}>Memory</Text>
            <Text style={gameStyles.secondaryText}>{points} pkt</Text>
          </View>
          <View style={gameStyles.headingContainer}>
            <Text style={gameStyles.basicText}>
              Match the words with their translations
            </Text>
          </View>
          <Text> </Text>
          <View style={gameStyles.headingAndPointsContainer}>
            <Text style={gameStyles.basicText}>Attempts left:</Text>
            <Text style={gameStyles.secondaryText}>{attempt}/15</Text>
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
        <View style={{ flex: 3.7 }}>
          <View style={gameStyles.cardsContainer}>
            {cards.map((card, index) => {
              return (
                <MemoryCard
                  key={index}
                  card={card}
                  index={index}
                  isFlipped={checkIsFlipped(index)}
                  isDisabled={checkIsDisabled(card)}
                  onClick={handlePress}
                />
              );
            })}
          </View>
        </View>
        <View style={gameStyles.popupContainer}>
          {correctPick ? (
            <View style={gameStyles.popup}>
              <Text>+10pkt</Text>
            </View>
          ) : wrongPick ? (
            <View style={gameStyles.popup}>
              <Text>Wrong</Text>
            </View>
          ) : (
            <Text />
          )}
        </View>
      </View>
    </View>
  );
}

export default MemoryGameScreen;
