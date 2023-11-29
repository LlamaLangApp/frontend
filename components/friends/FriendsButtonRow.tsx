import { TouchableOpacity, View, Text } from "react-native";
import {
  buttonDarkPink,
  buttonLightPink,
  defaultBackgroundColor,
  lightGrey,
  pink,
} from "../../Consts";
import homeStyles from "../../styles/HomeStyles";
import { useMemo, useState } from "react";

const FriendsButtonRow = ({
  choices,
  onSelect,
}: {
  choices: string[];
  onSelect: (arg0: string) => void;
}) => {
  const [selected, setSelected] = useState(choices[0]);

  const buttons = useMemo(
    () =>
      choices.map((choice) => (
        <TouchableOpacity
          style={{
            alignItems: "center",
            width: "50%",
            borderRadius: 15,
            backgroundColor:
              selected === choice ? pink : defaultBackgroundColor,
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
    [choices, selected]
  );

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: defaultBackgroundColor,
        width: "78%",
        borderRadius: 15,
        height: "60%",
        marginHorizontal: "2%",
        marginVertical: "4%",
      }}
    >
      {buttons}
    </View>
  );
};

export default FriendsButtonRow;
