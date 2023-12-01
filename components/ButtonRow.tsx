import { TouchableOpacity, View, Text, ViewStyle } from "react-native";
import { buttonDarkPink, buttonLightPink } from "../Consts";
import homeStyles from "../styles/HomeStyles";
import { useMemo, useState } from "react";

export default ({
  choices,
  onSelect,
}: {
  choices: string[];
  onSelect: (arg0: string) => void;
}) => {
  const [selected, setSelected] = useState(choices[0]);

  const width = useMemo(
    () => `${(100 - 20) / choices.length}%` as ViewStyle["width"],
    [choices.length]
  );

  const buttons = useMemo(
    () =>
      choices.map((choice) => (
        <TouchableOpacity
          style={{
            alignItems: "center",
            width: width,
            borderRadius: 15,
            backgroundColor:
              selected === choice ? buttonDarkPink : buttonLightPink,
          }}
          onPress={() => {
            setSelected(choice);
            onSelect(choice);
          }}
          key={choice}
        >
          <Text style={homeStyles.buttonText}>{choice}</Text>
        </TouchableOpacity>
      )),
    [choices, selected, width]
  );

  return (
    <View style={{ alignItems: "center", width: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: buttonLightPink,
          borderRadius: 15,
        }}
      >
        {buttons}
      </View>
    </View>
  );
};
