import mainGamesStyles from "../../styles/games/MainGamesStyles";
import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Translation } from "../GamesTypes";
import textGamesStyles from "../../styles/games/TextGamesStyles";

export function makeCards(translations: Translation[]): Card[] {
  return translations.flatMap((translation) => [
    { word: translation.polish, translation: translation.english },
    { word: translation.english, translation: translation.polish },
  ]);
}

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
  isAllDisabled: boolean;
  onClick: (index: number) => void;
};
const MemoryCard: React.FC<MemoryCardProps> = ({
  card,
  index,
  isFlipped,
  isDisabled,
  isAllDisabled,
  onClick,
}) => {
  return (
    <TouchableOpacity
      style={mainGamesStyles.memoryCard}
      onPress={() => !isFlipped && !isDisabled && onClick(index)}
      disabled={isAllDisabled || isFlipped || isDisabled}
    >
      {!isFlipped && !isDisabled ? (
        <View style={mainGamesStyles.llamaContainer}>
          <Image
            source={require("../../assets/llama_without_background.png")}
            style={{ width: "90%", height: "90%" }}
          />
        </View>
      ) : (
        <View style={textGamesStyles.textContainer}>
          <Text>{card.word}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default MemoryCard;
