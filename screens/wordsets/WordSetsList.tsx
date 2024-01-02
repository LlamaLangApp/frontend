import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons";
import { WordSetStackParamList } from "@navigation/WordSetStack";
import { WordSetContext } from "./WordSets";
import ButtonRow from "@components/ButtonRow";
import EmptyListText from "@components/EmptyListText";
import { grey } from "../../Consts";
import mainStyles from "@styles/MainStyles";
import wordSetsStyles from "@styles/WordSetsStyles";
import containerStyles from "@styles/ContainerStyles";
import textStyles from "@styles/TextStyles";

type Props = NativeStackScreenProps<WordSetStackParamList, "List">;

function WordSetsListScreen({}: Props) {
  const { wordSetsList, handleChosenSet } = useContext(WordSetContext);
  const [wordSetType, setWordSetType] = useState("Default");

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={containerStyles.buttonRow}>
        <ButtonRow
          choices={[
            { choice: "Default", icon: "book" },
            { choice: "Custom", icon: "carrot" },
          ]}
          onSelect={setWordSetType}
        />
      </View>
      <FlatList
        style={{ width: "86%", borderRadius: 10 }}
        data={wordSetsList.filter((wordSet) => wordSet.type == wordSetType)}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return <View style={containerStyles.thinLine} />;
        }}
        ListEmptyComponent={() => {
          return <EmptyListText texts={[`There are no word sets available`]} />;
        }}
        renderItem={(itemData) => {
          return itemData.item.locked ? (
            <View style={wordSetsStyles.flatListItem}>
              <View style={{ flexDirection: "column" }}>
                <Text style={textStyles.grey20Weight600}>
                  {itemData.item.name}
                </Text>
                <Text style={textStyles.grey12}>
                  Category: {itemData.item.category}
                </Text>
                <Text style={textStyles.pink14}>
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
                  <Text style={textStyles.grey20Weight600}>
                    {itemData.item.name}
                  </Text>
                  <Text style={textStyles.grey12}>
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
