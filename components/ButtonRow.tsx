import {
  TouchableOpacity,
  View,
  Text,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { buttonLightPink, grey } from "../Consts";
import React, { useMemo, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

export default ({
  choices,
  onSelect,
}: {
  choices: { choice: string; icon: string }[];
  onSelect: (arg0: string) => void;
}) => {
  const [selected, setSelected] = useState<string>(choices[0].choice);

  const width = useMemo(
    () => `${(100 - 50) / choices.length}%` as ViewStyle["width"],
    [choices.length]
  );

  const buttons = useMemo(
    () =>
      choices.map((choice) => (
        <TouchableOpacity
          style={[
            selected === choice.choice
              ? styles.buttonStyleClicked
              : styles.buttonStyleUnclicked,
            { width: width },
          ]}
          onPress={() => {
            setSelected(choice.choice);
            onSelect(choice.choice);
          }}
          key={choice.choice}
        >
          <View style={styles.textContainerStyle}>
            <FontAwesome5
              name={choice.icon}
              size={30}
              color={selected === choice.choice ? buttonLightPink : grey}
            />
            <Text style={styles.textStyle}>{choice.choice}</Text>
          </View>
        </TouchableOpacity>
      )),
    [choices, selected, width]
  );

  return (
    <View style={styles.backgroundStyle}>
      <View style={styles.buttonsContainerStyle}>{buttons}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#D9D9D9",
    borderRadius: 13,
    width: "86%",
    marginHorizontal: "7%",
    height: 60,
  },
  buttonsContainerStyle: {
    width: "96%",
    height: "100%",
    flexDirection: "row",
    marginHorizontal: "2%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyleClicked: {
    flex: 1,
    height: "80%",
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
    gap: 8,
  },
  textStyle: {
    color: grey,
    fontSize: 17,
  },
});
