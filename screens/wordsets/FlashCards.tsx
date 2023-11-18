import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { WordSetContext } from "./WordSets";
import { pink } from "../../Consts";
import mainStyles from "../../styles/MainStyles";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { WordSetStackParamList } from "../../navgation/WordSetStack";
// import CloseButton from "../../components/CloseButton";
import IconButton from "../../components/IconButton";
import wordSetsStyles from "../../styles/WordSetsStyles";

// type Props = NativeStackScreenProps<WordSetStackParamList, "FlashCards">;

// const FlashCardScreen = ({ navigation }: Props) => {
const FlashCardScreen = () => {
  const {
    flashCards,
    setFlashCards,
    startFlashCards,
    setStartFlashCards,
    chosenPolish,
  } = useContext(WordSetContext);
  const [showPolish, setShowPolish] = useState<boolean>(chosenPolish);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    setStartFlashCards(false);
    setCurrentIndex(0);
    setShowPolish(chosenPolish);
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
      {/*<CloseButton onPress={() => navigation.navigate("Display")} />*/}
      <View style={wordSetsStyles.containerFlashCards}>
        <TouchableOpacity
          style={{
            flex: 0.9,
            marginVertical: "15%",
            width: "80%",
            backgroundColor: showPolish ? pink : "#c27a8c",
            borderRadius: 15,
            justifyContent: "center",
          }}
          onPress={() => {
            setShowPolish((prevState) => !prevState);
          }}
        >
          {cardText}
        </TouchableOpacity>
        {currentIndex < flashCards.length ? (
          <View
            style={{
              flex: 0.4,
              width: "80%",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {/*<IconButton*/}
            {/*  icon={"arrow-swap"}*/}
            {/*  onPress={() => {*/}
            {/*    setShowPolish((prevState) => !prevState);*/}
            {/*  }}*/}
            {/*/>*/}
            <IconButton
              icon={"arrow-right-l"}
              onPress={() => {
                setCurrentIndex((prevState) => prevState + 1);
                setShowPolish(chosenPolish);
              }}
            />
          </View>
        ) : (
          <View style={{ flex: 0.4, width: "80%", alignItems: "center" }}>
            <IconButton
              icon={"spinner-refresh"}
              onPress={() => {
                setFlashCards(flashCards.sort(() => Math.random() - 0.5));
                setStartFlashCards(true);
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default FlashCardScreen;
