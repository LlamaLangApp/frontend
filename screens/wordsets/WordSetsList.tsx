import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WordSetStackParamList } from "../../navgation/WordSetStack";
import React, { useContext, useState } from "react";
import mainStyles from "../../styles/MainStyles";
import { WordSetContext } from "./WordSets";
import ButtonRow from "../../components/ButtonRow";
import wordSetsStyles from "../../styles/WordSetsStyles";

type Props = NativeStackScreenProps<WordSetStackParamList, "List">;

function WordSetsListScreen({}: Props) {
  const { wordSetsList, handleChosenSet } = useContext(WordSetContext);
  const [wordSetType, setWordSetType] = useState("Default");

  return (
    <View style={mainStyles.container}>
      <View style={{ marginTop: 30, marginBottom: 30 }}>
        <ButtonRow
          choices={[
            { choice: "Default", icon: "book" },
            { choice: "Custom", icon: "carrot" },
          ]}
          onSelect={setWordSetType}
        />
      </View>
      <FlatList
        style={{ width: "82%", marginBottom: "5%" }}
        showsVerticalScrollIndicator={false}
        data={wordSetsList.filter((wordSet) => wordSet.type == wordSetType)}
        renderItem={(itemData) => {
          return (
            <TouchableOpacity
              onPress={() =>
                handleChosenSet(itemData.item.name, itemData.item.id)
              }
            >
              <View style={wordSetsStyles.flatListItem}>
                <View style={{ margin: 10 }}>
                  <Text style={{ fontSize: 21, color: "white" }}>
                    {itemData.item.name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

export default WordSetsListScreen;
