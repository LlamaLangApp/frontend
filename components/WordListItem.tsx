import React, { useMemo } from "react";
import { View, Text } from "react-native";
import wordSetsStyles from "../styles/WordSetsStyles";
import { grey, pink } from "../Consts";
import { FontAwesome } from "@expo/vector-icons";

export type WordItem = {
  polish: string;
  english: string;
  chosenPolish: boolean;
  star: boolean;
};

const WordListItem = ({ polish, english, chosenPolish, star }: WordItem) => {
  const placeElem = useMemo(() => {
    if (chosenPolish) {
      return (
        <View
          style={{
            width: "98%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: "1%",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: 20, color: grey }}>{polish}</Text>
            <Text style={{ fontSize: 16, color: "grey" }}>{english}</Text>
          </View>
          <FontAwesome name={star ? "star" : "star-o"} size={30} color={pink} />
        </View>
      );
    } else {
      return (
        <View
          style={{
            width: "98%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: "1%",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: 20, color: grey }}>{english}</Text>
            <Text style={{ fontSize: 16, color: "grey" }}>{polish}</Text>
          </View>
          <FontAwesome name={star ? "star" : "star-o"} size={30} color={pink} />
        </View>
      );
    }
  }, [chosenPolish]);

  return <View style={wordSetsStyles.flatListItem}>{placeElem}</View>;
};

export default WordListItem;
