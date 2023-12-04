import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { buttonLightPink, grey } from "../Consts";

const buttonSingleMultiPlayer = () => {
  return (
    <View style={styles.backgroundStyle}>
      <View style={styles.placeHolderStyle} />
      <TouchableOpacity style={styles.buttonStyleClicked}>
        <View style={styles.textContainerStyle}>
          <FontAwesome5 name="user-alt" size={35} color={buttonLightPink} />
          <Text style={styles.textStyle}>SinglePlayer</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyleUnclicked}>
        <View style={styles.textContainerStyle}>
          <FontAwesome5 name="user-friends" size={40} color={buttonLightPink} />
          <Text style={styles.textStyle}>MultiPlayer</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.placeHolderStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#D9D9D9",
    borderRadius: 13,
    width: "87%",
    height: 60,
    marginTop: 30,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonStyleClicked: {
    flex: 1,
    height: "85%",
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  buttonStyleUnclicked: {
    flex: 1,
    height: "80%",
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
  },
  textContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    color: grey,
  },
  placeHolderStyle: {
    flex: 0.03,
  },
});
export default buttonSingleMultiPlayer;
