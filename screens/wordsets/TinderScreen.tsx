import { Dimensions, View } from "react-native";
import TinderCard from "../../components/TinderCard";
import { useContext, useState } from "react";
import { WordSetContext } from "./WordSets";
import { Bar as ProgressBar } from "react-native-progress";

import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from "react-native-reanimated";
import { buttonLightPink } from "../../Consts";

const screenWidth = Dimensions.get("screen").width;
const TinderScreen = () => {
  const activeIndex = useSharedValue(0);
  const [index, setIndex] = useState(0);
  const { flashCards } = useContext(WordSetContext);

  useAnimatedReaction(
    () => activeIndex.value,
    (value) => {
      if (Math.floor(value) != index) {
        runOnJS(setIndex)(Math.floor(value));
      }
    }
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <ProgressBar
        progress={index / flashCards.length}
        width={screenWidth}
        height={15}
        color={buttonLightPink}
        unfilledColor={"white"}
        borderWidth={0}
      />
      {flashCards.map((flashCard, index) => (
        <TinderCard
          key={index}
          flashCard={flashCard}
          numOfCards={flashCards.length}
          index={index}
          activeIndex={activeIndex}
        />
      ))}
    </View>
  );
};

export default TinderScreen;
