import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FindingWordsStackParamList } from "./Stack";
import { StyleSheet, Text, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import mainGamesStyles from "../../styles/games/MainGamesStyles";
import React, { useContext } from "react";
import { FindingWordsWebSocketContext } from "./WebSocket";
import textGamesStyles from "../../styles/games/TextGamesStyles";

type Props = NativeStackScreenProps<FindingWordsStackParamList, "Answer">;

function FindingWordsAnswerScreen({ route }: Props) {
  const { points, round } = useContext(FindingWordsWebSocketContext);
  const { answer, correctAnswer } = route.params;

  return (
    <View style={mainStyles.container}>
      <View style={[mainGamesStyles.mainContentContainer, { marginTop: 200 }]}>
        <View style={{ flex: 4.2, alignItems: "stretch" }}>
          <View style={textGamesStyles.textWithMarginContainer}>
            <Text style={styles.headingText}>Finding words</Text>
          </View>
          <View style={textGamesStyles.headingAndPointsContainer}>
            <Text style={styles.secondaryText}>Round: {round}</Text>
            <Text style={styles.secondaryText}>{points}pkt</Text>
          </View>
          <Text></Text>
          <View style={textGamesStyles.textWithMarginContainer}>
            {/*<Text style={textGamesStyles.headingText}>{question}</Text>*/}
          </View>
          <View style={textGamesStyles.textWithMarginContainer}>
            <Text style={styles.basicText}>
              {answer === correctAnswer
                ? "Good answer!    +15pkt"
                : "Unfortunately, it is wrong answer\n\n" +
                  "Correct answer is " +
                  correctAnswer}
            </Text>
          </View>
          <View>
            <Text style={styles.headingText}>{correctAnswer}</Text>
          </View>
          {/*<View style={mainGamesStyles.cardsContainer}>*/}
          {/*  <View style={mainGamesStyles.pickedRaceCard}>*/}
          {/*    <View style={textGamesStyles.textContainer}>*/}
          {/*      <Text>{answer}</Text>*/}
          {/*    </View>*/}
          {/*  </View>*/}
          {/*</View>*/}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 40,
    color: "white",
    textShadowColor: "#2d2d2e",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  secondaryText: {
    fontSize: 30,
    color: "white",
  },
  basicText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
export default FindingWordsAnswerScreen;
