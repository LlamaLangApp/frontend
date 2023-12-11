import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Circle as ProgressCircle } from "react-native-progress";
import { buttonDarkPink, buttonLightPink, grey, pink } from "../../Consts";
import { FlashCards, WordSetContext } from "../../screens/wordsets/WordSets";
import { SharedValue } from "react-native-reanimated";
import { Dispatch, SetStateAction, useContext } from "react";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";

export default ({
  learnedCards,
  flashCards,
  setFlashCards,
  needPracticeCards,
  activeIndex,
  setLearnedCards,
  setNeedPracticeCards,
}: {
  learnedCards: FlashCards[];
  flashCards: FlashCards[];
  setFlashCards: Dispatch<SetStateAction<FlashCards[]>>;
  needPracticeCards: FlashCards[];
  activeIndex: SharedValue<number>;
  setLearnedCards: Dispatch<SetStateAction<FlashCards[]>>;
  setNeedPracticeCards: Dispatch<SetStateAction<FlashCards[]>>;
}) => {
  const { flashCards: allCards } = useContext(WordSetContext);

  const repeat = () => {
    activeIndex.value = 0;
    setLearnedCards([]);
    setNeedPracticeCards([]);
  };

  const repeatNeedPractice = () => {
    setFlashCards(needPracticeCards);
    repeat();
  };
  const resetFlashCards = () => {
    setFlashCards(allCards);
    repeat();
  };

  return (
    <View style={styles.container}>
      {learnedCards.length > 0 ? (
        <View>
          <Text style={styles.headerText}>Good job!</Text>
          <View style={styles.stats}>
            <ProgressCircle
              size={90}
              progress={learnedCards.length / flashCards.length}
              thickness={20}
              showsText={true}
              color={buttonLightPink}
              textStyle={{ fontSize: 20 }}
              unfilledColor={buttonDarkPink}
              style={styles.progressBar}
              animated={false}
            />
            <View>
              <Text style={styles.statsTextPositive}>
                <Text>Learned</Text>
                <Text> {learnedCards.length}</Text>
              </Text>
              <Text style={styles.statsTextNegative}>
                <Text>Need practice</Text>
                <Text> {needPracticeCards.length}</Text>
              </Text>
            </View>
          </View>
        </View>
      ) : null}
      <TouchableOpacity
        style={[styles.bPink, styles.button]}
        onPress={repeatNeedPractice}
      >
        <Text>
          <MaterialCommunityIcons
            name={"card-multiple"}
            size={20}
            color={"white"}
          />
          <Text style={styles.whiteText}>
            {" "}
            Repeat {needPracticeCards.length} words
          </Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={repeat} style={[styles.bGrey, styles.button]}>
        <Text>
          <Fontisto name={"spinner-refresh"} size={18} color={grey} />{" "}
          <Text style={{ fontSize: 18, color: grey }}>Repeat</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.textButton} onPress={resetFlashCards}>
        <Text style={{ color: "#007AFF" }}>reset flash cards</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    width: "70%",
    // alignItems: "center",
  },
  progressBar: { paddingRight: 20, marginLeft: 10 },
  headerText: { fontSize: 30, marginBottom: 20 },
  stats: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statsTextPositive: {
    color: "green",
    fontSize: 18,
    paddingBottom: 8,
    fontWeight: "bold",
  },
  statsTextNegative: {
    color: buttonDarkPink,
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    paddingVertical: 13,
    width: 240,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 10,
  },
  bGrey: {
    backgroundColor: "#dbdbdb",
  },
  bPink: {
    marginTop: 80,
    backgroundColor: pink,
    // paddingHorizontal: 40,
  },
  whiteText: { fontSize: 20, color: "white" },
  textButton: { alignSelf: "center", marginTop: 10 },
});
