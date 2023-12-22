import { Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { grey, lightGrey, pink } from "../../Consts";
import buttonGamesStyles from "../../styles/games/ButtonGamesStyles";
import textStyles from "../../styles/TextStyles";

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
            textStyles.button,
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
