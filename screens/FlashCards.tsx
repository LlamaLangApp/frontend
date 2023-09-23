import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { WordSetContext } from "./WordSets";
import wordSetsStyles from "../styles/WordSetsStyles";
import { Fontisto } from "@expo/vector-icons";
import { pink } from "../Consts";
import mainStyles from "../styles/MainStyles";

const FlashCardScreen = () => {
  const { flashCards, startFlashCards, setStartFlashCards } =
    useContext(WordSetContext);
  const [showPolish, setShowPolish] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(flashCards, currentIndex);
  useEffect(() => {
    setStartFlashCards(false);
    setCurrentIndex(0);
  }, [startFlashCards]);

  const cardText = useMemo(
    () => (
      <Text style={{ textAlign: "center", fontSize: 30, color: "white" }}>
        {currentIndex >= flashCards.length
          ? "There is no more flash cards"
          : showPolish
          ? flashCards[currentIndex].polish
          : flashCards[currentIndex].english}
      </Text>
    ),
    [showPolish, currentIndex]
  );

  return (
    <View style={mainStyles.container}>
      <View
        style={{
          flex: 1.3,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            flex: 1,
            marginVertical: "10%",
            width: "80%",
            backgroundColor: pink,
            borderRadius: 15,
            justifyContent: "center",
          }}
        >
          {cardText}
        </View>
        <View style={{ flex: 0.3, width: "80%", flexDirection: "row" }}>
          <TouchableOpacity
            style={wordSetsStyles.buttonFlashCards}
            onPress={() => {
              setShowPolish((prevState) => !prevState);
            }}
          >
            <Fontisto name={"arrow-swap"} size={25} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={wordSetsStyles.buttonFlashCards}
            onPress={() => {
              setCurrentIndex((prevState) => prevState + 1);
              setShowPolish(true);
            }}
          >
            <Fontisto name={"arrow-right-l"} size={25} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FlashCardScreen;
