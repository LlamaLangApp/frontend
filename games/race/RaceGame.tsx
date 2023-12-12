import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RaceStackParamList } from "./RaceStack";
import { Text, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import mainGamesStyles from "../../styles/games/MainGamesStyles";
import React, { useContext } from "react";
import RaceCard from "./RaceCard";
import { RaceWebSocketContext } from "./RaceWebSocket";
import textGamesStyles from "../../styles/games/TextGamesStyles";
import Toast from "react-native-toast-message";
import { grey } from "../../Consts";
import containerGamesStyles from "../../styles/games/ContainerGamesStyles";

type Props = NativeStackScreenProps<RaceStackParamList, "Game">;

function RaceGameScreen({ route }: Props) {
  const { question, answers } = route.params;
  const gameName = "Race";
  const { ws, setLastAnswer, points, round, chosenCard, setChosenCard } =
    useContext(RaceWebSocketContext);

  const handlePress = (answer: string, index: number) => {
    setChosenCard(index);
    setLastAnswer(answer);
    ws.send(JSON.stringify({ type: "response", answer: answer, round: round }));
  };

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={containerGamesStyles.screen}>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.gameName}>{gameName.toUpperCase()}</Text>
        </View>
        <View
          style={[
            containerGamesStyles.textWithMargin,
            { flexDirection: "row", justifyContent: "space-between" },
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
        <View
          style={[containerGamesStyles.textWithMargin, { marginTop: "6%" }]}
        >
          <Text style={textGamesStyles.information}>
            Choose the correct translation of word
          </Text>
        </View>
        <View
          style={[containerGamesStyles.textWithMargin, { marginBottom: "10%" }]}
        >
          <Text style={textGamesStyles.important}>
            {question.toUpperCase()}
          </Text>
        </View>
        <View style={{ width: "100%", height: "60%", marginBottom: "10%" }}>
          <View style={mainGamesStyles.cardsContainer}>
            {answers.map((translation, index) => {
              return (
                <RaceCard
                  key={index}
                  translation={translation}
                  index={index}
                  isChosen={chosenCard == index}
                  isDisabled={chosenCard != -1}
                  onClick={handlePress}
                />
              );
            })}
          </View>
        </View>
      </View>
      <Toast position="top" topOffset={30} />
    </View>
  );
}

export default RaceGameScreen;
