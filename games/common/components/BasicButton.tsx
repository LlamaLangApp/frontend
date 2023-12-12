import buttonGamesStyles from "../../../styles/games/ButtonGamesStyles";
import textGamesStyles from "../../../styles/games/TextGamesStyles";
import { Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { grey, lightGrey, pink, white } from "../../../Consts";

const BasicButton = ({
  buttonText,
  buttonColor,
  textColor,
  onPress,
}: {
  buttonText: string;
  buttonColor: string;
  textColor: string;
  onPress: () => void;
}) => {
  return useMemo(() => {
    return (
      <TouchableOpacity
        style={[buttonGamesStyles.basic, { backgroundColor: buttonColor }]}
        onPress={onPress}
      >
        <Text style={[textGamesStyles.button, { color: textColor }]}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    );
  }, [buttonText, buttonColor, textColor, onPress]);
};

export const PinkButton = ({
  buttonText,
  onPress,
}: {
  buttonText: string;
  onPress: () => void;
}) => {
  return (
    <BasicButton
      buttonText={buttonText}
      buttonColor={pink}
      textColor={white}
      onPress={onPress}
    />
  );
};

export const LightGreyButton = ({
  buttonText,
  onPress,
}: {
  buttonText: string;
  onPress: () => void;
}) => {
  return (
    <BasicButton
      buttonText={buttonText}
      buttonColor={lightGrey}
      textColor={grey}
      onPress={onPress}
    />
  );
};
