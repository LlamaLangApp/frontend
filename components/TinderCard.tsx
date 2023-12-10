import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FlashCards } from "../screens/wordsets/WordSets";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Dispatch, SetStateAction, useState } from "react";

const screenWidth = Dimensions.get("screen").width;
export const tinderCardWidth = screenWidth * 0.7;

type TinderCardProps = {
  flashCard: FlashCards;
  numOfCards: number;
  index: number;
  activeIndex: SharedValue<number>;
  firstTranslation: boolean;
  setLearnedCards: Dispatch<SetStateAction<FlashCards[]>>;
  setUnlearnedCards: Dispatch<SetStateAction<FlashCards[]>>;
};
const TinderCard = ({
  flashCard,
  numOfCards,
  index,
  activeIndex,
  firstTranslation,
  setLearnedCards,
  setUnlearnedCards,
}: TinderCardProps) => {
  const [showTranslation, setShowTranslation] = useState(firstTranslation);
  const [flippedCard, setFlippedCard] = useState(false);
  const translationX = useSharedValue(0);
  const flipping = useSharedValue(0);

  const animatedCard = useAnimatedStyle(() => ({
    opacity: interpolate(
      activeIndex.value,
      [index - 1, index, index + 1],
      [1 - 1 / 3.5, 1, 1]
    ),
    transform: [
      {
        translateX: translationX.value,
      },
      {
        rotateZ: `${interpolate(
          translationX.value,
          [-screenWidth / 2, 0, screenWidth / 2],
          [-15, 0, 15]
        )}deg`,
      },
    ],
  }));

  const gesture = Gesture.Pan()
    .onChange((event) => {
      translationX.value = event.translationX;
      activeIndex.value = interpolate(
        Math.abs(translationX.value),
        [0, 500],
        [index, index + 0.8]
      );
    })
    .onEnd((event) => {
      if (Math.abs(event.velocityX) > 400) {
        if (translationX.value > 0) {
          setLearnedCards((prevState) => [...prevState, flashCard]);
        } else {
          setUnlearnedCards((prevState) => [...prevState, flashCard]);
        }
        translationX.value = withSpring(Math.sign(event.velocityX) * 500, {
          velocity: event.velocityX,
        });
        activeIndex.value = index + 1;
      } else {
        translationX.value = withSpring(0);
      }
    })
    .runOnJS(true);

  return (
    <GestureDetector gesture={gesture}>
      <TouchableWithoutFeedback
        onPress={() => {
          setShowTranslation((prevState) => !prevState);
          setFlippedCard((prevState) => !prevState);
          flipping.value = 1;
        }}
      >
        <Animated.View
          style={[
            styles.card,
            animatedCard,
            {
              zIndex: numOfCards - index,
              backgroundColor: flippedCard ? "#fafafa" : "white",
            },
          ]}
        >
          <LinearGradient
            colors={["transparent", "rgba(255,0,0,0.8"]}
            style={[styles.overlay, StyleSheet.absoluteFillObject]}
          />
          <Text style={styles.textStyle}>
            {showTranslation ? flashCard.polish : flashCard.english}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  card: {
    width: tinderCardWidth,
    aspectRatio: 1 / 1.5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginTop: 170,
  },
  textStyle: {
    fontSize: 30,
  },
  overlay: {
    top: "50%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});

export default TinderCard;
