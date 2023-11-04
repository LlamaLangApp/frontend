import { Animated, Dimensions, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Translation } from "../GamesTypes";

const screenWidth = Dimensions.get("window").width;
console.log("screen width " + screenWidth);

export function makeCards(translations: Translation[]): Card[] {
  return translations.map((translation) => {
    return {
      word: translation.polish,
      translation: translation.english,
      xPosition: Math.random() * (screenWidth - 10) - (screenWidth - 10) / 2,
      yPosition: -20,
    };
  });
}

export function choseMainWord(translations: Translation[]): Card {
  const translation =
    translations[Math.floor(Math.random() * translations.length)];
  return {
    word: translation.polish,
    translation: translation.english,
    xPosition: Math.floor(screenWidth / 2),
    yPosition: 20,
  };
}

export type Card = {
  word: string;
  translation: string;
  xPosition: number;
  yPosition: number;
};

type FallingWordsCardProps = {
  card: Card;
  index: number;
};

const FallingWordsCard: React.FC<FallingWordsCardProps> = ({ card, index }) => {
  const [cardPosition, setCardPosition] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(cardPosition, {
      toValue: 500,
      duration: 10000,
      useNativeDriver: false,
    }).start();

    cardPosition.addListener(({ value }) => {
      card.yPosition = value;
    });
  }, []);

  return (
    <View>
      <Animated.View
        style={[
          {
            top: cardPosition,
            left: card.xPosition,
          },
        ]}
      >
        <Text>{card.translation}</Text>
      </Animated.View>
    </View>
  );
};

export default FallingWordsCard;
