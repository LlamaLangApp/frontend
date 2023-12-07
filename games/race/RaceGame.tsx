import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RaceStackParamList } from "./RaceStack";
import { Text, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import mainGamesStyles from "../../styles/games/MainGamesStyles";
import React, { useContext } from "react";
import RaceCard from "./RaceCard";
import { RaceWebSocketContext } from "./RaceWebSocket";
import textGamesStyles from "../../styles/games/TextGamesStyles";

type Props = NativeStackScreenProps<RaceStackParamList, "Game">;

function RaceGameScreen({ route }: Props) {
  const { question, answers } = route.params;
  const { ws, setLastAnswer, points, round, chosenCard, setChosenCard } =
    useContext(RaceWebSocketContext);

  const handlePress = (answer: string, index: number) => {
    setChosenCard(index);
    setLastAnswer(answer);
    ws.send(JSON.stringify({ type: "response", answer }));
  };

  return (
    <View style={mainStyles.container}>
      <View style={mainGamesStyles.contentContainer}>
        <View style={{ flex: 1.5, marginTop: 80 }}>
          <View style={textGamesStyles.textWithMarginContainer}>
            <Text style={textGamesStyles.headingText}>Race</Text>
          </View>
          <View style={textGamesStyles.headingAndPointsContainer}>
            <Text style={textGamesStyles.secondaryText}>Round: {round}</Text>
            <Text style={textGamesStyles.secondaryText}>{points} pkt</Text>
          </View>
          <View style={textGamesStyles.headingContainer}>
            <Text style={textGamesStyles.basicText}>
              Choose the correct translations of word:
            </Text>
          </View>
          <View style={textGamesStyles.textWithMarginContainer}>
            <Text style={textGamesStyles.headingText}>{question}</Text>
          </View>
        </View>
        <View style={{ flex: 3.5 }}>
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
    </View>
  );
}

export default RaceGameScreen;
