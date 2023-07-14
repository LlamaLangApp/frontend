import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RaceStackParamList } from "./RaceStack";
import { Text, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import gameStyles from "../../styles/GamesStyles";
import React, { useContext } from "react";
import { RaceWebSocketContext } from "./RaceWebSocket";

type Props = NativeStackScreenProps<RaceStackParamList, "Answer">;

function RaceAnswerScreen({ route }: Props) {
  const { points, round } = useContext(RaceWebSocketContext);
  const { answer, question, correctAnswer } = route.params;

  return (
    <View style={mainStyles.container}>
      <View style={gameStyles.contentAnswerContainer}>
        <View style={{ flex: 4.2, alignItems: "stretch" }}>
          <View style={gameStyles.textWithMarginContainer}>
            <Text style={gameStyles.headingText}>Race</Text>
          </View>
          <View style={gameStyles.headingAndPointsContainer}>
            <Text style={gameStyles.secondaryText}>Round: {round}</Text>
            <Text style={gameStyles.secondaryText}>{points}pkt</Text>
          </View>
          <Text></Text>
          <View style={gameStyles.textWithMarginContainer}>
            <Text style={gameStyles.headingText}>{question}</Text>
          </View>
          <View style={gameStyles.textWithMarginContainer}>
            <Text style={gameStyles.basicText}>
              {answer === correctAnswer
                ? "Good answer!    +15pkt"
                : "Unfortunately, it is wrong answer\n\n" +
                  "Correct answer is " +
                  correctAnswer}
            </Text>
          </View>
          <View style={gameStyles.cardsContainer}>
            <View style={gameStyles.pickedRaceCard}>
              <View style={gameStyles.textContainer}>
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
