import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FlashCards } from "../../screens/wordsets/WordSets";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Dispatch, SetStateAction, useState } from "react";

const screenWidth = Dimensions.get("screen").width;
export const FlashCardWidth = screenWidth * 0.7;

type FlashCardProps = {
  flashCard: FlashCards;
  numOfCards: number;
  index: number;
  activeIndex: SharedValue<number>;
  firstTranslation: boolean;
  setLearnedCards: Dispatch<SetStateAction<FlashCards[]>>;
  setNeedPracticeCards: Dispatch<SetStateAction<FlashCards[]>>;
};
const FlashCard = ({
  flashCard,
  numOfCards,
  index,
  activeIndex,
  firstTranslation,
  setLearnedCards,
  setNeedPracticeCards,
}: FlashCardProps) => {
  const [showTranslation, setShowTranslation] = useState(firstTranslation);
  const translationX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const animatedCard = useAnimatedStyle(() => ({
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
      {
        rotateY: withTiming(
          `${interpolate(rotateY.value, [0, 1], [0, 180])}deg`,
          {
            duration: 1000,
          }
        ),
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
          setNeedPracticeCards((prevState) => [...prevState, flashCard]);
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
          rotateY.value = rotateY ? 0 : 1;
          setShowTranslation((prevState) => !prevState);
        }}
      >
        <Animated.View
          style={[
            styles.card,
            animatedCard,
            {
              zIndex: numOfCards - index,
              backgroundColor: "white",
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
    width: FlashCardWidth,
    aspectRatio: 1 / 1.5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    overflow: "hidden",
    backfaceVisibility: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginTop: 130,
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

export default FlashCard;
