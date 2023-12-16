import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WordSetStackParamList } from "../../navgation/WordSetStack";
import React, { useContext, useState } from "react";
import mainStyles from "../../styles/MainStyles";
import { WordSetContext } from "./WordSets";
import ButtonRow from "../../components/ButtonRow";
import friendsStyles from "../../styles/FriendsStyles";
import { grey, pink } from "../../Consts";
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
          return itemData.item.locked ? (
            <View style={wordSetsStyles.flatListItem}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontSize: 20, color: grey }}>
                  {itemData.item.name}
                </Text>
                <Text style={{ fontSize: 12, color: grey }}>
                  Category: {itemData.item.category}
                </Text>
                <Text style={{ fontSize: 13, color: pink }}>
                  To unlock learn more from set:{" "}
                  {itemData.item.depends_on[0].name}
                </Text>
              </View>
              <FontAwesome5 name="lock" size={20} color={grey} />
            </View>
          ) : (
            <TouchableOpacity onPress={() => handleChosenSet(itemData.item)}>
              <View style={wordSetsStyles.flatListItem}>
                <View style={{ flexDirection: "column" }}>
                  <Text style={{ fontSize: 20, color: grey }}>
                    {itemData.item.name}
                  </Text>
                  <Text style={{ fontSize: 12, color: grey }}>
                    Category: {itemData.item.category}
                  </Text>
                </View>
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
