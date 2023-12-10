import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Circle as ProgressCircle } from "react-native-progress";
import { buttonDarkPink, buttonLightPink, pink } from "../../Consts";
import { FlashCards } from "../../screens/wordsets/WordSets";
import { SharedValue } from "react-native-reanimated";
import { Dispatch, SetStateAction } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default ({
  learnedCards,
  flashCards,
  needPracticeCards,
  activeIndex,
  setLearnedCards,
  setNeedPracticeCards,
}: {
  learnedCards: FlashCards[];
  flashCards: FlashCards[];
  needPracticeCards: FlashCards[];
  activeIndex: SharedValue<number>;
  setLearnedCards: Dispatch<SetStateAction<FlashCards[]>>;
  setNeedPracticeCards: Dispatch<SetStateAction<FlashCards[]>>;
}) => {
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
      <TouchableOpacity style={styles.buttonPink}>
        <Text>
          <MaterialCommunityIcons
            name={"card-multiple"}
            size={20}
            color={"white"}
          />
          <Text style={{ fontSize: 20, color: "white" }}>
            {" "}
            Repeat {needPracticeCards.length} words
          </Text>
        </Text>
      </TouchableOpacity>
      <Button
        title={"reset flash cards"}
        onPress={() => {
          activeIndex.value = 0;
          setLearnedCards([]);
          setNeedPracticeCards([]);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
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
  buttonPink: {
    // width: "100%",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 40,
    borderRadius: 10,
    backgroundColor: pink,
    marginTop: 340,
    marginBottom: 20,
    alignSelf: "center",
  },
});
