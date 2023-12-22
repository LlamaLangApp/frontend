import { Text, View } from "react-native";
import React, { useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RaceStackParamList } from "./RaceStack";
import { RaceWebSocketContext } from "./RaceWebSocket";
import Llama from "@components/llama/Llama";
import { buttonDarkPink, grey } from "../../Consts";
import mainStyles from "@styles/MainStyles";
import containerGamesStyles from "@styles/games/ContainerGamesStyles";
import textStyles from "@styles/TextStyles";

type Props = NativeStackScreenProps<RaceStackParamList, "Answer">;

function RaceAnswerScreen({ route }: Props) {
  const { points, round } = useContext(RaceWebSocketContext);
  const { answer, question, correctAnswer, earnedPoints } = route.params;
  const gameName = "Race";

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={containerGamesStyles.screen}>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textStyles.grey27Weight800}>
            {gameName.toUpperCase()}
          </Text>
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
          <Text style={textStyles.grey30weight700}>
            {question.toUpperCase()}
          </Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textStyles.grey18}>The correct answer is</Text>
        </View>
        <View
          style={[containerGamesStyles.textWithMargin, { marginBottom: "10%" }]}
        >
          <Text style={textStyles.pink30weight700}>
            {correctAnswer.toUpperCase()}
          </Text>
        </View>
        <View
          style={[
            containerGamesStyles.differentSizeTexts,
            { marginBottom: "5%" },
          ]}
        >
          <Text style={textStyles.grey18}>Your answer: </Text>
          <Text style={[textStyles.grey18, { fontWeight: "600" }]}>
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
