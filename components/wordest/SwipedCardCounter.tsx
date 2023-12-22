import { StyleSheet, Text, View } from "react-native";
import { FlashCards } from "@screens/wordsets/WordSets";
import { useMemo } from "react";

export default ({
  needPracticeCards,
  learnedCards,
}: {
  needPracticeCards: FlashCards[];
  learnedCards: FlashCards[];
}) => {
  const counterRow = useMemo(
    () => (
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
            {needPracticeCards.length}
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
    ),
    [learnedCards, needPracticeCards]
  );
  return (
    <View style={[{ marginTop: 50 }, styles.swipedCardsRow]}>{counterRow}</View>
  );
};

const styles = StyleSheet.create({
  swipedCardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
