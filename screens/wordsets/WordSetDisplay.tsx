import { Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { WordSetContext } from "./WordSets";
import mainStyles from "../../styles/MainStyles";
import wordSetsStyles from "../../styles/WordSetsStyles";
import { FlatList } from "react-native-gesture-handler";
import WordListItem from "../../components/WordListItem";
import { Fontisto } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WordSetStackParamList } from "../../navgation/WordSetStack";
import CloseButton from "../../components/CloseButton";

type Props = NativeStackScreenProps<WordSetStackParamList, "Display">;

function WordSetDisplayScreen({ navigation }: Props) {
  const {
    chosenSetName,
    chosenPolish,
    chosenSet,
    setChosenPolish,
    handleFlashCardsButton,
  } = useContext(WordSetContext);
  return (
    <View style={mainStyles.container}>
      <CloseButton onPress={() => navigation.navigate("List")} />
      <View style={{ marginTop: "4%" }}>
        <Text style={wordSetsStyles.headingText}>{chosenSetName}</Text>
      </View>
      <View style={{ width: "80%", marginVertical: 30, flexDirection: "row" }}>
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
        style={{ width: "80%", marginBottom: "5%" }}
        data={chosenSet}
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
