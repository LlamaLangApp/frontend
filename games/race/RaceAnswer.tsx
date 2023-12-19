import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RaceStackParamList } from "./RaceStack";
import { Text, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import React, { useContext } from "react";
import { RaceWebSocketContext } from "./RaceWebSocket";
import textGamesStyles from "../../styles/games/TextGamesStyles";
import Toast from "react-native-toast-message";
import containerGamesStyles from "../../styles/games/ContainerGamesStyles";
import Llama from "../../components/llama/Llama";
import { buttonDarkPink, grey } from "../../Consts";
import { FontAwesome } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RaceStackParamList, "Answer">;

function RaceAnswerScreen({ route }: Props) {
  const { points, round } = useContext(RaceWebSocketContext);
  const { answer, question, correctAnswer, earnedPoints } = route.params;
  const gameName = "Race";

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={containerGamesStyles.screen}>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.gameName}>{gameName.toUpperCase()}</Text>
        </View>
        <View
          style={[
            containerGamesStyles.textWithMargin,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "20%",
              width: "90%",
            },
          ]}
        >
          <View style={containerGamesStyles.differentSizeTexts}>
            <Text style={{ fontWeight: "600", fontSize: 14, color: grey }}>
              ROUND
            </Text>
            <Text style={{ fontWeight: "600", fontSize: 20, color: grey }}>
              {round}
            </Text>
          </View>
          <View style={containerGamesStyles.differentSizeTexts}>
            <Text style={{ fontWeight: "600", fontSize: 20, color: grey }}>
              {points}
            </Text>
            <Text style={{ fontWeight: "600", fontSize: 14, color: grey }}>
              POINTS
            </Text>
          </View>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.importantGrey}>
            {question.toUpperCase()}
          </Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.information}>The correct answer is</Text>
        </View>
        <View
          style={[containerGamesStyles.textWithMargin, { marginBottom: "10%" }]}
        >
          <Text style={textGamesStyles.important}>
            {correctAnswer.toUpperCase()}
          </Text>
        </View>
        <View
          style={[
            containerGamesStyles.differentSizeTexts,
            { marginBottom: "5%" },
          ]}
        >
          <Text style={textGamesStyles.information}>Your answer: </Text>
          <Text style={[textGamesStyles.information, { fontWeight: "600" }]}>
            {answer.toUpperCase()}
          </Text>
        </View>
        <View
          style={[
            containerGamesStyles.differentSizeTexts,
            { marginBottom: "10%" },
          ]}
        >
          <FontAwesome
            name={answer === correctAnswer ? "check" : "times"}
            size={24}
            color={answer === correctAnswer ? "#6aa162" : buttonDarkPink}
          />
          <Text style={{ fontWeight: "600", fontSize: 20, color: grey }}>
            +{earnedPoints}
          </Text>
          <Text style={{ fontWeight: "600", fontSize: 14, color: grey }}>
            POINTS
          </Text>
        </View>
      </View>
      <Toast position="top" topOffset={30} />
      <Llama />
    </View>
  );
}

export default RaceAnswerScreen;
