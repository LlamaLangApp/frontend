import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RaceStackParamList } from "./RaceStack";
import { Text, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import gameStyles from "../../styles/GamesStyles";
import React, { useContext, useEffect, useState } from "react";
import RaceCard from "./RaceCard";
import { RaceWebSocketContext } from "./RaceWebSocket";

type Props = NativeStackScreenProps<RaceStackParamList, "Game">;

function RaceGameScreen({ route }: Props) {
  const { question, answers } = route.params;
  const { ws, setLastAnswer } = useContext(RaceWebSocketContext);
  const [points] = useState(0);
  const [round] = useState(0);
  const [chosenCard, setChosenCard] = useState(-1);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    setChosenCard(-1);
    setDisabled(false);
  });
  const handlePress = (answer: string, index: number) => {
    setDisabled(true);
    setChosenCard(index);
    setLastAnswer(answer);
    ws.send(JSON.stringify({ type: "response", answer }));
  };

  return (
    <View style={mainStyles.container}>
      <View style={gameStyles.contentContainer}>
        <View style={{ flex: 1.7, marginTop: 30 }}>
          <View style={gameStyles.headingContainer}>
            <Text style={gameStyles.headingText}>Race</Text>
          </View>
          <Text></Text>
          <View style={gameStyles.headingAndPointsContainer}>
            <Text style={gameStyles.secondaryText}>Round: {round}</Text>
            <Text style={gameStyles.secondaryText}>{points} pkt</Text>
          </View>
          <Text></Text>
          <View style={gameStyles.headingContainer}>
            <Text style={gameStyles.basicText}>
              Choose the correct translations of word:
            </Text>
          </View>
          <View style={gameStyles.headingContainer}>
            <Text style={gameStyles.headingText}>{question}</Text>
          </View>
          <Text> </Text>
        </View>
        <View style={{ flex: 3.5 }}>
          <View style={gameStyles.cardsContainer}>
            {answers.map((translation, index) => {
              return (
                <RaceCard
                  key={index}
                  translation={translation}
                  index={index}
                  isChosen={chosenCard == index}
                  isDisabled={disabled}
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
