import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WordSetStackParamList } from "../navgation/WordSetStack";
import React, { useContext, useState } from "react";
import mainStyles from "../styles/MainStyles";
import { WordSetContext } from "./WordSets";
import ButtonRow from "../components/ButtonRow";

type Props = NativeStackScreenProps<WordSetStackParamList, "List">;

function WordSetsListScreen({}: Props) {
  const { setChosenSetName, setChosenSetId, wordSetsList } =
    useContext(WordSetContext);
  const [wordSetType, setWordSetType] = useState("default");

  return (
    <View style={mainStyles.container}>
      <View style={{ marginTop: 30, marginBottom: 30 }}>
        <ButtonRow choices={["default", "custom"]} onSelect={setWordSetType} />
      </View>
      <View style={{ width: "90%", flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={wordSetsList.filter((wordSet) => wordSet.type == wordSetType)}
          renderItem={(itemData) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setChosenSetName(itemData.item.name);
                  setChosenSetId(itemData.item.id);
                }}
              >
                <View
                  style={{
                    margin: 3,
                    paddingVertical: 12,
                    borderRadius: 15,
                    backgroundColor: "#e17c9b",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 13,
                    }}
                  >
                    {itemData.item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}

export default WordSetsListScreen;
