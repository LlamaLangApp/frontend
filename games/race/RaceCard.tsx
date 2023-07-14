import gameStyles from "../../styles/GamesStyles";
import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

type RaceCardProps = {
  translation: string;
  index: number;
  isChosen: boolean;
  isDisabled: boolean;
  onClick: (answer: string, index: number) => void;
};
const RaceCard: React.FC<RaceCardProps> = ({
  translation,
  index,
  isChosen,
  isDisabled,
  onClick,
}) => {
  return (
    <TouchableOpacity
      style={!isChosen ? gameStyles.raceCard : gameStyles.raceCardChosen}
      onPress={() => !isDisabled && onClick(translation, index)}
      disabled={isDisabled}
    >
      <View style={gameStyles.textContainer}>
        <Text>{translation}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RaceCard;
