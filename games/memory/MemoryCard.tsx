import gameStyles from "../../styles/GamesStyles";
import { Image, TouchableOpacity, View, Text } from "react-native";
import React from "react";

const MemoryCard = ({ card, index, isFlipped, isDisabled, onClick }) => {
  return (
    <TouchableOpacity
      style={gameStyles.card}
      onPress={() => !isFlipped && !isDisabled && onClick(index)}
      disabled={isFlipped || isDisabled}
    >
      {!isFlipped && !isDisabled ? (
        <View style={gameStyles.llamaContainer}>
          <Image
            source={require("../../assets/llama_without_background.png")}
            style={{ width: "90%", height: "90%" }}
          />
        </View>
      ) : (
        <View style={gameStyles.textContainer}>
          <Text>{card.word}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default MemoryCard;
