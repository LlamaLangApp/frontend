import { Text, View } from "react-native";
import React, { useContext } from "react";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RaceStackParamList } from "./RaceStack";
import { RaceWebSocketContext } from "./RaceWebSocket";
import RaceCard from "./RaceCard";
import mainStyles from "../../styles/MainStyles";
import mainGamesStyles from "../../styles/games/MainGamesStyles";
import containerGamesStyles from "../../styles/games/ContainerGamesStyles";
import textStyles from "../../styles/TextStyles";

type Props = NativeStackScreenProps<RaceStackParamList, "Game">;

function RaceGameScreen({ route }: Props) {
  const { question, answers } = route.params;
  const gameName = "Race";
  const { ws, points, round, chosenCard, setChosenCard } =
    useContext(RaceWebSocketContext);

  const handlePress = (answer: string, index: number) => {
    setChosenCard(index);
    ws?.send(
      JSON.stringify({ type: "response", answer: answer, round: round })
    );
  };

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
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <View style={containerGamesStyles.differentSizeTexts}>
            <Text style={textStyles.grey14Weight600}>ROUND</Text>
            <Text style={textStyles.grey20Weight600}>{round}</Text>
          </View>
          <View style={containerGamesStyles.differentSizeTexts}>
            <Text style={textStyles.grey20Weight600}>{points}</Text>
            <Text style={textStyles.grey14Weight600}>POINTS</Text>
          </View>
        </View>
        <View
          style={[containerGamesStyles.textWithMargin, { marginTop: "6%" }]}
        >
          <Text style={textStyles.grey18}>
            Choose the correct translation of word
          </Text>
        </View>
        <View
          style={[containerGamesStyles.textWithMargin, { marginBottom: "10%" }]}
        >
          <Text style={textStyles.pink30weight700}>
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
