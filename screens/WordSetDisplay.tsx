import { Text, View } from "react-native";
import { useContext } from "react";
import { WordSetContext } from "./WordSets";

function WordSetDisplayScreen() {
  const { chosenSet } = useContext(WordSetContext);
  console.log(chosenSet);
  return (
    <View>
      <Text>Display</Text>
    </View>
  );
}

export default WordSetDisplayScreen;
