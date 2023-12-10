import { Dimensions, StyleSheet, Text, View } from "react-native";
import TinderCard from "../../components/wordest/TinderCard";
import { useContext, useState } from "react";
import { FlashCards, WordSetContext } from "./WordSets";
import { Bar as ProgressBar } from "react-native-progress";

import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from "react-native-reanimated";
import { buttonLightPink } from "../../Consts";
import SwipedCardCounter from "../../components/wordest/SwipedCardCounter";
import AllFlashCards from "../../components/wordest/SwipedAllFlashCards";

const screenWidth = Dimensions.get("screen").width;

const TinderScreen = () => {
  const { flashCards: allCards, chosenPolish } = useContext(WordSetContext);
  const [flashCards] = useState<FlashCards[]>(allCards);
  const activeIndex = useSharedValue(0);
  const [index, setIndex] = useState(0);
  const [learnedCards, setLearnedCards] = useState<FlashCards[]>([]);
  const [needPracticeCards, setNeedPracticeCards] = useState<FlashCards[]>([]);

  useAnimatedReaction(
    () => activeIndex.value,
    (value) => {
      if (Math.floor(value) != index) {
        runOnJS(setIndex)(Math.floor(value));
      }
    }
  );

  return (
    <View style={styles.container}>
      <ProgressBar
        progress={index / flashCards.length}
        width={screenWidth}
        height={15}
        color={buttonLightPink}
        unfilledColor={"white"}
        borderWidth={0}
      />
      {index === flashCards.length ? (
        <AllFlashCards
          learnedCards={learnedCards}
          flashCards={flashCards}
          needPracticeCards={needPracticeCards}
          activeIndex={activeIndex}
          setLearnedCards={setLearnedCards}
          setNeedPracticeCards={setNeedPracticeCards}
        />
      ) : (
        <View style={{ alignItems: "center", width: "100%" }}>
          <SwipedCardCounter
            needPracticeCards={needPracticeCards}
            learnedCards={learnedCards}
          />
          {flashCards.map((flashCard, index) => (
            <TinderCard
              key={index}
              flashCard={flashCard}
              numOfCards={flashCards.length}
              index={index}
              activeIndex={activeIndex}
              firstTranslation={chosenPolish}
              setLearnedCards={setLearnedCards}
              setNeedPracticeCards={setNeedPracticeCards}
            />
          ))}
          <Text style={styles.instructionText}>
            <Text>swipe left to mark flashcard as </Text>
            <Text style={{ fontStyle: "italic", color: "red" }}>
              need practice{" "}
            </Text>
            <Text>and right to mark as </Text>
            <Text style={{ fontStyle: "italic", color: "green" }}>
              {" "}
              learned
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  instructionText: {
    marginTop: 500,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});

export default TinderScreen;
