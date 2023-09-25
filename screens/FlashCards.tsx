import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { WordSetContext } from "./WordSets";
import wordSetsStyles from "../styles/WordSetsStyles";
import { Fontisto } from "@expo/vector-icons";
import { pink } from "../Consts";
import mainStyles from "../styles/MainStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WordSetStackParamList } from "../navgation/WordSetStack";
import CloseButton from "../components/CloseButton";

type Props = NativeStackScreenProps<WordSetStackParamList, "FlashCards">;

const FlashCardScreen = ({ navigation }: Props) => {
  const { flashCards, startFlashCards, setStartFlashCards } =
    useContext(WordSetContext);
  const [showPolish, setShowPolish] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(currentIndex);
  useEffect(() => {
    setStartFlashCards(false);
    setCurrentIndex(0);
  }, [startFlashCards]);

  type IconButtonType = {
    icon:
      | "arrow-swap"
      | "arrow-right-l"
      | "history"
      | "close"
      | "spinner-refresh";
    onPress: () => void;
  };

  const IconButton = ({ icon, onPress }: IconButtonType) => {
    return (
      <TouchableOpacity
        style={wordSetsStyles.buttonFlashCards}
        onPress={onPress}
      >
        <Fontisto name={icon} size={25} color={"white"} />
      </TouchableOpacity>
    );
  };

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
      <CloseButton onPress={() => navigation.navigate("Display")} />
      <View
        style={{
          flex: 1.3,
          marginTop: "10%",
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
          <IconButton
            icon={"arrow-swap"}
            onPress={() => {
              setShowPolish((prevState) => !prevState);
            }}
          />
          <IconButton
            icon={"arrow-right-l"}
            onPress={() => {
              setCurrentIndex((prevState) => prevState + 1);
              setShowPolish(true);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default FlashCardScreen;
