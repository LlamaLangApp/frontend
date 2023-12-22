import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { grey, lightGrey, pink } from "../../Consts";
import containerGamesStyles from "@styles/games/ContainerGamesStyles";

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
      style={[
        containerGamesStyles.raceCard,
        { backgroundColor: isChosen ? pink : lightGrey },
      ]}
      onPress={() => !isDisabled && onClick(translation, index)}
      disabled={isDisabled}
    >
      <View style={containerGamesStyles.basic}>
        <Text style={{ fontSize: 20, color: isChosen ? lightGrey : grey }}>
          {translation}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RaceCard;
