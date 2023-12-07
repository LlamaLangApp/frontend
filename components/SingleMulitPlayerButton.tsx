import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { buttonLightPink, grey } from "../Consts";

const SingleMultiPlayerButton = ({
  choices,
  onSelect,
}: {
  choices: string[];
  onSelect: (arg0: string) => void;
}) => {
  const [selected, setSelected] = useState(choices[0]);

  return (
    <View style={styles.backgroundStyle}>
      <View style={styles.buttonsContainerStyle}>
        <TouchableOpacity
          style={
            selected === "SinglePlayer"
              ? styles.buttonStyleClicked
              : styles.buttonStyleUnclicked
          }
          onPress={() => {
            setSelected("SinglePlayer");
            onSelect("SinglePlayer");
          }}
        >
          <View style={styles.textContainerStyle}>
            <FontAwesome5 name="user-alt" size={30} color={buttonLightPink} />
            <Text style={styles.textStyle}>SinglePlayer</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            selected === "MultiPlayer"
              ? styles.buttonStyleClicked
              : styles.buttonStyleUnclicked
          }
          onPress={() => {
            setSelected("MultiPlayer");
            onSelect("MultiPlayer");
          }}
        >
          <View style={styles.textContainerStyle}>
            <FontAwesome5
              name="user-friends"
              size={35}
              color={buttonLightPink}
            />
            <Text style={styles.textStyle}>MultiPlayer</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#D9D9D9",
    borderRadius: 13,
    width: "87%",
    height: 60,
  },
  buttonsContainerStyle: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    marginHorizontal: "2%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyleClicked: {
    flex: 1,
    height: "85%",
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyleUnclicked: {
    flex: 1,
    height: "80%",
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    color: grey,
  },
});
export default SingleMultiPlayerButton;
