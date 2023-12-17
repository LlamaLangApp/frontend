import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FindingWordsStackParamList } from "./FindingWordsStack";
import { Text, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import React, { useContext } from "react";
import { FindingWordsWebSocketContext } from "./FindingWordsWebSocket";
import textGamesStyles from "../../styles/games/TextGamesStyles";
import containerGamesStyles from "../../styles/games/ContainerGamesStyles";
import { buttonDarkPink, grey } from "../../Consts";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import FrontLlamaRight from "../../components/llama/FrontLlamaRight";

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
              <Text style={textGamesStyles.basicWeight600}>ROUND</Text>
              <Text style={textGamesStyles.biggerBasicWeight600}>{round}</Text>
            </View>
            <Text style={textGamesStyles.gameNameHorizontally}>
              FINDING WORDS
            </Text>
            <View style={containerGamesStyles.differentSizeTexts}>
              <Text style={textGamesStyles.biggerBasicWeight600}>{points}</Text>
              <Text style={textGamesStyles.basicWeight600}>POINTS</Text>
            </View>
          </View>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.information}>The correct answer is</Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.important}>
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
            <Text style={textGamesStyles.information}>Your answer: </Text>
            <Text style={[textGamesStyles.information, { fontWeight: "600" }]}>
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
            <Text style={textGamesStyles.information}>You did not answer</Text>
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
