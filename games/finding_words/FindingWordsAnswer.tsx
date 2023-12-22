import { Text, View } from "react-native";
import React, { useContext } from "react";
import Toast from "react-native-toast-message";
import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FindingWordsStackParamList } from "./FindingWordsStack";
import { FindingWordsWebSocketContext } from "./FindingWordsWebSocket";
import FrontLlamaRight from "@components/llama/FrontLlamaRight";
import { buttonDarkPink, grey } from "../../Consts";
import mainStyles from "@styles/MainStyles";
import containerGamesStyles from "@styles/games/ContainerGamesStyles";
import textStyles from "@styles/TextStyles";

type Props = NativeStackScreenProps<FindingWordsStackParamList, "Answer">;

function FindingWordsAnswerScreen({ route }: Props) {
  const { points, round } = useContext(FindingWordsWebSocketContext);
  const { answer, correctAnswer, earnedPoints } = route.params;

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View
        style={[
          containerGamesStyles.screen,
          { justifyContent: "flex-start", width: "80%", marginTop: 30 },
        ]}
      >
        <View
          style={[containerGamesStyles.textWithMargin, { marginBottom: "10%" }]}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={containerGamesStyles.differentSizeTexts}>
              <Text style={textStyles.grey14Weight600}>ROUND</Text>
              <Text style={textStyles.grey20Weight600}>{round}</Text>
            </View>
            <Text style={textStyles.grey20Weight800}>FINDING WORDS</Text>
            <View style={containerGamesStyles.differentSizeTexts}>
              <Text style={textStyles.grey20Weight600}>{points}</Text>
              <Text style={textStyles.grey14Weight600}>POINTS</Text>
            </View>
          </View>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textStyles.grey18}>The correct answer is</Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textStyles.pink30weight700}>
            {correctAnswer.toUpperCase()}
          </Text>
        </View>
        {answer ? (
          <View
            style={[
              containerGamesStyles.differentSizeTexts,
              { marginBottom: "4%" },
            ]}
          >
            <Text style={textStyles.grey18}>Your answer: </Text>
            <Text style={[textStyles.grey18, { fontWeight: "600" }]}>
              {answer.toUpperCase()}
            </Text>
          </View>
        ) : (
          <View
            style={[
              containerGamesStyles.differentSizeTexts,
              { marginBottom: "4%" },
            ]}
          >
            <Text style={textStyles.grey18}>You did not answer</Text>
          </View>
        )}
        <View style={[containerGamesStyles.differentSizeTexts]}>
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
      <FrontLlamaRight />
    </View>
  );
}

export default FindingWordsAnswerScreen;
