import { Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";
import { WordSetContext } from "./WordSets";
import WordListItem from "@components/WordListItem";
import mainStyles from "@styles/MainStyles";
import wordSetsStyles from "@styles/WordSetsStyles";
import textStyles from "@styles/TextStyles";
import containerStyles from "@styles/ContainerStyles";

function WordSetDisplayScreen() {
  const {
    chosenSetName,
    chosenPolish,
    chosenSet,
    setChosenPolish,
    handleFlashCardsButton,
  } = useContext(WordSetContext);
  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={{ marginVertical: "6%", width: "84%" }}>
        <Text style={textStyles.grey27Weight800}>{chosenSetName}</Text>
      </View>
      <View style={{ width: "86%", flexDirection: "row" }}>
        <TouchableOpacity
          style={wordSetsStyles.buttonIcon}
          onPress={() => {
            setChosenPolish((prevState) => !prevState);
          }}
        >
          <Fontisto name={"arrow-swap"} size={25} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={wordSetsStyles.buttonShorter}
          onPress={handleFlashCardsButton}
        >
          <Text style={wordSetsStyles.buttonText}>Flash Cards</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ width: "86%", borderRadius: 10, marginVertical: "5%" }}
        data={chosenSet}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return <View style={containerStyles.thinLine} />;
        }}
        renderItem={({ item }) => (
          <WordListItem
            polish={item.polish}
            english={item.english}
            chosenPolish={chosenPolish}
            star={item.star}
          />
        )}
      />
    </View>
  );
}

export default WordSetDisplayScreen;
