import React, { useMemo } from "react";
import { View, Text } from "react-native";
import wordSetsStyles from "../styles/WordSetsStyles";
import { grey } from "../Consts";

export type WordItem = {
  polish: string;
  english: string;
  chosenPolish: boolean;
};

const WordListItem = ({ polish, english, chosenPolish }: WordItem) => {
  const placeElem = useMemo(() => {
    if (chosenPolish) {
      return (
        <View>
          <Text style={{ fontSize: 20, color: grey }}>{polish}</Text>
          <Text style={{ fontSize: 16, color: "grey" }}>{english}</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={{ fontSize: 20, color: grey }}>{english}</Text>
          <Text style={{ fontSize: 16, color: "grey" }}>{polish}</Text>
        </View>
      );
    }
  }, [chosenPolish]);

  return <View style={wordSetsStyles.flatListItem}>{placeElem}</View>;
};

export default WordListItem;
