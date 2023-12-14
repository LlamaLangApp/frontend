import { StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";

export default ({
  statsText,
  statsNumber,
  iconName,
  textColor,
  backgroundColor,
}: {
  statsText: string;
  statsNumber: number | undefined;
  iconName: string;
  textColor: string;
  backgroundColor: string;
}) => {
  return (
    <View
      style={[
        styles.statsInfo,
        {
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <Text>
        <FontAwesome5 name={iconName} color={textColor} size={18} />
        <Text style={{ fontSize: 18, color: textColor }}>{statsText}</Text>
      </Text>
      <Text style={{ fontSize: 18, color: textColor, fontWeight: "bold" }}>
        {statsNumber}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statsInfo: {
    width: "90%",
    borderRadius: 10,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    margin: 5,
  },
});
