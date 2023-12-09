import { Dimensions, StyleSheet, Text, View } from "react-native";
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

const screenWidth = Dimensions.get("screen").width;
export const tinderCardWidth = screenWidth * 0.7;

type TinderCardProps = {
  flashCard: FlashCards;
  numOfCards: number;
  index: number;
  activeIndex: SharedValue<number>;
};
const TinderCard = ({
  flashCard,
  numOfCards,
  index,
  activeIndex,
}: TinderCardProps) => {
  const translationX = useSharedValue(0);

  const animatedCard = useAnimatedStyle(() => ({
    opacity: interpolate(
      activeIndex.value,
      [index - 1, index, index + 1],
      [1 - 1 / 3.5, 1, 1]
    ),
    transform: [
      // {
      //   scale: interpolate(
      //     activeIndex.value,
      //     [index - 1, index, index + 1],
      //     [0.95, 1, 1]
      //   ),
      // },
      // {
      //   translateY: interpolate(
      //     activeIndex.value,
      //     [index - 1, index, index + 1],
      //     [-30, 0, 0]
      //   ),
      // },
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
        // translationX.value = withDecay({ velocity: event.velocityX });
        translationX.value = withSpring(Math.sign(event.velocityX) * 500, {
          velocity: event.velocityX,
        });
        // activeIndex.value = withSpring(activeIndex.value + 1);
        activeIndex.value = index + 1;
      } else {
        translationX.value = withSpring(0);
      }
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.card,
          animatedCard,
          {
            zIndex: numOfCards - index,
          },
        ]}
      >
        <LinearGradient
          colors={["transparent", "rgba(255,0,0,0.8"]}
          style={[styles.overlay, StyleSheet.absoluteFillObject]}
        />
        <View style={styles.footer}>
          <Text style={styles.textStyle}>{flashCard.polish}</Text>
        </View>
      </Animated.View>
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
    backgroundColor: "white",
    marginTop: 90,
  },
  footer: {},
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
