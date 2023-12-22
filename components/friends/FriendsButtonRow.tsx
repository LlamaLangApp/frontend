import { TouchableOpacity, View, Text } from "react-native";
import { defaultBackgroundColor, pink } from "../../Consts";
import { useMemo, useState } from "react";
import friendsStyles from "@styles/FriendsStyles";

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
          <Text
            style={{
              padding: 10,
              fontSize: 16,
              color: "white",
              fontWeight: "700",
            }}
          >
            {choice}
          </Text>
        </TouchableOpacity>
      )),
    [choices, selected]
  );

  return <View style={friendsStyles.doubleButton}>{buttons}</View>;
};

export default FriendsButtonRow;
