import { Animated, Dimensions, Easing, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Translation } from "../../backend/WordSetsBackend";
import mainGamesStyles from "../../styles/games/MainGamesStyles";
import textStyles from "../../styles/TextStyles";

const screenWidth = Math.min(
  Dimensions.get("window").width,
  Dimensions.get("window").height
);

export function makeCards(translations: Translation[]): Card[] {
  return translations
    .map((translation) => {
      return {
        id: translation.id,
        word: translation.polish,
        translation: translation.english,
        leftPosition: 0,
        topPosition: 0,
        fallen: false,
      };
    })
    .sort(() => Math.random() - 0.5);
}

export function choseMainWord(translations: Translation[]): Card {
  const translation =
    translations[Math.floor(Math.random() * translations.length)];
  return {
    id: translation.id,
    word: translation.polish,
    translation: translation.english,
    leftPosition: Math.floor(screenWidth / 2),
    topPosition: 0,
    fallen: false,
  };
}

export type Card = {
  id: number;
  word: string;
  translation: string;
  leftPosition: number;
  topPosition: number;
  fallen: boolean;
};

type FallingWordsCardProps = {
  card: Card;
  cards: React.MutableRefObject<{
    [p: string]: Card;
  }>;
};

const FallingWordsCard: React.FC<FallingWordsCardProps> = ({ card, cards }) => {
  const [cardTopPosition] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(cardTopPosition, {
      toValue: screenWidth,
      duration: 8000,
      useNativeDriver: false,
      easing: Easing.linear,
      delay: 0,
    }).start();

    cardTopPosition.addListener(({ value }) => {
      cards.current[card.id].topPosition = value;
    });

    return () => {
      cardTopPosition.removeAllListeners();
    };
  }, []);

  return (
    <Animated.View
      style={[
        mainGamesStyles.fallingWordsCard,
        {
          top: cardTopPosition,
          left: card.leftPosition,
          borderRadius: 6,
          position: "absolute",
        },
      ]}
    >
      <Text style={textStyles.white14Weight600}>{card.translation}</Text>
    </Animated.View>
  );
};

export default FallingWordsCard;
