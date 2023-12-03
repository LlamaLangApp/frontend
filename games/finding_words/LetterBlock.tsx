import mainGamesStyles from "../../styles/games/MainGamesStyles";
import { Text, TouchableOpacity } from "react-native";
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
      style={
        !isChosen ? mainGamesStyles.raceCard : mainGamesStyles.raceCardChosen
      }
      onPress={() => !isDisabled && onClick(translation, index)}
      disabled={isDisabled}
    >
      {/* <View style={textGamesStyles.textContainer}> */}
      <Text>{translation}</Text>
      {/* </View> */}
    </TouchableOpacity>
  );
};

export default RaceCard;
