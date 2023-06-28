import gameStyles from "../../styles/GamesStyles";
import { Image, TouchableOpacity, View, Text } from "react-native";
import React from "react";

export function shuffleCards<Card>(list: Card[]): Card[] {
  return list.sort(() => Math.random() - 0.5);
}

export type Card = {
  word: string;
  translation: string;
};

type MemoryCardProps = {
  card: Card;
  index: number;
  isFlipped: boolean;
  isDisabled: boolean;
  isDisabledBack: boolean;
  onClick: (index: number) => void;
};
const MemoryCard: React.FC<MemoryCardProps> = ({
  card,
  index,
  isFlipped,
  isDisabled,
  isDisabledBack,
  onClick,
}) => {
  return (
    <TouchableOpacity
      style={gameStyles.card}
      onPress={() => !isFlipped && !isDisabled && onClick(index)}
      disabled={isDisabledBack || isFlipped || isDisabled}
    >
      {!isFlipped && !isDisabled ? (
        <View style={gameStyles.llamaContainer}>
          <Image
            source={require("../../assets/llama_without_background.png")}
            style={{ width: "90%", height: "90%" }}
          />
        </View>
      ) : (
        <View style={gameStyles.textContainer}>
          <Text>{card.word}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default MemoryCard;
