import { Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { WordSetContext } from "./WordSets";
import mainStyles from "../../styles/MainStyles";
import wordSetsStyles from "../../styles/WordSetsStyles";
import { FlatList } from "react-native-gesture-handler";
import WordListItem from "../../components/WordListItem";
import { Fontisto } from "@expo/vector-icons";
import { grey } from "../../Consts";

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
        <Text style={{ fontSize: 27, color: grey }}>{chosenSetName}</Text>
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
          return <View style={{ height: 1, backgroundColor: "#bababa" }} />;
        }}
        renderItem={({ item }) => (
          <WordListItem
            polish={item.polish}
            english={item.english}
            chosenPolish={chosenPolish}
          />
        )}
      />
    </View>
  );
}

export default WordSetDisplayScreen;
