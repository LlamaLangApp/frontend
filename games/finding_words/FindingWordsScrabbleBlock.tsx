import React, { useEffect, useMemo } from "react";
import { Text, StyleSheet } from "react-native";
import { lightGrey, pink } from "../../Consts";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export type Letter = {
  id: number;
  char: string;
  selected: boolean;
};

interface DraggableScrabbleBlockProps {
  letter: Letter;
  letterStaticPosition: { top: number; left: number };
  toggleSelection: () => void;
  swapLetter: (direction: "left" | "right") => void;
  heightRange: [number, number];
}

const springSettings = {
  duration: 300,
  dampingRatio: 1,
};

const DraggableScrabbleBlock = ({
  letter,
  letterStaticPosition,
  toggleSelection,
  swapLetter,
  heightRange,
}: DraggableScrabbleBlockProps) => {
  const panStartPosition = useSharedValue<null | number>(null);
  const animatedPosition = useSharedValue(letterStaticPosition);

  useEffect(() => {
    if (panStartPosition.value) {
      return;
    }
    animatedPosition.value = withSpring(letterStaticPosition, springSettings);
  }, [letterStaticPosition]);

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .onBegin(() => {
          panStartPosition.value = letterStaticPosition.left;
        })
        .onChange((event) => {
          // Should always be != null here
          const newPos = (panStartPosition.value ?? 0) + event.translationX;
          animatedPosition.value = {
            top: animatedPosition.value.top,
            left: newPos,
          };

          const offset = newPos - letterStaticPosition.left;

          const panSafetyGap = 5;

          if (
            Math.abs(offset) >
            scrabbleBlockSize / 2 + scrabbleBlockGap + panSafetyGap
          ) {
            swapLetter(offset > 0 ? "left" : "right");
          }
        })
        .onFinalize(() => {
          animatedPosition.value = withSpring(
            letterStaticPosition,
            springSettings
          );
          panStartPosition.value = null;
        })
        .runOnJS(true),
    [letterStaticPosition, swapLetter]
  );

  const tap = useMemo(
    () =>
      Gesture.Tap()
        .onStart(() => toggleSelection())
        .runOnJS(true),
    [toggleSelection]
  );

  const gesture = useMemo(() => Gesture.Race(pan, tap), [pan, tap]);

  const animatedStyle = useAnimatedStyle(() => ({
    ...styles.block,
    backgroundColor: interpolateColor(animatedPosition.value.top, heightRange, [
      pink,
      lightGrey,
    ]),
    position: "absolute",
    transform: [
      { translateY: animatedPosition.value.top },
      { translateX: animatedPosition.value.left },
    ],
    zIndex: panStartPosition.value !== null ? 1 : 0,
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={animatedStyle}>
        <Text style={styles.letter}>{letter.char}</Text>
      </Animated.View>
    </GestureDetector>
  );
};
export const scrabbleBlockSize = 40;
export const scrabbleBlockGap = 5;

const styles = StyleSheet.create({
  block: {
    width: scrabbleBlockSize,
    height: scrabbleBlockSize,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    shadowColor: "rgba(0, 0, 0, 0.2)", // Shadow color
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  letter: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 50,
    height: 58,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DraggableScrabbleBlock;
