import buttonGamesStyles from "../../styles/games/ButtonGamesStyles";
import textGamesStyles from "../../styles/games/TextGamesStyles";
import { grey, lightGrey, pink } from "../../Consts";
import { Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { useMemo } from "react";

const BlockedButton = ({
  buttonText,
  condition,
  onPress,
}: {
  buttonText: string;
  condition: boolean;
  onPress: () => void;
}) => {
  return useMemo(() => {
    return (
      <TouchableOpacity
        style={[
          buttonGamesStyles.basic,
          { backgroundColor: condition ? pink : grey },
        ]}
        activeOpacity={condition ? 0.2 : 1}
        onPress={onPress}
      >
        <Text
          style={[
            textGamesStyles.button,
            { color: condition ? "white" : lightGrey },
          ]}
        >
          {buttonText}
        </Text>
        {!condition && (
          <FontAwesome name={"lock"} size={19} color={lightGrey} />
        )}
      </TouchableOpacity>
    );
  }, [condition, onPress]);
};

export default BlockedButton;
