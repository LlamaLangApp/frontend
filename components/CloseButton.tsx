import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const CloseButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity
      style={{ position: "absolute", top: 5, right: 5 }}
      onPress={onPress}
    >
      <Ionicons name="ios-close-outline" size={35} color="#f0f0f0" />
    </TouchableOpacity>
  );
};

export default CloseButton;
