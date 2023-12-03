import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RaceStackParamList } from "./RaceStack";
import { Text, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import mainGamesStyles from "../../styles/games/MainGamesStyles";
import React, { useContext } from "react";
import { RaceWebSocketContext } from "./RaceWebSocket";
import textGamesStyles from "../../styles/games/TextGamesStyles";

type Props = NativeStackScreenProps<RaceStackParamList, "Answer">;

function RaceAnswerScreen({ route }: Props) {
  const { points, round } = useContext(RaceWebSocketContext);
  const { answer, question, correctAnswer } = route.params;

  return (
    <View style={mainStyles.container}>
      <View
        style={[mainGamesStyles.mainContentContainer, { marginTop: "30%" }]}
      >
        <View style={{ flex: 4.2, alignItems: "stretch" }}>
          <View style={textGamesStyles.textWithMarginContainer}>
            <Text style={textGamesStyles.headingText}>Race</Text>
          </View>
          <View style={textGamesStyles.headingAndPointsContainer}>
            <Text style={textGamesStyles.secondaryText}>Round: {round}</Text>
            <Text style={textGamesStyles.secondaryText}>{points}pkt</Text>
          </View>
          <Text></Text>
          <View style={textGamesStyles.textWithMarginContainer}>
            <Text style={textGamesStyles.headingText}>{question}</Text>
          </View>
          <View style={textGamesStyles.textWithMarginContainer}>
            <Text style={textGamesStyles.basicText}>
              {answer === correctAnswer
                ? "Good answer!    +15pkt"
                : "Unfortunately, it is wrong answer\n\n" +
                  "Correct answer is " +
                  correctAnswer}
            </Text>
          </View>
          <View style={mainGamesStyles.cardsContainer}>
            <View style={mainGamesStyles.pickedRaceCard}>
              <View style={textGamesStyles.textContainer}>
                <Text>{answer}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default RaceAnswerScreen;
