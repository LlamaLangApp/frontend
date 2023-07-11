// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { RaceStackParamList } from "./RaceStack";
import { Text, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import gameStyles from "../../styles/GamesStyles";
import React, { useState } from "react";
import RaceCard from "./RaceCard";

// type Props = NativeStackScreenProps<RaceStackParamList, "Game">;

function RaceGameScreen() {
  const [translations] = useState(["banana", "apple", "pear", "orange"]);
  const [points] = useState(0);
  const [round] = useState(1);
  const [chosenCard, setChosenCard] = useState(-1);
  const [disabled, setDisabled] = useState<boolean>(false);

  const handlePress = (index: number) => {
    setDisabled(true);
    setChosenCard(index);
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
            <Text style={gameStyles.secondaryText}>Round: {round}/5</Text>
            <Text style={gameStyles.secondaryText}>{points} pkt</Text>
          </View>
          <Text></Text>
          <View style={gameStyles.headingContainer}>
            <Text style={gameStyles.basicText}>
              Choose the correct translations of word:
            </Text>
          </View>
          <View style={gameStyles.headingContainer}>
            <Text style={gameStyles.headingText}>pomarańcza</Text>
          </View>
          <Text> </Text>
        </View>
        <View style={{ flex: 3.5 }}>
          <View style={gameStyles.cardsContainer}>
            {translations.map((translation, index) => {
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
