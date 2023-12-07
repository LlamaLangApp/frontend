import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WordSetStackParamList } from "../../navgation/WordSetStack";
import React, { useContext, useState } from "react";
import mainStyles from "../../styles/MainStyles";
import { WordSetContext } from "./WordSets";
import ButtonRow from "../../components/ButtonRow";
import friendsStyles from "../../styles/FriendsStyles";
import { grey } from "../../Consts";
import { FontAwesome5 } from "@expo/vector-icons";
import wordSetsStyles from "../../styles/WordSetsStyles";

type Props = NativeStackScreenProps<WordSetStackParamList, "List">;

function WordSetsListScreen({}: Props) {
  const { wordSetsList, handleChosenSet } = useContext(WordSetContext);
  const [wordSetType, setWordSetType] = useState("Default");

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={{ marginTop: 30, width: "100%" }}>
        <ButtonRow
          choices={[
            { choice: "Default", icon: "book" },
            { choice: "Custom", icon: "carrot" },
          ]}
          onSelect={setWordSetType}
        />
      </View>
      <FlatList
        style={{ width: "86%", borderRadius: 10, marginVertical: "5%" }}
        data={wordSetsList.filter((wordSet) => wordSet.type == wordSetType)}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 1, backgroundColor: "#bababa" }} />;
        }}
        ListEmptyComponent={() => {
          return (
            <View style={friendsStyles.emptyListContainer}>
              <Text style={{ color: "#bababa" }}>
                There are no word sets available
              </Text>
            </View>
          );
        }}
        renderItem={(itemData) => {
          return (
            <TouchableOpacity
              onPress={() =>
                handleChosenSet(itemData.item.name, itemData.item.id)
              }
            >
              <View style={wordSetsStyles.flatListItem}>
                <Text style={{ fontSize: 20, color: grey }}>
                  {itemData.item.name}
                </Text>
                <FontAwesome5 name="arrow-right" size={20} color={grey} />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

export default WordSetsListScreen;
