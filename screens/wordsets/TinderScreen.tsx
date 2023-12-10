import { Dimensions, StyleSheet, Text, View } from "react-native";
import TinderCard from "../../components/TinderCard";
import { useContext, useMemo, useState } from "react";
import { FlashCards, WordSetContext } from "./WordSets";
import { Bar as ProgressBar } from "react-native-progress";

import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from "react-native-reanimated";
import { buttonLightPink } from "../../Consts";

const screenWidth = Dimensions.get("screen").width;

const TinderScreen = () => {
  const { flashCards, chosenPolish } = useContext(WordSetContext);
  const activeIndex = useSharedValue(0);
  const [index, setIndex] = useState(0);
  const [learnedCards, setLearnedCards] = useState<FlashCards[]>([]);
  const [unlearnedCards, setUnlearnedCards] = useState<FlashCards[]>([]);

  const swipedCardCounters = useMemo(() => {
    return (
      <View style={styles.swipedCardsRow}>
        <View
          style={[
            styles.counterContainer,
            {
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
              borderColor: "red",
            },
          ]}
        >
          <Text style={[styles.counterText, { color: "red" }]}>
            {unlearnedCards.length}
          </Text>
        </View>
        <View
          style={[
            styles.counterContainer,
            {
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
              borderColor: "green",
            },
          ]}
        >
          <Text style={[styles.counterText, { color: "green" }]}>
            {learnedCards.length}
          </Text>
        </View>
      </View>
    );
  }, [unlearnedCards, learnedCards]);

  useAnimatedReaction(
    () => activeIndex.value,
    (value) => {
      if (Math.floor(value) != index) {
        runOnJS(setIndex)(Math.floor(value));
      }
    }
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <ProgressBar
        progress={index / flashCards.length}
        width={screenWidth}
        height={15}
        color={buttonLightPink}
        unfilledColor={"white"}
        borderWidth={0}
      />
      {swipedCardCounters}
      {flashCards.map((flashCard, index) => (
        <TinderCard
          key={index}
          flashCard={flashCard}
          numOfCards={flashCards.length}
          index={index}
          activeIndex={activeIndex}
          firstTranslation={chosenPolish}
          setLearnedCards={setLearnedCards}
          setUnlearnedCards={setUnlearnedCards}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  swipedCardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 50,
  },
  counterContainer: {
    width: 40,
    borderWidth: 1,
    alignItems: "center",
  },
  counterText: {
    padding: 3,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TinderScreen;
